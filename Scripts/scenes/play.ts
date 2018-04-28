module scenes 
{
  export class PlayScene extends objects.Scene 
  {
    private _level1: objects.Level1;
    private _level2: objects.Level2;
    private _bullet: objects.Bullet;
    private _ninja: objects.Ninja;
    private _cyborg: objects.Cyborg[];
    private _cyborgNum: number;
    private _scoreBoard: managers.ScoreBoard;
    private _sushi: objects.Sushi;
    public static soundOn:boolean = true;
    public static count:number = 0;
    private _special: objects.Button;
    private _muteBtn: objects.Button;
    private _unmuteBtn: objects.Button;
    private _specialTimer:number = 0;
    public _ninjaBGMSound: createjs.AbstractSoundInstance;
    private _cyborgbullet: objects.cyborgbullet[];

    constructor(assetManager: createjs.LoadQueue) 
    {
      super(assetManager);

      this.Start();
    }
   
    public Start(): void 
    {
      
      this._level1 = new objects.Level1(this.assetManager);
      this._level2 = new objects.Level2(this.assetManager);
      this._ninja = new objects.Ninja(this.assetManager);
      this._cyborgbullet = new Array<objects.cyborgbullet>();
      this._bullet = new objects.Bullet(this.assetManager);
      this._sushi = new objects.Sushi(this.assetManager);
      this._special = new objects.Button(this.assetManager,"ghost", 1300, 420);
      this._muteBtn = new objects.Button(this.assetManager,"muteBtn", 1300, 80);
      this._unmuteBtn = new objects.Button(this.assetManager,"unmuteBtn", 1300, 30);
      this._cyborg = new Array<objects.Cyborg>();
      this._cyborgNum = 10;
      
      for (let count = 0; count < this._cyborgNum; count++) 
      {
        this._cyborg[count] = new objects.Cyborg(this.assetManager);
      }

      for (let count = 0; count < this._cyborgNum + 5; count++) 
      {
        this._cyborgbullet[count] = new objects.cyborgbullet(this.assetManager);
      } 
 
      this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
      this._ninjaBGMSound.loop = -1; 
      this._ninjaBGMSound.volume = 0.1;
      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoard = this._scoreBoard;
      this.Main();
    }

     
      private _muteBtnClick():void
      {
      
      PlayScene.soundOn = false;
      createjs.Sound.stop();
      console.log(PlayScene.soundOn)
      }
    
      private _unmuteBtnClick():void 
      {
        this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
        this._ninjaBGMSound.loop = -1; // play forever
        this._ninjaBGMSound.volume = 0.1;
        PlayScene.soundOn = true; 
        console.log(PlayScene.soundOn)  
      }
    
    public Update(): void 
    {   
      this._level1.Update();
      this._level2.Update();
      this._ninja.Update();
      this._bullet.Update(); 
      this._bullet.x++;
      this._specialTimer++;
      this._sushi.Update();

      managers.Collision.Check(this._ninja, this._sushi)

      if(objects.Game.keyboardManager.escape)
       {
        console.log("clicked");
        PlayScene.count += 1;  
        this._muteBtnClick();
       }

       else if (objects.Game.keyboardManager.shift)
       {
         this._unmuteBtnClick();
       }

       else if (objects.Game.keyboardManager.jump) 
       {
        createjs.Tween.get(this._special).to({alpha:0.1},9000).to({alpha:1});
       }     
             
      if (this._bullet.x > 1000 )
      {
        
        this._bullet.x = this._ninja.x;
        this._bullet.y = this._ninja.y; 
        
      } 

      this._cyborg.forEach(cyborg =>       
      {

      cyborg.Update();

      if (this._ninja.alpha != 0.2 ) 
      { 
        managers.Collision.Check(cyborg, this._ninja);
      }
     
     managers.Collision.Check(cyborg ,this._bullet);

          if (cyborg.x < 0)
          {
             cyborg.x = 1300
          }                 
    });

    this._cyborgbullet.forEach(_cyborgbullet => 
      {  
        if (this._scoreBoard.Time > 30 && this._scoreBoard.Time < 50)
        {
          _cyborgbullet.alpha = 1;        
          _cyborgbullet.Update();    

          if (this._ninja.alpha != 0.2 )
         { 
            managers.Collision.Check(this._ninja , _cyborgbullet);
         }
      }

    else
    {
      _cyborgbullet.alpha = 0;
    }
  });
 
      if(this._scoreBoard.Lives <= 0) 
      {
        objects.Game.currentScene = config.Scene.OVER;
        this._muteBtnClick(); 
      }

      if(this._scoreBoard.Score >= 100  ) 
      {  
        this._ninjaBGMSound.stop();
        this.removeChild();
         objects.Game.currentScene = config.Scene.PLAY2;
         objects.Game.store = this._scoreBoard.Score; 
      }
    }

    
    public Main(): void 
    {   
      this.addChild(this._level1)
      this.addChild(this._bullet);
      this.addChild(this._ninja);

      this._cyborg.forEach(cyborg => 
      {
        this.addChild(cyborg);
      });

      this._cyborgbullet.forEach(_cyborgbullet => 
      {
        this.addChild(_cyborgbullet);
      });

       this.addChild(this._scoreBoard.LivesLabel);
       this.addChild(this._scoreBoard.ScoreLabel);
       this.addChild(this._scoreBoard.TimeLabel);
       this.addChild(this._muteBtn); this._unmuteBtn.on("click", this._unmuteBtnClick);
       this.addChild(this._unmuteBtn);  this._muteBtn.on("click", this._muteBtnClick);
       this.addChild(this._sushi);
       this.addChild(this._special);
    }
  }
}
