# Api-product

Une API RESTful et une application Web pour gérer des produits, construite avec Node.js, Express, MongoDB, et React.

---

## 📂 Structure du projet

### Backend
- **Langage** : TypeScript
- **Framework** : Express.js
- **Base de données** : MongoDB
- **Validation des données** : Zod
- **Documentation API** : Swagger
- **Authentification** : JWT
- **WebSocket** : Socket.IO

---

## 🚀 Fonctionnalités
- **Backend** :
  - CRUD pour les produits (Create, Read, Update, Delete).
  - Documentation de l'API avec Swagger.
  - Validation des données avec Zod.
  - Intégration de MongoDB pour la gestion des produits.
  - WebSocket pour synchronisation en temps réel.
  - Authentification basée sur des tokens JWT.

---

## ⚙️ Installation et démarrage

### 1. Prérequis
- **Node.js** (version 14 ou supérieure)
- **MongoDB** (installé et démarré)
- **npm** ou **yarn**

---

### 2. Cloner le dépôt
```bash
git clone https://github.com/youssefla01/api-product.git
cd api-product

```
---

### 3. Configuration des variables d'environnement

- Créer un fichier .env dans le répertoire backend/ avec les variables suivantes :

---

### 4. Installation des dépendances

- cd api-product
- npm install

### 5. Démarrage de l'application

- npm run dev


### 6. Documentation de l'API avec Swagger

- http://localhost:5000/api-docs


## 📜 API Endpoints

### **Base URL** : `http://localhost:5000/products`

| Méthode | Endpoint | Description                  |
|---------|----------|------------------------------|
| GET     | `/`      | Récupérer tous les produits  |
| POST    | `/`      | Ajouter un nouveau produit   |
| PUT     | `/:id`   | Modifier un produit existant |
| DELETE  | `/:id`   | Supprimer un produit         |

---

## 📋 Modèle de données

### Produit
```json
{
  "_id": "1",
  "name": "AC1 Phone1",
  "type": "phone",
  "price": 200.05,
  "rating": 3.8,
  "warranty_years": 1,
  "available": true
}

