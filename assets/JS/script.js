const questions = [
  {
    question:
      "If you type the following code in the console window, what result will you get?",
    answers: [
      { text: "3 > 2 > 1 === true;", correct: true },
      { text: "3 > 2 > 1 === false;", correct: false },
      { text: "3 > 2 === false;", correct: false },
      { text: "Error", correct: false },
    ],
  },
  {
    question: "JavaScript is a ___ -side programming language.",
    answers: [
      { text: "Client", correct: false },
      { text: "Server", correct: false },
      { text: "Both", correct: true },
      { text: "None", correct: false },
    ],
  },
  {
    question:
      "Which of the following will write the message “Hello DataFlair!” in an alert box?",
    answers: [
      { text: "alertBox(“Hello DataFlair!”);", correct: false },
      { text: "alert(Hello DataFlair!);", correct: false },
      { text: "msgAlert(“Hello DataFlair!”);", correct: false },
      { text: "alert(“Hello DataFlair!”);", correct: true },
    ],
  },
  {
    question: "How do you find the minimum of x and y using JavaScript?",
    answers: [
      { text: "min(x,y);", correct: false },
      { text: "Math.min(x,y)", correct: true },
      { text: "Math.min(xy)", correct: false },
      { text: "min(xy);", correct: false },
    ],
  },
];

var startEL = document.getElementById("start");
var appEL = document.getElementById("app");
var questionEL = document.getElementById("question");
var answersEL = document.getElementById("answer-buttons");
var nextbuttonEL = document.getElementById("next-button");
var timerEL = document.getElementById("time");
var endQuizEl = document.getElementById("endQuiz");
var saveScoreEL = document.getElementById("savescore");
var showHighEL = document.getElementById("showHscore");
var clearEL = document.getElementById("clear")
var hideEL = document.getElementById("hideScores");
var scoreDivEL = document.getElementById("showhighscore");
var currentQuestionIndex = 0;
var score = 0;
var time = 61;

function startQuiz() {
  time = 60;
  currentQuestionIndex = 0;
  score = 0;
  var mainEL = document.getElementById("main");
  mainEL.setAttribute("class", "hide");
  appEL.removeAttribute("class");
  nextbuttonEL.innerHTML = "Next";
  var startTimer = setInterval(function () {
    time--;
    timerEL.textContent = time;
    if (time <= 0) {
      clearInterval(startTimer);
      if (currentQuestionIndex < questions.length - 1) {
        showScore();
      }
    }
  }, 1000);
  showQuestion();
}

hideEL.addEventListener("click", () => {
  scoreDivEL.classList.add('hide');
  location.reload();
})

function showQuestion() {
  resetState();
  var currentQuestion = questions[currentQuestionIndex];
  var questionNum = currentQuestionIndex + 1;
  questionEL.innerHTML = questionNum + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answersEL.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextbuttonEL.style.display = "none";
  while (answersEL.firstChild) {
    answersEL.removeChild(answersEL.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    time = time - 10;
  }
  Array.from(answersEL.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextbuttonEL.style.display = "block";
}

function resetTime() {
  time = 60;
}

function showScore() {
  resetState();
  questionEL.innerHTML =
    "You scored " + score + " out of " + questions.length + " !";
  document.getElementById("next-button").innerHTML = "Restart?";
  nextbuttonEL.style.display = "block";
  endQuizEl.style.display = "block";
  if (time <= 0) {
    time = 0;
  }
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length && time !== 0) {
    showQuestion();
  } else {
    showScore();
    time = 0;
  }
}

nextbuttonEL.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
    resetTime();
  }
});

saveScoreEL.addEventListener("click", () => {
  var save = document.getElementById("name").value;
  saveScore(save, score);
  location.reload();
});

function saveScore(name, score) {
  console.log("Score " + name + " " + score);
  // Retrieve existing scores from storage
  var existingScores = JSON.parse(localStorage.getItem("scores")) || [];
  // Update the score for the given player
  existingScores.push({name, score});

  // Save the updated scores back to storage
  localStorage.setItem("scores", JSON.stringify(existingScores));

}

function getScore() {
  var existingScores = JSON.parse(localStorage.getItem("scores")) || [];
  return existingScores;
}

showHighEL.addEventListener("click", () => {
  var showHighDivEL = document.getElementById("showhighscore");
  showHighDivEL.removeAttribute("class", "hide");

  if(localStorage.getItem("scores")){
    console.log("succesfull!");
  }else{
    alert("Nothing saved yet!")
    showHighDivEL.classList.add("class", "hide");
  }

  // Get the data from local storage
  const storedData = localStorage.getItem("scores");

  // Parse the data if it's in JSON format
  const dataArray = JSON.parse(storedData);

  // Sort the data by score in descending order
  dataArray.sort((a, b) => b.score - a.score);

  // Get the OL element from the HTML
  const myList = document.getElementById("myList");

  console.log(dataArray);
  // Loop through the sorted data and create LI elements for each item
  dataArray.forEach((item) => {
    const li = document.createElement('li');
    if (item.name) {
      li.textContent = `${item.name} - ${item.score}`;
    } else {
      li.textContent = `${storedData}`;
    }
    myList.appendChild(li);
  if(dataArray === []){
    alert("Nothing in highscores!")
  }
  });
});



clearEL.addEventListener("click", () => {
  var list = document.getElementById('myList');
  var button1 = document.getElementById('savescore');
  var button2 = document.getElementById('showHscore');
  var button3 = document.getElementById('clear');

  button1.disabled = true;
  button2.disabled = true;
  button3.disabled = true;

  list.classList.add('hide');
  localStorage.removeItem('scores');

  alert("Please refresh the page to begin the quiz once more!");
  location.reload();

});


startEL.onclick = startQuiz;
