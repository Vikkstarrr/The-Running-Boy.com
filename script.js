function welcome() {
    alert("The Running Boy\n2D Web Game\nDeveloped for Java Institute for Advanced Technology Selection and Scholarship Program\nCreated By Vikash R. Egodage");

    alert("Press the ENTER Key to START the game.\nAvoid the flames by jumping.\nTo JUMP press the SPACEBAR.");
}

function controller(event) {
    if (event.key == "Enter") {
        if (runWorker == 0) {
            run();
            runSound.play();
            moveBackground();
            updateScore();
            flameMargins.forEach(createFlames);
        }
    }

    if (event.key == " " || event.key == "ArrowUp") {
        if (jumpWorker == 0) {
            if (runWorker != 0) {
                clearInterval(runWorker);
                runSound.pause();
                jump();
                jumpSound.play();
            }
        }
    }
}

var runImage = 1;
var runWorker = 0;
var runSound = new Audio("run.mp3");

function run() {
    runWorker = setInterval(() => {
        runImage = runImage + 1;

        if (runImage == 9) {
            runImage = 1;
        }
        document.getElementById("boy").src = "run" + runImage + ".png";
    }, 150);

}

var jumpImage = 1;
var jumpWorker = 0;
var jumpMarginTop = 350;
var jumpSound = new Audio("jump.mp3");
runSound.loop = true;

function jump() {
    jumpWorker = setInterval(() => {
        jumpImage = jumpImage + 1;

        if (jumpImage < 8) {
            jumpMarginTop = jumpMarginTop - 30;
        }
        else if (jumpImage > 7) {
            jumpMarginTop = jumpMarginTop + 30;
        }
        document.getElementById("boy").style.marginTop = jumpMarginTop + "px";

        if (jumpImage == 13) {
            jumpImage = 1;
            clearInterval(jumpWorker);
            jumpWorker = 0;
            run();
            runSound.play();
        }
        document.getElementById("boy").src = "jump" + jumpImage + ".png";

    }, 100);
}

var backgroundPosition = 0;
var backgroundWorker = 0;

function moveBackground() {
    backgroundWorker = setInterval(() => {
        backgroundPosition = backgroundPosition - 10;
        document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";
    }, 50);
}

var score = 0;
var scoreWorker = 0;

function updateScore() {
    scoreWorker = setInterval(() => {

        if (score == 1000) {
            alert("You Won! Press OK to restart");
            window.location.reload();
        }

        score = score + 10;
        document.getElementById("score").innerHTML = score;
    }, 100);
}

var flameMargins = [500, 1000, 1300, 1600, 1900, 2000];
var flameWorker = 0;

function createFlames(x) {
    var i = document.createElement("img");
    i.src = "flame.gif";
    i.className = "flame";
    i.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(i);

    flameWorker = setInterval(() => {
        if (flameWorker != 0) {
            x = x - 10;
            i.style.marginLeft = x + "px";
        }

        if (x == 200) {
            if (jumpWorker == 0 && deadWorker == 0) {
                clearInterval(scoreWorker);
                scoreWorker = 0;
                clearInterval(runWorker);
                clearInterval(backgroundWorker);
                clearInterval(flameWorker);
                flameWorker = 0;
                dead();
                runSound.pause();
                deadSound.play();
            }
        }

    }, 50)
}

var deadImage = 1;
var deadWorker = 0;
var deadSound = new Audio("dead.mp3");

function dead() {
    var deadWorker = setInterval(() => {
        deadImage = deadImage + 1;

        if (deadImage == 11) {
            deadImage = 1;
            clearInterval(deadWorker);
            deadWorker = 0;
            alert("Game Over! Press OK to restart");
            window.location.reload();
            stop;
        }
        document.getElementById("boy").src = "dead" + deadImage + ".png";
    }, 100)
}
