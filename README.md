# ToDo - Application Todo en React

## Fonctionnalités :

### Navbar :
- Création de listes
- Ouverture d'une liste par simple clic
- Navigation fluide entre les différentes listes
- Possibilité de renommer une liste
- Suppression de listes
- Ajout de listes aux favoris pour les placer en tête de liste
- Modes Clairs et Sombres disponibles

### Liste ouverte :
- Ajout de tâches
- Importation de fichiers CSV avec les dates des tâches
- Exportation de la liste au format CSV

### Gestion des tâches :
- Suppression de tâches
- Renommage de tâches
- Attribution d'une date d'échéance
- Validation des tâches pour marquer leur achèvement
- Barre de progression pour visualiser l'avancement de la liste

## Axes d'amélioration :
- Actuellement, toutes les données sont stockées localement. L'utilisation d'une base de données serait recommandée pour conserver les listes en mémoire.
- Lors de l'ajout d'une tâche, la date d'échéance par défaut est la date actuelle. Il aurait été préférable de laisser ce champ vide par défaut.
- L'application ne fournit pas d'indication pour avertir l'utilisateur en cas de dépassement de la date d'échéance d'une tâche.
