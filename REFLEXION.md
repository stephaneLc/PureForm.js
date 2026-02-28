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