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
                    form.setAttribute("class",dataJson.form.class)

                    divForm.appendChild(form);

        const btn = document.createElement(dataJson.button.tag);
                    btn.setAttribute("type",dataJson.button.type);
                    btn.textContent = dataJson.button.text[language];
                    btn.setAttribute("class", dataJson.button.class);

        dataJson.fields.forEach(formElement => {

            const label = document.createElement("label");
                          label.setAttribute("for", formElement.id);
                          label.innerHTML = formElement.label[language];
            
            let errorMessage = null;

                if(formElement.validation.required.value){
                    errorMessage = document.createElement("p");
                        errorMessage.className = "message error";

                        if(formElement.validation.required.message?.[language]){
                            errorMessage.innerHTML = formElement.validation.required.message[language]
                        }
                }


            switch (formElement.tag) {
                case "select":
                    const containerSelect = document.createElement("div");
    
                    const tagSelect = document.createElement(formElement.tag);
                                      tagSelect.setAttribute("name", formElement.name);

                                      if(formElement.id !==''){
                                        tagSelect.setAttribute("id", formElement.id);
                                      }

                    const labelSelect = document.createElement("label");
                                labelSelect.setAttribute("for", formElement.id);
                                labelSelect.innerHTML = formElement.label[language];

                    let errorMessageSelect = null; 

                    if(formElement.validation.required.value){
                            errorMessageSelect = document.createElement("p");
                            errorMessageSelect.className = "message error";

                            if(formElement.validation.required.message?.[language]){
                                errorMessageSelect.innerHTML = formElement.validation.required.message[language];
                            }
                    }

 
                    formElement.options.forEach(option =>{
                           tagSelect.add(new Option(option.text[language],option.value));
                           
                    });

                    containerSelect.className = "form__select";

                    if(errorMessageSelect){
                        containerSelect.appendChild(errorMessageSelect);
                    }
                    
                    containerSelect.appendChild(labelSelect);
                    containerSelect.appendChild(tagSelect);

                    form.appendChild(containerSelect);

                break;

                default:

                    switch (formElement.type) {
                        case 'radio':
                        case 'checkbox':
                            const containerGroupFieldset = document.createElement("div");
                            const fieldset = document.createElement('fieldset');
                            const legend = document.createElement('legend');

                                containerGroupFieldset.className = "form__group";
                                legend.innerHTML = formElement.label[language];
                                fieldset.appendChild(legend);

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

                                    label.prepend(radioCheckInput);
                                    fieldset.appendChild(label);

                                });
                                 
                                if(errorMessage){
                                    containerGroupFieldset.appendChild(errorMessage);
                                }
                                
                                containerGroupFieldset.appendChild(fieldset);
                         
                                form.appendChild(containerGroupFieldset);

                            break;
                    
                        default:
                            const containerGroup = document.createElement("div");
                            const containerInput = document.createElement("div");
                            const tagInput = document.createElement(formElement.tag);

                            if(formElement.id !==''){
                                tagInput.setAttribute("id", formElement.id);
                                containerInput.className = "inputLabel";
                                tagInput.setAttribute("name", formElement.name);
                            }

                            if(formElement.tag == 'textarea'){
                                tagInput.setAttribute("rows", 10);
                                tagInput.setAttribute("cols",50);
                                containerInput.className = "form__textarea";
                                containerInput.appendChild(label);

                                if(errorMessage){
                                    containerInput.appendChild(errorMessage);
                                }

                                containerInput.appendChild(tagInput);
                                
                            }else{
                                containerGroup.className = "form__group";
                                containerInput.className = "form__field";
                                tagInput.setAttribute("type", formElement.type);
                                tagInput.setAttribute("value", ""); 
                                
                                if(errorMessage){
                                    containerGroup.appendChild(errorMessage);
                                }
                                    containerInput.appendChild(tagInput);
                                    containerInput.appendChild(label);
                            }
                            
                                if(errorMessage){
                                    containerGroup.appendChild(errorMessage);
                                }
                                
                                    containerGroup.appendChild(containerInput);
                                    form.appendChild(containerGroup);

                        break;
                    }

                break;
            }
                    
            form.appendChild(btn);

        });

        checkFields(form,dataJson.fields,language);
        floatingLabelsOnInput();
        optionSelected();

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
            select.classList.add("active");
        }else{
            select.classList.remove("active");
        }

        select.addEventListener("change", () =>{

            if(select.value !== ''){
                select.classList.add("active");
            }else{
                select.classList.remove("active");
            }

        });

    });

}


