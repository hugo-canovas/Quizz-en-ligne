import { addElement } from "./modules/addElement.js";

let url = new URL(window.location.href);
let classe = url.searchParams.get('classe');

document.addEventListener("DOMContentLoaded", function () {
    fetch(`asset/json/${classe}/matiere.json`)
    .then(response => response.json())
    .then(response => {
        let matieres = response.matieres;
        let container = document.getElementById('matieres');

            matieres.map(matiere => {
                let card = addElement('a', ["w-32", "h-32", "border-2", "flex", "justify-center", "items-center"], {href:`questionnaire.html?classe=${classe}&matiere=${matiere}`}, `${matiere}`);
                container.appendChild(card);
            });
           
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération du fichier JSON:", error);
        });
});