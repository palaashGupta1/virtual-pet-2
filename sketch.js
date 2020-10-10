var dog,happyDog,dogImg,happyDogImg;
var foodS,foodStock;
var database; 
var feed,addFood; 
var fedTime,lastFed;

function preload()
{
  dogImg=loadImage("images/dog1.png");
  happyDogImg=loadImage("images/dogHappy.png");


}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
dog = createSprite(800,200,100,100);
dog.addImage(dogImg);
dog.scale=0.5;

foodStock = database.ref('food');
foodStock.on("value",readStock);

feed=createButton("feed the dog");
feed.position(700,95);

feed.mousePressed(feedDog);

addFood=createButton("add food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

foodObj=new Food();

}


function draw() {  
background(46, 139, 87);
foodObj.display();
  fedTime=database.ref('feedTime');
  fedTime.on("value",function (data){
    lastFed=data.val();
  })
fill(255,255,254);
textSize(15);
if(lastFed>12){
  text("last Feed:",+lastFed%12+"PM",350,30);
}else if(lastFed===0){
  text("last Feed:12AM",350,10);
}else{
  text("last Feed :"+lastFed+"Am",350,30);
}


drawSprites();
}

function readStock(data){ 
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}


function addFoods(){
   foodS++;
   database.ref('/').update({
food:foodS
   })
}

function feedDog(){
  dog.addImage(happyDogImg);
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  food:foodObj.getFoodStock(),
  feedTime:hour()
})
}

