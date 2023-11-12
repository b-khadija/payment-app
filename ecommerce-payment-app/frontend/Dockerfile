# Première étape : Construire l'application React
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/frontend

# Copier les fichiers de configuration et de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers backend
COPY . .

# Construire l'application React
RUN npm run build

# Exposer sur le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]