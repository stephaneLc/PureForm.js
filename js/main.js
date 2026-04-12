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


        dataJson.fields.forEach(formElement => {
            
            const container = document.createElement("div");

            const label = document.createElement("label");
                          label.setAttribute("for", formElement.id);
                          label.innerHTML = formElement.label[language];

            const errorMessage = document.createElement("p");
                                errorMessage.className = "error";

                                if(formElement.validation.required.message?.[language]){
                                    errorMessage.innerHTML = formElement.validation.required.message[language]
                                }

            switch (formElement.tag) {
                case "select":
                    const containerSelect = document.createElement("div");
    
                    const tagSelect = document.createElement(formElement.tag);
                                      tagSelect.setAttribute("name", formElement.name);
                                      tagSelect.setAttribute("id", formElement.id);

                    const labelSelect = document.createElement("label");
                                labelSelect.setAttribute("for", formElement.id);
                                labelSelect.innerHTML = formElement.label[language];
                                
                    formElement.options.forEach(option =>{
                           tagSelect.add(new Option(option.text[language],option.value));
                           
                    });

                    containerSelect.appendChild(labelSelect);
                    containerSelect.appendChild(tagSelect);
                    divForm.appendChild(containerSelect)

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
                                                radioCheckInput.setAttribute("type",formElement.type);
                                                radioCheckInput.setAttribute("value", option.value);

                                                if(formElement.id !==''){
                                                    radioCheckInput.setAttribute("id", formElement.id);
                                                }

                                    label.appendChild(radioCheckInput);
                                    fieldset.appendChild(label);

                                });
                                 
                                fieldset.appendChild(legend);

                                divForm.appendChild(fieldset);

                            break;
                    
                        default:
                            const containerInput = document.createElement("div");
                            const tagInput = document.createElement(formElement.tag);
                             container.className = "inputLabel";
     
                            if(formElement.tag !== 'textarea'){
                                tagInput.setAttribute("value", ""); 
                            }

                            if(formElement.tag == 'textarea'){
                                tagInput.setAttribute("rows", 10);
                                tagInput.setAttribute("cols",50);
                            }

                            if(formElement.type !==''){
                                tagInput.setAttribute("type", formElement.type);
                            }

                            if(formElement.id !==''){
                                tagInput.setAttribute("id", formElement.id);
                            }
                            
                            containerInput.appendChild(label);
                            containerInput.appendChild(errorMessage);
                            containerInput.appendChild(tagInput);
                            
                            divForm.appendChild(containerInput);

                        break;
                    }

                break;
            }
                    
            divForm.appendChild(btn);

        });

    } catch (error) {
        divForm.innerText = "Une erreur est survenu" + ' ' + error;
    }
}


function floatingLabelsOnInput(){
  
    document.querySelectorAll("input").forEach( input => {

        if(input.type !== "radio" && input.type !=="checkbox"){

            if(input.value !== ''){
                input.nextElementSibling.classList.add("active");

            }else{
                input.nextElementSibling.classList.remove("active");

            }

            input.addEventListener("input", () =>{
                if(input.value !== ''){
                    input.nextElementSibling.classList.add("active");

                }else{
                    input.nextElementSibling.classList.remove("active");

                }

            });

        }

    });

}

function optionSelected(){

    document.querySelectorAll("select").forEach(select => {

        if(select.value !== ''){
            console.log('a un option');
            select.classList.add("active");
        }else{
            console.log('pas select');
            select.classList.remove("active");
        }

        select.addEventListener("change", () =>{

            if(select.value !== ''){
                console.log('a un option');
                select.classList.add("active");
            }else{
                console.log('pas select');
                select.classList.remove("active");
            }

        });

    });

}

floatingLabelsOnInput();
optionSelected();
