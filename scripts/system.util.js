system.util = (function () {
    var my = {
        
    };

    my.CallbackArray = function (callback) {
        var arr = [];
        arr.push = function () {
            callback(arguments);
            return Array.prototype.push.apply(this, arguments);

        }
        return arr; 

    };
    
    return my;
}());

