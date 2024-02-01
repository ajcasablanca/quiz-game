
const questions = [
    {
        title: "Who is the NHL all-time goal scoring leader?",
        choices: ['Mario Lemieux', 'Wayne Gretzky', 'Alex Ovechkin', 'Gordie Howe'],
        answer: 'Wayne Gretzky'
    },
    {
        title: "Who is the NHL all-time NHL assists leader?",
        choices: ['Bobby Orr', 'Wayne Gretzky', 'Adam Oates', 'Mark Messier'],
        answer: 'Wayne Gretzky'
    },
    {
        title: "Who is the NHL all-time NHL points leader?",
        choices: ['Joe Sakic', 'Wayne Gretzky', 'Sidney Crosby', 'Steve Yzerman'],
        answer: 'Wayne Gretzky'
    },
    {
        title: "Who is the NHL all-time playoff goal scoring leader?",
        choices: ['Mario Lemieux', 'Wayne Gretzky', 'Brett Hull', 'Gordie Howe'],
        answer: 'Wayne Gretzky'
    },
    {
        title: "Who is the NHL all-time playoff assists leader?",
        choices: ['Nicklas Lidstrom', 'Wayne Gretzky', 'Jaromir Jagr', 'Sidney Crosby'],
        answer: 'Wayne Gretzky'
    },
    {
        title: "Who is the NHL all-time playoff points leader?",
        choices: ['Mark Messier', 'Wayne Gretzky', 'Sidney Crosby', 'Steven Stamkos'],
        answer: 'Wayne Gretzky'
    }

];

var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector("#questionsDiv");
var questionsContainer = document.querySelector("#questionsContainer");

var secondsLeft = 45;
var holdInterval = 0;
var penalty = 8;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var answers = document.createElement("div");
        answers.setAttribute("id", "answers");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            answers.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            answers.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        answers.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(answers);

}
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (!initials ) {

            alert('Please enter your initials!');

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./scores.html");
        }
    });

}