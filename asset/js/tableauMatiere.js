import { addElement } from "./modules/addElement.js";

document.addEventListener("DOMContentLoaded", function () {
    fetch("asset/json/6eme/matiere_6.json")
    .then(response => response.json())
    .then(response => {
        let matieres = response.matieres;
        let container = document.getElementById('matieres');

            matieres.map(matiere => {
                let card = addElement('a', ["w-32", "h-32", "border-2", "flex", "justify-center", "items-center"], {href:`#${matiere}`}, `${matiere}`);
                container.appendChild(card);
            });
           
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération du fichier JSON:", error);
        });
});