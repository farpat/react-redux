# Etapes du dév " Gestion des comptes "

Jusqu'ici je suis allé jusqu'à la mise en place de mon front-end et réfléchi à mon back-end. <br>

## Initialisation de NPM
- `npm init -y`
- `npm i -D babel/core babel/preset-env babel-preset-react babel-loader clean-webpack-plugin cross-env uglifyjs-webpack-plugin webpack webpack-cli webpack-dev-server webpack-manifest-plugin`
- `npm i react react-redux react-dom redux`
- Création du fichier webpack.config.js

## Explication de la structure de mon front-end
- `public` : Dossier étant la racine de l'application web
- `ressources\js` : Dossier contenant les sources
  - `index.js` : Point d'entrée de l'application. On initialise un seul store à cet endroit => store qui sera utilisé tout au long de l'application.
  - `actions\index.js` : Fichier d'organisation des noms d'actions.
  - `components` : Dossier contenant l'ensemble des composants de présentations (Il n'y a que du dév métier car que du dév React)
  - `containers` : Dossier contenant l'ensemble des composants conteneurs => On connecte un composant de présentation à un composant conteneur lorsqu'on a besoin de lui envoyer des données du store (dispatch ou state)
  - `reducers` : Chaque fichier contient l'ensemble des fonctions appelées au moment du dispatch (modifiant le seul store déclaré)

## Comment je me suis organisé ?
- Transformation de l'exercice (en vue de le simplifier) + Organisation de ma base de données : 30 min
- Ecriture de 2 templates HTML/CSS : 30 min (pour voir le résultat final de manière statique)
- Mise en place de webpack : 30 min
- Ecriture du front-end : 3h - 4h
- Mise en place du back-end : ?h

## Réflexion sur la mise en place du back-end
- Installation de Symfony 4 (`composer create-project symfony/skeleton`)
- Constructions des entités 
  - `composer require doctrine`
  - `php bin/console make:entity X` => Prenons l'entité la plus dure " Account " (Compte bancaire). J'ai défini une relation " Account appartient à un seul \[Customer]\ " et " Account est géré par plusieurs \[Customer\]"
  - `php bin/console doctrine:migrations:diff` => Pour générer les migrations (fichiers PHP)
  - `php bin/console doctrine:migrations:migrate` => Pour exécuter les migrations
  - `composer require --dev doctrine/doctrine-fixtures-bundle` => Pour la mise en place des données de test
  - Je crée ensuite toute la logique de code servant à insérer des données dans la méthode load de la classe App\DataFixtures\AppFixtures
  - Maintenant je peux imaginer mon API REST (Chaque URL serait précédé de /api/) :
      - GET /customers => Retourne le tableau de tous les clients
      - GET /accounts => Retourne un tableau (indexé par idCustomer qui correspondrait à l'identifiant du client propriétaire) de tous les comptes.
      - GET /customers/accounts => Retourne un tableau (indexé par idCustomer qui correspondrait à l'id du compte) d'ids des clients pouvant gérer le compte mise en index.
      - GET /categories => Retourne le tableau de toutes les catégories (indexé par idCategory)
      - GET /lines => Retourne le tableau de toutes les lignes comptables (indexé par idAccount)
      
      - POST /category => Rajout d'une catégorie
      - POST /account/{idAccount}/lines => Rajout d'une ligne comptable
      
      - PUT /category/{idCategory} => Edition d'une catégorie
      - PUT /account/{idAccount}/lines/{idLine} => Edition d'une ligne comptable
      
      - DELETE /category/{idCategory} => Suppression d'une catégorie
      - DELETE /account/{idAccount}/lines/{idLine} => Suppressin d'une ligne comptable