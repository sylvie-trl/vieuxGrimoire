### Au Vieux Grimoire – Backend API

API REST développée avec Node.js, Express et MongoDB dans le cadre du projet OpenClassrooms.

Cette API permet :

- L’authentification des utilisateurs (inscription / connexion)
- La gestion complète des livres (CRUD)
- L’upload et l’optimisation d’images
- La notation des livres
- L’affichage des livres les mieux notés

### Technologies utilisées

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (authentification sécurisée)
- Bcrypt (hashage des mots de passe)
- Multer (gestion upload images)
- Sharp (optimisation des images)

### Installation

# Cloner le projet

`git clone <URL_DU_REPO>`
`cd backend`

# Installer les dépendances

`npm install`

# Configuration des variables d’environnement

Créer un fichier .env à la racine du dossier backend :

`MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>`
`JWT_SECRET=RANDOM_TOKEN_SECRET`

⚠️ Le fichier .env ne doit jamais être versionné.

# Configuration MongoDB Atlas

Créer un cluster MongoDB Atlas
Créer un utilisateur (Database Access)
Ajouter une IP autorisée dans Network Access : 0.0.0.0/0

### Lancer le serveur

Mode production
`npm start`

Mode développement
`npm run dev`

Le serveur démarre sur : http://localhost:4000

### Endpoints API

# Authentification

Méthode Route Description
POST /api/auth/signup Inscription utilisateur
POST /api/auth/login Connexion utilisateur

# Livres

Méthode Route Description
GET /api/books Récupérer tous les livres
GET /api/books/:id Récupérer un livre
GET /api/books/bestrating Récupérer les 3 livres les mieux notés
POST /api/books Créer un livre
PUT /api/books/:id Modifier un livre
DELETE /api/books/:id Supprimer un livre
POST /api/books/:id/rating Noter un livre

### Gestion des images

Upload via Multer
Optimisation via Sharp
Stockage dans le dossier /images
Suppression automatique lors de la modification ou suppression d’un livre

### Sécurité

Authentification via JWT
Vérification du propriétaire pour modification/suppression
Un utilisateur ne peut noter un livre qu’une seule fois
Validation des notes (entre 0 et 5)

### Structure du projet

backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── images/
├── app.js
├── server.js
└── package.json

### Tests

Les endpoints peuvent être testés via :
Postman
Le frontend associé au projet

Projet réalisé par Sylvie Trollé
Projet réalisé dans le cadre du parcours Développeur Web - OpenClassrooms
