var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score +" points";
        highScore.appendChild(createLi);

    }
}
back.addEventListener("click", function () {
    window.location.replace("./index.html");
});