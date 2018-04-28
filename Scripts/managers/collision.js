var managers;
(function (managers) {
    var count = 0;
    var frameCount = 0;
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2) {
            // create two vec2 objects
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            frameCount++;
            if (frameCount % 1000 == 0) {
                objects.Game.scoreBoard.Time += 1;
            }
            object1.visible = true;
            object2.visible = true;
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    switch (object2.name) {
                        case "sushi":
                            if ((object2.alpha != 0) && (object1.alpha != 0)) {
                                createjs.Sound.play("powerUp");
                                // add a life power up
                                objects.Game.scoreBoard.Lives += 1;
                                object2.alpha = 0;
                            }
                            if (objects.Game.scoreBoard.Time % 5 == 0 && object2.alpha == 0) {
                                object2.alpha = 1;
                                object2.Reset();
                            }
                            break;
                        case "cyborg":
                            if (objects.Game.HighScore <= objects.Game.scoreBoard.Score) {
                                objects.Game.scoreBoard.HighScore = objects.Game.scoreBoard.Score;
                                objects.Game.HighScore = objects.Game.scoreBoard.HighScore;
                                objects.Game.scoreBoard.Lives -= 1; //Testing
                            }
                            break;
                        case "cyborgbullet":
                            if (objects.Game.HighScore <= objects.Game.scoreBoard.Score) {
                                objects.Game.scoreBoard.HighScore = objects.Game.scoreBoard.Score;
                                objects.Game.HighScore = objects.Game.scoreBoard.HighScore;
                                objects.Game.scoreBoard.Lives -= 1;
                            }
                            break;
                        case "bullet":
                            object1.visible = false;
                            object1.x = 1400;
                            objects.Game.scoreBoard.Score += 1;
                            break;
                    }
                }
                else {
                    object2.isColliding = false;
                }
                this.CurrentLive = objects.Game.scoreBoard.Lives;
                this.CurrenTime = objects.Game.scoreBoard.Time;
                this.CurrentHighScore = objects.Game.scoreBoard.HighScore;
                this.CurrentScore = objects.Game.scoreBoard.Score;
            }
            // The objects are t look into https://gamedev.stackexchange.com/questions/128675/how-to-detect-collisions-of-objects-in-two-different-arrayshtml-canvas
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map