# Démarche et raisonnement

## Démarche 

Sachant que le JSON est grandement utilisé pour la clarté et la facilité de structurer les données selon le besoin. 


Je me demandais s'il était possible de créer un formulaire en utilisant uniquement un JSON pour afficher le contenu, les messages d'erreurs et le message de succès. Je prévois utiliser du pur JavaScript pour afficher chaque élément basé sur l'information du JSON. 


## Réflexion initiale

- Mon hypothèse est qu'il est possible de créer un formulaire avec un JSON en le voyant comme une structure: 


```
    {
        "form" : [
            {
                "titreFormulaire" : "formulaire contact en JSON",
                "champs" : [
                    {
                        "nomBalise" : "input",
                        "type" : "email",
                        "label" : "Courriel",
                        "obligatoire" : true,
                        "erreurMessage" : "Le courriel doit être dans le format exemple@courriel.com"
                    }
                ]
            }
        ]
    }
```


- Il sera possible d'afficher certains éléments du JSON avec l'utilisation du JavaScript.


- J'ai un doute pour générer entièrement l'input de la structure HTML avec les actions reliées à ceux-ci. 


- PHP pour permettre l'envoi du formulaire. 


## Réflexion et mise au point

    > Il sera possible d'afficher certains éléments du JSON avec l'utilisation du JavaScript.

        **Confirmé** - il est possible d'afficher les éléments du JSON avec JavaScript. 

    > J'ai un doute pour générer entièrement l'input de la structure HTML avec les actions reliées à ceux-ci

        **Confirmé** - il est possible de générer entièrement l'input avec le JSON
        
        *Note* j'ai ajusté le JSON pour ajouter les attributs  
        
    *Les actions reliées à ceux-ci restent à valider.* 

    **Limite la version actuelle**

    La version actuelle n'est pas optimale, ni maintenanble si on ajouter d'autres inputs au JSON
    La raison est qu'il faut écrire le code pour chaque nouveau champ

    **Piste de solution d'optimisation**
    
    Une boucle pour passer au travers du JSON. 
    La manière pour afficher les éléments reste à déterminer. 

    **Confirmé** - Une boucle permet de passer au travers du JSON. Par contre, j'ai réalisé qu'une deuxième boucle est nécessaire pour afficher les informations du deuxième niveau pour obtenir les informations pour créer l'input et les suivantes.  
    
    Affichage, j'ai pu récupérer le code de l'affichage et l'adapter avec la boucle. L'affichage de l'input que j'ai dû revoir le code d'affichage parce que j'étais déjà dans l'objet et l'index n'était plus nécessaire à cette étape. 

    J'ai déplacé le code d'affichage dans une autre fonction pour alléger la fonction et de respecter le principe d'une responsabilité par fonction. 


    **Prochaine étape**

    - Ajuster le JSON pour afficher tous les éléments d'un formulaire final.

    **Confirmé** - J'ai ajouté l'élément bouton et le formulaire avec leur attribut au JSON.

    - Je pense que je vais devoir ajouter des lignes de code pour afficher les éléments manquants. 

    **Confirmé** - J'ai ajouté des lignes de code pour les nouveaux éléments parce que la structure est différente. 

    - Le code d'affichage final devra probablement être revu.

    **Constat** - Il n'a pas eu besoin de revoir le code d'affichage. Il y a eu des ajouts avec les nouveaux éléments.
    
    **Constat** - J'ai pu optimiser la boucle pour que la fonction soit maintenable si on ajoute d'autres inputs au JSON. Par contre, j'ai constaté la limite lorsque la structure est différente. De plus, je trouvais que la maintenabilité lors de modification ou d'ajout serait plus compliquée à effectuer dont moins efficace. 

    **Solution retenue** 

    Créer une boucle par bloc de la même structure. Cette solution est plus claire en termes de maintenabilité pour ajouter ou modifier la fonction lors de l'évolution du JSON. 


    **Dernière étape**

    - Ajouter les fonctions de vérifications des champs

    **Exploration - Envoi du formulaire**

    - Je vais utiliser Fetch API que je ne connais pas pour l'explorer pour l'envoi du formulaire au lieu de PHP que je connais. 



## Structure du projet

```
root/
├── sass/
│   ├── base/
│   │   ├── root.scss
│   │   └── variables.scss
│   ├── module/
│   │   ├── bouton.scss
│   │   ├── formulaire.scss
│   │   └── main.scss
│   ├── nav/
│   │   ├── header.scss
│   │   └── footer.scss
│   └── stylesheet.scss
├── css/
│   └── stylesheet.min.css
├── json/
│   └── formulaire.json
├── js/
│   └── main.js
└── index.html

```