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
    console.log("Enemy loaded");
    var Cyborg = /** @class */ (function (_super) {
        __extends(Cyborg, _super);
        // Constructor
        function Cyborg(assetManager) {
            var _this = _super.call(this, assetManager, "cyborg") || this;
            // private instance variables
            _this.pattern = 0;
            _this.interval = 0;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Cyborg.prototype, "Lives", {
            get: function () {
                return this.x;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Cyborg.prototype.Start = function () {
            this.Reset();
        };
        // updates the game object every frame
        Cyborg.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        // reset the objects location to some value
        Cyborg.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * 100)) + 1300;
            this.y = Math.floor(Math.random() * Math.floor(this.height)) + 40;
            this._dx = Math.floor((Math.random() * 4) - 2);
            this._dy = Math.floor((Math.random() * 5) + 5);
        };
        // move the object to some new location
        Cyborg.prototype.Move = function () {
            this.x -= this._dx + 8;
            if (this.interval % 5 == 0) {
                this.y -= (this._dy - Math.floor(Math.random() * 10)) - 3;
            }
            else {
                this.y += (this._dy - Math.floor(Math.random() * 10));
            }
        };
        // check to see if some boundary has been passed
        Cyborg.prototype.CheckBounds = function () {
            // check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
            if (this.x <= 0 + this.width) {
                this.Reset();
            }
        };
        return Cyborg;
    }(objects.GameObject));
    objects.Cyborg = Cyborg;
})(objects || (objects = {}));
//# sourceMappingURL=cyborg.js.map