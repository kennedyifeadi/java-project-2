const questions = [
    {
        question: "The main impurity in iron ore is?",
        answers: [
            {text: "silicon(iv)oxide", correct: true },
            {text: "calcium trioxosilicate", correct: false},
            {text: "sulphur(ii)oxide", correct: false},
            {text: "carbon(iv)oxide", correct: false },
        ]
    },
    {
        question: "Farmlands affected by crude-oil spillage can be decontaminated by?",
        answers: [
            {text: "using aerobic bacteria", correct: true },
            {text: "adding acidic solutions", correct: false},
            {text: "burning of affected area", correct: false},
            {text: "pouring water on affected area", correct: false },
        ]
    },
    {
        question: "The importance of sodium aluminate (iii) in the treatment of water is to?",
        answers: [
            {text: "kill germs", correct: false },
            {text: "neutralize acidity", correct: false},
            {text: "cause coagulation", correct: true},
            {text: "prvent tooth decay", correct: false },
        ]
    },
    {
        question: "insectivorous plants trap and kill their pray to derive?",
        answers: [
            {text: "zinc", correct: false },
            {text: "nitorgen", correct: true},
            {text: "oxygen", correct: false},
            {text: "calcium", correct: false },
        ]
    },
    {
        question: "The evidence for evolution can be obtained from the following except?",
        answers: [
            {text: "anatomy", correct: false },
            {text: "embryology", correct: false},
            {text: "fossil", correct: false},
            {text: "history", correct: true },
        ]
    },
];

const questionEL = document.getElementById("question");
const answerEL = document.getElementById("answer-but");
const nextEL = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextEL.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEL.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerEL.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener("click", selectAnswer);
    });
    
};

function resetState() {
    nextEL.style.display = "none";
    while (answerEL.firstChild) {
        answerEL.removeChild(answerEL.firstChild);
        
    };
    
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        
    }else{
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerEL.children).forEach(button => {
        // if (button.dataset.correct === "true") {
        //     button.classList.add("correct");
        // }
        button.disabled = true;
    });
    nextEL.style.display = "block";
};

function showScore() {
    resetState();
    score = score / questions.length * 400;
    if (score > 200) {
        questionEL.innerHTML = `Your JAMB score is ${score}!. Your chances of being admitted is guaranteed.`;
    }else{
        questionEL.innerHTML = `Your JAMB score is ${score}!. You need to REWRITE!`;
    }
    nextEL.innerHTML = "Try Again";
    nextEL.style.display = "block"; 

    
}


function handelNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
    
}


nextEL.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handelNextButton();
        
    }else{
        startQuiz();
    }
});

startQuiz();
