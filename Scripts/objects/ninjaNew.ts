module objects {
    var shape: createjs.Shape;
    let bulletList = {};
    let bulletShape: objects.Bullet;
  
  
    export class NinjaNew extends objects.GameObject {
      // private instance letiables
      private frameCount: number = 0;
      private _special: objects.Button;
      private _activeSpecial: boolean = false;
      private _specialTimer:number = 0;
      
  
      // public properties
      // Constructor
      constructor(assetManager: createjs.LoadQueue) {
      
        super(assetManager, "ninjaNew");
        
        this.Start();
      }
  
      // private methods
      // public methods
      // Initializes letiables and creates new objects
      public Start(): void {
        this.y = 200;
        this.x = 200
  
      }
  
     // updates the game object every frame
      public Update(): void {
       //Waiting for user to press Space until continue count
        if (this._specialTimer % 500 == 0 && !objects.Game.keyboardManager.jump){
          this._specialTimer += 0;
        }
        else{
          this._specialTimer += 0.5
        }
        this.Move();
        this.CheckBounds();
        this._Special();
        //this.alpha = 0;
       
      }
  
      public _Special():void{
        //When both true, play this tween otherwise all false
        if (objects.Game.keyboardManager.jump  && this._activeSpecial == true)
      {
  
          createjs.Tween.get(this).to({alpha:0.2}).wait(9000).to({alpha:1});
          //this.onsubmit(objects.Game.keyboardManager.jump);
          console.log("first press");
        } 
        else{
          this._activeSpecial = false;
          this._resetSpecial();
          
        }            
       
      }
  
      private _resetSpecial()
      {   
        console.log (this._specialTimer);
  
        if(this._specialTimer % 500  === 0
        ){ this._activeSpecial = true; 
        }  
        
  
  }
    
  
      public Move(): void {
  
        // mouse controls
        //  this.x = objects.Game.stage.mouseX;      
        // this.y = objects.Game.stage.mouseY;
              // level 2 - 3 this.setTransform(this.x,this.y,this.scaleX,this.scaleY, 180,0,0)
         
        // keyboard controls
        if (objects.Game.keyboardManager.moveLeft) {
  
          this.x -= 3;
  
        }
        
  
        if (objects.Game.keyboardManager.moveRight) {
          this.x += 3;
        }
  
        if (objects.Game.keyboardManager.moveForward) {
          this.y -= 7;
        }
  
        if (objects.Game.keyboardManager.moveBackward) {
          this.y += 7;
        }
        
  
  
      }
     
  
      public CheckBounds(): void {
        // right boundary
        if (this.x >= 1350 - this.halfWidth) {
          this.x = 1350 - this.halfWidth;
        }
  
        // left boundary
        if (this.x <= 150 - this.halfWidth) {
          this.x = 150 - this.halfWidth;
        }
        //down boundary
        if (this.y >= 510 - this.halfWidth) {
          // console.log(this.y);
          this.y = 510 - this.halfWidth;
        }
  
        if (this.y <= 105 - this.halfWidth) {
          // console.log(this.y);
          this.y = 105 - this.halfWidth;
        }
  
      }
    }
  }