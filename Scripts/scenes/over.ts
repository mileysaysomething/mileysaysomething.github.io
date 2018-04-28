module scenes {
  export class OverScene extends objects.Scene {
    // Private Instance Variables
    private _overLabel: objects.Label;
    private _backButton: objects.Button;
    private _scoreBoard: managers.ScoreBoard;
    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _backButtonClick():void {
      objects.Game.currentScene = config.Scene.PLAY;
      location.reload(true);
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._overLabel = new objects.Label("Game Over",  "40px", "Pressstart2p", "#ffffff", 675, 240, true);
      this._backButton = new objects.Button(this.assetManager, "backButton", 675, 340);
  
      // create the scoreboard UI for the Scene
      this._scoreBoard = new managers.ScoreBoard( );
       objects.Game.scoreBoard = this._scoreBoard;

      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      // add the welcome label to the scene
      this.addChild(this._overLabel);

      // add the backButton to the scene
      this.addChild(this._backButton);

      // add scoreboard labels to the scene
      this.addChild(this._scoreBoard.ScoreLabel);
      // event listeners
      this._backButton.on("click", this._backButtonClick);
    }
  }
}
