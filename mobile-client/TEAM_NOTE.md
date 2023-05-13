# Pour utiliser la base de données

Copier l'adresse ip de la connexion wifi sur laquelle le pc est connecté (exemple 192.168.0.00)
Coller cette adresse dans le fichier .env en valeur de la clé GRAPHQL_API_URL. 
Préciser le localhost du back, exemple localhost:4000, en ajoutant ":400" à l'adresse ip.

Exemple de fichier .env:
GRAPHQL_API_URL="http://192.168.0.00:4000"

## Available Scripts

En cas de problème sur Expo Go sur l'app mobile, utiliser la commande :

### `npx start --tunnel`