var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 0;
var dy = 0;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++){
        bricks[c][r] = {x:0, y:0, status: 1};
    }
}

var score = 0;
var lives = 3;

var minutes="00";
var seconds="00";
var timer;

var one_click = true;

var game_history_url = document.getElementById("game_history_button").getAttribute("data-url");
var game_score_url = document.getElementById("game_history_button").getAttribute("data-score");

//TODO
//Add Timer
//Game Over will in Html

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

var gameHistoryButton = document.getElementById("game_history_button");
gameHistoryButton.hidden = true;

var scoreText = document.getElementById("score");


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("pointermove", mouseMoveHandler, false);
document.addEventListener('click', mouseClickHandler, false);





function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 300 && relativeX < canvas.width+300) {
        paddleX = relativeX - 300 - paddleWidth/2;
    }

}

function mouseClickHandler (e){

    if(one_click==true){
            dy=-2;
            dx=2;
            Timer(120);
    }
    one_click = false;

}



function drawBricks(){
    for(var c=0; c<brickColumnCount; c++){
        for(var r=0; r<brickRowCount; r++){
            if(bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }

    }

}

function collisionDetection(){
    for(var c=0; c<brickColumnCount; c++){
        for(var r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount){
                        score = score*lives+parseInt(minutes, 10)+parseInt(seconds, 10);
                            $.post(game_score_url,
                                {
                                    csrfmiddlewaretoken: csrftoken,
                                    score: score
                                },
                                function(data) {
                                    if(data.status == 1){
                                        console.log("success!")
                                    }
                                    else{
                                        console.log(data.message)
                                    }
                                }

                            );
                        gameHistoryButton.hidden = false;
                        gameHistoryButton.onclick = function(){window.location.href = game_history_url};
                        scoreText.innerText = "You Win! Your Score is " + score;
                        dy = 0;
                        dx = 0;
                        // alert("You Win, congratulations! Your score is "+score );
                        // document.location.reload();
                        // clearInterval(interval);


                    }
                }
            }
        }
    }
}

function drawscore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function Timer(duration){
    timer = duration;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // display.textContent = minutes + ":" + seconds;

        --timer;

        // if (--timer < 0) {
        //     timer = 0;
        // }
    }, 1000);
}

function drawTimer(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    // if(minutes==null){
    //     ctx.fillText("Time: 02:00", canvas.width/2-40, 20);
    // }else{
    ctx.fillText("Time: "+minutes+":"+seconds, canvas.width/2-40, 20);
    // }

}

function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65,20)
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius,0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawLives();
    drawscore();
    drawTimer();
    collisionDetection();

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -=7;
    }

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
    dx = -dx;
    }

    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
            lives--;
            if (!lives){
                alert("Game Over! Play again?");
                document.location.reload();
                // clearInterval(interval);

            }
            else{
                x = canvas.width/2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    if(timer===-2){
        alert("Ran out of time! Play again?");
        document.location.reload();
    }


    x += dx;
    y += dy;

    // console.log(timer);

    requestAnimationFrame(draw);
}

draw();


// var interval = setInterval(draw, 10);
// setInterval(draw, 10);
