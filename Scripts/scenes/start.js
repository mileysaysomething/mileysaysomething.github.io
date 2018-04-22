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
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        // Constructor
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        StartScene.prototype._startButtonClick = function () {
            objects.Game.currentScene = config.Scene.PLAY;
        };
        StartScene.prototype._instructionBtnClick = function () {
            objects.Game.currentScene = config.Scene.TUTORIALS;
        };
        // Public Methods
        // Initialize Game Variables and objects
        StartScene.prototype.Start = function () {
            this._coverImg = new createjs.Bitmap("./Assets/images/cover2.png");
            this._welcomeLabel = new objects.Label("Cyborg War", "60px", "Pressstart2p", "#ffffff", 530, 100, true);
            this._startButton = new objects.Button(this.assetManager, "startButton", 675, 340);
            this._instructionBtn = new objects.Button(this.assetManager, "instructionBtn", 675, 420);
            // this._sparkle = new createjs.Bitmap("./Assets/images/sparkle.gif");
            this.Main();
        };
        StartScene.prototype.Update = function () {
        };
        // This is where the fun happens
        StartScene.prototype.Main = function () {
            // add the coverImg to the scene
            this.addChild(this._coverImg);
            // add the welcome label to the scene
            this.addChild(this._welcomeLabel);
            // add the sparkle to the scene
            //this.addChild(this._sparkle);
            // add the startButton to the scene
            this.addChild(this._startButton);
            this._startButton.on("click", this._startButtonClick);
            // add the instructionButton to the scene
            this.addChild(this._instructionBtn);
            this._instructionBtn.on("click", this._instructionBtnClick);
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map