export function addElement(type, classNames, attributes, content){
    const element = document.createElement(type);

    // ajout du nom des classes
    if(classNames){
        element.classList.add(...classNames);
    }

    if(attributes){
        for(const [key, value] of Object.entries(attributes)){
            element.setAttribute(key, value);
        }
    }

    if(content){
        if(typeof content === 'string'){
            element.textContent = content;
        }else{
            element.appendChild(content);
        }
    }
    
    return element;
}