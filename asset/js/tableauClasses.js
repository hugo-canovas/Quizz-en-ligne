import { addElement } from "./modules/addElement.js";

const tableauClasses = [
    "6eme",
    "5eme",
    "4eme",
    "3eme"
]

let container = document.getElementById('classes');

tableauClasses.map(item => {

    let redirectURL = "";

    switch (item) {
        case "6eme":
            redirectURL = "./6eme.html";
            break;
        case "5eme":
            redirectURL = "./5eme.html";
            break;
        case "4eme":
            redirectURL = "./4eme.html";
            break;
        case "3eme":
            redirectURL = "./3eme.html";
            break;
        default:
            break;
    }

    let card = addElement('a', ["flex", "w-32", "h-32", "bg-white", "border", "border-black", "p-4", "justify-center", "items-center", "text-center", "m-2"], { href: redirectURL}, `${item}`);
    container.appendChild(card);

    card.addEventListener('click', () => {
        console.log(`Clic sur ${item}`);
    });
})