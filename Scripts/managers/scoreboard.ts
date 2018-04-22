module managers {
  export class ScoreBoard {
    
    // private instance variables
    private _lives:number;
    private _score:number;
    private _time:number;
    private _level:number;
    private _highScore:number;

    // public Instance variables
    public LivesLabel: objects.Label;
    public ScoreLabel: objects.Label;
    public TimeLabel: objects.Label;
    public LevelLabel: objects.Label;
    public HighScoreLabel: objects.Label;

    // public properties
    get Lives():number {
      return this._lives;
    }


    set Lives(newLives:number) {
      this._lives = newLives;
      this.LivesLabel.text = "Lives: " + this._lives;
    }

   

    get Time():number {
      return this._time;
    }

    set Time(newTime:number) {
      this._time = newTime;
      this.TimeLabel.text = "Time: " + this._time;
    }


    get Score():number {
      return this._score;
    }

    set Score(newScore:number) {
      this._score = newScore;
      this.ScoreLabel.text = "Score: " + this._score;
    }

    get HighScore():number {
      return this._highScore;
    }

    set HighScore(newHighScore:number) {
      this._highScore = newHighScore;
      this.HighScoreLabel.text = "High Score: " + this._highScore;
    }

    // constructors
    constructor() {
      this._initialize();
    }

    // private methods
    private _initialize():void {
      this.LivesLabel = new objects.Label("Lives: 0", "30px", "Pressstart2p", "#DF6977", 50, 10, false);
      this.ScoreLabel = new objects.Label("Score: 99999", "30px", "Pressstart2p", "#DF6977", 500, 10, false);
      this.TimeLabel = new objects.Label("Time: 99999", "30px", "Pressstart2p", "#DF6977", 900, 10, false);

      this.HighScoreLabel = new objects.Label("High Score: 99999", "50px", "Pressstart2p", "#DF6977", 320, 240, true);
     
     if (objects.Game.currentScene == 1){
        this.Time = 0;
      this.Lives = 5;
      this.Score = 0;
      this.HighScore = 0;
     }
     
     else if(objects.Game.currentScene == 2){
      this.Time = Collision.CurrenTime;
      this.Lives = Collision.CurrentLive;
      this.Score = Collision.CurrentScore;  
      this.HighScore = Collision.CurrentHighScore;

    }
    else{
      this.Time = Collision.CurrenTime;
      this.Lives = Collision.CurrentLive;
      this.Score = Collision.CurrentScore;
      this.HighScore = Collision.CurrentHighScore;
    }

    
   /*
    else if(objects.Game.currentScene == 2 || objects.Game.currentScene == 3 ){
      this.Time = Collision.CurrenTime;
      this.Lives = Collision.CurrentLive;
      this.Score = Collision.CurrentScore;
      this.HighScore = Collision.CurrentHighScore;

    }
    */
     
    }

    // public methods
  }
}