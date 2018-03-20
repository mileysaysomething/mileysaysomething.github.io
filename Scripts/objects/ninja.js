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
    var bulletShape;
    var Ninja = /** @class */ (function (_super) {
        __extends(Ninja, _super);
        // public properties
        // Constructor
        function Ninja(assetManager) {
            var _this = _super.call(this, assetManager, "ninja") || this;
            // private instance letiables
            _this.frameCount = 0;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes letiables and creates new objects
        Ninja.prototype.Start = function () {
            this.y = 200;
            this.x = 200;
        };
        // updates the game object every frame
        Ninja.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        // reset the objects location to some value
        Ninja.prototype.Reset = function () {
        };
        Ninja.prototype.Move = function () {
            // mouse controls
            //  this.x = objects.Game.stage.mouseX;      
            // this.y = objects.Game.stage.mouseY;
            // level 2 - 3 this.setTransform(this.x,this.y,this.scaleX,this.scaleY, 180,0,0)
            // keyboard controls
            if (objects.Game.keyboardManager.moveLeft) {
                this.x -= 3;
            }
            if (objects.Game.keyboardManager.moveRight) {
                this.x += 3;
            }
            if (objects.Game.keyboardManager.moveForward) {
                this.y -= 7;
            }
            if (objects.Game.keyboardManager.moveBackward) {
                this.y += 7;
            }
        };
        // check to see if some boundary has been passed
        Ninja.prototype.CheckBounds = function () {
            // right boundary
            if (this.x >= 1350 - this.halfWidth) {
                this.x = 1350 - this.halfWidth;
            }
            // left boundary
            if (this.x <= 150 - this.halfWidth) {
                this.x = 150 - this.halfWidth;
            }
            //down boundary
            if (this.y >= 510 - this.halfWidth) {
                // console.log(this.y);
                this.y = 510 - this.halfWidth;
            }
            if (this.y <= 105 - this.halfWidth) {
                // console.log(this.y);
                this.y = 105 - this.halfWidth;
            }
        };
        return Ninja;
    }(objects.GameObject));
    objects.Ninja = Ninja;
})(objects || (objects = {}));
//# sourceMappingURL=ninja.js.map