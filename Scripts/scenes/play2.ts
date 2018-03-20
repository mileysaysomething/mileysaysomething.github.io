module scenes {
    export class PlayScene2 extends objects.Scene {
      // Private Instance Variables
      private _level2: objects.Level2;
  
      private _bullet: objects.Bullet;
      private _ninja: objects.Ninja;
      private _cyborg: objects.Cyborg[];
      private _cyborgNum: number;
      private _scoreBoard: managers.ScoreBoard;
  
      private _engineSound: createjs.AbstractSoundInstance;
  
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
  
        this._ninja = new objects.Ninja(this.assetManager);
       this._bullet = new objects.Bullet(this.assetManager);
  
      
  
  
        // instantiate the cyborg array
        this._cyborg = new Array<objects.Cyborg>();
        this._cyborgNum = 20;
        // loop and add each cyborg to the array
        for (let count = 0; count < this._cyborgNum; count++) {
          this._cyborg[count] = new objects.Cyborg(this.assetManager);
        }
  
        this._engineSound = createjs.Sound.play("engine");
        this._engineSound.loop = -1; // play forever
        this._engineSound.volume = 0.3;
  
        // create the scoreboard UI for the Scene
        this._scoreBoard = new managers.ScoreBoard();
        objects.Game.scoreBoard = this._scoreBoard;
  
        this.Main();
      }
  
      // triggered every frame
      public Update(): void {
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
          this._engineSound.stop();
          objects.Game.currentScene = config.Scene.OVER;
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
  
        // add scoreboard labels to the scene
        this.addChild(this._scoreBoard.LivesLabel);
        this.addChild(this._scoreBoard.ScoreLabel);
      }
    }
  }
  