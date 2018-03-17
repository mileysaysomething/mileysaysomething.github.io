module objects {
  export class GameObject extends createjs.Bitmap {
    // private instance variables
    protected _dx: number;
    protected _dy: number;

    // public properties
    public width: number;
    public height: number;
    public halfWidth: number;
    public halfHeight: number;
    public isColliding: boolean; //added & referenced

    // constructors
    constructor(assetManager: createjs.LoadQueue, imageString:string) {
      super(assetManager.getResult(imageString));
      this.name = imageString;
      this._initialize();
  }
    // private methods
    private _initialize():void {
      this.width = this.getBounds().width;
      this.height = this.getBounds().height;
      this.halfWidth = this.width * 0.5;
      this.halfHeight = this.height * 0.5;
      this.isColliding = false;

      this.regX = this.width;
      this.regY = this.height;
    }

    // public methods
    public Start(): void {

    }

    public Update(): void {

    }

    public Reset():void {

    }

    public CheckBounds():void {

    }

    public Move():void {

    }
  }
}