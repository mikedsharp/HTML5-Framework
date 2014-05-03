system.entrypoint = (function () {
	var my = {};
	my.init = function () {
        // call init for all subsystems here
	    system.windowmanagement.init();
	    // events
	    system.event.keymonitor.init(); 
        // game specific starting points
	    game.state.statemanager.init(); 
	}
	return my; 
}()); 

//our document is 'ready' 
document.addEventListener('DOMContentLoaded', function(){
	system.entrypoint.init(); 
});