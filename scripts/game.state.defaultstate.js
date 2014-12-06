
game.state.defaultstate = (function () {
    var my = {
        xValue: 320,
        yValue: 240,
	    width: 48, 
	    height:64,
	    direction:0, 
        xSpeed: 0, 
        ySpeed: 0, 
        once: false,
        image: null, 
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

        my.sprites.sort(function (a, b) {
            var zA = 0, zB = 0;
            if (a.z) {
                zA = a.z;
            }
            if (b.z) {
                zB = b.z;
            }

            if (zA > zB) {
                return -1;
            }
            if (zA < zB) {
                return 1;
            }
            return 0;
        });


        //register with resize publisher
        system.windowmanagement.resizeSubscribers.push(my);
        my.image = new Image();
        my.image.src = 'img/ship.png';
    }

    my.handleResize = function (width, height) {
        my.sprites[5].setDimensions(16, (height / 2) - 64, my.sprites[5].width, my.sprites[5].height);
        my.sprites[4].setDimensions(16, (height / 2) - 26, my.sprites[4].width, my.sprites[4].height);
        my.sprites[3].setDimensions(16, (height / 2) + 12, my.sprites[3].width, my.sprites[3].height);
        my.sprites[2].setDimensions(width - 48, (height / 2) - 64, my.sprites[2].width, my.sprites[2].height);
        my.sprites[1].setDimensions(width - 48, (height / 2) - 26, my.sprites[1].width, my.sprites[1].height);
        my.sprites[0].setDimensions(width - 48, (height / 2) + 12, my.sprites[0].width, my.sprites[0].height);
    }

    my.refreshEvents = function () {
        my.once = false;
        system.event.mousemonitor.subscribers = [];
    }

    my.handleInput = function () {

      
        if (system.event.keymonitor.keyStates.right) {
             my.xSpeed = 5; 
        }
        else if (system.event.keymonitor.keyStates.left) {
            my.xSpeed = -5; 
        }
        else{
            my.xSpeed = 0; 
        }

        if (system.event.keymonitor.keyStates.down) {
            my.ySpeed = 5;
        }
        else if (system.event.keymonitor.keyStates.up) {
           my.ySpeed = -5;
        }
        else{
            my.ySpeed = 0; 
        }

      

     

        
        my.xValue += my.xSpeed;
         my.yValue += my.ySpeed;
 	/*if (system.event.keymonitor.keyStates.plus) {
              if(my.direction >= 360){
                my.direction = 0; 
		my.direction += 5;
	    }
	    else{
	        
                my.direction += 5;
            }
        }
        if (system.event.keymonitor.keyStates.minus) {
            if(my.direction <= 0){
                my.direction = 360; 
		my.direction -= 5;
	    }
	    else{
	        
                my.direction -= 5;
            }

        }*/
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
        ctx.fillStyle = "red";
        
        ctx.save();
        ctx.translate(my.xValue , my.yValue );
        
        // we can obtain the direction of an object by taking it'a speed and finding the
        // arctangent, this gives us an angle in radians we can use to rotate an object 
        // so that is pointing in the direction it's heading
        my.direction = Math.atan2(my.ySpeed, my.xSpeed);

        // the offset needs to be added to correct for differing orientation
        ctx.rotate(system.util.degreesToRadians(90) + my.direction);

        if(!!my.image){
            //ctx.fillRect(-my.width/2,  -my.height/2, my.width, my.height);
            ctx.drawImage(my.image, -my.width/2,  -my.height/2, my.width, my.height);
        }

       

        ctx.restore(); 


        // enemy following the player
        ctx.save();
        ctx.translate(w/2 , h/2 );
        // calculate midpoints between x and y's of tqo objects
        var deltaX =  (my.xValue)     - w/2 ;
        var deltaY =  (my.yValue)  - h/2;
        
        // find the arctangent and we find the rotation angle in radians
        var enemyAngle = Math.atan2(deltaY, deltaX);

        // the offset needs to be added to correct for differing orientation
        ctx.rotate(system.util.degreesToRadians(90) + enemyAngle);

        if(!!my.image){
            ctx.fillRect(-my.width/2,  -my.height/2, my.width, my.height);
            ctx.drawImage(my.image, -my.width/2,  -my.height/2, my.width, my.height);
        }

       

        ctx.restore(); 



        
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

