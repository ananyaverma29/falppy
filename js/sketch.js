var coinImg, pipeImg, pipe2Img;
var cityImg, birdImg;
var background, coin, bird,pipes,pipes2, treasure=0, resetImg, gameOverImg,reset,r=1;
var tpGroup, bpGroup, coinsGroup;
var gameState=1, gameOver, coinSound, gameOverSound;
function preload()
{
coinImg = loadImage("./assets/coin.png");
cityImg = loadImage("./assets/city.png");
pipeImg = loadImage("./assets/pipes.png");
pipe2Img = loadImage("./assets/pipes2.png");
birdImg = loadImage("./assets/bird.png");
resetImg = loadImage("./assets/reset.png");
gameOverImg = loadImage("./assets/gameOverBlue.png");
gameOverSound = loadSound("gameOver.mp3");
coinSound = loadSound("coinSound.wav");
}

function setup()
{
    cityImg.resize(windowWidth,windowHeight);
    gameOverImg.resize(windowWidth,windowHeight);
    var canvas = createCanvas(windowWidth,windowHeight);
   background = createSprite(width/2, height/2, width, height);
    background.addImage(cityImg);
    background.scale = 1;

    bird = createSprite(200,200);
    bird.addImage(birdImg);
    bird.scale = 0.2;
    bird.setCollider("circle", 0,0,100);
    bird.debug=true;
 
    reset = createSprite(200,200);
    reset.addImage(resetImg);
    reset.scale = 1;
reset.visible=false;
    gameOver = createSprite(windowWidth/2, windowHeight/2);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 1;
    gameOver.visible = false;
    bpGroup = createGroup();
    tpGroup = createGroup();
    coinsGroup = createGroup();

}
    
function draw()
{
    if(World.frameCount%50 == 0)
  {
    if(r==1){
      topPipes();
      r=2;
    }
    else if(r==2){
      bottomPipes();
      r=1;
    }
    
    
  }
  if(touches.length > 0 &&bird.y  >= height-120 ) {
     
    bird.velocityY = -10;
     touches = [];
  }
  //bird.velocityY = bird.velocityY - 0.1;
    if(touches.length>0) {      
    reset();
    touches = [];
  }
  if(keyDown("up")) 
  {
    bird.y = bird.y-4;
  }
   if(keyDown("down"))
   {
     bird.y= bird.y+4;
   }
   coins();
   if(bird.collide(tpGroup)|| bird.collide(bpGroup))
   {
     gameState=2;
    
     gameOverSound.play();
   }
   if(gameState == 2)
   {
    
      coinsGroup.setVelocityEach = 0;
      bird.velocityX=0;
     bird.velocityY=0;
     bird.destroy();
     tpGroup.setVisibleEach(false);
      bpGroup.setVisibleEach(false);
      tpGroup.setVelocityEach=0;
      reset.visible = true;
     bpGroup.setVeocityEach=0;
     coinsGroup.setVisibleEach(false);
    gameOver.visible=true;
   }

   if(bird.isTouching(coinsGroup))
   {
     
     coinSound.play();
     
   }
   bird.overlap(coinsGroup,removeCoin);
    drawSprites();
    textSize(20);
   text("Total coins:"+ " " + treasure,47, 50);
    drawSprites();
}
function topPipes(){
    var tp = createSprite(400, height-680);
    tp.addImage(pipeImg);
   
    var y = Math.round(random(1,5));
    switch(y)
    {
      case 1: tp.scale =1.5;
              //tp.height =200;
              
              tp.height = 700;
       break;
        case 2: tp.scale =1.5;
               // tp.height =200;
               tp.height = 650 ;
        break;
        case 3: tp.scale = 2;
               // tp.height = 100;
               tp.height =850;
      break;  
        case 4:tp.scale = 1.5;
               // tp.height =200;
               tp.height =800;
        break;
        case 5: tp.scale = 1.5;
                //tp.height =70;
                tp.height =700;
      break;
      
    }
    
       tp.velocityX = -2; 
   tpGroup.add(tp);
        
    }
    
    
    function bottomPipes()
    {
      var bp = createSprite(400,height-30);
      bp.addImage(pipe2Img);
      
      var x = Math.round(random(1,5));
      
      switch(x)
      {
        case 1: bp.scale =1.5;
               //bp.height =50;
                bp.height = 400;
             
        break;
        case 2: bp.scale =1.5;
               // bp.height =200;
                bp.height = 500;
        break;
        case 3: bp.scale = 1.5;
               // bp.height = 200;
                bp.height = 450;
        break;
        case 4:bp.scale = 1.5;
                //bp.height =100;
              bp.height = 600;
        break;
        case 5: bp.scale = 2;
                //bp.height =200;
              bp.height = 670;
        break;
    
    }
    bp.velocityX = -2; 
      bpGroup.add(bp);
      }

  
   function removeCoin(bird, coin){
    treasure+=10;
    coin.remove();
    coin.destroy();
    
  }
  function coins(){
    if(World.frameCount%50 == 0){
      var coin = createSprite(World.width+10, random(50,350),10,10);
      coin.addImage(coinImg);
      coin.scale = 0.35;
      coin.velocityX = -3;
      coinsGroup.add(coin);
    }
  }
  function reset(){
    gameState = 1;
    gameover.visible = false;
    reset.visible = false;
   treasure = 0;
    
  }  
