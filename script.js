$(document).ready(function(){
    
    // hide question display on page load
    $("#questionDisplay").hide();


    // clicking the start quiz button
    $("#btnStart").on("click", function(){
        // hide start screen
        $("#startScreen").hide();

        // show question display
        $("#questionDisplay").show();

        // start the timer
        timerCountdown();

        // retrieve question
        var firstQuestion = 0;
        getQuestion(firstQuestion);
    });


    // clicking any button choice will give us right/wrong and will retrieve next question
    $(".btnChoice").on("click", function(){
        // retrieve question
        var questionIndex = 1;
        getQuestion(questionIndex);
        questionIndex++;
    });


    // question function
    function getQuestion(index){
        // populate question in question tag

        var currentQuestion = questions[index].question;
        $("#question").text(currentQuestion);

        $("")
           
        
        
        
    }


    // timer function
    function timerCountdown(){
        var num = 100
        var timerId = setInterval(function(){
            num--;
            $("#timerDisplay").text(num);

            if(num === 0){
                clearInterval(timerId);

            }
        }, 1000);
    }







    // questions array
    var questions = [
        {
            question: "What is the best programming language?",
            choices: ["Java", "Go", "Ruby", "JavaScript"],
            answer: "JavaScript"
        },
        {
            question: "Is CSS fun",
            choices: ["Yes", "No" ],
            answer: "No"
        },
    
    ]
});