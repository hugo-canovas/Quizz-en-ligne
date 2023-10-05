import { addElement } from "./modules/addElement.js";

const tableauClasses = [
    "6eme",
    "5eme",
    "4eme",
    "3eme"
]

let container = document.getElementById('test');

tableauClasses.map(item => {
    let card = addElement('div', [], {}, `${item}`);
    container.appendChild(card);
})