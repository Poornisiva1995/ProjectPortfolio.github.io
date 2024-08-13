const questions = [
    {
        question: " How many planets are in our solar system?",
        answer: [
            { text: "Ten", correct: false },
            { text: "Nine", correct: false },
            { text: "Eight", correct: true },
            { text: "Seven", correct: false },
        ]
    },
    {
        question: " Which is the largest animal in the world?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: " What is a baby kangaroo called?",
        answer: [
            { text: "Joey", correct: true },
            { text: "Cub", correct: false },
            { text: "Calf", correct: false },
            { text: "Filly", correct: false },
        ]
    },
    {
        question: " How many months have 31 days?",
        answer: [
            { text: "Four Months", correct: false },
            { text: "Five Months", correct: false },
            { text: "Six Months", correct: false },
            { text: "Seven Months", correct: true },
        ]
    },
    {
        question: " Which animal lays the largest eggs?",
        answer: [
            { text: "Hummingbirds", correct: false },
            { text: "Ostrich", correct: true },
            { text: "Bees", correct: false },
            { text: "Sharks", correct: false },
        ]
    },
];

const questionElement = document.querySelector("#question");
const answerButtonsElement = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
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
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();