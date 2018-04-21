/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
(function(){

  // Game Variables
  let canvas = document.getElementById("canvas");
  let canvas2 = document.getElementById("canvas2");

  let stage:createjs.Stage;
  let helloLabel: objects.Label;
  let clickMeButton: objects.Button;
  let assetManager: createjs.LoadQueue;
  let assetManifest: any[];
  let currentScene: objects.Scene;
  let currentState: number;
  let keyboardManager: managers.Keyboard;
  /*
  textureAtlasData = {

    "images": [
      ""
      //"./Assets/sprites/textureAtlas.png"
    ],

   

  "animations": {

    "coin": {
      "frames": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      "speed": 0.33
    }
}

  };
*/
  assetManifest = [
    {id: "clickMeButton", src:"./Assets/images/clickMeButton.png"},
    {id: "startButton", src:"./Assets/images/startBtn.png"},
    {id: "nextButton", src:"./Assets/images/nextButton.png"},
    {id: "backButton", src:"./Assets/images/backBtn.png"},
    {id: "instructionBtn", src:"./Assets/images/InstructionBtn.png"},
    {id: "level1", src:"./Assets/images/fujiNew.png"},
    {id: "level2", src:"./Assets/images/BambooNew.png"},
    {id: "level3", src:"./Assets/images/lvl3BG.png"},
    {id: "bullet", src:"./Assets/images/bullet.png"},
    {id: "ninja", src:"./Assets/images/ninja.png"},
    {id: "ninjaNew", src:"./Assets/images/ninjaNew.png"},
    {id: "cyborg", src:"./Assets/images/cyborg.png"},
    {id: "ninjaBGM", src:"./Assets/audio/lvl1BGM.mp3"},
    {id: "muteBtn", src:"./Assets/images/muteBtn.png"},
    {id: "unmuteBtn", src:"./Assets/images/unmuteBtn.png"},
    { id: "coverImg", src: "./Assets/images/cover2.png" },
    { id: "sparkle", src: "./Assets/images/sparkle.gif" },
    {id: "ghost", src:"./Assets/images/ghost.png"},
    {id: "sushi", src:"./Assets/images/sushi.png"},
    {id: "cyborgbullet", src:"./Assets/images/cyborgbullet.png"},
    {id: "powerUp", src:"./Assets/audio/sushi.wav"}

  ];

  // preloads assets
  function Init():void {
    console.log("Initialization Started...");
    assetManager = new createjs.LoadQueue(); // creates the assetManager object
    assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
    assetManager.loadManifest(assetManifest);
    assetManager.on("complete", Start, this);
  }

  function Start():void {
    console.log("Starting Application...")

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // turn this on for buttons
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);

    objects.Game.stage = stage;
    objects.Game.currentScene = config.Scene.START;
    currentState = config.Scene.START;
   
    //stage2 = new createjs.Stage(canvas2);

    keyboardManager = new managers.Keyboard();
    objects.Game.keyboardManager = keyboardManager;
    
    Main();
  }

  function Update():void {
    // if the scene that is playing returns another current scene
    // then call Main again and switch the scene
    if(currentState!= objects.Game.currentScene) {
      Main();
    }

    currentScene.Update();

    stage.update(); // redraws the stage
  }

  function Main():void {
    stage.removeAllChildren();

    switch(objects.Game.currentScene) {
      case config.Scene.START:
        currentScene = new scenes.StartScene(assetManager);
      break;
      case config.Scene.PLAY:
        currentScene = new scenes.PlayScene(assetManager);
      break;
      case config.Scene.PLAY2:
      currentScene = new scenes.PlayScene2(assetManager);
       break;
       case config.Scene.PLAY3:
      currentScene = new scenes.PlayScene3(assetManager);
       break;
      case config.Scene.OVER:
        currentScene = new scenes.OverScene(assetManager);
      break;
    }

    currentState = objects.Game.currentScene;
    stage.addChild(currentScene);
  }

  window.onload = Init;

})();
