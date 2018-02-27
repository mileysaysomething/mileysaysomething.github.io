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
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // Private Instance Variables
        // Public Properties
        // Constructor
        function Button(assetManager, imageString, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, assetManager.getResult(imageString)) || this;
            _this.regX = _this.getBounds().width * 0.5;
            _this.regY = _this.getBounds().height * 0.5;
            _this.x = x;
            _this.y = y;
            _this.on("mouseover", _this._mouseOver);
            _this.on("mouseout", _this._mouseOut);
            return _this;
        }
        // Private Methods
        Button.prototype._mouseOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype._mouseOut = function () {
            this.alpha = 1.0;
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map