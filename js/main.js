async function getJsonData(){
    try {
        const jsonData = await fetch("../json/formulaire.json");
        console.log(jsonData);
        
        if(!jsonData.ok){
             //console.log('Erreur ' + jsonData.status);
            throw new Error(jsonData.status);
        }

        const infosJson = await jsonData.json(); //créer l'objet Javascript

        console.log(infosJson); //résultat de l'oject 
        console.log(infosJson.form[0].titre); //afficher le titre du formulaire. 
        console.log(infosJson.form[0].champs[0]) //afficher l'objet de l'input

        const titreBalise = document.createElement("h2"); //création de la balise
        titreBalise.innerHTML = infosJson.form[0].titre; //ajouter le titre entre les balises

        document.getElementById("form").appendChild(titreBalise); //afficher le titre en h2

        const containerInput = document.createElement("div");
        containerInput.className = "inputLabel";

        const label = document.createElement("label");
        label.innerHTML = infosJson.form[0].champs[0].label;

        const errorMessage = document.createElement("p");
        errorMessage.className = "error";
        errorMessage.innerHTML = infosJson.form[0].champs[0].erreurMessage;

        const input = document.createElement(infosJson.form[0].champs[0].nomBalise); 
        input.setAttribute("type", infosJson.form[0].champs[0].type);
        input.setAttribute("name", infosJson.form[0].champs[0].name);
        input.setAttribute("value", "");

        containerInput.appendChild(label);
        containerInput.appendChild(errorMessage);
        containerInput.appendChild(input);
        
                            
        document.getElementById("form").appendChild(containerInput);

        
       
    } catch (error) {
        console.log("une erreur" + error);
    }
}

getJsonData();
