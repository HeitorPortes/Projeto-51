var PLAY = 1;
var END = 0;
var GameState = PLAY;

var score;

var gameOver, gameOverImg, restart, restartImg;

var ground, GroundImg;

var ariranha, ariranhaImg, ariranha2;

var obstaclesGroupH, obstaclesGroupC, Capivara, Boto, PeixeB, Piranha, Enguia, Onca;
var algaGroup, alga1, alga2, alga3;

var ariSound, restartSound;

var Jacare, JacareImg;

var invisibleBlock1, invisibleBlock2, invisibleBlock3;

function preload(){
  ariranhaImg = loadImage("ariranha.png");
  ariranha2 = loadImage("Ariranha2.png");

  GroundImg = loadImage("Rio.png");

  Capivara = loadImage("Capivara.png");
  Boto = loadImage("Boto.png");
  PeixeB = loadImage("PeixeB.png");
  Piranha = loadImage("Piranha.png");
  Enguia = loadImage("Enguia.png");
  Onca = loadImage("onca.png");

  alga1 = loadImage("Alga1.png");
  alga2 = loadImage("Alga2.png");
  alga3 = loadImage("Alga3.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  JacareImg = loadImage("Jacare.png");

  ariSound = loadSound("Ari.mp3");
  restartSound = loadSound("checkpoint.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  score = 0;

  ariranha = createSprite(450, 200, 50, 50);
  ariranha.addImage(ariranhaImg);
  ariranha.scale = 4;
  ariranha.setCollider("rectangle",0,0,23,8);
  ariranha.debug = false;

  Jacare = createSprite(105,200,50,50);
  Jacare.addImage(JacareImg);
  Jacare.scale = 6;
  Jacare.setCollider("rectangle",0,0,25,10);
  Jacare.debug = false;

  gameOver = createSprite(680,250,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.depth = gameOver.depth + 2;

  restart = createSprite(680,290,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.depth = restart.depth + 2;

  invisibleBlock1 = createSprite(600,50,2000,10);
  invisibleBlock1.visible = false;

  invisibleBlock2 = createSprite(600,610,2000,10);
  invisibleBlock2.visible = false;

  invisibleBlock3 = createSprite(width, height, 10, 2000);
  invisibleBlock3.visible = false;

  obstaclesGroupH = createGroup();
  obstaclesGroupC = createGroup();
  algaGroup = createGroup();
}

function draw() {
  background(GroundImg); 

  textSize(20);
    fill("darkgreen")
  text("Score: "+ score, 1200,50);
  
  if(GameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;

    ariranha.collide(invisibleBlock1);
    ariranha.collide(invisibleBlock2);
    ariranha.collide(invisibleBlock3);

    Jacare.velocityY = ariranha.velocityY;
    
    score = score + Math.round(frameCount/40);

    ariranha.collide(obstaclesGroupH);

    if(keyWentDown("UP_ARROW")){
      ariranha.velocityY = -8
    }
    if(keyWentDown("DOWN_ARROW")){
      ariranha.velocityY = +8
    }
    if(keyWentDown("LEFT_ARROW")){
      ariranha.velocityX = -8
    }
    if(keyWentDown("RIGHT_ARROW")){
      ariranha.velocityX = +8
    }

    if(keyWentUp("UP_ARROW")){
      ariranha.velocityY = 0
      ariranha.velocityX = -5
    }
    if(keyWentUp("DOWN_ARROW")){
      ariranha.velocityY = 0
      ariranha.velocityX = -5
    }
    if(keyWentUp("LEFT_ARROW")){
      ariranha.velocityX = -5
    }
    if(keyWentUp("RIGHT_ARROW")){
      ariranha.velocityX = -5
    }

    spawnObstaclesH();
    spawnObstaclesC();
    spawnAlgas();

    if(ariranha.isTouching(obstaclesGroupC) || ariranha.isTouching(Jacare)){
      GameState = END;
      ariSound.play();
    }
  
  }

  else if (GameState === END) {
     
    gameOver.visible = true;
    restart.visible = true;
   
    ariranha.velocityY = 0;
    ariranha.velocityX = 0;

    Jacare.velocityY = 0;
   
    ariranha.addImage(ariranha2);
   
  obstaclesGroupH.setLifetimeEach(-1);
  obstaclesGroupC.setLifetimeEach(-1);
  algaGroup.setLifetimeEach(-1);
   
   obstaclesGroupH.setVelocityXEach(0);
   obstaclesGroupC.setVelocityXEach(0);
   algaGroup.setVelocityXEach(0);
 }

 if(mousePressedOver(restart)){
  reset();
 }

  drawSprites();
}

function reset(){
  restartSound.play();

  GameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  ariranha.addImage(ariranhaImg);
  ariranha.x = 450;
  ariranha.y = 200;

  Jacare.y = 200;

  obstaclesGroupH.destroyEach();
  obstaclesGroupC.destroyEach();
  algaGroup.destroyEach();

  score = 0;
}

function spawnObstaclesH(){
  if (frameCount % 110 === 0){
    var obstacleH = createSprite(width,height,10,40);
    obstacleH.y = Math.round(random(90,600));
    obstacleH.velocityX = -(8+score/1000);
    
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacleH.addImage(Capivara);
               break;

       case 2: obstacleH.addImage(Boto);
               break;

       case 3: obstacleH.addImage(PeixeB);
               break;

       default: break;
     }

     obstacleH.scale = 5.7;
     obstacleH.lifetime = 300;

     obstacleH.depth = ariranha.depth;
    ariranha.depth = ariranha.depth + 1;

     obstacleH.setCollider("rectangle",0,0,25,10);
     obstacleH.debug = false;
    
     obstaclesGroupH.add(obstacleH);
  }
 }

 function spawnObstaclesC(){
  if (frameCount % 120 === 0){
    var obstacleC = createSprite(width,height,10,40);
    obstacleC.y = Math.round(random(90,600));
    obstacleC.velocityX = -(10+score/1000);
    
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacleC.addImage(Piranha);
               obstacleC.setCollider("circle",0,0,5);
               obstacleC.debug = false;
               break;

       case 2: obstacleC.addImage(Enguia);
               obstacleC.setCollider("rectangle",0,0,25,5);
               obstacleC.debug = false;
               break;

       case 3: obstacleC.addImage(Onca);
               obstacleC.setCollider("rectangle",0,0,25,10);
               obstacleC.debug = false;
               break;

       default: break;
     }

     obstacleC.scale = 5;
     obstacleC.lifetime = 300;

     obstacleC.depth = ariranha.depth;
    ariranha.depth = ariranha.depth + 1;
    
     obstaclesGroupC.add(obstacleC);
  }
 }

 function spawnAlgas(){
  if (frameCount % 90 === 0) {
    var alga = createSprite(width,height,10,40);

   var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: alga.addImage(alga1);
              alga.y = 590;
              alga.scale = 9;
              break;
              
      case 2: alga.addImage(alga2);
              alga.y = 560;
              alga.scale = 7;
              break;

      case 3: alga.addImage(alga3);
              alga.y = 560;
              alga.scale = 9;
       default: break;
    }
   
   alga.velocityX = -4;
   
   alga.lifetime = 600;

   alga.depth = ariranha.depth;
   ariranha.depth = ariranha.depth + 1;
   
  algaGroup.add(alga);
   }
 }