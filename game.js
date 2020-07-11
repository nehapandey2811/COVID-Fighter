function load_images(){

    //player,virus,gem

    enemy_image = new Image;

    enemy_image.src = "Assets/v1.png";

    player_img = new Image;

    player_img.src = "Assets/superhero.png";

    gem_image = new Image;

    gem_image.src = "Assets/gem3.png";

}

name = "Neha  Pandey";
game = "COVID Fighter";
c=0;
d=0;

function init(){

    //define the objects that we will have in the game

    canvas = document.getElementById("mycanvas");

    console.log(canvas);

    W = 700;

    H = 400;

    canvas.width = W;

    canvas.height = H;
    // create a context 

    pen = canvas.getContext('2d');

    console.log(pen);

    game_over = false;


    e1 = {

		x : 170,

		y : 50,

		w : 60,

		h : 60,

		speed : 20,

	};

	e2 = {

		x : 320,

		y : 150,

		w : 60,

		h : 60,

		speed : 30,

	};

	e3 = {

		x : 470,

		y : 20,

		w : 60,

		h : 60,

		speed : 40,

	};

    enemy = [e1,e2,e3];

    player = {

		x : 20,

		y : (H/2)-50,

		w : 60,

		h : 60,

		speed : 20,

        moving  : false,

        health : 100,

	};

	gem = {

		x : W-80,

		y : (H/2)-50,

		w : 60,

		h : 60,

	};

    //listen to events on the canvas

    function keyPressed(e){
        //console.log("Key Pressed :",e.key);
        if(e.key=="ArrowRight")
            player.moving = true;
        else
            player.moving = false;
    }

    document.addEventListener('keydown',keyPressed);

    /*canvas.addEventListener('mousedown',function(){

        console.log("Mouse Pressed"); 

        player.moving = true;

    });

    canvas.addEventListener('mouseup',function(){

        console.log("Mouse Released"); 

        player.moving = false;

    });*/

}

function isOverlap(rect1,rect2){

    if (rect1.x < rect2.x + rect2.w &&

   rect1.x + rect1.w > rect2.x &&

   rect1.y < rect2.y + rect2.h &&

   rect1.y + rect1.h > rect2.y) {

    return true

    } 

    return false;  

}

function draw(){
    
    //clear the canvas area for the old frame

    pen.clearRect(0,0,W,H);

    pen.fillStyle = "red";

    //pen.fillRect(box.x,box.y,box.w,box.h);

    //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);

    //draw the player

    //draw the gem

    pen.drawImage(player_img,player.x,player.y,player.w,player.h);

    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);

    for(let i=0;i<enemy.length;i++){

        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);

    }

    pen.font = "15px Cursive"; 
    pen.fillStyle = "white";

    pen.fillText("Score = "+player.health,10,15);

    pen.font = "17px Cursive";
    pen.fillText(game,7,394);
    pen.fillText(name,570,394);
    pen.font = "15px Cursive"; 

}

function update(){

    //if the player is moving 

    if(player.moving==true){

        player.x += player.speed;

        player.health += 20;

    }

    for(let i=0;i<enemy.length;i++){

        if(isOverlap(enemy[i],player)){

            player.health -= 100;

            if(player.health <0){

                console.log(player.health);

                game_over = true;
                if(d==0){
                    alert("Game Over! Score =  " + player.health);
                    d=1;
                }

            }

        }

    }

    //overlap overlap

    if(isOverlap(player,gem)){

        player.x += player.speed;

        player.health += 20;

        console.log("You Won");

        game_over = true;
        c=1;
        return;

    }

    //move the box downwards

    //update each enemy by same logic

    for(let i=0;i<enemy.length;i++){

        enemy[i].y += enemy[i].speed;

        if(i==0 && (enemy[i].y>H-enemy[i].h-40 || enemy[i].y <0)){

            enemy[i].speed *= -1;

        }  
        if(i==1 && (enemy[i].y>H-enemy[i].h-41 || enemy[i].y <0)){

            enemy[i].speed *= -1;

        } 
        if(i==2 && (enemy[i].y>H-enemy[i].h-55 || enemy[i].y <0)){

            enemy[i].speed *= -1;

        } 

    }

}

function gameloop(){

    if(game_over==true){

        clearInterval(f);

    }

    draw();
    if(game_over==true && c==1){

        alert("You Won!");

    }
    update();

    console.log("In gameloop");

}

load_images();

init();

var f = setInterval(gameloop,100);