var isPlaying = false;

var level =0;

// create an array that contains all of the existing buttons from which we can extrapolate a random color to appear in the next sequence
var buttonColors = ["green", "red", "yellow", "blue"];

//accumulator for the computers simon sequence
var gamePattern = [];

//What the user has clicked
var userClickedPattern = [];

///detect key press to BEGIN GAME
if(isPlaying === false){
    $(document).on("keydown dblclick", function(){
        isPlaying = true;
        nextSequence();
        level=0;
    });
}

// program for the computer to create a new sequence with sound animation and incrementing the level
function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    animateButton(randomChosenColor);
    playSound(randomChosenColor);

    level ++;

    $("#level-title").text("Level: " + level);

}

function checkAnswers(level){ // level is the index

    if (userClickedPattern[level] === gamePattern[level]){

        if(userClickedPattern.length === gamePattern.length){
            
            // setTimeout(repeatComputerSequence, 500)
            //repeatComputerSequence();
            
            setTimeout(function(){
                nextSequence();
            }, 400);

        }

    }else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }

};

$(".btn").click(function(event){
    var chosenColor = $(this).attr("id");
    userClickedPattern.push(chosenColor);

    checkAnswers(userClickedPattern.length-1);

    playSound(chosenColor);
    pressedButton(chosenColor);


});

function playSound(name){

    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();

}

function animateButton(name){

    $("#" + name).fadeIn(400).fadeOut(400).fadeIn(400);

}

function pressedButton(color){

    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed")
    }, 100);

}

function startOver(){

    level = 0;
    isPlaying = false;
    gamePattern = [];

}

function repeatComputerSequence(){

    for(var i = 0 ; i<gamePattern.length; i++){

        var repeatElement = gamePattern[i];

        setTimeout(function(){
            playSound(repeatElement);
            animateButton(repeatElement);
        }, 800);
        
    };

}