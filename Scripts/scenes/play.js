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
            _this._specialTimer = 0;
            _this.Start();
            return _this;
        }
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this._level1 = new objects.Level1(this.assetManager);
            this._level2 = new objects.Level2(this.assetManager);
            this._ninja = new objects.Ninja(this.assetManager);
            this._cyborgbullet = new Array();
            this._bullet = new objects.Bullet(this.assetManager);
            this._sushi = new objects.Sushi(this.assetManager);
            this._special = new objects.Button(this.assetManager, "ghost", 1300, 420);
            this._muteBtn = new objects.Button(this.assetManager, "muteBtn", 1300, 80);
            this._unmuteBtn = new objects.Button(this.assetManager, "unmuteBtn", 1300, 30);
            // instantiate the cyborg array
            this._cyborg = new Array();
            this._cyborgNum = 10;
            // loop and add each cyborg to the array
            for (var count = 0; count < this._cyborgNum; count++) {
                this._cyborg[count] = new objects.Cyborg(this.assetManager);
            }
            for (var count = 0; count < this._cyborgNum; count++) {
                this._cyborgbullet[count] = new objects.cyborgbullet(this.assetManager);
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
            PlayScene.soundOn = false;
            createjs.Sound.stop();
            console.log(PlayScene.soundOn);
        };
        PlayScene.prototype._unmuteBtnClick = function () {
            this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
            this._ninjaBGMSound.loop = -1; // play forever
            this._ninjaBGMSound.volume = 0.1;
            PlayScene.soundOn = true;
            console.log(PlayScene.soundOn);
        };
        PlayScene.prototype.changescene = function () {
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
            this._specialTimer++;
            this._sushi.Update();
            managers.Collision.Check(this._ninja, this._sushi);
            if (objects.Game.keyboardManager.escape) {
                console.log("clicked");
                PlayScene.count += 1;
                this._muteBtnClick();
            }
            else if (objects.Game.keyboardManager.shift) {
                this._unmuteBtnClick();
            }
            if (this._bullet.x > 1000) {
                this._bullet.x = this._ninja.x;
                this._bullet.y = this._ninja.y;
            }
            // check collision between ninja and island
            //  managers.Collision.Check(this.ninja, this.island);
            this._cyborg.forEach(function (cyborg) {
                cyborg.Update();
                // check collision between ninja and current cyborg
                if (_this._ninja.alpha != 0.2) {
                    // managers.Collision.Check(this._ninja ,cyborg );
                }
                else if (objects.Game.keyboardManager.jump) {
                    createjs.Tween.get(_this._special).to({ alpha: 0.1 }, 9000).to({ alpha: 1 });
                }
                managers.Collision.Check(cyborg, _this._bullet);
                if (cyborg.x < 0) {
                    cyborg.x = 1300;
                }
            });
            this._cyborgbullet.forEach(function (_cyborgbullet) {
                _cyborgbullet.Update();
                managers.Collision.Check(_this._ninja, _cyborgbullet);
                if (_cyborgbullet.x < 0) {
                    _cyborgbullet.Reset();
                }
            });
            // if lives fall below zero switch scenes to the game over scene
            if (this._scoreBoard.Lives <= 0) {
                objects.Game.currentScene = config.Scene.OVER;
                this._muteBtnClick();
            }
            if (this._scoreBoard.Score >= 100) {
                this._ninjaBGMSound.stop();
                this.removeChild();
                objects.Game.currentScene = config.Scene.PLAY2;
                objects.Game.store = this._scoreBoard.Score;
            }
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            var _this = this;
            // add the level1 to the scene
            this.addChild(this._level1);
            // add the bullet to the scene
            this.addChild(this._bullet);
            // add the ninja to the scene
            this.addChild(this._ninja);
            // add cyborg to the scene
            this._cyborg.forEach(function (cyborg) {
                _this.addChild(cyborg);
            });
            this._cyborgbullet.forEach(function (_cyborgbullet) {
                _this.addChild(_cyborgbullet);
                _this.removeChild();
            });
            // add scoreboard labels to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.TimeLabel);
            // add the muteBtn to the scene
            this.addChild(this._muteBtn);
            this._unmuteBtn.on("click", this._unmuteBtnClick);
            // add the unmuteBtn to the scene
            this.addChild(this._unmuteBtn);
            this._muteBtn.on("click", this._muteBtnClick);
            //add sushi
            this.addChild(this._sushi);
            this.addChild(this._special);
        };
        PlayScene.soundOn = true;
        PlayScene.count = 0;
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map