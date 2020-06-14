const INCREASING_INTERVAL = 2000;
const REDUCING_INTERVAL = 1500;
const OVERHEATING_SPEED = 30;
const vehicle = function(color, engine) {
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 70;
}
vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
    if(this.currentSpeed === undefined) {
        this.engine = newEngine;
        this.maxSpeed = maxSpeed
    }
}
vehicle.prototype.getInfo = function() {
    console.log(this);
}
vehicle.prototype.drive = function() {
    this.braking ? clearInterval(this.braking) : null;
    this instanceof motorcycle ? console.log(`Let's drive`) : null;
    if(this.driving) {
        console.log('Already driving');
    } else {
        clearInterval(this.braking);
        this.braking = false;
        this.driving = setInterval(() => {
            this.currentSpeed === undefined ? this.currentSpeed = 0 : null;
            if(this instanceof motorcycle && this.currentSpeed - this.maxSpeed >= OVERHEATING_SPEED) {
                console.log('Engine overheating');
                this.stop();
            }
            this.currentSpeed > this.maxSpeed ? console.log('speed is too high, SLOW DOWN!') : null;
            this.currentSpeed += 20;
            console.log(this.currentSpeed);
        }, INCREASING_INTERVAL);  
    }
}
vehicle.prototype.stop = function() {
    if(this.braking) {
        console.log('Already slows down');
    } else {
        clearInterval(this.driving);
        this.driving = false;
        let maximumSpeed = this.currentSpeed;
        this.braking = setInterval(() => {
            this.currentSpeed -= 20;
            console.log(this.currentSpeed);
            if(this.currentSpeed <= 0) {
                if (this instanceof motorcycle) {
                    console.log(`Motorcycle ${this.model} is stopped. Good drive`)
                } else {
                    this instanceof car ? console.log(`Car ${this.model} is stopped. Maximum speed during 
                        the drive was ${maximumSpeed}`) : console.log(`Vehicle is stopped. Maximum speed 
                        during the drive was ${maximumSpeed}`);
                }
                clearInterval(this.braking);
                delete this.driving;
                delete this.currentSpeed;
                delete this.braking;
            }
        }, REDUCING_INTERVAL)
    }
}
const car = function(model, color, engine) {
    vehicle.call(this, color, engine);
    this.model = model;
    this.maxSpeed = 80;
}
car.prototype = Object.create(vehicle.prototype);
car.prototype.changeColor = function(newColor) {
    if(this.color === newColor) {
        console.log('The selected color is the same as the previous one, please choose another');
    } else {
        this.color = newColor;
    }
};
const motorcycle = function(model, color, engine) {
    vehicle.call(this, color, engine);
    this.model = model;
    this.maxSpeed = 90;
}
motorcycle.prototype = Object.create(vehicle.prototype);