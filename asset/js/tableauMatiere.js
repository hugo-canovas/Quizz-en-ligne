import { addElement } from "./modules/addElement.js";

let url = new URL(window.location.href);
let classe = url.searchParams.get('classe');

// Liste des classes de couleur
const colors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

document.addEventListener("DOMContentLoaded", function () {
    fetch(`asset/json/${classe}/matiere.json`)
    .then(response => response.json())
    .then(response => {
        let matieres = response.matieres;
        let container = document.getElementById('matieres');

        matieres.map((matiere, index) => {
            // Création de classe de couleur aléatoire à partir de la liste
            const randomColor = colors[index % colors.length];

            // Création de la carte
            let card = addElement('a', ["w-64", "h-64", randomColor, "rounded-lg", "text-white", "text-center", "text-2xl", "font-semibold", "p-4", "m-4", "hover:shadow-md", "transition", "duration-300", "ease-in-out", "flex", "items-center", "justify-center"], { href:`questionnaire.html?classe=${classe}&matiere=${matiere}`}, `${matiere}`);
            
            // Ajout de la carte au conteneur
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération du fichier JSON:", error);
    });
});
