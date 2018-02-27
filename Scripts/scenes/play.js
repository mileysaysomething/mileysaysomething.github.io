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
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this._ocean = new objects.Ocean(this.assetManager);
            this._plane = new objects.Plane(this.assetManager);
            this._island = new objects.Island(this.assetManager);
            // instantiate the cloud array
            this._clouds = new Array();
            this._cloudNum = 3;
            // loop and add each cloud to the array
            for (var count = 0; count < this._cloudNum; count++) {
                this._clouds[count] = new objects.Cloud(this.assetManager);
            }
            //loop sound of ninja
            this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
            this._ninjaBGMSound.loop = -1; // play forever
            this._ninjaBGMSound.volume = 0.3;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            this._ocean.Update();
            this._plane.Update();
            this._island.Update();
            this._clouds.forEach(function (cloud) {
                cloud.Update();
            });
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            var _this = this;
            // add the ocean to the scene
            this.addChild(this._ocean);
            // add the island to the scene
            this.addChild(this._island);
            // add the plane to the scene
            this.addChild(this._plane);
            // add clouds to the scene
            this._clouds.forEach(function (cloud) {
                _this.addChild(cloud);
            });
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map