async function getJsonData(){
    try {
        const jsonData = await fetch("../json/formulaire.json");
        //console.log(jsonData);
        
        if(!jsonData.ok){
             //console.log('Erreur ' + jsonData.status);
            throw new Error(jsonData.status);
        }

        const infosJson = await jsonData.json(); //créer l'objet Javascript

        return infosJson;

       
    } catch (error) {
        console.log("une erreur" + error);
    }
}


async function afficherFormulaire() {
    try {
        const dataJson = await getJsonData();

        //console.log(dataJson);
        if(!dataJson) {
            //console.log("Les données ne sont pas disponible");
            throw new Error("Les données ne sont pas disponible");
        }


        dataJson.form.forEach(element =>{

            //console.log('element', element);

            const titreBalise = document.createElement("h2");
            titreBalise.innerHTML =  element.titre;
            document.getElementById("divForm").appendChild(titreBalise);
           
            //console.log('titre', element.titre);

            element.formulaire.forEach(formulaire => {
                //console.log('formulaire', formulaire);

                const form = document.createElement(formulaire.balise);
                form.setAttribute("action", formulaire.action);
                form.setAttribute("methode",formulaire.methode);
                form.setAttribute("id",formulaire.id);

                document.getElementById("divForm").appendChild(form);
                //console.log(form);
            });

            element.champs.forEach(champ => {
                //console.log('champ', champ);
                const containerInput = document.createElement("div");
                containerInput.className = "inputLabel";

                const label = document.createElement("label");
                label.innerHTML = champ.label;

                const errorMessage = document.createElement("p");
                errorMessage.className = "error";
                errorMessage.innerHTML = champ.erreurMessage;

                const input = document.createElement(champ.nomBalise); 
                input.setAttribute("type", champ.type);
                input.setAttribute("name", champ.name);
                input.setAttribute("value", "");

                containerInput.appendChild(label);
                containerInput.appendChild(errorMessage);
                containerInput.appendChild(input);
                
                document.getElementById("form").appendChild(containerInput);


            });

            element.button.forEach(bouton =>{
                //console.log('bouton', bouton.nomBalise);
                const btn = document.createElement(bouton.nomBalise);
                btn.setAttribute("type",bouton.type);
                btn.textContent = bouton.text

                document.getElementById("form").appendChild(btn);

            });

            verifierChamps(form,element.champs);

        });

    } catch (error) {
        console.log("une erreur" + error);
    }

}


async function verifierChamps(form,jsonData) {
    
    const btnSubmit = document.querySelector("button");
    const inputs = document.querySelectorAll("input");
  
    btnSubmit.addEventListener('click', function(event){
        event.preventDefault();

        let formValide = true; 

        inputs.forEach(input => {

            const comparatifInputJson = jsonData.find(jsonData => jsonData.name === input.name);

            const infoInputError = document.querySelector(`[name="${input.name}"]`).previousElementSibling;

            if(comparatifInputJson && comparatifInputJson.obligatoire && input.value ==''){
          
                infoInputError.style.display = "block";
                formValide =  false;
                   
            }else{
                
                infoInputError.style.display = "none";

            }

        });
       
        if(formValide){
            const formData = new FormData(form);
            sendForm(formData,inputs);
        }

        
    });
    
}

async function sendForm(params,inputs) {
    //console.log('envoyer');
    //console.log('params', params);
    //console.log('url',document.URL);

    try {
        //console.log('params', params);
        const objetParams = Object.fromEntries(params); // transforme donnée en objet pour un retour en JSON
        //console.log('objetParams', objetParams);

        //console.log('params avant envoi', params); // retourne un array
        //console.log('json stringify', JSON.stringify(params)); //retourne vide

        const response = await fetch("php/traitement.php",{
            method: 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(objetParams)
        });

        if(!response.ok){
            throw new Error(`Statut de réponse: ${response.status}`);
        }

        const resultat = await response.json();
        //console.log('resultat', resultat);
        //console.log('resultat.succes', resultat.succes);
        //console.log('resultat.donnees', resultat.donnees);

        //console.log('response', response);

        const messageSucces = document.createElement("p");
        messageSucces.className = "succes";
        messageSucces.innerHTML =  "Le formulaire a été envoyé avec succès avec les infos suivante: ";

     
        document.getElementById("divForm").appendChild(messageSucces);

        for (const clef in resultat.donnees){
            //console.log(clef,  resultat.donnees[clef]);
            const ligneResultat = document.createElement("p");
            ligneResultat.className = "resultat";
             ligneResultat.textContent = `${clef}: ${resultat.donnees[clef]}`;
            //console.log('clefDonneesHmtl', clefDonneesHmtl);
            //clefDonnees.textContent += resultat.donnees[clef];
            //console.log( clefDonnees.textContent)
            document.getElementById("divForm").appendChild(ligneResultat);
        }

        //permet de vider les inputs rempli
        inputs.forEach(input =>{
            input.value = "";
        })

    } catch (error) {
        console.error("Erreur",error);
    }
}


afficherFormulaire();