system.windowmanagement = (function () {
    var my = {};
    // resize the current canvas state, based on window metrics
    my.windowResize = function () {
        var canvas;
        canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    // init for windowmanagement subsystem
    my.init = function () {
        window.addEventListener('resize', my.windowResize, false);
        //calc initial window bounds
        my.windowResize(); 
    }
    return my;
}());

