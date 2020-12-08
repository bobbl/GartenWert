# GartenWert

Progressive Web App zur Wertermittlung von Anpflanzungen und Anlagen in Schrebergärten

Projekt initialisieren:

    npm install

PWA lokal unter localhost:8080 bereitstellen:

    npm run serve

Für den Einsatz kompilieren:

    npm run build

Favicons aus den Logos erstellen:

    npx vue-pwa-asset-generator -a logo_gartenwert_blau.svg -o public/img/icons/
    rm public/img/icons/manifest.json
    mv public/img/icons/favicon.ico public/

