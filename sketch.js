var bird,obstacle,birdImg,bgImg,obsImg,obs1Img,obstacle1,ground,groundImg,obsGroup,gameOverImg,gameOver,restartImg,restart
var PLAY=1
var END=0
var START=2
var gameState=START

function preload(){
  birdImg= loadImage("bird.png")
  bgImg= loadImage("bg.png")
  obsImg= loadImage("obs2.png")
  obs1Img= loadImage("obs1.png")
  groundImg= loadImage("ground.png")
  gameOverImg= loadImage("gameOver.png")
  restartImg= loadImage("restart.jpg")
}

function setup() {
  createCanvas(1200,600);
  bird= createSprite(100, 400, 50, 50);
  bird.addImage(birdImg)
  bird.scale=0.2

  ground= createSprite(width/2,height+70,width,20)
  ground.addImage(groundImg)
  ground.scale=0.5
  ground.velocityX=-3

  restart= createSprite(width/2,height/2+100)
  restart.addImage(restartImg)
  restart.visible=false
  
  obsGroup= new Group()
}

function draw() {
  background(bgImg);
  
   if(gameState===PLAY){
    if(frameCount%100===0){
      spawnobstacle()
      }  
    
      if(frameCount%80===0){
        spawnobstacle1()
      }
    
      if(ground.x<500){
        ground.x=width/2
      }
    
      if(keyDown("space")){
        bird.velocityY=-3
      }
    
      bird.velocityY=bird.velocityY+0.3
      
      if(bird.isTouching(obsGroup)||bird.isTouching(ground)){
        gameState=END
      }
  }
  else if(gameState===END){
    bird.y=400
    bird.velocityY=0
    ground.velocityX=0
    obsGroup.setVelocityXEach(0)
    obsGroup.setLifetimeEach(-1)
    image(gameOverImg,width/2-100,height/2-100,200,80)
    restart.visible=true
    
    }
  }
  /*if(keyWentDown("space")){
    gameState=PLAY
  }*/
  drawSprites();
  if(gameState===START){
    fill("black")
    textSize(20)
    text("PRESS SPACE TO START",width/2-100,height/2)
    if(ground.x<500){
      ground.x=width/2
    }
  }


function spawnobstacle(){
  obstacle= createSprite(width,random(50,150))
  obstacle.addImage(obsImg)
  obstacle.velocityX=-3
  obstacle.lifetime=420
  obsGroup.add(obstacle)
}

function spawnobstacle1(){
  obstacle1= createSprite(width,random(height-80,height))
  obstacle1.addImage(obs1Img)
  obstacle1.velocityX=-3
  obstacle1.lifetime=420
  obsGroup.add(obstacle1)
}