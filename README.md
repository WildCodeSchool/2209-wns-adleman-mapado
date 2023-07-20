Commandes : 
  - lancer le front et le back via docker : docker compose up 
  - Rebuild les images via docker : docker compose up --build
  - Lancer les tests : jest --watchAll
  - lancer la partie mobile : npx expo start 
  - update les query graphql : npm run codegen 


Déploiement continu : 
  - se connecter au serveur (depuis Ubuntu si sur windows): ssh wns_student@adleman2.wns.wilders.dev -p 2269
  - mdp : jecode4wns
  - build l'image client avant de la pousser sur docker-hub. Faire cd/client: docker build -t grischk/mapado-client .
  - build l'image serveur avant de la pousser sur docker-hub. Faire cd/server: docker build -t grischk/mapado-server .
  - push l'image sur docker-hub : docker push grischk/mapado-server
  - push l'image sur docker-hub : docker push grischk/mapado-client
  - lancer le build de production : sh deploy-production.sh
  

