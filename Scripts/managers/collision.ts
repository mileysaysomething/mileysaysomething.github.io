module managers {
    let count:number = 5;
  
    export class Collision {
  
    
      public static Check(object1: any , object2: any) {
        // create two vec2 objects
        let P1: math.Vec2 = new math.Vec2(object1.x, object1.y);
        let P2: math.Vec2 = new math.Vec2(object2.x, object2.y);
  
        if(math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
          if(!object2.isColliding) {
            object2.isColliding = true;
            switch(object2.name) {
              case "cyborg":
              console.log("collided");
                if(objects.Game.HighScore <= objects.Game.scoreBoard.Score) {
                  objects.Game.scoreBoard.HighScore = objects.Game.scoreBoard.Score;
                  objects.Game.HighScore = objects.Game.scoreBoard.HighScore;
                }
              break;
              case "ninja":
                createjs.Sound.play("thunder");
                objects.Game.scoreBoard.Lives -=1 ;
                console.log("ninja hit");
              break;
              
                      
            }
          }
        }
        else {
          object2.isColliding = false;
          count++;
          if(count % 100 === 0 ){
            objects.Game.scoreBoard.Score += 1;
  
          }
          
  
        }}
  
  
  
        public static CheckU(object1:any, object2:any) {
          // create two vec2 objects
          let P1: math.Vec2 = new math.Vec2(object1.x, object1.y);
          let P2: math.Vec2 = new math.Vec2(object2.x, object2.y);  
          
          if (object1.x == object2.x + object1.y){
            console.log("bullet collision!")
          }
            
        // The objects are t look into https://gamedev.stackexchange.com/questions/128675/how-to-detect-collisions-of-objects-in-two-different-arrayshtml-canvas
                   
  
      }
  
  
  
    }
  }
  