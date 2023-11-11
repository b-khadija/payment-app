# Première étape : Construire l'application React
FROM node:20 as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de configuration et de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers backend
COPY . .

# Construire l'application React
RUN npm run build

# Image légère Node.js finale
FROM node:14-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Utilisez l'image légère Nginx pour servir l'application construite
FROM nginx:alpine

# Copiez les fichiers construits de l'application React
COPY --from=build /app/build /app/build

# Exposer le port sur lequel Nginx fonctionnera
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]