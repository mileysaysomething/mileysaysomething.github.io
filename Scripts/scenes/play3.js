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
    var PlayScene3 = /** @class */ (function (_super) {
        __extends(PlayScene3, _super);
        function PlayScene3(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this._specialTimer = 0;
            _this.Start();
            return _this;
        }
        PlayScene3.prototype.Start = function () {
            this._level3 = new objects.Level3(this.assetManager);
            this._ninja = new objects.Ninja(this.assetManager);
            this._sushi = new objects.Sushi(this.assetManager);
            this._bullet = new objects.Bullet(this.assetManager);
            this._special = new objects.Button(this.assetManager, "ghost", 1300, 420);
            this._muteBtn = new objects.Button(this.assetManager, "muteBtn", 1300, 80);
            this._unmuteBtn = new objects.Button(this.assetManager, "unmuteBtn", 1300, 30);
            this._cyborgbullet = new Array();
            console.log(scenes.PlayScene.soundOn);
            this._cyborg = new Array();
            this._cyborgNum = 0;
            for (var count = 0; count < this._cyborgNum + 15; count++) {
                this._cyborg[count] = new objects.Cyborg(this.assetManager);
            }
            for (var count = 0; count < this._cyborgNum + 35; count++) {
                this._cyborgbullet[count] = new objects.cyborgbullet(this.assetManager);
            }
            this._ninjaBGMSound = createjs.Sound.play("engine");
            this._ninjaBGMSound.loop = -1;
            this._ninjaBGMSound.volume = 0.3;
            this._scoreBoard = new managers.ScoreBoard();
            objects.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        PlayScene3.prototype._muteBtnClick = function () {
            createjs.Sound.stop();
        };
        PlayScene3.prototype._unmuteBtnClick = function () {
            this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
            this._ninjaBGMSound.loop = -1;
            this._ninjaBGMSound.volume = 0.1;
        };
        PlayScene3.prototype.Update = function () {
            var _this = this;
            this._level3.Update();
            this._ninja.Update();
            this._bullet.Update();
            this._bullet.x++;
            this._sushi.Update();
            this._specialTimer++;
            managers.Collision.Check(this._ninja, this._sushi);
            if (objects.Game.keyboardManager.escape) {
                console.log("clicked");
                scenes.PlayScene.count += 1;
                this._muteBtnClick();
            }
            if (objects.Game.keyboardManager.escape) {
                console.log("clicked");
                scenes.PlayScene.count += 1;
                this._muteBtnClick();
            }
            else if (objects.Game.keyboardManager.shift) {
                this._unmuteBtnClick();
            }
            if (this._bullet.x > 1000) {
                this._bullet.x = this._ninja.x;
                this._bullet.y = this._ninja.y;
            }
            this._cyborgbullet.forEach(function (_cyborgbullet) {
                _cyborgbullet.Update();
                if (_this._scoreBoard.Time > 110 && _this._scoreBoard.Time < 120) {
                    _cyborgbullet.alpha = 1;
                    if (_this._ninja.alpha != 0.2) {
                        managers.Collision.Check(_this._ninja, _cyborgbullet);
                    }
                }
                else {
                    _cyborgbullet.alpha = 0;
                }
                if (_cyborgbullet.x < 0) {
                    _cyborgbullet.Reset();
                }
            });
            this._cyborg.forEach(function (cyborg) {
                cyborg.Update();
                if (_this._scoreBoard.Time > 110 && _this._scoreBoard.Time < 120) {
                    cyborg.alpha = 0;
                }
                else {
                    if (_this._ninja.alpha != 0.2) {
                        cyborg.alpha = 1;
                        cyborg.x--;
                        managers.Collision.Check(_this._ninja, cyborg);
                    }
                    else if (objects.Game.keyboardManager.jump) {
                        createjs.Tween.get(_this._special).to({ alpha: 0.1 }, 9000).to({ alpha: 1 });
                    }
                    if (cyborg.x < 0) {
                        cyborg.x = 1300;
                    }
                    managers.Collision.Check(cyborg, _this._bullet);
                }
            });
            if (this._scoreBoard.Lives <= 0) {
                this._muteBtnClick();
                objects.Game.currentScene = config.Scene.OVER;
            }
            if (this._scoreBoard.Score >= 300) {
                this._muteBtnClick();
                objects.Game.currentScene = config.Scene.WIN;
            }
        };
        PlayScene3.prototype.Main = function () {
            var _this = this;
            this.addChild(this._level3);
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
        return PlayScene3;
    }(objects.Scene));
    scenes.PlayScene3 = PlayScene3;
})(scenes || (scenes = {}));
//# sourceMappingURL=play3.js.map