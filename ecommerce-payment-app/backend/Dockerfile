# Image officielle de Node.js
FROM node:20

# Définir le répertoire de travail
WORKDIR /app/backend

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application sera en cours
EXPOSE 8081

# Commande pour lancer l'application
CMD ["npm", "start"]