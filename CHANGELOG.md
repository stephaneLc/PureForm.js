# Changelog

## [1.0.0] - 2026-05-12


### Ajouté

- Mise en page de la page
- Mise en page du formulaire avec les composantes
- Affichage des messages d'erreur dynamiques
- Validation des champs côté client
- Envoi formulaire via Fetch API avec traitement PHP
- Génération dynamique du formulaire via un JSON
- Support multilingue via le JSON
- Implantation du SASS
- Fonction positionnement du label pour un input remplie
- Fonction pour afficher état du select avec option sélectionner
- Style guide de mise en page des composantes
- Afficher message d'erreur générique au formulaire
- Gestion automatique de la case 'Tous les choix' - coche toutes cases ou se coche quand tous sont sélectionnés
- Ajouter le formatage automatique du champ téléphone au format 555-555-5555
- Ajouter le changement de langue
- Gestion des textes génériques d'erreurs via i18n.json
- Détection du JavaScript du navigateur avec message d'avertissement
- Lien vers le guide des styles avec la mise en page via i18n.json
- Ajouter texte d'introduction avec titre du projet

### Corrigé

- Ajustement du responsive pour le checkbox
- Modifier l'emplacement de la balise legend
- Ajout du textarea manquant dans l'intégration du formulaire
- Correction de l'ordre d'affichage du legend dans le fieldset
- Regrouper le input et label dans un div et regrouper les éléments dans un groupe
- Correction de l'affichage du message d'erreur suite à l'ajustement de la structure HTML des champs
- Correction du vidage des valeurs radio/checkbox après l'envoi du formulaire
- Remettre le label à l'état initial après l'envoi du formulaire
- Correction syntaxe nom de class pour afficher le style message de succès
- Correction alignement des éléments du formulaire lors de l'affichage des messages d'erreurs
- Correction du querySelector ciblant le mauvais bouton entre le bouton du changement de langue et le bouton du submit
- Ajustement du path pour le fetch en ligne

### Modifié

- Renommage des variables SASS communes (input, select, textarea) en '--field-base'
- Rendre les messages génériques du formulaire dynamique à partir du JSON
- Optimiser le retrait du message succès ou erreur dans une même fonction
- Rendre le nombre minimum de cases à cocher dynamique dans le message d'erreur
- Mise en page du bloc de résultat
- Remplacer texte des erreurs par i18n.json
- Centralisation de l'affichage du message d'avertissement dans une fonction dédiée
- Ajustement visuel avec astérisque pour champs obligatoires du formulaire

