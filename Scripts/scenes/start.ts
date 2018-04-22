module scenes {
  export class StartScene extends objects.Scene {
    // Private Instance Variables
    private _welcomeLabel: objects.Label;
    private _startButton: objects.Button;
   private _instructionBtn: objects.Button;
   
    // Public Properties
    public _coverImg;
    public _sparkle;

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _startButtonClick():void {
      objects.Game.currentScene = config.Scene.PLAY;
    }
    private _instructionBtnClick():void {
      objects.Game.currentScene = config.Scene.TUTORIALS;
    }

    
    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._coverImg = new createjs.Bitmap("./Assets/images/cover2.png");
      this._welcomeLabel = new objects.Label("Cyborg War", "60px", "Pressstart2p", "#ffffff", 530, 100, true);
      this._startButton = new objects.Button(this.assetManager, "startButton", 675, 340);
     this._instructionBtn = new objects.Button(this.assetManager, "instructionBtn", 675, 420);
     // this._sparkle = new createjs.Bitmap("./Assets/images/sparkle.gif");
      
     
     this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {

       // add the coverImg to the scene
      this.addChild(this._coverImg);

      // add the welcome label to the scene
      this.addChild(this._welcomeLabel);
     
      // add the sparkle to the scene
      //this.addChild(this._sparkle);


      // add the startButton to the scene
      this.addChild(this._startButton);

      this._startButton.on("click", this._startButtonClick);

       // add the instructionButton to the scene
       this.addChild(this._instructionBtn);
       this._instructionBtn.on("click", this._instructionBtnClick);
 
      

     
    }
  }
}
