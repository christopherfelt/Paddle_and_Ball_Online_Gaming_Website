var randomNumber;
var disableButton;
var game_history_url = document.getElementById("game_history_button").getAttribute("data-url");
var game_score_url = document.getElementById("game_history_button").getAttribute("data-score");
// var csrf_token = document.getElementById("game_history_button").getAttribute("data-token");

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


randomNumber = Math.floor(Math.random()*1000);

document.getElementById("game_history_button").disabled = true;

setTimeout(function(){

    document.getElementById("number").innerHTML = randomNumber;
    document.getElementById("game_history_button").disabled = false;

    $.post(game_score_url,
        {
            csrfmiddlewaretoken: csrftoken,
            score: randomNumber
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


}, 2000);


document.getElementById("game_history_button").onclick = function(){window.location.href = game_history_url};

console.log(game_history_url);
console.log(game_score_url);