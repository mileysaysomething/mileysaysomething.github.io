module objects {
  export class Game {
    public static stage: createjs.Stage;
    public static assetManager: createjs.LoadQueue;
    public static currentScene: number;
    public static scoreBoard: managers.ScoreBoard;
    public static bullet: objects.Bullet;
    public static cyborg: objects.Cyborg;

    public static HighScore:Number = 0 ; //added
    public static keyboardManager: managers.Keyboard;
  }
}