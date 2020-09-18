$(document).ready(function(){
    
    var questionIndex = 0;
    var userScore = 0;
    var timerNum = 100;

    // hide question display, done display, and scores display on page load
    $("#questionDisplay").hide();
    $("#doneDisplay").hide();
    $("#scoresDisplay").hide();


    // clicking the start quiz button
    $("#btnStart").on("click", function(){
        // hide start screen and high scores link
        $("#startScreen").hide();
        $("#viewScoresLink").hide();

        // show question display
        $("#questionDisplay").show();

        // start the timer
        timerCountdown();

        // retrieve question
        var firstQuestion = 0;
        getQuestion(firstQuestion);
    });


    // clicking any button choice will give us right/wrong and will retrieve next question
    $("div#choices").on("click", "button", function(){
        // capture specific button clicked
        var btnSelected = $(this).val();
        console.log("selected button: " + btnSelected);
        // retrieve question
        questionIndex++;
        getQuestion(questionIndex, btnSelected);
    });


    // clicking the submit button submits score to the leaderboards
    $("#submitPlayerScore").on("click", function(){
        $("#doneDisplay").hide();
        $("#scoresDisplay").show();

        // update user initials
        var userInitials = $("#userInitials").val();
        $("#scoresList").append("<p>" + userInitials + " - " + userScore + "</p>");
    });

    // clicking the 'view highscores' link takes you directly to the leaderbords from any point of the quiz
    $("#viewScoresLink").on("click", function(){
        $("#startScreen").hide();
        $("#scoresDisplay").show();
    });


    // clicking the back button on the scores list takes you back to the start screen
    $("#btnBack").on("click", function(){
        $("#scoresDisplay").hide();
        $("#startScreen").show();
        $("#viewScoresLink").show();

        // reset variables for a new game
        questionIndex = 0;
        userScore = 0;
        timerNum = 100;
        $("#timerCount").text(timerNum);
    });


    // question function
    function getQuestion(index, btnSelected=""){

         // prevents comparison when the start quiz button is clicked
         if(index !== 0){
            // correct answer variable
            var currentAnswer = questions[index - 1].answer;

            // track points
            if(btnSelected === currentAnswer){
                userScore += 10;
            }
        }

        // remove answers from last question
        $("#choices").empty();

        // Finish game after question 10 (index 9)
        if(index > 9){
            finishGame();
            return;
        }

        // populate question in question tag
        var currentQuestion = questions[index].question;
        $("#question").text(currentQuestion);

        var currentChoices = questions[index].choices;

        // create choices
        for(var i = 0; i < currentChoices.length; i++){
            var newChoice = $("<button>");
            newChoice.addClass("btnChoice");
            newChoice.attr("value", currentChoices[i]);
            newChoice.text(currentChoices[i]);
            
            $("#choices").append(newChoice);
        }
    }


    
    function finishGame(){
        // hide the question display
        $("#questionDisplay").hide();

        // show the all done display
        $("#doneDisplay").show();
        $("#playerScore").text(userScore);
    }



    // timer function
    function timerCountdown(){
        var timerNum = 100
        var timerId = setInterval(function(){
            timerNum--;
            $("#timerCount").text(timerNum);

            if(timerNum === 0 || questionIndex > 9){
                clearInterval(timerId);
                finishGame();
            }
        }, 1000);
    }




    // questions array
    var questions = [
        {
            question: "How do you make a comment in HTML?",
            choices: ["//", "<!-- -->", "/* */", "/- -/"],
            answer: "<!-- -->"
        },
        {
            question: "Which element provides meta info and contains the <title> tag?",
            choices: ["<body>", "<meta>", "<head>", "<html>"],
            answer: "<head>"
        },
        {
            question: "What is the name for the space between the content and the border within an element?",
            choices: ["Margin", "Space", "Border-space", "Padding"],
            answer: "Padding"
        },
        {
            question: "Which of the following is a way to center an element:",
            choices: ["float: center", "margin: 0 auto", "margin: center", "align: center"],
            answer: "margin: 0 auto"
        },
        {
            question: "In the Bootstrap framework, how many units does each row contain?",
            choices: ["12", "10", "20", "8"],
            answer: "12"
        },
        {
            question: "Using the spacing utility in Bootstrap, how can we apply a size 5 margin to the bottom of an element?",
            choices: ["mx-5", "margin-b-5", "mb-5", "m-bottom-5"],
            answer: "mb-5"
        },
        {
            question: "Which of the following is not a primitive data type in JavaScript?",
            choices: ["String", "Null", "Undefined", "Decimal"],
            answer: "Decimal"
        },
        {
            question: 'x = 99. True or false: x == "99"',
            choices: ["True", "False"],
            answer: "True"
        },
        {
            question: "Using vanilla JavaScipt, what method could we use to set the text of an element?",
            choices: [".text", ".innerText", ".html", ".val"],
            answer: ".innerText"
        },
        {
            question: "How could we select an img tag using jQuery?",
            choices: ['$("img")', '.querySelector("img")', '$(#img)', '$img'],
            answer: '$("img")'
        }
    ]
});