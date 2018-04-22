/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var canvas2 = document.getElementById("canvas2");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyboardManager;
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
        { id: "clickMeButton", src: "./Assets/images/clickMeButton.png" },
        { id: "startButton", src: "./Assets/images/startBtn.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "homeButton", src: "./Assets/images/homeBtn.png" },
        { id: "backButton", src: "./Assets/images/backBtn.png" },
        { id: "instructionBtn", src: "./Assets/images/InstructionBtn.png" },
        { id: "tutorials", src: "./Assets/images/ins.png" },
        { id: "level1", src: "./Assets/images/fujiNew.png" },
        { id: "level2", src: "./Assets/images/BambooNew.png" },
        { id: "level3", src: "./Assets/images/lvl3BG.png" },
        { id: "bullet", src: "./Assets/images/bullet.png" },
        { id: "ninja", src: "./Assets/images/ninja.png" },
        { id: "ninjaNew", src: "./Assets/images/ninjaNew.png" },
        { id: "cyborg", src: "./Assets/images/cyborg.png" },
        { id: "ninjaBGM", src: "./Assets/audio/lvl1BGM.mp3" },
        { id: "muteBtn", src: "./Assets/images/muteBtn.png" },
        { id: "unmuteBtn", src: "./Assets/images/unmuteBtn.png" },
        { id: "coverImg", src: "./Assets/images/cover2.png" },
        { id: "sparkle", src: "./Assets/images/sparkle.gif" },
        { id: "ghost", src: "./Assets/images/ghost.png" },
        { id: "sushi", src: "./Assets/images/sushi.png" },
        { id: "cyborgbullet", src: "./Assets/images/cyborgbullet.png" },
        { id: "powerUp", src: "./Assets/audio/sushi.wav" },
        { id: "smileImg", src: "./Assets/images/smile.png" },
    ];
    // preloads assets
    function Init() {
        console.log("Initialization Started...");
        assetManager = new createjs.LoadQueue(); // creates the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
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
    function Update() {
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != objects.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
    }
    function Main() {
        stage.removeAllChildren();
        switch (objects.Game.currentScene) {
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
            case config.Scene.WIN:
                currentScene = new scenes.WinScene(assetManager);
                break;
            case config.Scene.TUTORIALS:
                currentScene = new scenes.TutorialsScene(assetManager);
                break;
        }
        currentState = objects.Game.currentScene;
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map