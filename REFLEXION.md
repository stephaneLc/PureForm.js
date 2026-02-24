# Démarche et raisonnement

## Démarche 

Sachant que le JSON est grandement utilisé pour la clarté et la facilité de structurer les données selon le besoin. 


Je me demandais s'il était possible de créer un formulaire en utilisant uniquement un JSON pour afficher le contenu, les messages d'erreurs et le message de succès. Je prévois utiliser du pur JavaScript pour afficher chaque élément basé sur l'information du JSON. 


## Réflexion initiale

- Mon hypothèse est qu'il est possible de créer un formulaire avec un JSON en le voyant comme une structure: 



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



- Il sera possible d'afficher certains éléments du JSON avec l'utilisation du JavaScript. 


- J'ai un doute pour générer entièrement l'input de la structure HTML avec les actions reliées à ceux-ci. 


- PHP pour permettre l'envoi du formulaire. 

## Structure du projet

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