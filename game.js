var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour = "";
var isKeyPressed = false;
var soundSrc= "sounds/";
var red = new Audio(soundSrc+"red.mp3");
var green = new Audio(soundSrc+"green.mp3");
var blue = new Audio(soundSrc+"blue.mp3");
var yellow = new Audio(soundSrc+"yellow.mp3");
var wrong = new Audio(soundSrc+"wrong.mp3");
var level =0;

function nextSequence() {
    var randomNumber = (Math.random())*4;
    randomNumber = Math.floor(randomNumber);
    // console.log(randomNumber);
    randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#level-title").text("Level "+ level);
    level++;
    $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    console.log("nextSequence " + userClickedPattern);
}



function playSound(name) {
    switch (name) {
        case "red":
            red.play();
            break;
        case "green":
            green.play();
            break;
        case "blue":
            blue.play();
            break;
        case "yellow":
            yellow.play();    
            break;
        case "wrong":
            wrong.play();
            break;
    
        default:
            console.log("name selected "+ name);
            break;
    }
}

$(".btn").click(function(){
    if(!isKeyPressed){
        console.log("Game not started");
    }else{
        var userChosenColour = this.id;
        console.log("After button click ");
        console.log("userClickedButton " + userClickedPattern.length);
        userClickedPattern.push(userChosenColour);
        // console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        gameOver(gamePattern,userClickedPattern);
    }
});

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
}
$("body").keypress(function(e) {
    if (!isKeyPressed) {
        nextSequence();
    }
    isKeyPressed = true;
});

// function flashButton(chosenColour){
//     var counter =0;
//     var interval = setInterval(function() { 
//         counter++;
//         console.log(counter);
//         if(counter === 40){
//             clearInterval(interval);
//         }
//         // playSound(randomChosenColour);
//         $('.'+chosenColour).fadeIn(); 
//         $('.'+chosenColour).fadeOut(); 
//     }, 100); 

// }


function gameOver(gamePattern, userClickedPattern) {
    var isPassed = 0;
    for (let index = 0; index < userClickedPattern.length; index++) {
        console.log("gamePattern " + gamePattern);
        console.log("userPattern " + userClickedPattern);
        if(gamePattern[index]===userClickedPattern[index]){
            isPassed = 1;
        }
        else if(gamePattern[index]!=userClickedPattern[index]){
            $("#level-title").text("Game Over");  
            isPassed = 0;
            gamePattern.splice(0, gamePattern.length);
            userClickedPattern.splice(0, userClickedPattern.length);
            level = 0;
            randomChosenColour ="";
            isKeyPressed = false;
            alert("Wrong Pattern ,Game Over");
        }
        else{
            $("#level-title").text("Game Over");  
            isPassed = 0;
            gamePattern.splice(0, gamePattern.length);
            userClickedPattern.splice(0, userClickedPattern.length);
            level = 0;
            randomChosenColour ="";
            isKeyPressed = false;
            alert("Game Over");
        }
    };
    if(isPassed===1 && (gamePattern.length === userClickedPattern.length)){
        console.log("level passed");
        userClickedPattern.splice(0, userClickedPattern.length);
        console.log("After level has passed");
        console.log("gamePattern " + gamePattern.length);
        console.log("userPattern " + userClickedPattern.length);
        nextSequence();
    };
}