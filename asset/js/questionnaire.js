import { addElement } from "./modules/addElement.js";

const url = new URL(window.location.href);
const classe = url.searchParams.get("classe");
const matiere = url.searchParams.get("matiere");

const quizContainer = document.getElementById("quiz-container");
const btnNext = document.getElementById("btn-next");

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
  // Déclarer les variables du jeu : score
  let score = 0;

  applyNextQuestion(questionnaire);

  // TODO : Réagir aux clicks sur les boutons "Réponse apportée" / "Question suivante"
  btnNext.addEventListener("click", () => {
    console.log(questionnaire);
    if (isGameOver(questionnaire)) {
      // TODO : Gérer la fin du jeu
      console.log("Fin du jeu");
    } else {
      applyNextQuestion(questionnaire);
    }
  });
}

main();