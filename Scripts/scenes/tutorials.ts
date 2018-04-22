module scenes {
  export class TutorialsScene extends objects.Scene {
    // Private Instance Variables
    private _welcomeLabel: objects.Label;
    private _homeButton: objects.Button;
   // private _instructionBtn: objects.Button;
   
    // Public Properties
    public _tutorials;

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _homeButtonClick():void {
      objects.Game.currentScene = config.Scene.START;
    }
    //private _instructionBtnClick():void {
      //objects.Game.currentScene = config.Scene.PLAY;
    //}

    
    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._tutorials = new createjs.Bitmap("./Assets/images/ins.png");
      
      this._homeButton = new objects.Button(this.assetManager, "homeButton", 675, 430);
     // this._instructionBtn = new objects.Button(this.assetManager, "instructionBtn", 675, 420);
     // this._sparkle = new createjs.Bitmap("./Assets/images/sparkle.gif");
      
     
     this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {

       // add the coverImg to the scene
      this.addChild(this._tutorials);

      // add the welcome label to the scene
      this.addChild(this._welcomeLabel);
     
      // add the sparkle to the scene
      //this.addChild(this._sparkle);


      // add the startButton to the scene
      this.addChild(this._homeButton);

      this._homeButton.on("click", this._homeButtonClick);

       

     
    }
  }
}
