
module objects {
  var shape:createjs.Shape;
  let bulletList = {};

  export class Plane extends objects.GameObject {
    // private instance letiables
   private frameCount:number = 0;
   
    
    // public properties
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "plane");
    
      this.Start();
    }

    // private methods
    // public methods
    // Initializes letiables and creates new objects
    public Start():void {
      this.y = 200;
    
    }




    public static Bullet (id,x,y,spdX,spdY,width,height){
      var asd = {
        x:x,
        spdX:spdX,
        y:y,
        spdY:spdY,
        name:'E',
        id:id,
        width:width,
        height:height,
        color:'black',
            
      };
      bulletList[id] = asd;
    }
    
    
    randomlyGenerateBullet = function(){
      //Math.random() returns a number between 0 and 1
      var x = this.x;
      var y = this.y;
      var height = 10;
      var width = 10;
      var id = Math.random();
      
      var angle = 360;
      var spdX = Math.cos(angle/180*Math.PI)*5;
      var spdY = Math.sin(angle/180*Math.PI)*5;
      Plane.Bullet(id,x,y,spdX,spdY,width,height);
    }

    public updateEntityBullet (something){
      this.drawEntity(something);
      this.updateEntityBulletPosition(something);

    }

    updateEntityBulletPosition = function(something){
      something.x += something.spdX * 5;
      something.y += something.spdY * 5;
    }

    public drawEntity(something){

 

       let graphics = new createjs.Graphics().beginFill("red").drawRect(something.x-something.width/2,something.y-something.height/2,something.width,something.height);
       shape = new createjs.Shape(graphics);
      objects.Game.stage.addChild(shape);
      }
      
    

    
   

    
    // updates the game object every frame
    public Update():void {
    
      objects.Game.stage.removeChild(shape);


      this.Move();
      this.CheckBounds();

      this.frameCount = this.frameCount + 1;
      
      
      if(this.frameCount % 25 ===  0){
        this.randomlyGenerateBullet();
                
      }	//every 1 sec
     
      if(this.frameCount % 50 ===  0){
        
        this.Reset();                
      
      }	//every 1 sec
     
        
            
    
      
      for(var key in bulletList){
        this.updateEntityBullet(bulletList[key]);

      }

    
      
      
    }
    


    // reset the objects location to some value
    public Reset():void {
      for (var key in bulletList){
        delete bulletList[key];
      }
    }

    // move the object to some new location
    //create a class that only moves bullets
    

    public Move():void {
      //  this.x = objects.Game.stage.mouseX;      
       // this.y = objects.Game.stage.mouseY;
  
       
        // mouse controls
        // this.x = objects.Game.stage.mouseX;
        // keyboard controls
        if(objects.Game.keyboardManager.moveLeft) {
          this.x -= 5;
        }
   
        if(objects.Game.keyboardManager.moveRight) {
          this.x += 5;
        }
   
        if(objects.Game.keyboardManager.moveForward) {
          this.y -= 5;
        }
   
        if(objects.Game.keyboardManager.moveBackward) {
          this.y += 5;
        }
   

       }
    
    
    // check to see if some boundary has been passed
    public CheckBounds():void {
      // right boundary
      if(this.x >= 1350 - this.halfWidth) {
        this.x = 1350 - this.halfWidth;
      }

      // left boundary
      if(this.x <= 150 - this.halfWidth) {
        this.x = 150 - this.halfWidth;
      }
      //down boundary
      if (this. y >= 510 - this.halfWidth){
       // console.log(this.y);
        this.y = 510 - this.halfWidth;
      }

      if (this. y <= 105 - this.halfWidth){
        // console.log(this.y);
         this.y = 105 - this.halfWidth;
       }
     
    }
  }
}