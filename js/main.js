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

        
       
    } catch (error) {
        console.log("une erreur" + error);
    }
}

getJsonData();
