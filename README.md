# payment-app

## Description 
Création d'une page e-commerce, avec des articles en vente et une validation de commande.

## Prérequis
- Docker
- Node
- npm
- React

## Installation
1. **Cloner le projet**
  ```
  git clone https://github.com/b-khadija/payment-app.git
  ```
2. **Accéder au répertoire**
  ```
  cd payment-app
  cd ecommerce-payment-app
  ```
3. **Installer les dépendances du front-end**
  ```
  cd frontend
  npm install
  ```
4. **Revenir à la racine du projet**
  ```
  cd ..
  ```
5. **Installer les dépendances du front-end**
  ```
  cd backend
  npm install
  ```
6. **Définir vos clées d'environnement**
   - Ouvrez le fichier docker-compose.yml
     > Modifier les informations suivantes pour 'mysql_db:'
     ```
       environment:
      - DB_HOST=mysql_db (NE PAS MODIFIER)
      - MYSQL_ROOT_PASSWORD=choisissez votre mot de passe pour l'utilisateur root
      - MYSQL_DATABASE=The_Bradery (NE PAS MODIFIER)
      - MYSQL_USER=Choisissez votre nom d'utilisateur
      - MYSQL_PASSWORD=Choisissez un mot de passe
     ```
     
     > Modifier les informations suivantes pour 'backend:'
     > reprendre les mêmes informations saisies pour mysql_db
     ```     
       environment:
      - DB_HOST=mysql_db (NE PAS MODIFIER)
      - DB_USER=Choisissez votre nom d'utilisateur
      - DB_PASSWORD=Choisissez un mot de passe
      - DB_NAME=The_Bradey (NE PAS MODIFIER)
      - DB_PORT=$DB_PORT (NE PAS MODIFIER)
     ```

## Configuration Docker

> 🚨 Lancer Docker Desktop

1. **Lancer les conteneurs Docker**
  ```
  docker-compose up
  ```
## Accéder à l'application

1. Ouvrez votre navigateur et accédez à http://localhost:3000
2. Faites une sélection d'articles
3. Accéder à votre panier
4. Valider votre panier 
> Les quantitées sont limiter au stock dans l'inventaire 

## Arrêt de l'application

Utiliser les commandes suivantes
```
CMD + C ou Ctrl + C
```
