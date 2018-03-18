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
            this.LivesLabel = new objects.Label("Lives: 0", "30px", "Pressstart2p", "#000000", 50, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "30px", "Pressstart2p", "#000000", 500, 10, false);
            this.HighScoreLabel = new objects.Label("High Score: 99999", "50px", "Pressstart2p", "#000000", 320, 240, true);
            this.Lives = 5;
            this.Score = 0;
            this.HighScore = 0;
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map