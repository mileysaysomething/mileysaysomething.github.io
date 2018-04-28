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
    var WinScene = /** @class */ (function (_super) {
        __extends(WinScene, _super);
        // Public Properties
        // public _smileImg;
        // Constructor
        function WinScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        WinScene.prototype._backButtonClick = function () {
            objects.Game.currentScene = config.Scene.PLAY;
            location.reload(true);
        };
        // Public Methods
        // Initialize Game Variables and objects
        WinScene.prototype.Start = function () {
            this._overLabel = new objects.Label("Yay! U survived!", "40px", "Pressstart2p", "#ffffff", 675, 240, true);
            // this._smileImg = new createjs.Bitmap("./Assets/images/smile.png",,y:);
            this._backButton = new objects.Button(this.assetManager, "backButton", 675, 340);
            // create the scoreboard UI for the Scene
            this._scoreBoard = new managers.ScoreBoard();
            objects.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        WinScene.prototype.Update = function () {
        };
        // This is where the fun happens
        WinScene.prototype.Main = function () {
            // add the welcome label to the scene
            this.addChild(this._overLabel);
            // add the backButton to the scene
            this.addChild(this._backButton);
            // this.addChild(this._smileImg);
            // add scoreboard labels to the scene
            this.addChild(this._scoreBoard.ScoreLabel);
            // event listeners
            this._backButton.on("click", this._backButtonClick);
        };
        return WinScene;
    }(objects.Scene));
    scenes.WinScene = WinScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=win.js.map