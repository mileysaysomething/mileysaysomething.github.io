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
    var NinjaNew = /** @class */ (function (_super) {
        __extends(NinjaNew, _super);
        // public properties
        // Constructor
        function NinjaNew(assetManager) {
            var _this = _super.call(this, assetManager, "ninjaNew") || this;
            // private instance letiables
            _this.frameCount = 0;
            _this._activeSpecial = false;
            _this._specialTimer = 0;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes letiables and creates new objects
        NinjaNew.prototype.Start = function () {
            this.y = 200;
            this.x = 200;
        };
        // updates the game object every frame
        NinjaNew.prototype.Update = function () {
            //Waiting for user to press Space until continue count
            if (this._specialTimer % 500 == 0 && !objects.Game.keyboardManager.jump) {
                this._specialTimer += 0;
            }
            else {
                this._specialTimer += 0.5;
            }
            this.Move();
            this.CheckBounds();
            this._Special();
            //this.alpha = 0;
        };
        NinjaNew.prototype._Special = function () {
            //When both true, play this tween otherwise all false
            if (objects.Game.keyboardManager.jump && this._activeSpecial == true) {
                createjs.Tween.get(this).to({ alpha: 0.2 }).wait(9000).to({ alpha: 1 });
                //this.onsubmit(objects.Game.keyboardManager.jump);
                console.log("first press");
            }
            else {
                this._activeSpecial = false;
                this._resetSpecial();
            }
        };
        NinjaNew.prototype._resetSpecial = function () {
            console.log(this._specialTimer);
            if (this._specialTimer % 500 === 0) {
                this._activeSpecial = true;
            }
        };
        NinjaNew.prototype.Move = function () {
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
        NinjaNew.prototype.CheckBounds = function () {
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
        return NinjaNew;
    }(objects.GameObject));
    objects.NinjaNew = NinjaNew;
})(objects || (objects = {}));
//# sourceMappingURL=ninjaNew.js.map