window.onload = function() {
  

 // Declare variables
  let currentGame, currentUnicorn, controller;

  
 //Grab canvas and set canvas context
  const canvas = document.querySelector("#my-canvas");
  const ctx = canvas.getContext("2d");
  
    
  // CLASSES ---------------------------------------------------------------------------
  
    class Game {
      constructor(){
        this.unicorn = {}; // unicorn => object
        this.obstacles = []; // obstacles => array
        this.score = 0;
      }
    }
  
    class Unicorn {
      constructor(){
        this.x = 20;
        this.velocityX = 0;
        this.y = 450;
        this.velocityY = 0;
        this.width = 205;
        this.height = 150;
        this.jumping = true;
        this.img = '../images/unicorn-idle.gif';
      }
  
      drawUnicorn(){
        const unicornImg = new Image();
        unicornImg.src = this.img;
        // unicornImg.onload = function() {
        ctx.drawImage(unicornImg, this.x, this.y, this.width, this.height)
        // ctx.fillRect(50, 50, 100, 100)
        // }
      }
  
      moveUnicorn(num){
      //  ctx.clearRect(this.x, this.y, this.width, this.height);
       
        //If the up key is pressed and the unicorn is jumping, this happens.
        //Note, the unicorn is initially set to jumping as true. Therefore, the below
        //would only happen if the unicorn is already jumping and you press up again.
        if (controller.up && this.jumping === false) {
          // console.log("here")
          this.velocityY -= 40;
          this.jumping = true;
    
         }

         if (controller.left && controller.up && (this.jumping === false)) {
          // console.log("here")
          this.velocityY -= 38;
          this.velocityX -= 30;
          this.jumping = true;
         }
        
        //If the left key is pressed, velocity increases (or decreases) by this amount
        if (controller.left) {
          this.velocityX -= 0.25;
         }
         //If the right key is pressed, velocity increases (or decreases) by this amount
        if (controller.right) {
          this.velocityX += 0.25;
         }

        if (controller.right && controller.up && (this.jumping === false)) {
          // console.log("here")
          this.velocityY -= 38;
          this.velocityX += 50;
          this.jumping = true;
         }
        
        // THEN THESE THINGS HAPPEN ONCE THE IFS ARE TESTED:
         this.velocityY += 0.55;// gravity
         this.x += this.velocityX; //
         this.y += this.velocityY;
         this.velocityX *= 0.9;// friction
         this.velocityY *= 0.9;// friction

      
        // If the unicorn is falling below floor line. Sets jumping to false. 
        // Unicorn starts at 450 on y, this makes sure it does not go past 450 (falling)
        if (this.y > 450) {
          this.jumping = false;
          this.y = 450;
          this.velocityY = 1.25;
        }
      
        // If unicorn is going off the left of the screen
        if (this.x < -205) {
          this.x = 1024;
        } else if (this.x > 870) { // Stops unicorn from going past right boundary.
          this.x = 870;
        }  
        this.drawUnicorn();
      } // end of moveUnicorn function.
     } // end of Unicorn class.


    class Obstacle {
      constructor(x,y,width,height){
        this.x = 970;
        this.velocityX = -5;
        this.y = 530;
        this.width = 50;
        this.height = 30;
        this.img = '../images/rock.png';
      }
  
      drawObstacle(){
        let obstacleImg = new Image();
        obstacleImg.src = this.img;
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height)
      }
  
      leftPosition(){
        return this.x + 10;
      }
      rightPosition(){
        return this.x + this.width;
      }
  
      topPosition(){
        return this.y + 20;
      }
      
      bottomPosition(){
        return this.y + this.height;
      }

      } //End of Obstacle class.
     
// DETECT COLLISION ----------------------------------------------------

