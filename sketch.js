var boyButton, girlButton;
var boy, girl, alpha, alphagroup
var bg, bgimg, boyrun, girlrun;
var gameState = "start"
var girlpc, boypc, pc;
var char = 0
var collected = 0;
function preload() {
  bgimg = loadImage("assets/bg.png");
  girlpc = loadAnimation("assets/girl/idle.png");
  boypc = loadAnimation("assets/boy/run0.png");
  boyrun = loadAnimation("assets/boy/run0.png", "assets/boy/run1.png", "assets/boy/run2.png", "assets/boy/run3.png",
    "assets/boy/run4.png", "assets/boy/run5.png", "assets/boy/run6.png", "assets/boy/run7.png");
  girlrun = loadAnimation("assets/girl/g1.png", "assets/girl/g2.png", "assets/girl/g3.png", "assets/girl/g4.png",
    "assets/girl/g5.png", "assets/girl/g6.png", "assets/girl/g7.png", "assets/girl/g8.png", "assets/girl/g9.png",
    "assets/girl/g10.png", "assets/girl/g11.png", "assets/girl/g12.png", "assets/girl/g13.png");
  aimg = loadImage("assets/a.png");
  bimg = loadImage("assets/b.png");
  cimg = loadImage("assets/c.png");
  dimg = loadImage("assets/d.png");
  jimg = loadImage("assets/j.png");
  kimg = loadImage("assets/k.png");
  limg = loadImage("assets/l.png");
  mimg = loadImage("assets/m.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(width / 2, height / 2);
  bg.addImage(bgimg);
  bg.scale = 3;
  bg.visible = false;
  boy = createSprite(width / 2 - width / 4, height / 2);
  boy.addAnimation("still", boypc);
  girl = createSprite(width / 2 + width / 3, height / 2);
  girl.addAnimation("still1", girlpc);
  pc = createSprite(width / 8, height / 2)
  pc.visible = false;
  alphagroup = new Group()

}

function draw() {
  background(bgimg);
  drawSprites();
  if (gameState === "start") {
    textSize(50)
    push();
    fill(rgb(random(0,255),random(0,255),random(0,255)));
    text("ALPHACOL", width / 3 + 70, height / 8);
    pop();
    fill("white");
    text("COLLECT ALPHABETS FROM 'A TO D' IN ORDER", width / 8, height / 5);
    text("IF NOT, YOU LOSE", width / 3 + 30, height / 4 + 25);
    fill("black");
    text("SELECT YOUR PC", width / 3 + 50, height - height / 4);
    if (mousePressedOver(boy)) {
      char = 1
      pc.addAnimation("bRun", boyrun)
      pc.scale = 0.5;
      hide()
      gameState = "play"
    }
    if (mousePressedOver(girl)) {
      char = 2
      pc.addAnimation("gRun", girlrun)
      pc.scale = 0.5
      hide()
      gameState = "play"
    }
  }
  else if (gameState === "play") {
    pc.y = mouseY;
    bg.velocityX = -4
    bg.visible = true;
    pc.visible = true;
    if (bg.x < width / 4) {
      bg.x = width / 2 + width / 4;
    }
    spawnAlphabets()
  } else if (gameState === "end") {
    alphagroup.destroyEach();
    bg.destroy();
    pc.destroy();
    textSize(50);
    fill(rgb(random(0,255),random(0,255),random(0,255)));
    textStyle('bold');
    text("GAME OVER", width / 2 - 80, height / 2);
  }
  else if (gameState === "win") {
    alphagroup.destroyEach();
    bg.destroy();
    pc.destroy();
    textSize(50);
    fill(rgb(random(0,255),random(0,255),random(0,255)));
    textStyle('bold');
    text("GOOD JOB", width / 2 - 100, height / 2);
  }
}
function hide() {
  boy.destroy()
  girl.destroy()
}
function spawnAlphabets() {
  if (frameCount % 60 === 0) {
    alpha = createSprite(width, height / 2)
    alpha.velocityX = -8;
    alpha.y = random(height / 4, height - height / 4);
    var choice = Math.round(random(1, 4));
    switch (choice) {
      case 1: alpha.addImage(aimg);
        alpha.shapeColor = "red";
        break;
      case 2: alpha.addImage(bimg);
        alpha.shapeColor = "yellow";
        break;
      case 3: alpha.addImage(cimg);
        alpha.shapeColor = "green";
        break;
      case 4: alpha.addImage(dimg);
        alpha.shapeColor = "blue";
        break;
    }
    alpha.scale = 2;
    alpha.lifetime = 1200;
    alphagroup.add(alpha);
  }
  alphagroup.overlap(pc, removeChar);
}
function removeChar(spr) {
  collected = collected + 1;
  console.log(collected);
  if (spr.shapeColor == "red" && collected == 1) {
    spr.remove();
  } else if (spr.shapeColor == "yellow" && collected == 2) {
    spr.remove();
  } else if (spr.shapeColor == "green" && collected == 3) {
    spr.remove();
  } else if (spr.shapeColor == "blue" && collected == 4) {
    spr.remove();
    gameState = "win";
  }
  else {
    gameState = "end";
  }
}
