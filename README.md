<div align="center">

# 🛒 API — Budjet

**API REST d'authentification, de produits et de commandes**

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-d63aff)
![bcrypt](https://img.shields.io/badge/Mots_de_passe-bcrypt-2ea44f)

</div>

---

## Sommaire

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Démarrage rapide](#démarrage-rapide)
- [Variables d'environnement](#variables-denvironnement)
- [Endpoints](#endpoints)
- [Structure](#structure)
- [Base de données](#base-de-données)

## Aperçu

API de test pour le site *Budjet* : gestion des comptes, d'un catalogue de produits et de commandes, avec contrôle d'accès par rôle (utilisateur, propriétaire, administrateur).

## Fonctionnalités

- **Authentification** : inscription et connexion, mots de passe hachés (`bcrypt`), sessions par **JSON Web Token**
- **Rôles** : middlewares `auth` (connecté), `admin` (administrateur) et `owner` (propriétaire de la ressource)
- **CRUD** produits, commandes et utilisateurs
- **Journalisation** des requêtes via un middleware dédié
- **Base créée automatiquement** au démarrage (schémas SQL + jeux de données de départ)
- **Routes chargées dynamiquement** : tout fichier `routes/*.routes.js` est monté sur `/api/<nom>`

## Démarrage rapide

Prérequis : **Node.js ≥ 20.6** et un serveur **MySQL / MariaDB**.

```bash
git clone https://github.com/loan-heron/api.git
cd api
npm install
cp .env.example .env     # puis renseigner les valeurs
npm run dev              # rechargement automatique
# ou
npm start
```

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `PORT` | Port du serveur |
| `DB_HOST` / `DB_PORT` | Serveur MySQL |
| `DB_USER` / `DB_PASSWORD` | Identifiants MySQL |
| `DB_NAME` | Nom de la base (créée si absente) |
| `JWT_SECRET` | Clé de signature des tokens |
| `JWT_EXPIRES_IN` | Durée de validité des tokens |

## Endpoints

Toutes les routes sont préfixées par `/api`. 🔓 public · 🔑 connecté · 👤 propriétaire · 🛡️ administrateur

### Authentification — `/api/auth`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| `POST` | `/register` | 🔓 | Créer un compte |
| `POST` | `/login` | 🔓 | Se connecter, reçoit un token |

### Produits — `/api/product`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/` | 🔓 | Lister les produits |
| `GET` | `/:id` | 🔓 | Détail d'un produit |
| `POST` | `/` | 🛡️ | Créer un produit |
| `PUT` | `/:id` | 🛡️ | Modifier un produit |
| `DELETE` | `/:id` | 🛡️ | Supprimer un produit |

### Commandes — `/api/order`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/` | 🛡️ | Toutes les commandes |
| `GET` | `/me` | 🛡️ | Mes commandes |
| `GET` | `/:id` | 🛡️ | Détail d'une commande |
| `POST` | `/` | 🛡️ | Créer une commande |
| `PUT` | `/:id` | 🛡️ | Modifier une commande |
| `DELETE` | `/:id` | 🛡️ | Supprimer une commande |

### Utilisateurs — `/api/user`

| Méthode | Route | Accès | Description |
|---|---|---|---|
| `GET` | `/` | 🛡️ | Lister les utilisateurs |
| `GET` | `/me` | 🔑 | Profil courant |
| `GET` / `PUT` | `/profile/:id` | 👤 | Lire / modifier un profil |
| `PUT` | `/change-password` | 👤 | Changer son mot de passe |
| `GET` / `DELETE` | `/:id` | 👤 | Lire / supprimer un compte |
| `GET` | `/admin`, `/admin/:id` | 🛡️ | Lister / lire les administrateurs |
| `PUT` | `/admin/set/:id` | 🛡️ | Promouvoir un administrateur |

Les routes protégées attendent l'en-tête `Authorization: Bearer <token>`.

## Structure

```
app.js              Point d'entrée : base, montage des routes, serveur
controllers/        Logique métier (auth, user, product, order)
routes/             Déclaration des routes et de leurs middlewares
middlewares/        auth, admin, owner, logger
databases/
├── db.config.js    Connexion, création de la base, exécution des schémas
├── schema/         Tables users, products, orders
└── seed/           Données de départ
```

## Base de données

Trois tables : `users` (rôle administrateur via `is_admin`), `products` (nom unique, prix) et `orders` (clés étrangères vers `users` et `products`, quantité, statut). Les schémas sont dans [`databases/schema`](databases/schema).

---

<div align="center">Réalisé par <a href="https://github.com/loan-heron">Loan Heron</a></div>
