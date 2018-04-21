module scenes {
  export class PlayScene2 extends objects.Scene {
    // Private Instance Variables
    private _level2: objects.Level2;
    private _level3: objects.Level3;

    private _bullet: objects.Bullet;
    private _ninja: objects.Ninja;
    private _cyborg: objects.Cyborg[];
    private _cyborgNum: number;
    private _scoreBoard: managers.ScoreBoard;
    private _sushi: objects.Sushi;


    private _special: objects.Button;
    private _specialTimer:number = 0;

    private _muteBtn: objects.Button;
    private _unmuteBtn: objects.Button;
  
    private _cyborgbullet: objects.cyborgbullet[];
    
    public _ninjaBGMSound: createjs.AbstractSoundInstance;

    // Public Properties
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods


    // Public Methods
    // Initialize Game Variables and objects
    public Start(): void {
      this._level2 = new objects.Level2(this.assetManager);
      this._level3 = new objects.Level3(this.assetManager);

      this._ninja = new objects.Ninja(this.assetManager);
      this._sushi = new objects.Sushi(this.assetManager);

      this._cyborgbullet = new Array<objects.cyborgbullet>();

     this._bullet = new objects.Bullet(this.assetManager);

     this._special = new objects.Button(this.assetManager,"ghost", 1300, 420);

     this._muteBtn = new objects.Button(this.assetManager,"muteBtn", 1300, 80);
     this._unmuteBtn = new objects.Button(this.assetManager,"unmuteBtn", 1300, 30);
   
    

    console.log(PlayScene.soundOn)



      // instantiate the cyborg array
      this._cyborg = new Array<objects.Cyborg>();
      this._cyborgNum = 15;
      // loop and add each cyborg to the array
      for (let count = 0; count < this._cyborgNum+5; count++) {
        this._cyborg[count] = new objects.Cyborg(this.assetManager);
      }

      for (let count = 0; count < this._cyborgNum; count++) 
      {
      this._cyborgbullet[count] = new objects.cyborgbullet(this.assetManager);
      }

      this._ninjaBGMSound = createjs.Sound.play("engine");
      this._ninjaBGMSound.loop = -1; // play forever
      this._ninjaBGMSound.volume = 0.3;

      // create the scoreboard UI for the Scene
      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoard = this._scoreBoard;

      this.Main();
    }

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

    // triggered every frame
    public Update(): void {
      this._level2.Update();
      this._level3.Update();

      this._ninja.Update();
      this._bullet.Update();
      this._bullet.x++;
      this._sushi.Update();

      this._specialTimer++;
      managers.Collision.Check(this._ninja, this._sushi);
      if (objects.Game.keyboardManager.escape){
        console.log("clicked");
        PlayScene.count += 1;  
        this._muteBtnClick();
       
       }

       else if (objects.Game.keyboardManager.shift){
         this._unmuteBtnClick();
       }

      if (this._bullet.x > 1500 ){
        
        this._bullet.x = this._ninja.x;
        this._bullet.y = this._ninja.y;
        
        
      } 
      
  
      // check collision between plane and island
    //  managers.Collision.Check(this.plane, this.island);
      this._cyborg.forEach(cyborg => {
        cyborg.Update();
        // check collision between plane and current cyborg
        if (this._ninja.alpha != 0.2 ) { 
          managers.Collision.Check(this._ninja ,cyborg );
          }
          else if (objects.Game.keyboardManager.jump) {
            createjs.Tween.get(this._special).to({alpha:0.1},9000).to({alpha:1});
    
          }           

    
          managers.Collision.Check(cyborg ,this._bullet );
          if (cyborg.x < 0){
             cyborg.x = 1300
              
            }

             //Manages Collisions for the cyborgbullets

    this._cyborgbullet.forEach(_cyborgbullet => {
      _cyborgbullet.Update();
      managers.Collision.Check(this._ninja, _cyborgbullet);
  
        
     if(_cyborgbullet.x < 0 )
       {
       _cyborgbullet.Reset();
       }
     });
        
      });



      // if lives fall below zero switch scenes to the game over scene
      if(this._scoreBoard.Lives <= 0) {
        this._muteBtnClick(); 
        objects.Game.currentScene = config.Scene.OVER;
      }


      if(this._scoreBoard.Score >= 1000) {
        
        this._ninjaBGMSound.stop();
        this.removeChild()
         objects.Game.currentScene = config.Scene.PLAY3;
         objects.Game.store = this._scoreBoard.Score;
      }

    }

    


    // This is where the fun happens
    public Main(): void {
      // add the ocean to the scene
      this.addChild(this._level2);


      // add the bullet to the scene
   
      this.addChild(this._bullet);
  
  
     

      // add the ninja to the scene
      this.addChild(this._ninja);


      // add cyborg to the scene
      this._cyborg.forEach(cyborg => {
        this.addChild(cyborg);
      });

      this._cyborgbullet.forEach(_cyborgbullet => {
        this.addChild(_cyborgbullet);

      });

      // add scoreboard labels to the scene
      this.addChild(this._scoreBoard.LivesLabel);
      this.addChild(this._scoreBoard.ScoreLabel);
      this.addChild(this._scoreBoard.TimeLabel);

    
    // add the muteBtn to the scene
    this.addChild(this._muteBtn); this._unmuteBtn.on("click", this._unmuteBtnClick);
  
    // add the unmuteBtn to the scene
    this.addChild(this._unmuteBtn);  this._muteBtn.on("click", this._muteBtnClick);

  this.addChild(this._special);

   
      this.addChild(this._sushi);

      
    }
  }
}