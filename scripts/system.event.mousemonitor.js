system.event.mousemonitor = (function () {
    var my = {
        mouseX: 0,
        mouseY: 0
    };

    my.subscribers = [];

    my.checkMouseCoordinates = function (event) {
        my.mouseX = event.pageX;
        my.mouseY = event.pageY;
    }
    my.init = function () {
        window.addEventListener('mousemove', my.checkMouseCoordinates);
        window.addEventListener('click', my.checkMouseCoordinates);
        window.addEventListener('click', my.notifySubscribers);
    }

    my.notifySubscribers = function (event) {
        var x = event.pageX;
        var y = event.pageY;
        var w = 1;
        var h = 1;

        // sort subscribers into descending order to reflect how mouse interacts with objects 
        my.subscribers.sort(function (a, b) {
            var zA = 0, zB = 0;
            if (a.obj.z) {
                zA = a.obj.z;
            }
            if (b.obj.z) {
                zB = b.obj.z;
            }

            if (zA > zB) {
                return -1;
            }
            if (zA < zB) {
                return 1;
            }
            return 0;
        });



        for (var i = 0; i < my.subscribers.length; i++) {
            if (x < my.subscribers[i].obj.x) {
                continue;
            }
            if (x > my.subscribers[i].obj.x + my.subscribers[i].obj.width) {
                continue;
            }
            if (y < my.subscribers[i].obj.y) {
                continue;
            }
            if (y > my.subscribers[i].obj.y + my.subscribers[i].obj.height) {
                continue;
            }
            // dispatch an event to state handler
            if (my.subscribers[i].clickHandler != null && my.subscribers[i].clickHandler != undefined) {
                my.subscribers[i].clickHandler(my.subscribers[i].obj, my.subscribers[i].id);
            }
            else {
                game.state.statemanager.currentState.clickHandler(my.subscribers[i].obj, my.subscribers[i].id);
            }

            // if we don't want this event to propagate, stop notifying
            if (my.subscribers[i].propagate != undefined && my.subscribers[i].propagate != true) {
                break; 
            }

            //TODO: create a subscriber Z-order
            //      order subscriber list 
            //      add an optional Propagate flag to subscriber object  true == event keeps going, false == terminates notification

        }

    }


    my.getMouseCoordinates = function () {
        return {
            mouseX: my.mouseX,
            mouseY: my.mouseY
        };
    }

    return my;
}());

