class Food{

    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage('Images/milk.png');
    }

    updateFood(dogRef){
        this.foodStock=dogRef
        //you simply need to update this.foodStock with the argument passed that hold the quantity
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }
    }

    getFood(){
        return this.foodStock
    }

    display(){

        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image,720,220,20,20);

        if(this.foodStock !== 0){
            for(var i = 0; i < this.foodStock; i++){

              if(i % 10 === 0){
                  //there was an error here 
                  x = 80;
                  y = y + 50;
              }

              image(this.image,x,y,50,50);
              x=x+30;

            }

        }

    }

}