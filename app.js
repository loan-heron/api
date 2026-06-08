const express = require("express");
const path = require("path");
const fs = require("fs");

const { initDB } = require("./databases/db.config");

const app = express();

app.use(express.json());

(async () => {
    try {
        const db = await initDB();
        app.locals.db = db;

        console.log("Base de données connectée et prête à l'emploi.");

        const routesDir = path.join(__dirname, "routes");
        const routesFiles = fs.readdirSync(routesDir);

        for (const file of routesFiles) {
            if (file.endsWith(".routes.js")) {
                const route = require(path.join(routesDir, file));
                const routeName = file.replace(".routes.js", "");

                app.use(`/api/${routeName}`, route);

                console.log(`Route /api/${routeName} chargée`);
            }
        }

        app.listen(process.env.PORT, () => {
            console.log(`Le serveur est lancé sur le port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Erreur lors du démarrage de l'API :", error);
        process.exit(1);
    }
})();