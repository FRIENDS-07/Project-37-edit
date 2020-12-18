var dog,dogImage,dogHappyImage;
var dataBase;
var fedTime,lastFed;
var feed,addFood;
var foodObj,position,dogRef;
var gameState=1;
var livingroom,livingroomImg,garden,gardenImg;
var washroom,washroomImg,lazyImg;
var CurrentTime,Currenttime;

function preload(){

  dogImage = loadImage("Images/dogImg.png");
  dogHappyImage = loadImage("Images/dogImg1.png");
  lazyImg = loadImage("Images/Lazy.png");

  livingImg = loadImage("Images/Living Room.png");
  gardenImg = loadImage("Images/Garden.png");
  washroomImg = loadImage("Images/Wash Room.png");

}

function setup(){

  dataBase = firebase.database();

  createCanvas(1000,500);

  foodObj = new Food();
  
  dog = createSprite(650,250,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  dogRef = dataBase.ref('Food');
  dogRef.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(200,70);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(310,70);
  addFood.mousePressed(addFoods);
  
}

function draw(){  

  background("lavender");
  drawSprites();

  foodObj.display();

  fedTime = dataBase.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  textSize(15);
  fill("brown");
  if(lastFed >= 12){
    text("Last Fed: " + lastFed % 12 + " PM",50,65);
  }else if(lastFed === 0){
    text("Last Fed: 12 PM",50,65);
  }else{
    text("Last Fed: " + lastFed + " AM",50,65);
  }

  if(gameState === "notHungry" && lastFed < 22){
    dog.addImage(lazyImg);
  }

}

function readStock(data){
  position = data.val();
  foodObj.updateFood(position);
}

function feedDog(){

  dog.addImage(dogHappyImage);

  foodObj.updateFood(foodObj.getFood()-1);
  dataBase.ref('/').update({
    Food:foodObj.getFood(),
    FeedTime:hour() 
  })

}

function addFoods(){
  position++;
  //you need to update the food that position holds
  dataBase.ref('/').update({
    Food:position
  })
  dog.addImage(dogImage);
}

function getCurrentTime(){

  CurrentTime = dataBase.ref('currentTime');
  CurrentTime.on("value",function(data){
    Currenttime = data.val();
  });

  dataBase.ref('/').update({
    currentTime:hour()
  })

}


