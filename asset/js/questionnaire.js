import { addElement } from "./modules/addElement.js";

const url = new URL(window.location.href);
const classe = url.searchParams.get("classe");
const matiere = url.searchParams.get("matiere");

const quizContainer = document.getElementById("quiz-container");
const btnNext = document.getElementById("btn-next");
btnNext.disabled = true;
const responseContainer = document.getElementById('blockResponse');
const messageContainer = document.getElementById('message');
const explicationContainer = document.getElementById('explication');

let score = 0;

async function getQuestionsAndResponsesBySubject(subject) {
  const response = await fetch(`asset/json/${classe}/${matiere}.json`);
  const data = await response.json();

  return data.questionnaire;
}

/**
 * Prend en paramètre un tableau de question
 * Génère un index aléatoire parmi les questions
 * Supprime la question récupérée avant de la renvoyée
 * @param {Question[]} questionnaire
 */
function getQuestionRandomly(questionnaire) {
  let i = Math.floor(Math.random() * questionnaire.length);
  let question = questionnaire[i];
  let answers = question.answers;

  function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Échanger les éléments array[i] et array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  shuffle(answers);

  let correctAnswer = question.correctAnswer;
  let correctMessage = question.correctMessage;
  let wrongMessage = question.wrongMessage;
  let explanation = question.explanation;
  let questionAnswered = false; // Nouvelle variable

  responseContainer.innerHTML = "";
  messageContainer.innerHTML = "";
  explicationContainer.innerHTML = "";

  answers.map((item) => {
    let blockAnswers = addElement(
      "button",
      ["p-4", "m-4", "rounded-lg", "hover:bg-blue-600", "bg-white"],
      { value: `${item}` },
      `${item}`
    );
    blockAnswers.addEventListener("click", function () {
      if (!questionAnswered) {
        handleButtonClick(blockAnswers);
      }
    });
    responseContainer.appendChild(blockAnswers);
  });

  function handleButtonClick(clickedButton) {
    questionAnswered = true;
    btnNext.disabled = false;

    if (clickedButton.value == correctAnswer) {
      messageContainer.innerHTML = correctMessage;
      explicationContainer.innerHTML = explanation;
      clickedButton.style.backgroundColor = "#4CAF50";
      clickedButton.style.color = '#ffffff';
      score++;
    } else {
      messageContainer.innerHTML = wrongMessage;
      explicationContainer.innerHTML = explanation;
      clickedButton.style.backgroundColor = "#F44336";
      clickedButton.style.color = '#ffffff';
      const correctButton = Array.from(
        responseContainer.querySelectorAll("button")
      ).find((button) => button.value == correctAnswer);
      if (correctButton) {
        correctButton.style.backgroundColor = "#4CAF50";
        correctButton.style.color = '#ffffff';
      }
    }
  }

  questionnaire.splice(i, 1);
  return question;
}

function applyNextQuestion(questionnaire) {
  // Vérifier que le questionnaire n'est pas vide, si vide, alors faire un return
  if (questionnaire.length === 0) {
    //  return;
  }

  let nextQuestion = getQuestionRandomly(questionnaire);
  quizContainer.innerHTML = nextQuestion.question;
}

function isGameOver(questionnaire) {
  return questionnaire.length === 0;
}

async function main() {
  // : Récupérer les questions et réponses du questionnaire
  const questionnaire = await getQuestionsAndResponsesBySubject(matiere);

  applyNextQuestion(questionnaire);

  // TODO : Réagir aux clicks sur les boutons "Réponse apportée" / "Question suivante"
  btnNext.addEventListener("click", () => {
    if (!btnNext.disabled) {
      if (isGameOver(questionnaire)) {
        // TODO : Gérer la fin du jeu
        btnNext.innerHTML = "Terminer";
        btnNext.addEventListener('click', () => {
          document.location.href= `debrief.html?score=${score}`;
        })  
      } else {
        applyNextQuestion(questionnaire);
        btnNext.disabled = true;
      }

    }
  });
}

main();
