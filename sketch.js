const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var birds=[]
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score = 0
var gameState = "onSling";
var bfs
var bss
var pss
function preload() {
   // backgroundImg = loadImage("sprites/bg.png");
    getbg() 
    bfs = loadSound("sounds/bird_flying.mp3")
    bss = loadSound("sounds/bird_select.mp3")
    pss = loadSound("sounds/pig_snort.mp3")
}

function setup(){
    var canvas = createCanvas(1600,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(width/2,height,width,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150,100);
    bird3 = new Bird(100,100);
    bird4 = new Bird(50,100);
    birds.push(bird4)
    birds.push(bird3)
    birds.push(bird2)
    birds.push(bird)

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
if (backgroundImg){

    background(backgroundImg);}
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display()
    bird3.display()
    bird4.display()
    platform.display();
    //log6.display();
    slingshot.display();
    pig1.score()
    pig3.score()  
    textSize(25)
    text("Score:"+score,600,50) 

}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    birds.pop()
    bfs.play()
}

function keyPressed(){
    if(keyCode === 32){
        
        if (birds.length>=0){
            slingshot.attach(birds[birds.length-1].body);
        Matter.Body.setPosition(birds[birds.length-1].body,{x:200,y:50})
        gameState = "onSling"
        birds[birds.length-1].trajectory=[]
        bss.play()
    }}
}

async function getbg(){
   var res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
   var res1 = await res.json();
  // console.log(res1)
  var dt = res1.datetime;
  var hr = dt.slice(11,13)
  //console.log(hr)
if (hr>=06 && hr<=12){
    bg = "download (1).jpg"
}
else{
    bg = "download.jpg"
}
backgroundImg = loadImage(bg)
}