function detectCollision(obstacle){
  return !((currentUnicorn.y - 200 > obstacle.bottomPosition()) || 
  (currentUnicorn.x + currentUnicorn.width - 75 < obstacle.leftPosition()) || 
  (currentUnicorn.x - 300 > obstacle.rightPosition()));
 }


 // BACKGROUND FUNCTIONS -----------------------------------------------------------------
  
 let background = new Image();
 background.src = '../images/flat-nature-art-fit.png';
 
   
 let backgroundImage = {
  img: background,
  backgroundX: 0,
  speed: -0.75,
   
  move: function() {
   if (controller.left || controller.up || controller.right) {
   this.backgroundX += this.speed;
   this.backgroundX %= canvas.width;
   }
   //this.backgroundX += this.speed;
   //this.backgroundX %= canvas.width;
  },
   
  draw: function() {
    ctx.drawImage(this.img, this.backgroundX, 0);
     if (this.speed < 0) {
       ctx.drawImage(this.img, this.backgroundX + canvas.width, 0);
     } else {
         ctx.drawImage(this.img, this.backgroundX - this.img.width, 0);
     }
   },
 };
   
   
   function updateBackground() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     backgroundImage.draw();
     backgroundImage.move();  
     requestAnimationFrame(updateBackground);
   
   }



  
 // CONTROLLER - ON KEYDOWN FUNCTION -------------------------------------------------------------------------
  
   
  controller = {
    left:false,
    right:false,
    up:false,
    unicornIdle: true,
    keyListener:function(event) {
      // When any key is pressed, the key state will be set to true. Conversely, if a key is released,
      //the key state will be false. Therefore, the controller values will become true
      //when a key is pressed. 
    let key_state = (event.type == "keydown") ? true:false;

    switch(event.keyCode) {
      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;
      }
     
    whereToGo = event.keycode;
    //currentGame.unicorn.moveUnicorn(whereToGo); 
    currentUnicorn.moveUnicorn(whereToGo);
     }



    }
  
  window.addEventListener("keydown", controller.keyListener)
  window.addEventListener("keyup", controller.keyListener);


  document.onkeydown = function (e) {
      //console.log('Your e is: ', e); 
      let whereToGo = e.keyCode;
      //currentGame.unicorn.moveUnicorn(whereToGo); 
      currentUnicorn.moveUnicorn(whereToGo);
    };

    
  // ON START BUTTON CLICK ------------------------------------------------------
  
  document.getElementById("start-button").onclick = function() {
    // Set start page display to none, and change canvas display to flex to appear.
    document.querySelector('.game-intro').style.display = "none";
    document.getElementById('game-board').style.display = "flex";
    
    startGame();
    // check to see if working
    console.log("start button clicked");
  }
    
  //--------------------------------------------------------------------------------------
  
  
  // START GAME FUNCTION ---------------------------------------------------------------------------
    
    function startGame() {
      //ctx.clearRect(0, 0, 1024, 600);
      updateBackground();
      
      currentGame = new Game();
      currentUnicorn = new Unicorn();
      currentObstacle = new Obstacle();

      currentGame.unicorn = currentUnicorn;
      // console.log(currentGame);
      currentUnicorn.drawUnicorn();
      
      
      //currentObstacle.drawObstacle();
  
      console.log("game started");
  
      update();
    } // end of start game function ------------------
  
  
    
  // UPDATE ------------------------------------
    let frames = 0;
    
    function update(){
      // ctx.clearRect(0, 0 , 1024, 600);
      //currentUnicorn.drawUnicorn();
      currentUnicorn.moveUnicorn();
      frames ++;

      if (frames % 600 === 1) {
      let obstacle = new Obstacle(this.x, this.y, this.width, this.height);
      currentGame.obstacles.push(obstacle);
      }
      
      for (let i=0; i<currentGame.obstacles.length; i++){
        currentGame.obstacles[i].x -= 0.75
        currentGame.obstacles[i].drawObstacle();
        
        if(detectCollision(currentGame.obstacles[i])){
          //alert("You got hurt!");

          frames = 0;
          currentGame.score = 0;
          document.getElementById("score").innerHTML = currentGame.score;
  
          currentGame.obstacles = [];
          document.querySelector('.game-intro').style.display = "flex";
          
        }
  
  
        if(currentGame.obstacles[i].x <= 20){
          currentGame.obstacles.splice(i, 1);
          currentGame.score ++;
          document.getElementById("score").innerHTML = currentGame.score;
        }


      }
      //currentObstacle.drawObstacle();
      //currentObstacle.x -= 0.75
      
     
      requestAnimationFrame(update);
  
    }
  
  } // end of window on-load function














