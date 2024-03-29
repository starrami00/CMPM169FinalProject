// sketch.js - Space Cat
let cat;
let rat;
let canvasW = 1400;
let canvasH = 700;
let ratA;
let catA;
let animalWidth = 300;
let animalHeight = 200;
let spaceMusic;
let jazzMusic;
let discoMusic;
let backgroundImage;
let ratDead = false;
let possibleSpeeds = [-5,5];


function preload(){
    cat = loadImage("../img/cat.png");
    rat = loadImage("../img/rat.png");
    spaceMusic = loadSound("../music/space.mp3");
    jazzMusic = loadSound("../music/jazz.mp3");
    discoMusic = loadSound("../music/disco.mp3");
    backgroundImage = loadImage('../img/galaxybg.png');
    //test
}

// Set up the canvas
function setup() {
    createCanvas(canvasW, canvasH,WEBGL);
    ratA = new Animal(-200,-200,rat);
    catA= new Animal(0,0,cat);
    spaceMusic.play(); 
    // Loop the audio
    spaceMusic.setLoop(true);
}

function draw() {
   //background(220);
   image(backgroundImage,0,0);
   imageMode(CENTER);

   //Update and display animals
   if(!ratDead){
    ratA.update();
    ratA.display();
   }

   catA.update();
   catA.display();

   if(!ratDead && catA.intersects(ratA)) {//Make both animals move in the opposite direction when they collide
    catA.speedX *= -1;
    catA.speedY *= -1;

    //ratA.x = ratA.x * -1;
    //ratA.y = ratA.y * -1;
    catA.display();
    ratDead = true;
  }
}

class Animal {//Animal class
    constructor(x, y, img) {
      this.x = x+canvasW/2;
      this.y = y+canvasH/2;
      this.img = img
      this.radius = animalWidth/4;
      this.speedX = random(possibleSpeeds);
      this.speedY = random(possibleSpeeds);
    }
  
    // Update animal position
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      // Bounce off the edges
      if (this.x +animalWidth/4 >= canvasW|| this.x -animalWidth/4 <= 0 ) {
        this.speedX *= -1;
      }
      if (this.y + animalHeight/4 >= canvasH || this.y -animalHeight/4 <= 0) {
        this.speedY *= -1;
      }
    }
  
    // Display animal
    display() {
      /*noFill();
      ellipse(this.x-700,this.y-350,this.radius);*/
      if(this.speedX < 0){//Flip the image depending on speed
        image(this.img, this.x-canvasW/2, this.y-canvasH/2,animalWidth,animalHeight);
      }
      else{
        image(this.img, this.x-canvasW/2, this.y-canvasH/2,-animalWidth,animalHeight);
      }
    }
  
    // Check if this animal intersects with another animal
    intersects(other) {
      let distanceSq = (this.x - other.x) ** 2 + (this.y - other.y) ** 2;
      let minDistSq = (this.radius + other.radius) ** 2;
      return distanceSq <= minDistSq;
    }
  }