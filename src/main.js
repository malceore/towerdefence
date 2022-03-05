"use strict";
var g = hexi(1270, 720, setup);
g.scaleToWindow();
var base;
var badguys = [];
g.start();
/*
            0       1      2
array = [ lemon, apple, pear]
array[0] \\ lemon
array[2] \\ pear
*/



function spawnBadGuy(){
  var badguy = g.circle(24, "red", "black", 2, 992, 256);
  badguys.push(badguy);
}

//The `setup` function to initialize your application
function setup() {
  base = g.circle(64, "green", "black", 2, 192, 256);
  g.state = play;
}

function play() {

  for(var i=0; i<badguys.length; i++){
    g.followConstant(badguys[i], base, 2);
    if (g.hitTestRectangle(base, badguys[i])){
      console.log("you died bro..");
      g.state = death;
    }
  }
}

function death(){
}