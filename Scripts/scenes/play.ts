module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _level1: objects.Level1;
    private _bullet: objects.Bullet;
    private _ninja: objects.Ninja;
    private _cyborg: objects.Cyborg[];
    private _cyborgNum: number;
    private _scoreBoard: managers.ScoreBoard;
    private _muteBtn: objects.Button;
    private _unmuteBtn: objects.Button;

    
    public _ninjaBGMSound: createjs.AbstractSoundInstance;
    
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }
   
   
    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      
      this._level1 = new objects.Level1(this.assetManager);
      this._ninja = new objects.Ninja(this.assetManager);
      this._bullet = new objects.Bullet(this.assetManager);

      this._muteBtn = new objects.Button(this.assetManager,"muteBtn", 1300, 80);
      this._unmuteBtn = new objects.Button(this.assetManager,"unmuteBtn", 1300, 30);


      // instantiate the cyborg array
      this._cyborg = new Array<objects.Cyborg>();
      this._cyborgNum = 5;
      // loop and add each cyborg to the array
      for (let count = 0; count < this._cyborgNum; count++) {
        this._cyborg[count] = new objects.Cyborg(this.assetManager);
      }

      //loop sound of ninja
      this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
            this._ninjaBGMSound.loop = -1; // play forever
            this._ninjaBGMSound.volume = 0.1;
       
       // create the scoreboard UI for the Scene
      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoard = this._scoreBoard;
      
      
      this.Main();
    }
    // Private Methods
     private _muteBtnClick():void{
     
        createjs.Sound.stop();
      
      }
    private _unmuteBtnClick():void {
     
        this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
        this._ninjaBGMSound.loop = -1; // play forever
        this._ninjaBGMSound.volume = 0.1;
      
    }
      
      //this._ninjaBGMSound.volume = 0.0;
      //this._ninjaBGMSound.stop();
 


    public Update(): void {
      this._level1.Update();
      this._ninja.Update();
      this._bullet.Update();

       this._cyborg.forEach(cyborg => {
        cyborg.Update();
        // check collision between plane and current cyborg
        managers.Collision.Check(cyborg,this._ninja);
        managers.Collision.CheckU(this._bullet, cyborg)
        
      });

      // if lives fall below zero switch scenes to the game over scene
      if(this._scoreBoard.Lives <= 0) {
        objects.Game.currentScene = config.Scene.OVER;
      }

    }

    // This is where the fun happens
    public Main(): void {

      // add the level1 to the scene
      this.addChild(this._level1);

      // add the bullet to the scene
      this.addChild(objects.Game.bullet);

      // add the plane to the scene
      this.addChild(this._ninja);

      // add cyborg to the scene
      this._cyborg.forEach(cyborg => {
        this.addChild(cyborg);
      });

       // add scoreboard labels to the scene
       this.addChild(this._scoreBoard.LivesLabel);
       this.addChild(this._scoreBoard.ScoreLabel);

      // add the muteBtn to the scene
      this.addChild(this._muteBtn);
      this._muteBtn.on("click", this._muteBtnClick);

      // add the unmuteBtn to the scene
      this.addChild(this._unmuteBtn);
      this._unmuteBtn.on("click", this._unmuteBtnClick);

      
    }
  }
}
