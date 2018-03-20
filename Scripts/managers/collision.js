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
            object1.visible = true;
            object2.visible = true;
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    switch (object2.name) {
                        case "cyborg":
                            if (objects.Game.HighScore <= objects.Game.scoreBoard.Score) {
                                objects.Game.scoreBoard.HighScore = objects.Game.scoreBoard.Score;
                                objects.Game.HighScore = objects.Game.scoreBoard.HighScore;
                                objects.Game.scoreBoard.Lives -= 1;
                            }
                            break;
                        case "bullet":
                            object1.visible = false;
                            object1.x = 1400;
                            count++;
                            objects.Game.scoreBoard.Score += count;
                            break;
                    }
                }
                else {
                    object2.isColliding = false;
                }
            }
            // The objects are t look into https://gamedev.stackexchange.com/questions/128675/how-to-detect-collisions-of-objects-in-two-different-arrayshtml-canvas
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map