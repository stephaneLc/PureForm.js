document.addEventListener("DOMContentLoaded", async ()=>{
    const divForm = document.getElementById("divForm");
    const btnsLang = document.querySelectorAll(".language");
    const langDefault = 'fr';
    let language =  document.documentElement.lang = langDefault;

    const i18nData = await getI18n(language);

    constructForm(divForm,language,i18nData);
    changeLanguage(language);

    function changeLanguage(language){
        
        btnsLang.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.lang === language);
        });
        
    }

    btnsLang.forEach(btn =>{
        
        btn.addEventListener('click', function() {
            language = btn.dataset.lang;
            document.documentElement.lang = language;
            divForm.innerHTML = '';
            constructForm(divForm,language,i18nData);
            changeLanguage(language);
        });

    });

});

async function getI18n(language){
    try {
        const i18n = await fetch("../json/i18n.json");

        if(!i18n.ok){
            throw new Error(i18n.status);
        }

        const i18nJson = await i18n.json();

        return i18nJson;

    } catch (error) {
        
        if(language === 'fr'){
            console.log("i18n n'est pas disponible", error);
        }else{
            console.log("i18n is not available", error);
        }
        
        return null; 
    }

}

async function getFormJson(i18nData,language){
    try {
        const jsonData = await fetch("../json/formulaire.json");
        
        if(!jsonData.ok){
            throw new Error(jsonData.status);
        }

        const dataJson = await jsonData.json();

        return dataJson;

       
    } catch (error) { 
        warningMalfunction(i18nData,language);
        console.log('function getFormJson', error);
    }
}


async function constructForm(divForm, language, i18nData) {
  
    try {
        const dataJson = await getFormJson(i18nData,language);

        if(!dataJson) {
                  
            return;
            
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

                            if(formElement.type === "checkbox"){
                                errorMessage.innerHTML = formElement.validation.required.message[language].replace("{minChecked}",formElement.validation.required.minChecked);
                            }else{
                                errorMessage.innerHTML = formElement.validation.required.message[language];
                            }
                           
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

        checkFields(form,dataJson.fields,dataJson.form.message,i18nData,language);
        floatingLabelsOnInput();
        optionSelected();
        autoFormatPhone();
        autoCheckedOnAll();

    } catch (error) {
        warningMalfunction(i18nData,language);
        console.log('function constructForm', error);
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


async function checkFields(form, jsonData, formMessages,i18nData,language) {
    const btnSubmit = document.querySelector("button[type='submit']");
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
            sendForm(formData,inputs,formMessages,i18nData,language);
            
        }else{

            deleteGenericMessage();

            const messageError = document.createElement("p");
            messageError.className = "message error generic";
            messageError.id = "error"
            messageError.innerHTML =  formMessages.error[language];

            form.before(messageError);
        }

    });

}

async function sendForm(params,inputs,formMessages,i18nData,language) {
    
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
            throw new Error(`${i18nData.error.response.message[language]} ${response.status}`);
        }

        const resultat = await response.json();

        const messageSucces = document.createElement("p");
        messageSucces.className = "message succes";
        messageSucces.id = "succes"
        messageSucces.innerHTML =  formMessages.succes[language];

        deleteGenericMessage();

        form.before(messageSucces);
        
        const conteneurResultat = document.createElement("div");
        const titleContenuResultat = document.createElement("h3");
        let titleResultat = "";

        if(language ==='fr'){
                titleResultat = 'Résultat de l\'envoi';
        }else{
                titleResultat = 'Result of the submission';
        }

        titleContenuResultat.textContent = titleResultat;
        conteneurResultat.className = "resultat";
        conteneurResultat.id ="resultat";
        conteneurResultat.appendChild(titleContenuResultat);

        for (const clef in resultat.donnees){

            const ligneResultat = document.createElement("p");
                  ligneResultat.innerHTML = `<strong>${clef}:</strong> ${resultat.donnees[clef]}`;
            
                  conteneurResultat.appendChild(ligneResultat);
        }

        document.getElementById("succes").after(conteneurResultat);

        inputs.forEach(input =>{
           
            if(input.type === 'radio' || input.type === 'checkbox'){
                input.checked = false;
            }else{
                input.value = "";
            }

        });

        floatingLabelsOnInput();

    } catch (error) {
        warningMalfunction(i18nData,language);
        console.log('function sendForm', error);
    }
}


function deleteGenericMessage(){

    const isMessageError = document.getElementById("error");
    if(isMessageError){
        isMessageError.remove();
    }

    const isSuccessExists = document.getElementById("succes");
    if(isSuccessExists){
        isSuccessExists.remove();
    }

    const isResultat = document.getElementById("resultat");
    if(isResultat){
        isResultat.remove();
    }

}

function autoCheckedOnAll(){

    const checkboxAll = document.querySelector('input[type="checkbox"][value="all"]');
    const allCheckBox = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxAll.addEventListener('change', function(){
        allCheckBox.forEach(checkbox =>{
            checkbox.checked = checkboxAll.checked;
        });
    });

    allCheckBox.forEach(checkbox =>{
        if(checkbox !== checkboxAll){
            checkbox.addEventListener('change', function(){
                if(!checkbox.checked){
                    checkboxAll.checked = false
                }else{
                    const allChecked = Array.from(allCheckBox)
                    .filter(oneCheckBox => oneCheckBox !== checkboxAll)
                    .every(oneCheckBox => oneCheckBox.checked);
                        checkboxAll.checked = allChecked;
                }

            });

        }

    });
    
}

function autoFormatPhone(){
    const inputPhone = document.querySelector('input[type="tel"]');

    inputPhone.addEventListener('input', function(){
        let digits = inputPhone.value.replace(/\D/g,'').slice(0,10); 

        if(digits.length > 6){
            inputPhone.value =  `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
        }else if(digits.length > 3){
            inputPhone.value =  `${digits.slice(0,3)}-${digits.slice(3)}`;
        }else{
            inputPhone.value = digits;
        }

    });

}

function warningMalfunction(i18nData,language){
 
    const warningP = document.createElement('p');
          warningP.setAttribute("class", "message warning");
          warningP.innerText = i18nData.error.data.message[language];
          divForm.appendChild(warningP);

}