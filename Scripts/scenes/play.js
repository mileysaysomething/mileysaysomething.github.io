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
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this._level1 = new objects.Level1(this.assetManager);
            this._level2 = new objects.Level2(this.assetManager);
            this._ninja = new objects.Ninja(this.assetManager);
            this._bullet = new objects.Bullet(this.assetManager);
            this._muteBtn = new objects.Button(this.assetManager, "muteBtn", 1300, 80);
            this._unmuteBtn = new objects.Button(this.assetManager, "unmuteBtn", 1300, 30);
            // instantiate the cyborg array
            this._cyborg = new Array();
            this._cyborgNum = 20;
            // loop and add each cyborg to the array
            for (var count = 0; count < this._cyborgNum; count++) {
                this._cyborg[count] = new objects.Cyborg(this.assetManager);
            }
            //loop sound of ninja
            this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
            this._ninjaBGMSound.loop = -1; // play forever
            this._ninjaBGMSound.volume = 0.1;
            // create the scoreboard UI for the Scene
            this._scoreBoard = new managers.ScoreBoard();
            objects.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        // Private Methods
        PlayScene.prototype._muteBtnClick = function () {
            createjs.Sound.stop();
        };
        PlayScene.prototype._unmuteBtnClick = function () {
            this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
            this._ninjaBGMSound.loop = -1; // play forever
            this._ninjaBGMSound.volume = 0.1;
        };
        PlayScene.prototype.changescene = function () {
            if (this._scoreBoard.Score > 4000) {
                objects.Game.currentScene = config.Scene.START;
            }
        };
        //this._ninjaBGMSound.volume = 0.0;
        //this._ninjaBGMSound.stop();
        PlayScene.prototype.Update = function () {
            var _this = this;
            this._level1.Update();
            this._level2.Update();
            this._ninja.Update();
            this._bullet.Update();
            this._bullet.x++;
            if (this._bullet.x > 1000) {
                this._bullet.x = this._ninja.x;
                this._bullet.y = this._ninja.y;
            }
            // check collision between plane and island
            //  managers.Collision.Check(this.plane, this.island);
            this._cyborg.forEach(function (cyborg) {
                cyborg.Update();
                // check collision between plane and current cyborg
                managers.Collision.Check(_this._ninja, cyborg);
                managers.Collision.Check(cyborg, _this._bullet);
                if (cyborg.x < 0) {
                    cyborg.x = 1300;
                }
            });
            // if lives fall below zero switch scenes to the game over scene
            if (this._scoreBoard.Lives <= 0) {
                objects.Game.currentScene = config.Scene.OVER;
            }
            if (this._scoreBoard.Score > 4000) {
                objects.Game.currentScene = config.Scene.START;
            }
            if (this._scoreBoard.Score >= 100) {
                this._ninjaBGMSound.stop();
                this.removeChild();
                objects.Game.currentScene = config.Scene.PLAY2;
            }
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            var _this = this;
            // add the level1 to the scene
            this.addChild(this._level1);
            // add the bullet to the scene
            this.addChild(this._bullet);
            // add the plane to the scene
            this.addChild(this._ninja);
            // add cyborg to the scene
            this._cyborg.forEach(function (cyborg) {
                _this.addChild(cyborg);
            });
            // add scoreboard labels to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            // add the muteBtn to the scene
            this.addChild(this._muteBtn);
            this._muteBtn.on("click", this._muteBtnClick);
            // add the unmuteBtn to the scene
            this.addChild(this._unmuteBtn);
            this._unmuteBtn.on("click", this._unmuteBtnClick);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map