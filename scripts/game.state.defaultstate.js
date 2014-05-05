game.state.defaultstate = (function () {
    var my = {
        xValue: 320,
        yValue: 240,
        once: false,
        sprites: []
    };

    my.init = function (config) {
        // sprites 
        my.sprites.push(new game.Sprite({ x: 16, y: (config.screenHeight / 2) - 64, width: 32, z: 0, height: 32, click: { id: 'button1', propagate: false, clickHandler: function () { alert('CLICCKCKKESSZZZZ'); } } }));
        my.sprites.push(new game.Sprite({ x: 16, y: (config.screenHeight / 2) - 32 + 6, width: 32, z: 1, height: 32, click: { id: 'button2', propagate: false } }));
        my.sprites.push(new game.Sprite({ x: 16, y: (config.screenHeight / 2) - 0 + 12, width: 32, z: 2, height: 32, click: { id: 'button3', propagate: false } }));

        my.sprites.push(new game.Sprite({ x: config.screenWidth - 48, y: (config.screenHeight / 2) - 64, width: 32, z: 3, height: 32, click: { id: 'button4', propagate: false } }));
        my.sprites.push(new game.Sprite({ x: config.screenWidth - 48, y: (config.screenHeight / 2) - 32 + 6, width: 32, z: 4, height: 32, click: { id: 'button5', propagate: false } }));
        my.sprites.push(new game.Sprite({ x: config.screenWidth - 48, y: (config.screenHeight / 2) - 0 + 12, width: 32, z: 5, height: 32, click: { id: 'button6', propagate: false } }));

        //register with resize publisher
        system.windowmanagement.resizeSubscribers.push(my);
    }

    my.handleResize = function (width, height) {
        my.sprites[0].setDimensions(16, (height / 2) - 64, my.sprites[0].width, my.sprites[0].height);
        my.sprites[1].setDimensions(16, (height / 2) - 26, my.sprites[1].width, my.sprites[1].height);
        my.sprites[2].setDimensions(16, (height / 2) + 12, my.sprites[2].width, my.sprites[2].height);
        my.sprites[3].setDimensions(width - 48, (height / 2) - 64, my.sprites[3].width, my.sprites[3].height);
        my.sprites[4].setDimensions(width - 48, (height / 2) - 26, my.sprites[4].width, my.sprites[4].height);
        my.sprites[5].setDimensions(width - 48, (height / 2) + 12, my.sprites[5].width, my.sprites[5].height);
    }

    my.refreshEvents = function () {
        my.once = false;
        system.event.mousemonitor.subscribers = [];
    }

    my.handleInput = function () {

        if (system.event.keymonitor.keyStates.right) {
            my.xValue += 5;
        }
        if (system.event.keymonitor.keyStates.left) {
            my.xValue -= 5;
        }
        if (system.event.keymonitor.keyStates.down) {
            my.yValue += 5;
        }
        if (system.event.keymonitor.keyStates.up) {
            my.yValue -= 5;
        }
        if (system.event.keymonitor.keyStates.spaceBar) {
            console.log('spacebar pushed');
        }
        if (system.event.keymonitor.keyStates.enter) {
            console.log('enter pushed');
        }

    }

    my.checkMouseCoordinates = function (event) {
        //console.log('X: ' + event.pageX, 'Y: ' + event.pageY); 
    }
    my.clickHandler = function (object, id) {
        console.log('[DEFAULT CLICK HANDLER] ' + 'X: ' + object.x + ' Y: ' + object.y + ' W: ' + object.width + ' H: ' + object.height + ' object name: ' + id + ' Collision Detected!');
    }
    my.handleLogic = function () {
    }
    my.draw = function (ctx, w, h) {

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "black";
        ctx.fillRect(my.xValue, my.yValue, 100, 50);
        ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, 64, h);
        ctx.fillRect(w - 64, 0, 64, h);
        ctx.fillStyle = "grey";

        my.sprites.map(function (obj) {
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        });

    }

    return my;
}());

