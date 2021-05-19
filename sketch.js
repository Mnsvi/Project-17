// defining global variables
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var FoodGroup,obstacleGroup;
var ground;
var survivalTime = 0;
var monkey_collided;

function preload(){

// loading images and animation 
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
obstaceImage = loadImage("obstacle.png");
monkey_collided = loadAnimation ("sprite_0.png");

}

function setup() {
 
// assigning survival time 
var survivalTime=0;
  
// creating monkey
monkey=createSprite(80,315,20,20);
monkey.addAnimation("running", monkey_running);
monkey.addAnimation("collided",monkey_collided);
monkey.scale=0.1;

// creating and moving the ground
ground = createSprite(400,350,900,10);
ground.velocityX=-4;
ground.x=ground.width/2;

// creating groups
FoodGroup = new Group();
obstaclesGroup = new Group();
  
}

function draw() {
  
// giving background color
background("lightyellow");
  
// resetting the ground 
if(ground.x<0) {
ground.x=ground.width/2;
}
  
// making the monkey jump
if(keyDown("space") ) {
monkey.velocityY = -12;
}

// giving gravity to monkey
monkey.velocityY = monkey.velocityY + 0.8;

// colliding monkey to the ground
monkey.collide(ground);   

// defining functions
Food();
Obstacles();

// displaying sprites
drawSprites();
  
// displaying the survival time
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate()) 

// stopping the game 
if(obstaclesGroup.isTouching(monkey)){
monkey.changeAnimation("collided",monkey_collided);
ground.velocityX = 0;
monkey.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
FoodGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);
survivalTime=0;
}

// eating banans 
if (monkey.isTouching(FoodGroup)){
FoodGroup.destroyEach();
monkey.scale = monkey.scale+0.01;
}
text("Survival Time: "+ survivalTime, 100,50);
}

function Food() {

if (frameCount%80 == 0) {
banana = createSprite(500,250,10,10);
banana.y = random(120,200);    
banana.velocityX = -5;
banana.lifetime = 300;
banana.addImage(bananaImage);
banana.scale=0.09;
FoodGroup.add(banana);
}
}

function Obstacles(){

if(frameCount%300 == 0) {
obstacle = createSprite(500,320,10,10);
obstacle.velocityX = -6;
obstacle.lifetime = 300;
obstacle.addImage(obstaceImage);
obstacle.scale=0.12;  
obstaclesGroup.add(obstacle);
}
}
