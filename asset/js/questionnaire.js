import { addElement } from "./modules/addElement.js";

let url = new URL(window.location.href);
let classe = url.searchParams.get('classe');
let matiere = url.searchParams.get('matiere');


    fetch(`asset/json/${classe}/${matiere}.json`)
        .then(response => response.json())
        .then(response => console.log(response))
