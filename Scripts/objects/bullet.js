var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var shape;
    var bulletList = {};
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // Constructor
        function Bullet(assetManager) {
            var _this = _super.call(this, assetManager, "bullet") || this;
            // private instance letiables
            _this.frameCount = 0;
            _this.deleter = 5;
            _this.ninja_pos = 0;
            _this.radius = 10;
            //Create Standard list
            _this.randomlyGenerateBullet = function () {
                //Math.random() returns a number between 0 and 1
                var x = this.x + 30;
                var y = this.y;
                var id = Math.random();
                var angle = 360;
                var spdX = Math.cos(angle / 180 * Math.PI) * 5;
                var spdY = Math.sin(angle / 180 * Math.PI) * 5;
                Bullet.Bullet(id, x, y, spdX, spdY);
            };
            //Specifications of my Bullet - will be placed at that x, and y positio
            _this.updateEntityBulletPosition = function (bulletObj) {
                bulletObj.x += bulletObj.spdX * 20;
                bulletObj.y += bulletObj.spdY * 20;
                this.x = bulletObj.x;
                this.y = bulletObj.y;
                // console.log(this._nextX);     
            };
            _this.Start();
            return _this;
        }
        Object.defineProperty(Bullet.prototype, "nextX", {
            // public properties
            get: function () {
                return this._nextX;
            },
            set: function (finalNumber) {
                this._nextX = finalNumber;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        // public methods
        // Initializes letiables and creates new objects
        Bullet.prototype.Start = function () {
            this.y = 300;
            this.x = 180;
        };
        Bullet.Bullet = function (id, x, y, spdX, spdY) {
            var asd = {
                x: x,
                y: y,
                spdX: spdX,
                spdY: spdY
            };
            bulletList[id] = asd;
        };
        Bullet.prototype.updateEntityBullet = function (bulletObj) {
            this.updateEntityBulletPosition(bulletObj);
        };
        // updates the game object every frame
        Bullet.prototype.Update = function () {
            this.Move();
            this.frameCount = this.frameCount + 1;
            if (this.frameCount % 2 === 0) {
                this.randomlyGenerateBullet();
            }
            if (this.frameCount % 25 === 0) {
                this.Reset();
            } //every 1 sec
            //every 1 sec
            //every 1 sec
            for (var key in bulletList) {
                this.updateEntityBullet(bulletList[key]);
                this.x = bulletList[key].x;
                //    if (this.x >= 1300 ){
                //     this.x -= bulletList[key].x;        
                //  }   
                //  console.log("final position", Math.max(this.x)); works why??
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
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map