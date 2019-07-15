window.onload = function() {
  
  let currentGame, currentUnicorn, controller;
  
  //Grab canvas and set canvas context
  const canvas = document.querySelector("#my-canvas");
  const ctx = canvas.getContext("2d");
  
  // BACKGROUND FUNCTIONS -----------------------------------------------------------------
  
  let background = new Image;
  background.src = '../Images/Flat Nature Art_fit.png';
  
    
    let backgroundImage = {
      img: background,
      background_x: 0,
      speed: -0.1,
    
      move: function() {
        this.background_x += this.speed;
        this.background_x %= canvas.width;
      },
    
      draw: function() {
        ctx.drawImage(this.img, this.background_x, 0);
        if (this.speed < 0) {
          ctx.drawImage(this.img, this.background_x + canvas.width, 0);
        } else {
          ctx.drawImage(this.img, this.background_x - this.img.width, 0);
        }
      },
    };
    
    
    function updateBackground() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      backgroundImage.draw();
      backgroundImage.move();  
      requestAnimationFrame(updateBackground);
    
    }
    
    // start calling updateCanvas once the image is loaded
    
  
    // function drawBackground(){
    //   // console.log('back')
     
    //   background.onload = updateBackground();
  
    // }
  
    
    
    // CLASSES ---------------------------------------------------------------------------
  
    class Game {
      constructor(){
        this.unicorn = {}; // unicorn => object
        //this.obstacles = []; // obstacles => array
        this.score = 0;
      }
    }
  
    class Unicorn {
      constructor(){
        this.x = 20;
        this.x_velocity = 0;
        this.y = 450;
        this.y_velocity = 0;
        this.width = 205;
        this.height = 150;
        this.jumping = true;
        this.img = '../Images/Unicorn_Idle.gif';
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
        ctx.clearRect(this.x, this.y, this.width, this.height);
       
        if (controller.up && this.jumping == false) {
          this.y_velocity -= 20;
          this.jumping = true;
        }
      
        if (controller.left) {
          this.x_velocity -= 0.5;
        }
      
        if (controller.right) {
          this.x_velocity += 0.5;
        }
      
        this.y_velocity += 1.25;// gravity
        this.x += this.x_velocity;
        this.y += this.y_velocity;
        this.x_velocity *= 0.9;// friction
        this.y_velocity *= 0.9;// friction
      
        // if rectangle is falling below floor line
        if (this.y > 450) {
          this.jumping = false;
          this.y = 300;
          this.y_velocity = 0;
        }
      
        // if unicorn is going off the left of the screen
        if (this.x < -205) {
          this.x = 1024;
        } else if (this.x > 990) {// if this goes past right boundary
          this.x = -200;
        }
        
        this.drawUnicorn();
      }
    }
  
  // ON KEYDOWN FUNCTION -------------------------------------------------------------------------
  
   
  controller = {
    left:false,
    right:false,
    up:false,
    keyListener:function(event) {

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
      console.log('Your e is: ', e); 
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
      currentGame.unicorn = currentUnicorn;
      // console.log(currentGame);
      currentUnicorn.drawUnicorn();
  
      console.log(currentUnicorn);
      console.log("game started");
  
      update();
    } // end of start game function ------------------
  
  
    
  // UPDATE ------------------------------------
    let frames = 0;
    
    function update(){
      // ctx.clearRect(0, 0 , 1024, 600);
      currentUnicorn.drawUnicorn();
      // frames ++;
      // updateBackground();
      requestAnimationFrame(update);
  
    }
  
  }; // end of window on-load function














/* ORIGINAL CODE


window.onload = function() {
  
let currentGame;
let currentUnicorn;

//Grab canvas and set canvas context
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

// BACKGROUND FUNCTIONS -----------------------------------------------------------------

let background = new Image;
background.src = 'starter_code/Images/Flat Nature Art_fit.png';

  
  let backgroundImage = {
    img: background,
    background_x: 0,
    speed: -0.1,
  
    move: function() {
      this.background_x += this.speed;
      this.background_x %= canvas.width;
    },
  
    draw: function() {
      ctx.drawImage(this.img, this.background_x, 0);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.background_x + canvas.width, 0);
      } else {
        ctx.drawImage(this.img, this.background_x - this.img.width, 0);
      }
    },
  };
  
  
  function updateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
    backgroundImage.move();  
    requestAnimationFrame(updateBackground);
  
  }
  
  // start calling updateCanvas once the image is loaded
  

  // function drawBackground(){
  //   // console.log('back')
   
  //   background.onload = updateBackground();

  // }

  
  
  // CLASSES ---------------------------------------------------------------------------

  class Game {
    constructor(){
      this.unicorn = {}; // unicorn => object
      //this.obstacles = []; // obstacles => array
      this.score = 0;
    }
  }

  class Unicorn {
    constructor(){
      this.x = 20;
      this.y = 450;
      this.width = 205;
      this.height = 150;
      this.img = 'starter_code/Images/Unicorn_Idle.gif';
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
      ctx.clearRect(this.x, this.y, this.width, this.height);
      switch(num){
        case 37:
          if(this.x > 10){
          this.x -= 10;
          }
          break;
        case 38:
          if (this.y > 300) {  
          let count=0;
          let intervalID = setInterval(function(){
            this.y -= 50;
            this.x += 50;
            count=count+1;
          if (count==30) clearInterval(intervalID);
          }, 500);

          }
          break;
        case 39:
          if (this.x < 1014 ){
          this.x += 10;
          }
          break;
        default:
          console.log(`Not an allowed move. You moved ${KeyboardEvent.code}.`);
      }
      this.drawUnicorn();
    }
  }

// ON KEYDOWN FUNCTION -------------------------------------------------------------------------

  document.onkeydown = function (e) {
    console.log('Your e is: ', e); 
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
    currentGame.unicorn = currentUnicorn;
    // console.log(currentGame);
    currentUnicorn.drawUnicorn();

    console.log(currentUnicorn);
    console.log("game started");

    update();
  } // end of start game function ------------------


  
// UPDATE ------------------------------------
  let frames = 0;
  
  function update(){
    // ctx.clearRect(0, 0 , 1024, 600);
    currentUnicorn.drawUnicorn();
    // frames ++;
    // updateBackground();
    requestAnimationFrame(update);

  }

}; // end of window on-load function
*/