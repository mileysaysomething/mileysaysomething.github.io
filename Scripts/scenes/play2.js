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
        // Public Properties
        // Constructor
        function PlayScene2(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene2.prototype.Start = function () {
            this._level2 = new objects.Level2(this.assetManager);
            this._ninja = new objects.Ninja(this.assetManager);
            this._bullet = new objects.Bullet(this.assetManager);
            // instantiate the cyborg array
            this._cyborg = new Array();
            this._cyborgNum = 20;
            // loop and add each cyborg to the array
            for (var count = 0; count < this._cyborgNum; count++) {
                this._cyborg[count] = new objects.Cyborg(this.assetManager);
            }
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1; // play forever
            this._engineSound.volume = 0.3;
            // create the scoreboard UI for the Scene
            this._scoreBoard = new managers.ScoreBoard();
            objects.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        // triggered every frame
        PlayScene2.prototype.Update = function () {
            var _this = this;
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
                this._engineSound.stop();
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        // This is where the fun happens
        PlayScene2.prototype.Main = function () {
            var _this = this;
            // add the ocean to the scene
            this.addChild(this._level2);
            // add the bullet to the scene
            this.addChild(this._bullet);
            // add the ninja to the scene
            this.addChild(this._ninja);
            // add cyborg to the scene
            this._cyborg.forEach(function (cyborg) {
                _this.addChild(cyborg);
            });
            // add scoreboard labels to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        return PlayScene2;
    }(objects.Scene));
    scenes.PlayScene2 = PlayScene2;
})(scenes || (scenes = {}));
//# sourceMappingURL=play2.js.map