//Canvas variables
var c = document.getElementById("game"),
    ctx = c.getContext("2d");

//Animation
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//Game object
var game = {
    //Game setup
    init: function() {
        c.width = 550;
        c.height = 550;
        drawIntro();
    },

    preload: function() {
        game.images.cube_green.src = "images/cube-green.png";
        game.images.cube_red.src = "images/cube-red.png";
        game.images.cube_orange.src = "images/cube-orange.png";
        game.images.title.src = "images/title.png";

        game.init();
    },

    images: {
        cube_green: new Image(),
        cube_red: new Image(),
        cube_orange: new Image(),
        title: new Image(),
        green_y: -114,
        red_y_1: 0,
        red_y_2: 0,
        red_y_3: 0,
        orange_y_1: -114,
        orange_y_2: -114,
        cube_anim_complete: false,
        anim_complete: false,
        alpha: 1,
        delta: 0.1
    }
}

function drawIntro() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.font = "40px Pixel";

    ctx.drawImage(game.images.cube_red, 121, game.images.red_y_1);
    if (game.images.red_y_1 < 384) game.images.red_y_1 += 6;

    ctx.drawImage(game.images.cube_red, 217, game.images.red_y_2);
    if (game.images.red_y_2 < 384 && game.images.red_y_1 > 150) game.images.red_y_2 += 6;

    ctx.drawImage(game.images.cube_red, 313, game.images.red_y_3);
    if (game.images.red_y_3 < 384 && game.images.red_y_2 > 150) game.images.red_y_3 += 6;

    ctx.drawImage(game.images.cube_orange, 169, game.images.orange_y_1);
    if (game.images.orange_y_1 < 284 && game.images.red_y_3 > 0) game.images.orange_y_1 += 6;

    ctx.drawImage(game.images.cube_orange, 265, game.images.orange_y_2);
    if (game.images.orange_y_2 < 284 && game.images.orange_y_1 > 150) game.images.orange_y_2 += 6;

    ctx.drawImage(game.images.cube_green, 217, game.images.green_y);
    if (game.images.green_y < 187 && game.images.orange_y_1 > 280) game.images.green_y += 6;

    if (game.images.green_y > 185) game.images.cube_anim_complete = true;

    if (game.images.cube_anim_complete == true) {
        ctx.fillText("B L O B B L E  G A M E S", 0, 550)

        setTimeout(function () {
            game.images.anim_complete = true;
            drawMenu();
        }, 2000)
    }

    if (!game.images.anim_complete) requestAnimationFrame(drawIntro);
}

function drawMenu() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 500, 500);

    ctx.drawImage(game.images.title, 121, 25);
    
    requestAnimationFrame(drawMenu);
}

window.onload = game.preload();