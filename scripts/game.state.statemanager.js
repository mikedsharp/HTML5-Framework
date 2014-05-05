// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                   || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () { callback(currTime + timeToCall); },
              timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());


game.state.statemanager = (function () {
	var my = {
		currentState: null,
		FPS: 30,
		ctx: null,
		canvasWidth: 0,
		canvasHeight: 0
	};
	
	// default constructor 
	my.init = function () {
		my.ctx = document.getElementById('canvas').getContext('2d');
		my.canvasWidth = document.getElementById('canvas').width;
		my.canvasHeight = document.getElementById('canvas').height;
		// define default state (this will be replaced by a selection engine when more states are developed
		my.currentState = game.state.defaultstate;

		my.currentState.init({screenWidth: my.canvasWidth, screenHeight: my.canvasHeight});

        //start first iteration of game loop
		my.loop(); 
	}

	my.loop = function () {

		setTimeout(function () {
			requestAnimationFrame(my.loop);
			if (my.currentState != null && my.ctx != null) {
			    // define the current bounds of the canvas 
			    my.canvasHeight = document.getElementById('canvas').height;
			    my.canvasWidth = document.getElementById('canvas').width;

			    // delegate behavior to selected state
			    my.currentState.handleInput();
			    my.currentState.handleLogic();
			    my.currentState.draw(my.ctx, my.canvasWidth, my.canvasHeight);
			}
			else {
			    // no state, so just clear the screen if we can 
			    if (my.ctx != null) {
			        my.ctx.fillfillStyle = "black";
			        my.ctx.fillRect(0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height);
			    }
			}
		}, 1000/my.FPS);

	
	}


    return my;
}());

