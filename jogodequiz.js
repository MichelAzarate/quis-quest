const startGamebutton = document.querySelector(".start-quiz")
const questonContainer = document.querySelector(".questions-container")
const ansersContainer = document.querySelector(".answers-container")
const questionText = document.querySelector(".question")
const nextQuestionButton = document.querySelector(".next-question")
const beackQuestion = document.querySelector(".beack")
const message = document.querySelector(".message")
const para = document.querySelector(".para")
const buttonMath = document.querySelector(".math")
const buttonInfo = document.querySelector(".info")
const buttonEletr = document.querySelector(".eletr")

import questionsSet1 from "./questoes1.js"
import questionsSet2 from "./questoes2.js"
import questionsSet3 from "./questoes3.js"

startGamebutton.addEventListener("click", startGame)
buttonEletr.addEventListener("click", startGame)
buttonInfo.addEventListener("click", startGame)
buttonMath.addEventListener("click", startGame)

nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQuestionIndex = 0
let totalcorrect = 0


// Defina a variável selectedQuestionsSet inicialmente como 1
let selectedQuestionsSet = 1;
let questions = [];

// Função para exibir as questões com base na escolha do usuário
function displayQuestions() {
    if (selectedQuestionsSet === 1) {
        questions = questionsSet1;
    } else if (selectedQuestionsSet === 2) {
        questions = questionsSet2;
    } else if (selectedQuestionsSet=== 3) {
        questions = questionsSet3;
    }
}

function hideButtn() {
    buttonMath.classList.add("hide")
    buttonInfo.classList.add("hide")
    buttonEletr.classList.add("hide")
    // startGamebutton.classList.add("hide")
}

buttonInfo.addEventListener("click", function () {
    selectedQuestionsSet = 1
    displayQuestions()
    displayNextQuestion()
    hideButtn()

    
});

buttonMath.addEventListener("click", function () {
    selectedQuestionsSet = 2; // Altera o conjunto de perguntas para 2
    displayQuestions(); // Exibe as questões do conjunto selecionado
    displayNextQuestion()
    hideButtn()
});
buttonEletr.addEventListener("click", function () {
   selectedQuestionsSet = 3;
   displayQuestions();
   displayNextQuestion();
   hideButtn()
});

// Chame a função displayQuestions() uma vez para configurar as questões iniciais
displayQuestions();

function startGame() {


    // startGamebutton.classList.add("hide")
    buttonEletr.classList.add("hide")
    // beackQuestion.classList.add("hide")
    questonContainer.classList.remove("hide")
    displayNextQuestion()
}
function displayNextQuestion() {

    reset()

    if (questions.length == currentQuestionIndex) {
        return finishGame()
    }

    questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newanswer = document.createElement("button")
        newanswer.classList.add("button", "answer")
        newanswer.textContent = answer.text
        if (answer.correct) {
            newanswer.dataset.correct = answer.correct
        }
        ansersContainer.appendChild(newanswer)

        newanswer.addEventListener("click", selectAnswer)
    })
}

function reset() {
    while (ansersContainer.firstChild) {
        ansersContainer.removeChild(ansersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    // beackQuestion.classList.add("hide")
    message.classList.add("hide")
    para.classList.add("hide")
    nextQuestionButton.classList.add("hide")

}

function selectAnswer(event) {

    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        // document.body.classList.add("correct")
        totalcorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        }// else {
        //     button.classList.add("incorrect")
 
        // }
        button.disabled = true
    })
    nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const performace = Math.floor(totalcorrect * 100 / totalQuestion)

    let message = ""
    switch (true) {
        case (performace > 90):
            message = "Excelente "
            break
        case (performace > 70):
            message = "Muito bom"
            break
        case (performace > 50):
            message = "Bom"
            break
        default:
            message = "Pode melhorar"
    }
    questonContainer.innerHTML =
        `
        <p class="final-message">
            Voce acertou ${totalcorrect} de ${totalQuestion} questoes!
            <span>Resultado: ${message}</span>
        </p>
        <button onclick=window.location.reload() class="button">
            Refaser Teste
        </button>
        <button class="beack button">VOLTAR</button>
        `
}






















// Questionario de pergunda e resposta

