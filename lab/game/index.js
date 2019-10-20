var randomNumber;
var disableButton;

randomNumber = Math.floor(Math.random()*1000);
disableButton  = true;


setTimeout(function(){

    document.getElementById("number").innerHTML = randomNumber;
    disableButton = true;

}, 2000);


document.getElementById("game_history_button").disabled = disableButton;

document.getElementById("game_history_button").onclick = function(){

    window.location.href = ''

};