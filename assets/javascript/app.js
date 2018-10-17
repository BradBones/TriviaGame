// Ensures page is loaded before the script runs.
$(document).ready(function () {

    // Global variables.
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var sec = 19;
	var queuePos = 0;
	var time;

    // Question and answers as objects in an array, stored in the questions variable.
	var questions = [
		q01 = {
			q: "THE BLUE LIGHTS USED IN THE SHIP'S EGG CHAMBER WERE BORROWED FROM WHICH ROCK BAND?",
			a1: "THE ROLLING STONES",
			a2: "THE BYRDS",
			a3: "THE WHO",
			a4: "KRAFTWERK",
			correctAnswer: "THE WHO"
		},
		q02 = {
			q: "WHICH ACTOR TURNED DOWN THE ROLE OF CAPTAIN DALLAS?",
			a1: "HARRISON FORD",
			a2: "BRUCE WILLIS",
			a3: "ROY SCHEIDER",
			a4: "PETER FONDA",
			correctAnswer: "HARRISON FORD"
		},
		q03 = {
			q: "THE SPACESHIP NOSTROMO IS NAMED AFTER A BOOK BY WHICH AUTHOR?",
			a1: "PHILIP K. DICK",
			a2: "WILLIAM FAULKNER",
			a3: "KURT VONNEGUT",
			a4: "JOSEPH CONRAD",
			correctAnswer: "JOSEPH CONRAD"
		},
		q04 = {
			q: "WHICH ACTRESS WAS ORIGINALLY CONSIDERED FOR THE ROLE OF ELLEN RIPLEY?",
			a1: "LINDA HAMILTON",
			a2: "MERYL STREEP",
			a3: "JODIE FOSTER",
			a4: "JAMIE LEE CURTIS",
			correctAnswer: "MERYL STREEP"
		},
		q05 = {
			q: "HOW MANY CATS WERE CAST TO PLAY JONES?",
			a1: "1",
			a2: "4",
			a3: "6",
			a4: "7",
			correctAnswer: "4"
		},
		q06 = {
			q: "THE WEYLAND-YUTANI CORPORATION WAS INSPIRED BY?",
			a1: "RIDLEY SCOTT'S IN-LAWS",
			a2: "RIDLEY SCOTT'S OLD SCOOLMATES",
			a3: "RIDLEY SCOTT'S NEIGHBORS",
			a4: "RIDLEY SCOTT'S DOG AND CAT",
			correctAnswer: "RIDLEY SCOTT'S NEIGHBORS"
		},
		q07 = {
			q: "THE 26' TALL 'SPACE JOCKEY' PROP WAS ULTIMATELY DESTROYED BY WHAT?",
			a1: "A LIT CIGARETTE THAT WAS LEFT ON IT",
			a2: "A FLOOD IN THE HANGER WERE IT WAS BEING STORED",
			a3: "BEING BOUGHT AT AN AUCTION AND SOLD OF IN PARTS",
			a4: "IT IS STILL FULLY INTACT",
			correctAnswer: "A LIT CIGARETTE THAT WAS LEFT ON IT"
		},
		q08 = {
			q: "VERONICA CARTWRIGHT, WHO PLAYS LAMBERT, ALSO APPEARED AS A CHILD IN WHAT FILM?",
			a1: "CLEOPATRA",
			a2: "THE BIRDS",
			a3: "BYE BYE BIRDIE",
			a4: "THE PINK PANTHER",
			correctAnswer: "THE BIRDS"
		},
		q09 = {
			q: "WHAT IS ELLEN RIPLEY'S OFFICIAL POSITION ABOARD THE NOSTROMO?",
			a1: "WARRENT OFFICER",
			a2: "SCIENCE OFFICER",
			a3: "ENGINEER",
			a4: "CAPTAIN",
			correctAnswer: "WARRENT OFFICER"
        },
        q10 = {
			q: "THE ORIGINAL TITLE FOR THE FILM WAS?",
			a1: "THE EIGHTH PASSENGER",
			a2: "IT BITES",
			a3: "DEATH PASSENGER",
			a4: "STAR BEAST",
			correctAnswer: "STAR BEAST"
        },
        q11 = {
			q: "ASH'S BLOOD WAS MADE FROM?",
			a1: "MILK",
			a2: "COLORED WATER",
			a3: "GLUE",
			a4: "A MIX OF EYE DROPS AND WHITE NAIL POLISH",
			correctAnswer: "COLORED WATER"
        },
        q12 = {
			q: "PROPS FROM THE NOSTROMO WERE LATER USED ON WHICH OTHER RIDLEY SCOTT FILM?",
			a1: "PROMETHEUS",
			a2: "BLACK HAWK DOWN",
			a3: "LEGEND",
			a4: "BLADE RUNNER",
			correctAnswer: "BLADE RUNNER"
        },
        // Placeholder object that is not displayed. This is a workaround to fix a bug that
        // keeps searching for the next question - I added the empty question here and -1 to line 188.
        q13 = {
			q: "",
			a1: "",
			a2: "",
			a3: "",
			a4: "",
			correctAnswer: ""
		}
    ];
  
    // This function writes each question and the multiple choice answers to the DOM.
	function displayQ() {
		$("#question").html(questions[queuePos].q);
		$("#a1").html("<button>" + questions[queuePos].a1 + "</button>");
		$("#a2").html("<button>" + questions[queuePos].a2 + "</button>");
		$("#a3").html("<button>" + questions[queuePos].a3 + "</button>");
		$("#a4").html("<button>" + questions[queuePos].a4 + "</button>");

	}

    // This function deals with the 3 possible game situations - "out of time", "correct answer", and "incorrect answer".
	function displayAnswer() {
        // Tests to see if the timer has run out, displays the feedback information and adds +1 to the player's unanswered score.
		if (sec === -1) {
			$("#question").html("YOU ARE OUT OF TIME!");
			$("#a1").html("THE CORECT ANSWERT IS:");
			$("#a2").html(questions[queuePos].correctAnswer);
			$("#a3").empty();
			$("#a4").empty();
			unanswered++;
        }
        // Tests for a correct answer by comparing the player input string (populated by a button click) with the correctAnswer variable in each question object. Then adds +1 to the player's cortrect score.
		else if ($(this).text() === questions[queuePos].correctAnswer) {
			$("#question").html("<h1>CORRECT!</h1>");
			$("#a1").html("THE ANSWER IS:");
			$("#a2").html(questions[queuePos].correctAnswer);
			$("#a3").empty();
			$("#a4").empty();
			correct++;
        }
        // As above but tests for the negative (if the imput string does not match the string stored in the correctAnswer array), adds +1 to the player's incorrect score.
		else if ($(this).text() != questions[queuePos].correctAnswer) {
			$("#question").html("<h1>INCORRECT!</h1>");
			$("#a1").html("THE CORRECT ANSWER IS:");
			$("#a2").html(questions[queuePos].correctAnswer);
			$("#a3").empty();
			$("#a4").empty();
			incorrect++;
		}

        // With this code, we can avoid using a for loop.
        // Instead, we use the global queuePos variable (set to default 0) and have the queuePos advance +1.
        // NOTE --------
            // This causes a slight non-fatal bug, in the console log we see that the program is unable to find
            // ".q" (q13), which doesn't exist. By then the program has already run everything we need.
            // However, I did fix it by adding a "-1" to line 177, forcing the count to stop after the 12th question.
        queuePos++;
        // Resets the countdown timer variable.
        clearInterval(time);
        // Ensures that the counter restarts at 20 seconds each question - Witout this, we have 20 seconds to complete the entire quiz!
        sec = 19;
        // Sets the automated UI delays to 2 seconds.
		time = setTimeout(displayQ, 2000);
		time = setTimeout(gameTimer, 2000);

	}

    // After all the questions have been displayed and either answered of the timer has run out, this function displays the score stats.
	function displayResults() {
		$("#question").empty();
		$("#a1").html("CORRECT ANSWERS: " + correct);
		$("#a2").html("INCORRECT ANSWERS: " + incorrect);
		$("#a3").html("UNANSWERED: " + unanswered);
		$("#a4").empty();
        $("#time-left").empty();
        // Offers the player a chance to reload the game at the end.
        // Yes, I hate this solution too!! I'm struggling to do it with a function!	
        //$("#tryAgain").html("<h2><button onclick='location.reload();'>TRY AGAIN</button><h2>"); 
	}

    // Timer function - Test to see if all the questions have been asked, if so displayResults, if not display time remaining and count down.
	function gameTimer() {
        // -1 count is a bug fix for queuePos++ requires an extra blank question object.
		if (queuePos === questions.length -1) {
			displayResults();
			return;
        }
        // Displays timer in the DOM and counts down.
		$("#time-left").html("<h2>TIME REMAINING: 20</h2>");
		time = setInterval(function () {
			$("#time-left").html("<h2>TIME REMAINING: " + sec + "</h2>");
            sec--;
            // Test to see if time is up, if so displays answer (runs displayAnswer function which also effects the score).
			if (sec === -1) {
				clearInterval(time);
				displayAnswer();
				sec = 19;
            }
           // Really important!! creates the 1 second delay in counting. Otherwise the computer doesn't know we want it to count down in seconds. 
		}, 1000);

	}

    // The start "Launch" button begins the game by calling the display and timer functions.
	$("#start").on("click", function () {
		gameTimer();
		displayQ();
	});

    // When the user clicks on an answer button the displayAnswer function is called to check if the answer is correct.
	$("#a1").on("click", displayAnswer);
	$("#a2").on("click", displayAnswer);
	$("#a3").on("click", displayAnswer);
    $("#a4").on("click", displayAnswer);
});

