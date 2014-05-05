system.windowmanagement = (function () {
    var my = {
        resizeSubscribers: []
    };
    // resize the current canvas state, based on window metrics
    my.windowResize = function () {
        var canvas;
        canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // notify subscribers of screen dimension change 
        my.resizeSubscribers.map(function (obj) {
            obj.handleResize(canvas.width, canvas.height);
        });
    }
    // init for windowmanagement subsystem
    my.init = function () {
        window.addEventListener('resize', my.windowResize, false);
        //calc initial window bounds
        my.windowResize(); 
    }
    return my;
}());

