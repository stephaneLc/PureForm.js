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

        dataJson.form.forEach((element,index) => {
            
            const titreBalise = document.createElement("h2"); //création de la balise
            titreBalise.innerHTML = dataJson.form[index].titre; //ajouter le titre entre les balises

            document.getElementById("form").appendChild(titreBalise);

            //console.log(element);
            //console.log(index);
            //console.log(element.titre); 
            //console.log(element.champs);
            //console.log(element.champs[index]);
            //console.log(element.champs[0].nomBalise);

            //console.log(element.champs[0]);

            element.champs.forEach((champs, indexChamps) => {
                //console.log(champs)
                //console.log(indexChamps);

                const containerInput = document.createElement("div");
                containerInput.className = "inputLabel";

                const label = document.createElement("label");
                label.innerHTML = champs.label;

                const errorMessage = document.createElement("p");
                errorMessage.className = "error";
                errorMessage.innerHTML = champs.erreurMessage;

                const input = document.createElement(champs.nomBalise); 
                input.setAttribute("type", champs.type);
                input.setAttribute("name", champs.name);
                input.setAttribute("value", "");

                containerInput.appendChild(label);
                containerInput.appendChild(errorMessage);
                containerInput.appendChild(input);
                
                document.getElementById("form").appendChild(containerInput);
            });


        });

    } catch (error) {
        console.log("une erreur" + error);
    }
}

afficherFormulaire();