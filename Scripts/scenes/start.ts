module scenes {
  export class StartScene extends objects.Scene {
    // Private Instance Variables
    private _welcomeLabel: objects.Label;
    private _startButton: objects.Button;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _startButtonClick():void {
      objects.Game.currentScene = config.Scene.PLAY;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._welcomeLabel = new objects.Label("Cyborg War", "60px", "bold", "#ffffff", 675, 240, true);
      this._startButton = new objects.Button(this.assetManager, "startButton", 675, 340);
      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      // add the welcome label to the scene
      this.addChild(this._welcomeLabel);

      // add the startButton to the scene
      this.addChild(this._startButton);

      this._startButton.on("click", this._startButtonClick);
    }
  }
}
