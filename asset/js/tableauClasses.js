import { addElement } from "./modules/addElement.js";

const tableauClasses = [
    "6eme",
    "5eme",
    "4eme",
    "3eme"
]

let container = document.getElementById('classes');

tableauClasses.map(item => {
    let card = addElement('a', ["flex", "w-32", "h-32", "bg-blue-500","justify-center", "items-center", "text-center"], { href:"#" }, `${item}`);
    container.appendChild(card);
})