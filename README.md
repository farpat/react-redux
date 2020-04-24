# Mise en route
- `npm install`
- `npm run dev`
- open `http://localhost:3003/public`

# Explication de la structure de mon front-end
- `public` : Dossier étant la racine de l'application web
- `ressources\js` : Dossier contenant les sources
  - `app.js` : Point d'entrée de l'application. On initialise un seul store à cet endroit => store qui sera utilisé tout au long de l'application.
  - `actions\index.js` : Fichier d'organisation des noms d'actions.
  - `components` : Dossier contenant l'ensemble des composants
  - `reducers` : Chaque fichier contient l'ensemble des fonctions appelées au moment du dispatch (modifiant le seul store déclaré)
  