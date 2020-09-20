    // gloabal variables
    var questionIndex = 0;
    var userScore = 0;
    var timerNum = 60;
    var allScores = JSON.parse(window.localStorage.getItem("allScores")) || [];

    
    // hide question display, done display, and scores display on page load
    $("#questionDisplay").hide();
    $("#doneDisplay").hide();
    $("#scoresDisplay").hide();


    // clicking the 'view highscores' link takes you directly to the leaderbords from any point of the quiz
    $("#viewScoresLink").on("click", function(){
        $("#startScreen").hide();
        $("#scoresDisplay").show();

        $("#scoresList").empty();
        for(var i = 0; i < allScores.length; i++){
            $("#scoresList").append("<p>" + allScores[i].name + " - " + allScores[i].score + "</p>");
        }
    });


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
        
        // retrieve question
        questionIndex++;
        getQuestion(questionIndex, btnSelected);
    });


    // clicking the submit button submits score to the leaderboards
    $("#submitPlayerScore").on("click", function(){
        $("#doneDisplay").hide();
        $("#scoresDisplay").show();

        saveScores();
    });


    // clears the scores list and the local storage in scores display
    $("#clearScores").on("click", function(){
        $("#scoresList").empty();

        localStorage.clear();
    })


    // clicking the back button on the scores list takes you back to the start screen
    $("#btnBack").on("click", function(){
        $("#scoresDisplay").hide();
        $("#startScreen").show();
        $("#viewScoresLink").show();

        // reset variables for a new game
        questionIndex = 0;
        userScore = 0;
        timerNum = 60;
        $("#timerCount").text(timerNum);
    });


    // get the question and answers 
    function getQuestion(index, btnSelected=""){

         // prevents comparison when the start quiz button is clicked
         if(index !== 0){
            // correct answer variable
            var currentAnswer = questions[index - 1].answer;

            $("#feedback").show();

            // track points and display feedback for answer
            if(btnSelected === currentAnswer){
                userScore += 10;
                $("#feedback").text("Correct!");
            } else {
                $("#feedback").text("Incorrect!");
                timerNum -= 10;
            }
            $("#feedback").delay(550).fadeOut();
        }

        if(index <= 9){
             // remove any answers from last question
            $("#choices").empty();

            // populate question in question tag
            var currentQuestion = questions[index].question;
            $("#question").text(index + 1 + ".  " + currentQuestion);

            var currentChoices = questions[index].choices;

            // create button choices for question
            for(var i = 0; i < currentChoices.length; i++){
                var newChoice = $("<button>");
                newChoice.addClass("btnChoice");
                newChoice.attr("value", currentChoices[i]);
                newChoice.text(currentChoices[i]);
                
                $("#choices").append(newChoice);
            }
        }
    }


    function saveScores(){
        // select current user score
        var userInitials = $("#userInitials").val().trim();

        if(userInitials !== "" && userInitials.length < 3){
            var newScore = {
                name: userInitials, 
                score: userScore
            };
            
            // push new user score into all scores array and save to local storage
            allScores.push(newScore);
            localStorage.setItem("allScores", JSON.stringify(allScores));
            
            // remove all existing scores but then repopulate with new current score
            $("#scoresList").empty();
            for(var i = 0; i < allScores.length; i++){
                $("#scoresList").append("<p>" + allScores[i].name + " - " + allScores[i].score + "</p>");
            }
            
        }
    }

    
    function finishGame(){
        // hide the question display
        $("#questionDisplay").hide();

        // show the all done display and display the user's score
        $("#doneDisplay").show();
        $("#playerScore").text(userScore);
    }


    // timer function
    function timerCountdown(){
        var timerId = setInterval(function(){
            timerNum--;
            $("#timerCount").text(timerNum);

            if(timerNum <= 0 || questionIndex > 9){
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
            choices: ["String", "Null", "Undefined", "Char"],
            answer: "Char"
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
