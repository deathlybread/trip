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
        anim.draw = true;
        drawIntro();
    },

    preload: function() {
        game.images.cube_green.src = "images/cube-green.png";
        game.images.cube_red.src = "images/cube-red.png";
        game.images.cube_orange.src = "images/cube-orange.png";
        game.images.title.src = "images/title.png";
        game.images.menu_arrow.src = "images/menu-arrow.png";

        game.init();
    },

    images: {
        cube_green: new Image(),
        cube_red: new Image(),
        cube_orange: new Image(),
        title: new Image(),
        menu_arrow: new Image()
    },

    audio: {
        playOnce: function(id) {
            if (game.audio.last != id) {
                document.getElementById(id).play();
                game.audio.last = id;
            }
        },

        last: ""
    },

    stage: "intro"
}

var anim = {
    green_y: -114,
    red_y_1: 0,
    red_y_2: 0,
    red_y_3: 0,
    orange_y_1: -114,
    orange_y_2: -114,
    cube_anim_complete: false,
    anim_complete: false,
    showText: false,
    draw: false
}

var menu = {
    title_y: -200,
    selectedOption: "play",
    draw: false
}

var levelSelect = {
    draw: false,
    levels: ["LEVEL 1", "LEVEL 2", "LEVEL 3", "LEVEL 4", "LEVEL 5"],
    selectedLevel: 0,
    y: [140, 240, 340, 440, 540]
}

function drawIntro() {
    ctx.clearRect(0, 0, 550, 550);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 550, 550);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "40px Pixel";

    //Cube animation
    ctx.drawImage(game.images.cube_red, 121, anim.red_y_1);
    if (anim.red_y_1 < 384) anim.red_y_1 += 6;

    ctx.drawImage(game.images.cube_red, 217, anim.red_y_2);
    if (anim.red_y_2 < 384 && anim.red_y_1 > 150) anim.red_y_2 += 6;

    ctx.drawImage(game.images.cube_red, 313, anim.red_y_3);
    if (anim.red_y_3 < 384 && anim.red_y_2 > 150) anim.red_y_3 += 6;

    ctx.drawImage(game.images.cube_orange, 169, anim.orange_y_1);
    if (anim.orange_y_1 < 284 && anim.red_y_3 > 0) anim.orange_y_1 += 6;

    ctx.drawImage(game.images.cube_orange, 265, anim.orange_y_2);
    if (anim.orange_y_2 < 284 && anim.orange_y_1 > 150) anim.orange_y_2 += 6;

    ctx.drawImage(game.images.cube_green, 217, anim.green_y);
    if (anim.green_y < 187 && anim.orange_y_1 > 280) anim.green_y += 6;

    if (anim.green_y > 185) anim.cube_anim_complete = true;

    if (anim.cube_anim_complete == true) {
        if (anim.showText) {
            ctx.fillText("B L O B B L E  G A M E S", 0, 550);
        }

        setTimeout(function () {
            anim.showText = true;
            game.audio.playOnce("intro");
        }, 500);

        setTimeout(function () {
            anim.anim_complete = true;
            anim.draw = false;
            menu.draw = true;
            game.stage = "menu"
            drawMenu();
        }, 2500);
    }
    
    if (anim.draw) requestAnimationFrame(drawIntro);
}

function drawMenu() {
    ctx.clearRect(0, 0, 550, 550);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 550, 550);
    ctx.font = "70px Pixel";

    ctx.drawImage(game.images.title, 121, menu.title_y);
    if (menu.title_y < 25) menu.title_y += 0.2;

    //Once title anim finished, display options anim
    if (menu.title_y > 24) {
        if (menu.selectedOption == "play") ctx.fillStyle = "#d04648";
        else ctx.fillStyle = "#ff9385";

        ctx.fillText("PLAY", 168, 240);

        if (menu.selectedOption == "options") ctx.fillStyle = "#d04648";
        else ctx.fillStyle = "#ff9385";

        ctx.fillText("OPTIONS", 165, 350);

        if (menu.selectedOption == "play") ctx.drawImage(game.images.menu_arrow, 85, 195);
        else if (menu.selectedOption == "options") ctx.drawImage(game.images.menu_arrow, 85, 305);
    }

    if (levelSelect.draw) menu.draw = false;

    if (menu.draw) requestAnimationFrame(drawMenu);
}

function draw_levelSelect() {
    ctx.clearRect(0, 0, 550, 550);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 550, 550);

    for (x=0; x<levelSelect.levels.length; x++) {
        if (x == levelSelect.selectedLevel) ctx.fillStyle = "#d04648";
        else ctx.fillStyle = "#ff9385";

        ctx.fillText(levelSelect.levels[x], 168, levelSelect.y[x]);
    }

    if (levelSelect.selectedLevel == 0) ctx.drawImage(game.images.menu_arrow, 85, 195);

    if (levelSelect.draw) requestAnimationFrame(draw_levelSelect);
}

document.addEventListener("keydown", function (e) {
    if (game.stage == "menu") {
        if (e.keyCode == 40 && menu.selectedOption == "play") menu.selectedOption = "options";
        else if (e.keyCode == 38 && menu.selectedOption == "options") menu.selectedOption = "play";  
        
        else if (e.keyCode == 13 && menu.selectedOption == "play") {
            menu.draw = false;
            levelSelect.draw = true;
            draw_levelSelect();
        }
        else if (e.keyCode == 13 && menu.selectedOption == "options") {
            menu.draw = false;
        }
    }
});

window.onload = game.preload();