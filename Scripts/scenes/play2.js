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
    var PlayScene2 = /** @class */ (function (_super) {
        __extends(PlayScene2, _super);
        function PlayScene2(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this._specialTimer = 0;
            _this.Start();
            return _this;
        }
        PlayScene2.prototype.Start = function () {
            this._level2 = new objects.Level2(this.assetManager);
            this._level3 = new objects.Level3(this.assetManager);
            this._ninja = new objects.Ninja(this.assetManager);
            this._sushi = new objects.Sushi(this.assetManager);
            this._cyborgbullet = new Array();
            this._bullet = new objects.Bullet(this.assetManager);
            this._special = new objects.Button(this.assetManager, "ghost", 1300, 420);
            this._muteBtn = new objects.Button(this.assetManager, "muteBtn", 1300, 80);
            this._unmuteBtn = new objects.Button(this.assetManager, "unmuteBtn", 1300, 30);
            console.log(scenes.PlayScene.soundOn);
            this._cyborg = new Array();
            this._cyborgNum = 10;
            for (var count = 0; count < this._cyborgNum; count++) {
                this._cyborg[count] = new objects.Cyborg(this.assetManager);
            }
            for (var count = 0; count < this._cyborgNum + 5; count++) {
                this._cyborgbullet[count] = new objects.cyborgbullet(this.assetManager);
            }
            this._ninjaBGMSound = createjs.Sound.play("engine");
            this._ninjaBGMSound.loop = -1;
            this._ninjaBGMSound.volume = 0.3;
            this._scoreBoard = new managers.ScoreBoard();
            objects.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        PlayScene2.prototype._muteBtnClick = function () {
            createjs.Sound.stop();
        };
        PlayScene2.prototype._unmuteBtnClick = function () {
            this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
            this._ninjaBGMSound.loop = -1;
            this._ninjaBGMSound.volume = 0.1;
        };
        PlayScene2.prototype.Update = function () {
            var _this = this;
            this._level2.Update();
            this._level3.Update();
            this._ninja.Update();
            this._bullet.Update();
            this._bullet.x++;
            this._sushi.Update();
            this._specialTimer++;
            managers.Collision.Check(this._ninja, this._sushi);
            managers.Collision.CurrentScore -= 1;
            if (objects.Game.keyboardManager.escape) {
                console.log("clicked");
                scenes.PlayScene.count += 1;
                this._muteBtnClick();
            }
            else if (objects.Game.keyboardManager.shift) {
                this._unmuteBtnClick();
            }
            else if (objects.Game.keyboardManager.jump) {
                createjs.Tween.get(this._special).to({ alpha: 0.1 }, 9000).to({ alpha: 1 });
            }
            if (this._bullet.x > 1200) {
                this._bullet.x = this._ninja.x;
                this._bullet.y = this._ninja.y;
            }
            this._cyborg.forEach(function (cyborg) {
                cyborg.Update();
                if (_this._ninja.alpha != 0.2) {
                    managers.Collision.Check(_this._ninja, cyborg);
                }
                managers.Collision.Check(cyborg, _this._bullet);
                if (cyborg.x < 0) {
                    cyborg.x = 1300;
                }
            });
            this._cyborgbullet.forEach(function (_cyborgbullet) {
                if (_this._scoreBoard.Time > 70 && _this._scoreBoard.Time < 110) {
                    _cyborgbullet.alpha = 1;
                    _cyborgbullet.Update();
                    if (_this._ninja.alpha != 0.2) {
                        managers.Collision.Check(_this._ninja, _cyborgbullet);
                    }
                }
                else {
                    _cyborgbullet.alpha = 0;
                }
            });
            if (this._scoreBoard.Lives <= 0) {
                this._muteBtnClick();
                objects.Game.currentScene = config.Scene.OVER;
            }
            if (this._scoreBoard.Score >= 250) {
                this._ninjaBGMSound.stop();
                this.removeChild();
                objects.Game.currentScene = config.Scene.PLAY3;
            }
        };
        PlayScene2.prototype.Main = function () {
            var _this = this;
            this.addChild(this._level2);
            this.addChild(this._bullet);
            this.addChild(this._ninja);
            this._cyborg.forEach(function (cyborg) {
                _this.addChild(cyborg);
            });
            this._cyborgbullet.forEach(function (_cyborgbullet) {
                _this.addChild(_cyborgbullet);
            });
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.TimeLabel);
            this.addChild(this._muteBtn);
            this._unmuteBtn.on("click", this._unmuteBtnClick);
            this.addChild(this._unmuteBtn);
            this._muteBtn.on("click", this._muteBtnClick);
            this.addChild(this._special);
            this.addChild(this._sushi);
        };
        return PlayScene2;
    }(objects.Scene));
    scenes.PlayScene2 = PlayScene2;
})(scenes || (scenes = {}));
//# sourceMappingURL=play2.js.map