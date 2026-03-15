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

            console.log('element', element);

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
                console.log('bouton', bouton.nomBalise);
                const btn = document.createElement(bouton.nomBalise);
                btn.setAttribute("type",bouton.submit);
                btn.textContent = bouton.text

                document.getElementById("form").appendChild(btn);

            });

        });


    } catch (error) {
        console.log("une erreur" + error);
    }
}

afficherFormulaire();