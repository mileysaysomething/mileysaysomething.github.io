var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        // constructors
        function ScoreBoard() {
            this._initialize();
        }
        Object.defineProperty(ScoreBoard.prototype, "Lives", {
            // public properties
            get: function () {
                return this._lives;
            },
            set: function (newLives) {
                this._lives = newLives;
                this.LivesLabel.text = "Lives: " + this._lives;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Time", {
            get: function () {
                return this._time;
            },
            set: function (newTime) {
                this._time = newTime;
                this.TimeLabel.text = "Time: " + this._time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            get: function () {
                return this._score;
            },
            set: function (newScore) {
                this._score = newScore;
                this.ScoreLabel.text = "Score: " + this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScore", {
            get: function () {
                return this._highScore;
            },
            set: function (newHighScore) {
                this._highScore = newHighScore;
                this.HighScoreLabel.text = "High Score: " + this._highScore;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        ScoreBoard.prototype._initialize = function () {
            this.LivesLabel = new objects.Label("Lives: 0", "30px", "Pressstart2p", "#DF6977", 50, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "30px", "Pressstart2p", "#DF6977", 500, 10, false);
            this.TimeLabel = new objects.Label("Time: 99999", "30px", "Pressstart2p", "#DF6977", 900, 10, false);
            this.HighScoreLabel = new objects.Label("High Score: 99999", "50px", "Pressstart2p", "#DF6977", 320, 240, true);
            if (objects.Game.currentScene == 1) {
                this.Time = 0;
                this.Lives = 5;
                this.Score = 0;
                this.HighScore = 0;
            }
            else if (objects.Game.currentScene == 2) {
                this.Time = managers.Collision.CurrenTime;
                this.Lives = managers.Collision.CurrentLive;
                this.Score = managers.Collision.CurrentScore;
                this.HighScore = managers.Collision.CurrentHighScore;
            }
            else {
                this.Time = managers.Collision.CurrenTime;
                this.Lives = managers.Collision.CurrentLive;
                this.Score = managers.Collision.CurrentScore;
                this.HighScore = managers.Collision.CurrentHighScore;
            }
            /*
             else if(objects.Game.currentScene == 2 || objects.Game.currentScene == 3 ){
               this.Time = Collision.CurrenTime;
               this.Lives = Collision.CurrentLive;
               this.Score = Collision.CurrentScore;
               this.HighScore = Collision.CurrentHighScore;
         
             }
             */
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map