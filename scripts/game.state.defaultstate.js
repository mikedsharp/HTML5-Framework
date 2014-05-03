game.state.defaultstate = (function () {
	var my = {
		xValue: 320,
		yValue: 240
	};

	my.init = function () {		
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
	my.handleLogic = function () {
	}
	my.draw = function (ctx, w, h) {
		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = "black"; 
		ctx.fillRect(my.xValue, my.yValue, 100, 50);
	}

	return my;
}());

