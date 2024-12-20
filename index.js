// Importation des modules requis
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware pour vérifier les heures de travail
const workHoursMiddleware = (req, res, next) => {
    const currentDate = new Date();
    const day = currentDate.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    const hour = currentDate.getHours();
    console.log(currentDate)
    console.log(day)
    console.log(hour)

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Autoriser l'accès si dans les heures de travail
    } else {
        res.send("L'application web est disponible uniquement du lundi au vendredi, de 9h à 17h.");
    }
};



// Utilisation du middleware
app.use(workHoursMiddleware);

// Middleware pour les fichiers statiques
// app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route pour la page "Nos services"
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'services.html'));
});



// Route pour la page "Nous contacter"
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});