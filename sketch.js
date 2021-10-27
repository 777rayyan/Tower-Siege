var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
var gameState = "start"
var count = 0
var particle

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //create division objects
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //create 1st row of plinko objects
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //create 3rd row of plinko objects
  for (var j = 75; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,275));
  }

  
  //create 4th row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }


  //create particle objects
  
    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score:" +score, 20, 40);
  text("500", 5, 500)
  Engine.update(engine);
  ground.display();
  
  if(gameState == "end"){
    textSize(100)
    text("Game Over", 150, 250)
  }
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //display the divisions
  if(particle!= null){
    particle.display();
    if(particle.body.position.y>760){
      if(particle.body.position.x<300){
        score = score+500
        particle = null
        if(count>=5){
          gamestate = "end"
        } else if(particle.body.position.x<600 && particle.body.position.x>301){
          score = score+100
          particle = null
          if(count>=5) gamestate = "end"
        }
        else if(particle.body.position.x<900 && particle.body.position.x>601){
          score = score+200
          particle = null
          if(count>=5) gamestate = "end"
      }
    }


    }
    for(var k=0; k<divisions.length;k++){
      divisions[k].display()
    }
  }

  //display the paricles 

}

function mousePressed() {
  if(gameState!== "end"){
    count++
    particle = new Particle(mouseX, 10, 10, 10)
  }
}