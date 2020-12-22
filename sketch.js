/* Refereces: 
https://p5js.org/reference/#/p5.Element/size
https://p5js.org/reference/#/p5.Element/position
*/
    
var man , man_running, manAnimation;
var booster ,boosterImg, obstacle, obstaclesImg;
var obstacleGroup;
var score;
var manAnimation;
var backgroundAnim;
var invisibleGround, invisibleVar;
var boosterGroup, obstaclesGroup;
var score, scoreImg, scoreText;
var lifetime, lifetimeImg, lifetimeText;
var lifetimeAnimation;
var back;
var rulesButton, rulesButtonImg;
var death;
var n;
var sideBarImg;
var rulesBotton, rulesButtonAnim, rulesButtonImg, rulesScreen, rulesScreen, backButton;

function preload(){
    boosterImg = loadImage("a.png", "b.png", "c.png", "d.png", "e.png", "fipng", "g.png", "f.png", "h.png");
  
  manAnimation=loadAnimation("1.png","2.png","3.png", "4.png", "5.png","6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png");
  
    obstaclesImg = loadImage("obstacle.png");
  
    scoreImg = loadImage("score.png");
  
    lifetimeImg = loadImage("lifetime.png");

  
  
  lifetimeAnimation = createImg("lifetimeAnimation.gif","Lifetime Animation","",() => {
         lifetimeAnimation.size(0, 0);
       });
  rules = createImg("rulesButton.gif", "rulesButton", "", ()=>{
  rules.size(0,0);
  });
    //rulesButtonImg = loadImage("rulesButton.png");
    //back = createVideo("back.mp4");
  sideBarImg = loadImage("sideBar.png");
  rulesScreen = loadImage("rulesScreen.png");
}


function setup() {
  createCanvas(500,550);
  
  man=createSprite(250,460,20,20); 
  man.addAnimation("manAnimation", manAnimation);
  man.scale=0.6;
  man.setCollider("circle", 0,0,84);
  //man.debug=true;
  
  invisibleGround = createSprite(250,315,20,20);
  invisibleGround.setCollider("rectangle", 0,0, 110, 530);
  invisibleGround.visible=false;
  invisibleGround.debug=true; 
  invisibleVar= createSprite(250,520,200,10);
  //invisibleVar.debug=true;
  invisibleVar.setCollider("rectangle",0,0, 200,10);
  invisibleVar.visible=false;
  
  score = createSprite(460,24,20,20);
  score.addImage("score", scoreImg);
  score.scale=0.6;
  
  lifetime = createSprite(460,80,20,20);
  lifetime.addImage("lifetime", lifetimeImg);
  lifetime.scale=0.6;
  
  //invisibleGround.visible=false;
  boosterGroup = new Group();
  obstaclesGroup = new Group();
  
  scoreText = 0;
  lifetimeText=0;
  
  backgroundAnim = createVideo("backgroundAnim.mp4");
  backgroundAnim.loop();
  backgroundAnim.hide();
  
  imageMode(CENTER);
  
  monkeyAnimation = createVideo("monkeyAnimation.mp4");
  monkeyAnimation.hide();
  monkeyAnimation.loop();

  death=0;
  textSize(20);
 
  rulesButton = createSprite(440,510,20,20);
  rulesButton.visible=false;
  rulesButton.setCollider("rectangle", 0,0, 200,80);
}


function draw() {
  // textSize=100;
  // text("Score :" + score,250, 315);
  background(0);
  spawnObstacles();
  spawnBoosters();
  manProperties();
  //man.collide(invisibleVar);
 // score_lifetime();
  
  image(backgroundAnim, invisibleGround.x, invisibleGround.y, 500,630);
  image(sideBarImg, 20, 130, 440,440);
  image(rules, 200,200, 100,100);
  rules.size(60, AUTO);
  rules.position(406,464, "relative");
  drawSprites();
 
 
  if(obstaclesGroup.isTouching(man) || boosterGroup.isTouching(man))
  {
        for(var i=0; i<obstaclesGroup.length; i++) {
          //console.log(obstaclesGroup.get(i)+i);
          if(obstaclesGroup.get(i).isTouching(man)){
            obstaclesGroup.get(i).destroy();
            death++; 
            scoreText=0;
            console.log(scoreText)
            console.log(death);
             
          }
        }
    for(var j=0; j<boosterGroup.length; j++) {
         if(boosterGroup.get(j).isTouching(man)){
            boosterGroup.get(j).destroy();
            scoreText=scoreText+10;
            console.log(scoreText)
            
             
          }
       }
      
    }
  else{
     lifetimeAnimation.size(200, AUTO);
  lifetimeAnimation.position(271 ,-78,"relative");
  }
  fill("white");
  textStyle(BOLD);
  text("LONG PRESS", 365, 542);
  score_lifetime();
  if(mousePressedOver(rulesButton)) {
     image(rulesScreen, 250,275,500,550);
  }
}


function spawnObstacles(){
  if(frameCount%400===0) {
    obstacles = createSprite(250,200,20,20);
    obstacles.velocityY=1;
    obstacles.addImage(obstaclesImg);
    obstacles.scale=0.1;
    ///obstacles.debug=true;
    obstacles.setCollider("circle", 0,0, 200);
    //obstacles.collide(invisibleGround);
    obstacles.depth=man.depth;
    man.depth=man.depth+1;
    var death=0;
    
    obstaclesGroup.add(obstacles);
  
     }
}
function spawnBoosters() {
  if(frameCount%150===0) {
     booster = createSprite(250,140,20,20);
     booster.addImage("booster", boosterImg);
     booster.scale=0.2;
     booster.velocityY=0.8;
     //booster.debug=true;
     booster.setCollider("circle",0,0,100);
     booster.depth=1;
     man.depth=2;
     boosterGroup.add(booster);
    // for(var a=0; a<boosterGroup.length; a++) {
    //   if(boosterGroup.get(a).isTouching(man)) {
    //     boosterGroup.get(a).lifetime=1;
    //     //lifetimeText=lifetimeText+1;
    //     //image(lifetimeAnimation,460,88);
    //     }
    // }
     }
}

function manProperties(){
  if(keyDown("space") && man.y>=160) {
     man.velocityY=-17;
    }
  man.velocityY=man.velocityY+1;  
  man.collide(invisibleVar);
  // if(man.y>=200) {
  //    man.collide(invisibleVar);
  //    }
}

 function score_lifetime() {

   scoreText=scoreText+Math.round(getFrameRate()/60);  
   fill("black");
   text("Score :"+ scoreText,390,90);   
   text("Death :" + death,390,34);
   
     //scoreText=frameCount/120;
    //text("Score :"+ scoreText,400,24);
   //lifetimeTextText=0;
  //text("Lifetime :" + lifetimeTextText,400,80);
 }