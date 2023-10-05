import { addElement } from "./modules/addElement.js";

const tableauClasses = [
    "6eme",
    "5eme",
    "4eme",
    "3eme"
]

let container = document.getElementById('classes');

tableauClasses.map(item => {
    
    let card = addElement('a', ["flex", "w-32", "h-32", "bg-white", "border", "border-black", "p-4", "justify-center", "items-center", "text-center", "m-2"], { href: `classe.html?classe=${item}`}, `${item}`);
    
    container.appendChild(card);
})