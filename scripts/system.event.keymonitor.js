system.event.keymonitor = (function () {
	var my = {
		keyStates: {
			left: false,
			right: false,
			down: false,
			up: false,
			enter: false,
			spaceBar: false
		},
		KeyCodes: {
			KEY_LEFT: 37,
			KEY_RIGHT: 39,
			KEY_UP: 38,
			KEY_DOWN: 40,
			KEY_ENTER: 13,
			KEY_SPACEBAR: 32
		},
	};

	my.init = function () {
		// define an onkeydown event for selected keys
		window.addEventListener("keydown", my.keyDown);
		window.addEventListener("keyup", my.keyUp);
		window.addEventListener("blur", my.killInput);
	}

	// I'll devise a better way to handle this, than this if else ladder some time soon.
	my.keyDown = function (event) {
		if (event.keyCode == my.KeyCodes.KEY_LEFT) { // left
			my.keyStates.left = true;
		}
		else if (event.keyCode == my.KeyCodes.KEY_RIGHT) { // right 
			my.keyStates.right = true;
		}
		else if (event.keyCode == my.KeyCodes.KEY_UP) { // up
			my.keyStates.up = true;
		}
		else if (event.keyCode == my.KeyCodes.KEY_DOWN) { //down
			my.keyStates.down = true;

		}
		else if (event.keyCode == my.KeyCodes.KEY_ENTER) { //ENTER
			my.keyStates.enter = true;

		}
		else if (event.keyCode == my.KeyCodes.KEY_SPACEBAR) { //SPACEBAR
			my.keyStates.spaceBar = true;

		}
	}
	// I'll devise a better way to handle this, than this if else ladder some time soon.
	my.keyUp = function (event) {
		if (event.keyCode == my.KeyCodes.KEY_LEFT) { // left
			my.keyStates.left = false;
		}
		else if (event.keyCode == my.KeyCodes.KEY_RIGHT) { // right 
			my.keyStates.right = false;
		}
		else if (event.keyCode == my.KeyCodes.KEY_UP) { // up
			my.keyStates.up = false;
		}
		else if (event.keyCode == my.KeyCodes.KEY_DOWN) { //down
			my.keyStates.down = false;

		}
		else if (event.keyCode == my.KeyCodes.KEY_ENTER) { //ENTER
			my.keyStates.enter = false;

		}
		else if (event.keyCode == my.KeyCodes.KEY_SPACEBAR) { //SPACEBAR
			my.keyStates.spaceBar = false;

		}
	}
	
	my.cleanUp = function () {
		window.removeEventListener("keydown", my.keyDown);
		window.removeEventListener("keyup", my.keyUp);
	}
	// used to normalise all events if user changes state or if they leave the window with a key held down 
	my.killInput = function () {
		my.keyStates.left = false;
		my.keyStates.right = false;
		my.keyStates.up = false;
		my.keyStates.down = false;
	}


	return my;
}());

