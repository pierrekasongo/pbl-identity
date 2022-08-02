# PBL-IDENTITY

Ceci est une application simple qui gère les visites des abonnés dans un hôpital

## Installation
- Premièrement il faut cloner le depôt sur votre poste local
    > git clone git@github.com:pierrekasongo/pbl-identity.git
- Changer vers le repértoire
    > cd pbl-identity
- Lancer l'installation du backend:
    > cd backend
    > npm install
- Create une base de données sous MYSQL et configurer le fichier sous backend/config/config.example.json
- Installer electron avec npm ou télécharger
- Exécuter ou importer le script de la base de données disponible dans backend/config/pbl.sql
- Ce fichier crééra la base de données et un utilisateur par défaut.

## Lancement et accès à l'application
 - Lancer l'application
    > cd backend
    > npm start ou electron .
 - Connectez-vous à l'application avec les paramètres ci-dessous:
    > Utilisateur: root
    > Mot de passe: root@pbl.org
 




