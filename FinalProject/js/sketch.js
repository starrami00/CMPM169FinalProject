// sketch.js - Space Cat
let cat;
let rat;
let canvasW = 1400;
let canvasH = 700;
let ratA;
let catA;
let animalWidth = 600;
let animalHeight = 400;
function preload(){
    cat = loadImage("../img/cat.png");
    rat = loadImage("../img/rat.png");
}

// Set up the canvas
function setup() {
    createCanvas(canvasW, canvasH,WEBGL);
    ratA = new Animal(-200,-200,rat);
    catA= new Animal(0,0,cat);
}

function draw() {
   background(220);
   imageMode(CENTER);
   //Update and display animals
   ratA.update();
   ratA.display();

   catA.update();
   catA.display();

   if (catA.intersects(ratA)) {//Make both animals move in the opposite direction when they collide
    catA.x = catA.x * -1;
    catA.y = catA.y * -1;

    ratA.x = ratA.x * -1;
    ratA.y = ratA.y * -1;

    catA.display();
    ratA.display();
  }
}

class Animal {//Animal class
    constructor(x, y, img) {
      this.x = x+700;
      this.y = y+350;
      this.img = img
      this.radius = 100;
      this.speedX = random(-5, 5);
      this.speedY = random(-5, 5);
    }
  
    // Update animal position
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      // Bounce off the edges
      if (this.x +100 >= canvasW|| this.x -100 <= 0 ) {
        this.speedX *= -1;
      }
      if (this.y +100 >= canvasH || this.y -100 <= 0) {
        this.speedY *= -1;
      }
    }
  
    // Display animal
    display() {
      /*noFill();
      rectMode(CENTER);
      rect(this.x-700,this.y-350,animalWidth/2,animalHeight/2);*/
      image(this.img, this.x-canvasW/2, this.y-canvasH/2,animalWidth,animalHeight);
    }
  
    // Check if this animal intersects with another animal
    intersects(other) {
      let distanceSq = (this.x - other.x) ** 2 + (this.y - other.y) ** 2;
      let minDistSq = (this.radius + other.radius) ** 2;
      return distanceSq <= minDistSq;
    }
  }