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
    var TutorialsScene = /** @class */ (function (_super) {
        __extends(TutorialsScene, _super);
        // Constructor
        function TutorialsScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        TutorialsScene.prototype._homeButtonClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        //private _instructionBtnClick():void {
        //objects.Game.currentScene = config.Scene.PLAY;
        //}
        // Public Methods
        // Initialize Game Variables and objects
        TutorialsScene.prototype.Start = function () {
            this._tutorials = new createjs.Bitmap("./Assets/images/ins.png");
            this._homeButton = new objects.Button(this.assetManager, "homeButton", 675, 430);
            // this._instructionBtn = new objects.Button(this.assetManager, "instructionBtn", 675, 420);
            // this._sparkle = new createjs.Bitmap("./Assets/images/sparkle.gif");
            this.Main();
        };
        TutorialsScene.prototype.Update = function () {
        };
        // This is where the fun happens
        TutorialsScene.prototype.Main = function () {
            // add the coverImg to the scene
            this.addChild(this._tutorials);
            // add the welcome label to the scene
            this.addChild(this._welcomeLabel);
            // add the sparkle to the scene
            //this.addChild(this._sparkle);
            // add the startButton to the scene
            this.addChild(this._homeButton);
            this._homeButton.on("click", this._homeButtonClick);
        };
        return TutorialsScene;
    }(objects.Scene));
    scenes.TutorialsScene = TutorialsScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=tutorials.js.map