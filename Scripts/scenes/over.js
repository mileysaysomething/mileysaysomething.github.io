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
var scenes;
(function (scenes) {
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        // Public Properties
        // Constructor
        function OverScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        OverScene.prototype._backButtonClick = function () {
            objects.Game.currentScene = config.Scene.PLAY;
        };
        // Public Methods
        // Initialize Game Variables and objects
        OverScene.prototype.Start = function () {
            this._overLabel = new objects.Label("Game Over", "40px", "Consolas", "#ffffff", 320, 240, true);
            this._backButton = new objects.Button(this.assetManager, "backButton", 320, 340);
            this.Main();
        };
        OverScene.prototype.Update = function () {
        };
        // This is where the fun happens
        OverScene.prototype.Main = function () {
            // add the welcome label to the scene
            this.addChild(this._overLabel);
            // add the backButton to the scene
            this.addChild(this._backButton);
            // event listeners
            this._backButton.on("click", this._backButtonClick);
        };
        return OverScene;
    }(objects.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map