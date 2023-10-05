import { addElement } from "./modules/addElement.js";

let url = new URL(window.location.href);
let classe = url.searchParams.get('classe');
let matiere = url.searchParams.get('matiere');


    fetch(`asset/json/${classe}/${matiere}.json`)
        .then(response => response.json())
        .then(response => {
            let questionnaire = response.questionnaire;
            console.log(questionnaire)
            questionnaire.map(question => {
                console.log(question.question)
                let reponse = question.answers;

                reponse.map(item => {
                    console.log(item)
                })

                console.log(question.correctAnswer)
                
                
            })
        })
