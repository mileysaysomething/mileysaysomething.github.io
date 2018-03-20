module objects {
  var shape: createjs.Shape;
  let bulletList = {};
  let bulletShape: objects.Bullet;


  export class Ninja extends objects.GameObject {
    // private instance letiables
    private frameCount: number = 0;
    

    // public properties
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "ninja");
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

      this.Move();
      this.CheckBounds();

     
    }


    // reset the objects location to some value
    public Reset(): void {
      
      
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


    // check to see if some boundary has been passed
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