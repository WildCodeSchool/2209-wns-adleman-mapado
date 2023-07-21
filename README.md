Commandes :
- lancer le front et le back via docker : docker compose up
- Rebuild les images via docker : docker compose up --build
- Lancer les tests : jest --watchAll
- lancer la partie mobile : npx expo start
- update les query graphql : npm run codegen


Déploiement continu :
- se connecter au serveur (depuis Ubuntu si sur windows): ssh wns_student@adleman2.wns.wilders.dev -p 2269
- build l'image client avant de la pousser sur docker-hub. Faire cd/client: docker build -t grischk/mapado-client .
- build l'image serveur avant de la pousser sur docker-hub. Faire cd/server: docker build -t grischk/mapado-server .
- push l'image sur docker-hub : docker push grischk/mapado-server
- push l'image sur docker-hub : docker push grischk/mapado-client
- pour éviter les étapes précédentes, on peut lancer le script : npm run publish:server et ensuite publish:client
- lancer le build de production : sh deploy-production.sh

Une petite "CheatSheet" des commandes utiles sur nos VPS :

Docker :
Supprimer tout dans docker (pour libérer de l'espace ou régler des conflits) : docker stop $(docker ps -a -q) && docker system prune -a
Consulter les logs : docker ps pour identifier le container qui pose pb puis docker logs <id_container>
Avoir un terminal sur un container docker qui tourne : docker exec -it id_du_container /bin/sh

Webooks :
Editer le fichier de config  de webhook : sudo nano /lib/systemd/system/webhook.service
Editer sa liste de hooks : sudo nano /etc/webhook.conf
Recharger webhook : systemctl restart webhook
Consulter les logs : journalctl -u webhook.service -f

Caddy :
Editer les sous-domaines servis par caddy : sudo nano /etc/caddy/Caddyfile
Recharger Caddy : sudo systemctl reload caddy
