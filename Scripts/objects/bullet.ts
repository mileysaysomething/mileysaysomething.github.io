module objects {
  let shape:createjs.Shape;
  let bulletList = {};

  export class Bullet extends GameObject {
    // private instance letiables
   private frameCount:number = 0;
   private deleter:number = 5;
   private _nextX:number;
   private ninja_pos = 0;
   public radius = 10;
  
 
    // public properties
    get nextX():number {
      return this._nextX;
    }
    set nextX(finalNumber:number) { 
      this._nextX = finalNumber;
      
    }

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "bullet");
      this.Start();
    }


    // private methods
    // public methods
    // Initializes letiables and creates new objects
    public Start():void {   
      this.y = 300; 
      this.x = 180;
    }
    public static Bullet (id,x,y,spdX,spdY){
      let asd = {
        x:x,
        y:y,
        spdX:spdX,
        spdY:spdY
        };
      bulletList[id] = asd;    
    
    }   
    //Create Standard list
    
    randomlyGenerateBullet = function(){
      //Math.random() returns a number between 0 and 1
      let x = this.x + 30;
      let y = this.y;
      let id = Math.random();
      
      let angle = 360;
      let spdX = Math.cos(angle/180*Math.PI)*5;
      let spdY = Math.sin(angle/180*Math.PI)*5;
      Bullet.Bullet(id,x,y,spdX,spdY);
    
    }
    //Specifications of my Bullet - will be placed at that x, and y positio
  
   public updateEntityBulletPosition = function(bulletObj){
      bulletObj.x += bulletObj.spdX * 20
      bulletObj.y += bulletObj.spdY * 20;
      
      this.x = bulletObj.x;
      this.y = bulletObj.y;
     // console.log(this._nextX);     
    }
    

      public updateEntityBullet (bulletObj){
        this.updateEntityBulletPosition(bulletObj);
      }
  

    
    // updates the game object every frame
    public Update():void {
     this.Move();
       this.frameCount = this.frameCount + 1;     
      
       if(this.frameCount % 2 ===  0){
         this.randomlyGenerateBullet();
                
      }	
      if(this.frameCount % 25 ===  0){
        this.Reset();
               
     }	//every 1 sec
    
      //every 1 sec
     
     //every 1 sec
      for(let key in bulletList){
        this.updateEntityBullet(bulletList[key]); 
        this.x = bulletList[key].x;
        
          //    if (this.x >= 1300 ){
   //     this.x -= bulletList[key].x;        
    //  }   
      //  console.log("final position", Math.max(this.x)); works why??

      }
      
          
    }

    // reset the objects location to some value
    public Reset():void {
      for (let key in bulletList){

        delete bulletList[key];

      }
    }

    // move the object to some new location
    //create a class that only moves bullets
    public Move():void {
          // keyboard controls
        
        

       }
    
    
    // check to see if some boundary has been passed
    
     
    
  }
}