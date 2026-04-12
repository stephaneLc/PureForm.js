

document.addEventListener("DOMContentLoaded", ()=>{
    const divForm = document.getElementById("divForm");
    const language = 'fr';

    constructForm(divForm,language);
});

async function getJson(divForm){
    try {
        const jsonData = await fetch("../json/formulaire.json");
        
        if(!jsonData.ok){
            throw new Error(jsonData.status);
        }

        const dataJson = await jsonData.json();

        return dataJson;

       
    } catch (error) {
        divForm.innerText = "Une erreur est survenu" + ' ' + error;
    }
}


async function constructForm(divForm, language) {
    try {
        const dataJson = await getJson();

        if(!dataJson) {
            throw new Error("Les données ne sont pas disponible");
        }

        const titleForm = document.createElement("h2");
                        titleForm.innerHTML = dataJson.titre[language];

                        divForm.appendChild(titleForm);

        const form = document.createElement(dataJson.form.tag);
                    form.setAttribute("action", dataJson.form.action);
                    form.setAttribute("methode",dataJson.form.method);
                    form.setAttribute("id",dataJson.form.id);

                    divForm.appendChild(form);

        const btn = document.createElement(dataJson.button.tag);
                    btn.setAttribute("type",dataJson.button.type);
                    btn.textContent = dataJson.button.text[language];

                    divForm.appendChild(btn);



        dataJson.fields.forEach(formElement => {
            
            const container = document.createElement("div");
                            container.className = "inputLabel";

            const label = document.createElement("label");
                        label.setAttribute("for", formElement.id);
                        label.innerHTML = formElement.label[language];

            const errorMessage = document.createElement("p");
                                errorMessage.className = "error";

                                if(formElement.validation.required.message?.[language]){
                                    errorMessage.innerHTML = formElement.validation.required.message[language]
                                }


            const tag = document.createElement(formElement.tag);
                    /* tag.setAttribute("type", formElement.type); */
                    tag.setAttribute("name", formElement.name);
                    tag.setAttribute("id", formElement.id);
                   /*  tag.setAttribute("value", "");    */
                                
            switch (formElement.tag) {
                case "select":

                    const option = document.createElement("option");

                    formElement.options.forEach(option =>{
                           tag.add(new Option(option.text[language],option.value))
                    });

                break;

                case "textarea":
                    console.log('texarea');
                    tag.setAttribute("rows", 10);
                    tag.setAttribute("cols",50);
                break;

                default:

                    switch (formElement.type) {
                        case 'radio':
                        case 'checkbox':
                                const fieldset = document.createElement('fieldset');
                                const legend = document.createElement('legend');

                                legend.innerHTML = formElement.label[language];

                                formElement.options.forEach(option => {
                                    
                                    const radioCheckInput = document.createElement(formElement.tag); 
                                    const label = document.createElement("label");
                                   
                                    label.innerHTML = option.text[language];

                                    radioCheckInput.setAttribute("name", formElement.name);
                                    radioCheckInput.setAttribute("id", formElement.id);
                                    radioCheckInput.setAttribute("type",formElement.type);
                                    radioCheckInput.setAttribute("value", option.value);

                                    label.appendChild(radioCheckInput);
                                    fieldset.appendChild(label);

                                });
                                 
                                fieldset.appendChild(legend);
                                divForm.appendChild(fieldset);

                            break;
                    
                        default:
                            tag.setAttribute("type", formElement.type);        
                            /* tag.setAttribute("id", formElement.id) */
                            tag.setAttribute("value", ""); 
                        break;
                    }

                break;
            }
                    
            container.appendChild(label);
            container.appendChild(errorMessage);
            container.appendChild(tag);
            divForm.appendChild(container);
        });

    } catch (error) {
        divForm.innerText = "Une erreur est survenu" + ' ' + error;
    }
}

