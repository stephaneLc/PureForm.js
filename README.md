# PureForm.js

## Projet

Le but est d'utiliser uniquement un JSON pour créer la structure d'un formulaire. C'est le JSON qui va indiquer le type d'inputs, les attributs, les messages reliés et le bouton d'envoi.  

## Technologie

- JSON
- JavaScript
- HTML - limité 
- PHP - traitement de l'envoi
- SASS

## Contrainte 

- Aucun HTML pour le formulaire
- Utilisation uniquement d'un JSON pour construire entièrement le formulaire
- Utilisation du pur JavaScript pour afficher le formulaire

## But principal

Je me suis mis des contraintes volontaires pour le développement du projet pour me forcer à réfléchir à la structure des données, à la manipulation du DOM sans filet et à bâtir le fonctionnement. 

## Instruction

1. Cloner le dépôt
2. Serveur local requis avec PHP
3. Placer le projet dans le dossier de votre serveur local
4. Accéder via l'URL du Localhost

### Configuration

#### Langue par Défaut

 La langue par défaut peut être modifiée via langDefault dans le fichier main.js

#### Ajouter/modifier champs du formulaire

La modification du formulaire se fait dans le fichier formulaire.json tout en respectant le format. 

#### Ajouter/modifier texte général

La modification pour du texte général au projet se fait dans le fichier i18n.json.

### SASS - version Dart 1.23

   -  Le changement de style de base se fait dans le fichier _variables.scss

   - Les variables pour cibler des éléments spécifiques sont gérées dans le fichier _root.scss


## Démo

 [lien du projet](https://labocode.dev/pureformjs/)

## Outils de développement

- **Autofill du formulaire** [dev-defaults.js](js/dev-defaults.js) : 

Fichier de développement qui remplit automatiquement les champs du formulaire pour accélérer le développement, les tests de validation et d'envoi. À retirer en production.

### Instruction

Ajouter le script du fichier avant la balise body. 

### Démarche et raisonnement

[Démarche et raisonnement](REFLEXION.md)

## À venir

- Envoi du formulaire via courriel en PHP
 

