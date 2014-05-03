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
    	addEventListener('mousemove', my.checkMouseCoordinates);
    	addEventListener('click', my.checkMouseCoordinates);
    	addEventListener('click', my.notifySubscribers);
    }

    my.notifySubscribers = function (event) {
    	var x = event.pageX;
    	var y = event.pageY;
    	var w = 1;
    	var h = 1;

    	for (var i = 0; i < my.subscribers.length; i++){
    		if(x < my.subscribers[i].x ){
    			continue; 
    		}
    		if (x > my.subscribers[i].x + my.subscribers[i].w) {
    			continue; 
    		}
    		if (y < my.subscribers[i].y) {
    			continue; 
    		}
    		if (y > my.subscribers[i].y + my.subscribers[i].h) {
    			continue;
    		}
    		// dispatch an event to state handler 
    		game.state.statemanager.currentState.clickHandler(my.subscribers[i]); 

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

