module scenes 
{
  export class PlayScene3 extends objects.Scene 
  {
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

    constructor(assetManager: createjs.LoadQueue) 
    {
      super(assetManager);

      this.Start();
    }

    public Start(): void 
    {
      this._level3 = new objects.Level3(this.assetManager);
      this._ninja = new objects.Ninja(this.assetManager);
      this._sushi = new objects.Sushi(this.assetManager);
      this._bullet = new objects.Bullet(this.assetManager);
      this._special = new objects.Button(this.assetManager,"ghost", 1300, 420);
      this._muteBtn = new objects.Button(this.assetManager,"muteBtn", 1300, 80);
      this._unmuteBtn = new objects.Button(this.assetManager,"unmuteBtn", 1300, 30);
      this._cyborgbullet = new Array<objects.cyborgbullet>();

      console.log(PlayScene.soundOn)

      this._cyborg = new Array<objects.Cyborg>();
      this._cyborgNum =0;

      for (let count = 0; count < this._cyborgNum+15; count++) 
      {
        this._cyborg[count] = new objects.Cyborg(this.assetManager);
      } 

      for (let count = 0; count < this._cyborgNum + 35; count++) 
      {
      this._cyborgbullet[count] = new objects.cyborgbullet(this.assetManager);
      }

      this._ninjaBGMSound = createjs.Sound.play("engine");
      this._ninjaBGMSound.loop = -1; 
      this._ninjaBGMSound.volume = 0.3;
      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoard = this._scoreBoard;

      this.Main();
    }

    private _muteBtnClick():void
    {
      createjs.Sound.stop();
    }
   
    private _unmuteBtnClick():void 
    {
      this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
      this._ninjaBGMSound.loop = -1; 
      this._ninjaBGMSound.volume = 0.1;
    }

    
    public Update(): void 
    {
      this._level3.Update();
      this._ninja.Update();
      this._bullet.Update();
      this._bullet.x++;
      this._sushi.Update();
      this._specialTimer++;

      managers.Collision.Check(this._ninja, this._sushi);

      if (objects.Game.keyboardManager.escape)
      {
        console.log("clicked");
        PlayScene.count += 1;  
        this._muteBtnClick();
       }

      if (objects.Game.keyboardManager.escape)
      {
        console.log("clicked");
        PlayScene.count += 1;  
        this._muteBtnClick();
       
      }

       else if (objects.Game.keyboardManager.shift)
       {
         this._unmuteBtnClick();
       }

      if (this._bullet.x > 1000 )
      {  
        this._bullet.x = this._ninja.x;
        this._bullet.y = this._ninja.y;
      } 
      
   this._cyborgbullet.forEach(_cyborgbullet => 
    {
    _cyborgbullet.Update();
    
    if (this._scoreBoard.Time > 110 && this._scoreBoard.Time < 120)
    {
      _cyborgbullet.alpha = 1;  
            
    if (this._ninja.alpha != 0.2 ) 
    { 
          managers.Collision.Check(this._ninja , _cyborgbullet);
    }
  }

     else
    {
     _cyborgbullet.alpha = 0;
    }

     if(_cyborgbullet.x < 0 )
    {
     _cyborgbullet.Reset();
    }
  
   }
);
      
      this._cyborg.forEach(cyborg => 
    {
      cyborg.Update();

      if (this._scoreBoard.Time > 110 && this._scoreBoard.Time < 120 )
    {
      cyborg.alpha = 0;
    }
       
    else {
        
      if (this._ninja.alpha != 0.2 ) 
      { 
        cyborg.alpha = 1;
        cyborg.x--;
        managers.Collision.Check(this._ninja ,cyborg );
      }

      else if (objects.Game.keyboardManager.jump) 
      {
        createjs.Tween.get(this._special).to({alpha:0.1},9000).to({alpha:1});
      }           
      
      if (cyborg.x < 0)
      {
        cyborg.x = 1300
      }
        
      managers.Collision.Check(cyborg ,this._bullet );
      }
   }
);
      if(this._scoreBoard.Lives <= 0) 
      {
        this._muteBtnClick(); 
        objects.Game.currentScene = config.Scene.OVER;
      }

      if(this._scoreBoard.Score >= 300) 
      {
        this._muteBtnClick(); 
        objects.Game.currentScene = config.Scene.WIN;
      }

    }

    public Main(): void 
    {
      this.addChild(this._level3);
      this.addChild(this._bullet);
      this.addChild(this._ninja);

      this._cyborg.forEach(cyborg => 
      {
        this.addChild(cyborg);
      }
);
      this._cyborgbullet.forEach(_cyborgbullet => 
        {
        this.addChild(_cyborgbullet);

        }
);
      this.addChild(this._scoreBoard.LivesLabel);
      this.addChild(this._scoreBoard.ScoreLabel);
      this.addChild(this._scoreBoard.TimeLabel);
      this.addChild(this._muteBtn); this._unmuteBtn.on("click", this._unmuteBtnClick);
      this.addChild(this._unmuteBtn);  this._muteBtn.on("click", this._muteBtnClick);
      this.addChild(this._special);
      this.addChild(this._sushi);
    }
  }
}