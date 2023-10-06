import { addElement } from "./modules/addElement.js";

const url = new URL(window.location.href);
const classe = url.searchParams.get("classe");
const matiere = url.searchParams.get("matiere");

const quizContainer = document.getElementById("quiz-container");
const btnNext = document.getElementById("btn-next");
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
  let correctAnswer = question.correctAnswer;
  let correctMessage = question.correctMessage;
  let wrongMessage = question.wrongMessage;
  let explanation = question.explanation;
  let questionAnswered = false; // Nouvelle variable

  responseContainer.innerHTML = "";
  messageContainer.innerHTML = "";
  explicationContainer.innerHTML = "";

  answers.map(item => {
    let cardResponse = addElement('button', ["border-2", "p-4", "rounded-lg", "hover:bg-blue-600"], {value:`${item}`}, `${item}`);
    cardResponse.addEventListener('click', function() {
      if (!questionAnswered) {
        handleButtonClick(cardResponse);
      }
    });
    responseContainer.appendChild(cardResponse);
  });

  function handleButtonClick(clickedButton) {
    questionAnswered = true;

    if (clickedButton.value == correctAnswer) {
      messageContainer.innerHTML = correctMessage;
      explicationContainer.innerHTML = explanation;
      score++;
    } else {
      messageContainer.innerHTML = wrongMessage;
      explicationContainer.innerHTML = explanation;
    }

    // clickedButton.style.cursor = 'not-allowed';
    // clickedButton.disabled = true;
  }

  questionnaire.splice(i, 1);
  return question;
}



function applyNextQuestion(questionnaire) {
  // Vérifier que le questionnaire n'est pas vide, si vide, alors faire un return
  if (questionnaire.length === 0) {
    console.log("Fin du jeu");
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
    if (isGameOver(questionnaire)) {
      // TODO : Gérer la fin du jeu
      console.log("Fin du jeu");
      btnNext.innerHTML = "Terminer";
      btnNext.addEventListener('click', () => {
        document.location.href= `debrief.html?score=${score}`;
      })  
    } else {
      applyNextQuestion(questionnaire);
    }
  });
}

main();

