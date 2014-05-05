

game.Sprite = function (config) {
    // basic dimensions
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.z = 0; 

    if (config.x != null && config.x != undefined) {
        this.x = config.x;
    }
    if (config.y != null && config.y != undefined) {
        this.y = config.y;
    }
    if (config.z != null && config.z != undefined) {
        this.z = config.z;
    }
    if (config.width != null && config.width != undefined) {
        this.width = config.width;
    }
    if (config.height != null && config.height != undefined) {
        this.height = config.height;
    }

    if (config.click != null && config.click != undefined) {
        system.event.mousemonitor.subscribers.push({
            obj:this, id: config.click.id, propagate: config.click.propagate, clickHandler: (config.click.clickHandler != null && config.click.clickHandler != undefined) ? config.click.clickHandler : null 
        });
    }

    this.setDimensions = function (x, y, width, height) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y; 
    }

}; 
