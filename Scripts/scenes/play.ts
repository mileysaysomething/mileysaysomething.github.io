module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _level1: objects.Level1;
    private _level2: objects.Level2;

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
      this._level2 = new objects.Level2(this.assetManager);

      this._ninja = new objects.Ninja(this.assetManager);
      this._bullet = new objects.Bullet(this.assetManager);

      this._muteBtn = new objects.Button(this.assetManager,"muteBtn", 1300, 80);
      this._unmuteBtn = new objects.Button(this.assetManager,"unmuteBtn", 1300, 30);


      // instantiate the cyborg array
      this._cyborg = new Array<objects.Cyborg>();
      this._cyborgNum = 20;
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
    
    private changescene():void{
      if(this._scoreBoard.Score > 4000) {  

        objects.Game.currentScene = config.Scene.START;

      } 
      
    }
      //this._ninjaBGMSound.volume = 0.0;
      //this._ninjaBGMSound.stop();
 


    public Update(): void {
      this._level1.Update();
      this._level2.Update();

      this._ninja.Update();
      this._bullet.Update();
      this._bullet.x++;
      if (this._bullet.x > 1000 ){
        
        this._bullet.x = this._ninja.x;
        this._bullet.y = this._ninja.y;
        
        
      } 
      
      // check collision between plane and island
    //  managers.Collision.Check(this.plane, this.island);
    this._cyborg.forEach(cyborg => {
      cyborg.Update();
      // check collision between plane and current cyborg
      managers.Collision.Check(this._ninja ,cyborg );
          managers.Collision.Check(cyborg ,this._bullet );
          if (cyborg.x < 0){
              cyborg.x = 1300
              
          }
        




      
    });


      // if lives fall below zero switch scenes to the game over scene
      if(this._scoreBoard.Lives <= 0) {
        objects.Game.currentScene = config.Scene.OVER;
      }

      if(this._scoreBoard.Score > 4000) {  

        objects.Game.currentScene = config.Scene.START;

      } 

      if(this._scoreBoard.Score >= 100) {
        
        this._ninjaBGMSound.stop();
        this.removeChild()
         objects.Game.currentScene = config.Scene.PLAY2;
      }



    }

    // This is where the fun happens
    public Main(): void {

      // add the level1 to the scene
      this.addChild(this._level1);

      // add the bullet to the scene
      this.addChild(this._bullet);

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
