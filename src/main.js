"use strict";
var g = hexi(1270, 720, setup);
g.scaleToWindow();
var tower;
var base;
var badguys = [];
var bullets = [];
g.start();

/*
TODO
1. Towers have firing rate.
2. Towers can be picked and placed.
3. Enemy spawn at three different places in random interval.
4. Killing enemies gives you money.
5. Towers cost money to buy.
*/

function spawnBadGuy(){
  var badguy = g.circle(24, "red", "black", 2, 992, 256);
  badguys.push(badguy);
}

function spawnTower(){
  tower = g.circle(40, "purple", "white", 6, 500, 200);
  tower.pivotX = tower.pivotY = 0.5;
}

//The `setup` function to initialize your application
function setup() {
  base = g.circle(64, "green", "black", 2, 192, 256);
  spawnTower();
  g.state = play;
}

function play() {

  g.move(bullets);

  for(var i=0; i<badguys.length; i++){
      if(g.distance(tower, badguys[i]) < 210){
        tower.rotation = g.angle(tower, badguys[i]);
        g.shoot(
          tower,            //The shooter
          tower.rotation,              //The angle at which to shoot (4.71 is up)
          tower.halfWidth,  //Bullet's x position on the cannon
          tower.halfHeight,                 //Bullet's y position on the canon
          g.stage,           //The container to which the bullet should be added
          5,                 //The bullet's speed (pixels per frame)
          bullets,           //The array used to store the bullets
          () => g.circle(5, "black")
        );
      }

      g.followConstant(badguys[i], base, 2);
      if (g.hitTestRectangle(base, badguys[i])){
        console.log("you died bro..");
        g.state = death;
      }

      for(var j=0; j<bullets.length; j++){ 
        if (g.hitTestRectangle(bullets[j], badguys[i])){
          g.remove(badguys[i]);
          badguys.splice(i, 1);
          i--;
        }
      }
      
    }
}


function death(){
}