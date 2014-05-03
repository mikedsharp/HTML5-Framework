game.state.defaultstate = (function () {
	var my = {
		xValue: 320,
		yValue: 240,
        once: false
	};

	my.init = function () {
	    addEventListener('click', my.checkMouseCoordinates);
	    addEventListener('resize', my.refreshEvents)
	    
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
	my.clickHandler = function (object) {
	    console.log('X: ' + object.x +' Y: ' + object.y +' W: ' + object.w +' H: ' + object.h + ' object name: ' + object.name  + ' Collision Detected!'); 
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


		ctx.fillRect(16, (h / 2) - 64, 32, 32);
		ctx.fillRect(16, (h / 2) - 32 + 6, 32, 32);
		ctx.fillRect(16, (h / 2) - 0 + 12, 32, 32);

		if (!my.once) {
		    system.event.mousemonitor.subscribers.push({ x: 16, y: (h / 2) - 64, w: 32, h: 32, name: 'button1' });
		    system.event.mousemonitor.subscribers.push({ x: 16, y: (h / 2) - 32  + 6, w: 32, h: 32, name: 'button2' });
		    system.event.mousemonitor.subscribers.push({ x: 16, y: (h / 2) - 0 + 12, w: 32, h: 32, name: 'button3' });
		    my.once = true;
		}



		ctx.fillRect(w - 48, (h / 2) - 64, 32, 32);
		ctx.fillRect(w - 48, (h / 2) - 32 + 6, 32, 32);
		ctx.fillRect(w- 48, (h / 2) - 0 + 12, 32, 32);
		

	}

	return my;
}());

