var objects;
(function (objects) {
    var shape;
    var bulletList = {};
    var Bullet = /** @class */ (function () {
        // public properties
        // Constructor
        function Bullet(object) {
            // private instance letiables
            this.frameCount = 0;
            this.deleter = 5;
            this.x = 0;
            this.y = 0;
            this.randomlyGenerateBullet = function () {
                //Math.random() returns a number between 0 and 1
                var x = this.x;
                var y = this.y;
                var radius = 10;
                var id = Math.random();
                var angle = 360;
                var spdX = Math.cos(angle / 180 * Math.PI) * 5;
                var spdY = Math.sin(angle / 180 * Math.PI) * 5;
                Bullet.Bullet(id, x, y, spdX, spdY, radius);
            };
            this.updateEntityBulletPosition = function (something) {
                something.x += something.spdX * 9;
                something.y += something.spdY * 9;
            };
            this.Start();
        }
        // private methods
        // public methods
        // Initializes letiables and creates new objects
        Bullet.prototype.Start = function () {
            this.y = 180;
            this.x = 180;
        };
        Bullet.Bullet = function (id, x, y, spdX, spdY, radius) {
            var asd = {
                x: x,
                spdX: spdX,
                y: y,
                spdY: spdY,
                name: 'E',
                id: id,
                radius: radius,
                color: '',
            };
            bulletList[id] = asd;
        };
        Bullet.prototype.updateEntityBullet = function (something) {
            this.drawEntity(something);
            this.updateEntityBulletPosition(something);
        };
        Bullet.prototype.drawEntity = function (something) {
            var graphics = new createjs.Graphics().beginFill("#99A6DC").beginStroke("10").
                drawCircle(something.x, something.y, something.radius);
            // loop and add each cyborg to the array
            // how to make bullets curve shape.y = this.y + 10;
            shape = new createjs.Shape(graphics).set({ name: "newShapes" });
            objects.Game.stage.addChild(shape);
        };
        // updates the game object every frame
        Bullet.prototype.Update = function () {
            objects.Game.stage.removeChild(shape);
            this.Move();
            this.frameCount = this.frameCount + 1;
            if (this.frameCount % 17 === 0) {
                this.randomlyGenerateBullet();
            } //every 1 sec
            if (this.frameCount % 34 === 0) {
                this.Reset();
            } //every 1 sec
            for (var key in bulletList) {
                this.updateEntityBullet(bulletList[key]);
            }
        };
        // reset the objects location to some value
        Bullet.prototype.Reset = function () {
            for (var key in bulletList) {
                delete bulletList[key];
            }
        };
        // move the object to some new location
        //create a class that only moves bullets
        Bullet.prototype.Move = function () {
            // keyboard controls
            if (objects.Game.keyboardManager.moveLeft) {
                if (this.x <= 100) {
                    this.x = 100;
                }
                this.x -= 5;
            }
            if (objects.Game.keyboardManager.moveRight) {
                if (this.x >= 1300) {
                    this.x = 1300;
                }
                this.x += 5;
            }
            //Upwards
            if (objects.Game.keyboardManager.moveForward) {
                if (this.y <= 50) {
                    this.y = 50;
                }
                this.y -= 10;
            }
            //Downwards 
            if (objects.Game.keyboardManager.moveBackward) {
                if (this.y >= 430) {
                    this.y = 430;
                }
                this.y += 10;
                //console.log("position: " + this.y);
            }
        };
        return Bullet;
    }());
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map