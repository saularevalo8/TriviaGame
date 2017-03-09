    var incorrect = 0;
    var correct = 0;
    var noResponse = 0;

    var clock = "";
    var holdUpWait;
    var timer = 30;

    var emptyArr = false;
    var answered = [];
    var questions = [{
        "question": "How long is a round of boxing?",
        "correct_answer": "3 mins",
        "answers": [
            "3 mins",
            "4 mins",
            "2 mins",
            "5 mins"
        ]
    }, {
        "question": "What plant is rum made from?",
        "correct_answer": "Sugar Cane",
        "answers": [
            "Sugar Cane",
            "Pineapple Tree",
            "Corn",
            "Orange Tree"
        ]
    }, {
        "question": "What's the name of Barbie Doll's boyfriend?",
        "correct_answer": "Ken",
        "answers": [
            "Ken",
            "Kyle",
            "Chris",
            "Mike"
        ]
    }, {
        "question": "What two baseball players make up the battery?",
        "correct_answer": "The pitcher and the catcher",
        "answers": [
            "Left outfield and second base",
            "Third base and the catcher",
            "Pitcher and first base",
            "The pitcher and the catcher"
        ]
    }, {

        "question": "Where was the first YouTube video filmed?",
        "correct_answer": "Zoo",
        "answers": [
            "Zoo",
            "Park",
            "Mall",
            "School"
        ]
    }, {

        "question": "How many reindeers does Santa have?",
        "correct_answer": "9",
        "answers": [
            "5",
            "8",
            "9",
            "7"
        ]
    }, {

        "question": "By US law, exit signs in buildings must be one of what two colors?",
        "correct_answer": "Red or Green",
        "answers": [
            "Orange",
            "Red",
            "Green",
            "Red or Green"
        ]
    }, {

        "question": "What is the nickname of the Alcatraz Prison?",
        "correct_answer": "The rock",
        "answers": [
            "The rock",
            "The sand",
            "The steel",
            "The hoist"
        ]
    }];

    function resetTimer() {

        clearInterval(clock);
        timer = 30;

    }

    function startGame() {

        $("#main-div").empty();
        $("#button-div").empty();
        var begin = $("<div>").addClass("intro jumbotron text-center");
        var beginTitle = $("<h1>").html("Play");
        var startButton = $("<button>").addClass("start btn btn-default btn-lg btn-block").html("Start");

        $("#main-div").append(begin);
        begin.append(beginTitle);
        $("#button-div").append(begin);
        begin.append(startButton);

        $(".start").on("click", function() {

            $("#main-div").empty();
            $("#button-div").empty();
            createStage();

        })

    }
    startGame();

    function createStage() {

        if (questions.length === 0) {

            emptyArr = true;
            displayFinalResults();

        } else {

            $("#main-div").empty();
            $("#button-div").empty();
            var currentQuestion = questions[Math.floor(Math.random() * questions.length)];
            var timerDisplay = $("<h3>Time Remaining: </h3>");
            var timerNum = $("<span>" + timer + "</span>").addClass("timer text-center");
            var quest = $("<h2>" + currentQuestion.question + "</h2>");



            $("#main-div").append(timerDisplay);
            timerDisplay.append(timerNum);
            counter();
            $("#main-div").append(quest);
            for (var i = 0; i < currentQuestion.answers.length; i++) {

                var answerButtons = $("<button></button>").addClass("answer btn btn-default btn-lg btn-block").html(currentQuestion.answers[i]);
                $("#button-div").append(answerButtons);

            }

            $("button").on("click", function() {

                console.log($(this).html());

                if ($(this).html() === currentQuestion.correct_answer && timer > 0) {

                    correct++;
                    displayCorrectMsg();

                } else {

                    incorrect++;
                    displayIncorrectMsg(currentQuestion.correct_answer);

                }

            });

            questions.splice(questions.indexOf(currentQuestion), 1);
            answered.push(currentQuestion);

        }

    }






    function TimeOutMsg() {

        resetTimer();
        

        var timeOutMsg = $("<div>").addClass("message");

        $("#main-div").empty();
        $("#button-div").empty();
        console.log("Message Time out");
        $("#main-div").append(timeOutMsg);
        timeOutMsg.html("<h1>Your time is now up!</h1>");

        holdUpWait = setTimeout(holdUp, 2000);

    }

    function displayIncorrectMsg(answer) {

        resetTimer();

        var incorrectMsg = $("<div>").addClass("message jumbotron text-center");
        var incorrectTitle = $("<h1>");
        var answerResponse = $("<p>");

        $("#main-div").empty();
        $("#button-div").empty();
        $("#main-div").append(incorrectMsg);
        incorrectMsg.append(incorrectTitle);
        incorrectTitle.html("Sorry! Wrong answer");
        answerResponse.html("The correct answer is:<br/><h3>" + answer + "</h3>");
        $("#main-div").append(answerResponse);

        holdUpWait = setTimeout(holdUp, 2000);

    }

    function displayCorrectMsg() {

        resetTimer();

        var correctMsg = $("<div>").addClass("message jumbotron text-center");

        $("#main-div").empty();
        $("#button-div").empty();
        $("#main-div").append(correctMsg);
        correctMsg.html("<h1>Sweet!!!That is correct!</h1>");

        holdUpWait = setTimeout(holdUp, 2000);

    }

    function holdUp() {

        clearTimeout(holdUpWait);
        createStage();
        console.log("wait hold up");

    }


    function displayFinalResults() {

        var finalMsg = $("<h1>").addClass("message jumbotron text-center");
        var finalResults = $("<p>");
        var resetGame = $("<button>").addClass("restartGame btn btn-default btn-lg btn-block");

        $("#main-div").empty();
        $("#button-div").empty();
        $("#main-div").append(finalMsg);
        finalMsg.html("Sorry you lost, Game Over");
        $("#main-div").append(finalResults);
        finalResults.html("Correct Answers: " + correct + "<br/>Incorrect Answers: " + incorrect + "<br/>Not Answered: " + noResponse);
        $("#main-div").append(resetGame);
        resetGame.html("Play Again");

        resetGame.on("click", function() {

            for (var i = 0; i < answered.length; i++) {

                questions.push(answered[i]);

            }

            timer = 30;
            incorrect = 0;
            correct = 0;
            noResponse = 0;
            answered = [];

            createStage();

        });

    }

    function counter() {

        clock = setInterval(decrement, 1000);

        function decrement() {

            if (timer === 0) {

                noResponse++;
                TimeOutMsg();

            } else {

                timer--;
                $(".timer").html(timer);

            }

        }

    }
    startGame();