async function checkFields(form, jsonData, language) {
    const btnSubmit = document.querySelector("button");
    const inputs = document.querySelectorAll("input,select,textarea");
  
    btnSubmit.addEventListener('click', function(event){
        event.preventDefault();

        let formValide = true; 

        inputs.forEach(input => {
   
            const compareInputToDataJson = jsonData.find(jsonData => jsonData.name ===input.name);

            const infofieldName = document.querySelector(`[name="${input.name}"]`);

            switch (compareInputToDataJson.type) {
                case "radio":
                        const groupeRadio = document.querySelectorAll(`[name="${input.name}"]`);
                        const isRadioChecked = Array.from(groupeRadio).some(radio => radio.checked);
                        const errorRadio = document.querySelector(`[name="${input.name}"]`).closest('.form__group').querySelector('.error');
                        
                        if(isRadioChecked){
                            errorRadio.style.display = 'none';
                        }else{
                            errorRadio.style.display = 'block';
                            formValide =  false;
                        }
                    break;
                case "checkbox": 
                    const groupeCheckbox = document.querySelectorAll(`[name="${input.name}"]`);
                    const isCheckboxChecked = Array.from(groupeCheckbox).filter(check => check.checked).length >= compareInputToDataJson.validation.required.minChecked;
                    const errorCheckbox = document.querySelector(`[name="${input.name}"]`).closest('.form__group').querySelector('.error');

                    if(isCheckboxChecked){
                        errorCheckbox.style.display = 'none';
                    }else{
                        errorCheckbox.style.display = 'block';
                        formValide =  false;
                    }
                    break;
                case "tel" : 
                case "email": 

                    if(compareInputToDataJson.validation.required.value && input.value ===''){
                            infofieldName.parentElement.previousElementSibling.style.display = "block";
                            formValide =  false;
                    }else if(compareInputToDataJson.validation.format && input.value !==''){
                        const phoneRegex =  new RegExp(compareInputToDataJson.validation.format.pattern);

                        if(!phoneRegex.test(input.value)){
                            infofieldName.parentElement.previousElementSibling.innerHTML = compareInputToDataJson.validation.format.message[language];
                            infofieldName.parentElement.previousElementSibling.style.display = "block";
                            formValide =  false;                            
                        }else{
                            infofieldName.parentElement.previousElementSibling.style.display = "none";
                        }

                    }

                    break;

                default: 

                    if(compareInputToDataJson && compareInputToDataJson.validation.required.value && (input.value =='' || infofieldName.value == '')){
                        
                        formValide =  false;

                        if(compareInputToDataJson.tag === 'select'){
                            infofieldName.closest(".form__select").querySelector('.error').style.display ="block"
                        }else{
                            infofieldName.parentElement.previousElementSibling.style.display = "block";
                        }

                    }else if(infofieldName.parentElement.previousElementSibling !== null){
                        
                        if(compareInputToDataJson.tag === 'select'){
                            infofieldName.closest(".form__select").querySelector('.error').style.display ="none"
                        }else{
                            infofieldName.parentElement.previousElementSibling.style.display = "none";
                        }

                    } 

            }

        });

        if(formValide){
            const formData = new FormData(form);
            sendForm(formData,inputs);
        }

    });

}

async function sendForm(params,inputs) {
    
    try {

        const objetParams ={};
        for(const [key,value] of params){

            if(objetParams[key]){
                objetParams[key] = [].concat(objetParams[key],value);

            }else{
                objetParams[key] = value;
                
            }
        }

        const response = await fetch("php/form-handler.php",{
            method: 'POST',
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify(objetParams)
        });

        if(!response.ok){
            throw new Error(`Statut de réponse: ${response.status}`);
        }

        const resultat = await response.json();

        const messageSucces = document.createElement("p");
        messageSucces.className = "message succes";
        messageSucces.id = "succes"
        messageSucces.innerHTML =  "Le formulaire a été envoyé avec succès avec les infos suivante: ";

        //Delete the previous message
        const isSuccessExists = document.getElementById("succes");
        if(isSuccessExists){
            isSuccessExists.remove();
        }

        document.getElementById("divForm").prepend(messageSucces);

        for (const clef in resultat.donnees){

            const ligneResultat = document.createElement("p");
            ligneResultat.className = "resultat";
            ligneResultat.textContent = `${clef}: ${resultat.donnees[clef]}`;

            document.getElementById("succes").appendChild(ligneResultat);
        }

        inputs.forEach(input =>{
           
            if(input.type === 'radio' || input.type === 'checkbox'){
                input.checked = false;
            }else{
                input.value = "";
            }

        });

        floatingLabelsOnInput();

    } catch (error) {
         divForm.innerText = "Une erreur est survenu" + ' ' + error;
    }
}
