module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _ocean: objects.Ocean;
    private _plane: objects.Plane;
   
    private _clouds: objects.Cloud[];
    private _cloudNum: number;

    private _muteBtn: objects.Button;
    private _unmuteBtn: objects.Button;

    
    public _ninjaBGMSound: createjs.AbstractSoundInstance;
    
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }
   
   
    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._ocean = new objects.Ocean(this.assetManager);
      this._plane = new objects.Plane(this.assetManager);
     
      this._muteBtn = new objects.Button(this.assetManager,"muteBtn", 1300, 80);
      this._unmuteBtn = new objects.Button(this.assetManager,"unmuteBtn", 1300, 30);


      // instantiate the cloud array
      this._clouds = new Array<objects.Cloud>();
      this._cloudNum = 3;
      // loop and add each cloud to the array
      for (let count = 0; count < this._cloudNum; count++) {
        this._clouds[count] = new objects.Cloud(this.assetManager);
      }

      //loop sound of ninja
      this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
            this._ninjaBGMSound.loop = -1; // play forever
            this._ninjaBGMSound.volume = 0.1;
       
      this.Main();
    }
    // Private Methods
     private _muteBtnClick():void{
     
        createjs.Sound.stop();
      
      }
    private _unmuteBtnClick():void {
     
        this._ninjaBGMSound = createjs.Sound.play("ninjaBGM");
        this._ninjaBGMSound.loop = -1; // play forever
        this._ninjaBGMSound.volume = 0.1;
      
    }
      
      //this._ninjaBGMSound.volume = 0.0;
      //this._ninjaBGMSound.stop();
 


    public Update(): void {
      this._ocean.Update();
      this._plane.Update();
      
      this._clouds.forEach(cloud => {
        cloud.Update();
      });
    }

    // This is where the fun happens
    public Main(): void {

      // add the ocean to the scene
      this.addChild(this._ocean);

     

      // add the plane to the scene
      this.addChild(this._plane);

      // add clouds to the scene

      this._clouds.forEach(cloud => {
        this.addChild(cloud);
      });

      // add the muteBtn to the scene
      this.addChild(this._muteBtn);
      this._muteBtn.on("click", this._muteBtnClick);

      // add the unmuteBtn to the scene
      this.addChild(this._unmuteBtn);
      this._unmuteBtn.on("click", this._unmuteBtnClick);
    }
  }
}
