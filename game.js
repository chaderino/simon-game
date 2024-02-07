let gamePattern = [];
let userClickedPattern = []; 
const buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;


// to start the game
let toggle = false;

// press any key to start 
$(document).on("keydown", function() {

    if (!toggle) {

    $("h1").text("level " + level);
    nextSequence(); 
    toggle = true;
   
    }
})

// random sequence
function nextSequence() {

    userClickedPattern = []; // reset user pattern

    level++; // adds level everytime function is called

    $("h1").text("level " + level); 

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100); // animation of button to be added in the sequence

    makeSound(randomChosenColor); 

}

// click function
$(".btn").on("click", function() {

    if (toggle === true) {
   let userChosenColor = this.id 

  // $("#" + userChosenColor ).fadeOut(100).fadeIn(100); - optional animation when clicked

   userClickedPattern.push(userChosenColor); 

   makeSound(userChosenColor);

   makeAnimation(userChosenColor);

   checkAnswer(userClickedPattern.length-1); //user length - 1 = userclickedpattern[0] 
}
});

// check answer of player
function checkAnswer(chosenAnswer) {

    // if player is correct for each index 
    if (gamePattern[chosenAnswer] === userClickedPattern[chosenAnswer]) { 

        // check if array length is equal to pattern, if equal, trigger nextSequence
        if (gamePattern.length === userClickedPattern.length) {  

            setTimeout(function (){ 
                nextSequence(); 
            }, 1000);
        }

    }

    //if player makes a mistake
    else { 

        makeSound("wrong"); 
        $("body").addClass("game-over"); 

        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 300);

        $("h1").text("Game over! Press any key to restart.");

        gameOver(); 

        }
}

// resets all values and sets up a new game
function gameOver() {

    toggle = false; 
    level = 0; 
    gamePattern = []; 

}



// sounds of buttons when triggered
function makeSound(sound) {

    switch (sound) {

        case "blue": 

            let blueSound = new Audio("./sounds/blue.mp3");
            blueSound.play();
            
        break;

        case "green": 

            let greenSound = new Audio("./sounds/green.mp3");
            greenSound.play();

        break;

        case "red": 

            let redSound = new Audio("./sounds/red.mp3");
            redSound.play();

        break;

        case "yellow": 

            let yellowSound = new Audio("./sounds/yellow.mp3");
            yellowSound.play();

        break;

        case "wrong": 

            let wrongSound = new Audio("./sounds/wrong.mp3");
            wrongSound.play();

        break;
    
        default:
            break;
    }
}

//animation for a clicked button
function makeAnimation (currentColor) {

    let colorAnimate = $("#" + currentColor);

    colorAnimate.addClass("pressed"); 

    setTimeout(function () {
        colorAnimate.removeClass("pressed"), 100; 
    })
}

