module scenes 
{
  export class PlayScene2 extends objects.Scene 
  {
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

    constructor(assetManager: createjs.LoadQueue) 
    {
      super(assetManager);
      this.Start();
    }

    public Start(): void 
    {
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

      this._cyborg = new Array<objects.Cyborg>();
      this._cyborgNum = 10;
      
      for (let count = 0; count < this._cyborgNum; count++) 
      {
        this._cyborg[count] = new objects.Cyborg(this.assetManager);
      }

      for (let count = 0; count < this._cyborgNum +5; count++) 
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
      this._level2.Update();
      this._level3.Update();
      this._ninja.Update();
      this._bullet.Update();
      this._bullet.x++;
      this._sushi.Update();
      this._specialTimer++;
      managers.Collision.Check(this._ninja, this._sushi);
      managers.Collision.CurrentScore -= 1;

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

       else if (objects.Game.keyboardManager.jump) 
       {
        createjs.Tween.get(this._special).to({alpha:0.1},9000).to({alpha:1});

       }           

      if (this._bullet.x > 1200 )
      {
        this._bullet.x = this._ninja.x;
        this._bullet.y = this._ninja.y;
      } 

      this._cyborg.forEach(cyborg => 
        {

        cyborg.Update();

        if (this._ninja.alpha != 0.2 ) 
        { 
          managers.Collision.Check(this._ninja ,cyborg );
        }
          managers.Collision.Check(cyborg ,this._bullet );
          
          if (cyborg.x < 0)
          {
             cyborg.x = 1300
              
          }
});

      this._cyborgbullet.forEach(_cyborgbullet => 
    { 
         if (this._scoreBoard.Time > 70 && this._scoreBoard.Time < 110)
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
        this._muteBtnClick(); 
        objects.Game.currentScene = config.Scene.OVER;
      }

      if(this._scoreBoard.Score >=  250) 
      {
        this._ninjaBGMSound.stop();
        this.removeChild()
         objects.Game.currentScene = config.Scene.PLAY3;
         
      } 

    }

    public Main(): void 
    {
      
      this.addChild(this._level2);
      this.addChild(this._bullet);
      this.addChild(this._ninja);

      this._cyborg.forEach(cyborg => {
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
