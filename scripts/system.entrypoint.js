system.entrypoint = (function () {
	var my = {};
	my.init = function () {
        // call init for all subsystems here
	    system.windowmanagement.init();
	}
	return my; 
}()); 

//out document is 'ready' 
document.addEventListener('DOMContentLoaded', function(){
	system.entrypoint.init(); 
});