let userClickedPattern = [];

let gamePattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;

function nextSequence(){
    // to ensure that the user's input for the new sequence(new level) starts fresh.
    userClickedPattern = []; 

    count = 0; // Reset the count for the new sequence
    level++;
    $("h1").text("Level " + level);
    let randomNumbers = Math.floor(Math.random() * 3);

    let randomChoosenColor = buttonColors[randomNumbers];

    gamePattern.push(randomChoosenColor);

    playSound(randomChoosenColor);

    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    animatePress(randomChoosenColor);

}

$(".btn").on("click", function (){
    let userChosenColor = $(this).attr("id"); // i found something in q&a nicely (now in notes) explained "this" keyword
// in short,  this above line will get the id of the button that was clicked.
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    $("#" + userChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


    let indexOfLastAnswer = userClickedPattern.lastIndexOf(userChosenColor);
    checkAnswer(indexOfLastAnswer);
    //checkAnswer(userClickedPattern.length - 1); // <-- can use this (ma'am used this)

});

function playSound(name){
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    
}

$(document).on("keydown", function () {

    if(!started){ // when "started" is "true" --> nextSequence() is called
        nextSequence();
        started = true;
    } //here, started = true so "!started" is false here so no function is called
        
    $("h1").text("Level " + level);
});

// 🔴🔴this below function not waiting for user response(clicking colorButton)-->hence this whole function may not work out
// 🤯error -> in level 1 works fine but when level 2(nextSequnce is called correctly) comes and user clicks first btn--> wrong appears(even if it is correct)
// as the gamePattern.length = 2 and count is 1(when count not is set to 0 in nextSequence() o/w it is 0(not still matching)) -->
// wrong appears!! --> issue then now resolved dont worry ‼️👋👋👏👏

function checkAnswer(currentLevel){

        // Comparing each element of array --> The "if" condition shouldn't compare 
        // full lengths immediately. The user’s pattern grows gradually, so we only need to 
        // ✅check if the latest entry is correct.
    let count = 0;
    for (let i = 0; i <= currentLevel; i++){
        if (gamePattern[i] === userClickedPattern[i]){
            console.log("success");
            count++;
        } else {
            console.log("wrong"); //Stop checking as soon as a mismatch is found.
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
    
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            
            startOver();
        }
    }
    // this below step is **crucial as the function is called only when the user has clicked all the required buttons
    // (in correct order ofcourse) o/w the function get called anytime(just a say)
    // means the function nextSequence() is waiting for this length happen to be called
    if(gamePattern.length === count){
        setTimeout(function() {
            nextSequence();
        }, 1000);
    } 
    
} 

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}
// No, using "gamePattern.length" in place of "currentLevel"(inside for loop) is not suitable because:

// User hasn't completed the full sequence yet:

// "gamePattern.length" represents the entire pattern for that level.
// "userClickedPattern" is built step by step, so checking the full gamePattern too early 
// will cause incorrect comparisons.

// Correct approach:

// You should only check up to "currentLevel", meaning only the part of "gamePattern" that the 
// user has attempted so far.
// Using "gamePattern.length" would check future steps before the user even clicks them.
// So, stick to "currentLevel" for comparison! 🚀


    // switch (randomChoosenColor) {
    //     case "blue":
    //         let blue = new Audio("./sounds/blue.mp3");
    //         blue.play();
    //         break;

    //     case "green":
    //         let green = new Audio("./sounds/green.mp3");
    //         green.play();
    //         break;

    //     case "red":
    //         let red = new Audio("./sounds/red.mp3");
    //         red.play();
    //         break; 

    //     case "yellow":
    //         let yellow = new Audio("./sounds/yellow.mp3");
    //         yellow.play();
    //         break;
 
    //     default:
    //         let wrong = new Audio("./sounds/wrong.mp3");
    //         wrong.play();
    //         break;
    // }