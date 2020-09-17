var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;


$(document).keydown(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern);

});


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor((Math.random() * 4));

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {


    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart")

    var audio1 = new Audio("sounds/wrong.mp3");
    audio1.play();

    function startOver() {
      level = 0;
      gamePattern = [];
      started = false;
    }
    startOver();
    setTimeout(function() {
      $("#mobKey").removeClass("hide");
    }, 200);
  }
}

$("#mobKey").click(function() {
  nextSequence();
  $("#mobKey").addClass("hide");
  console.log("got clicked");
});
