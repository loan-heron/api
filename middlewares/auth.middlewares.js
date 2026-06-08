const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Token d'authentification manquant ou mal formaté"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token d'authentification manquant ou mal formaté"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        
        const db = req.app.locals.db;
        const [users] = await db.query(
            `SELECT id, email, is_admin
             FROM users
             WHERE id = ?`,
            [decoded.id]
        );
        
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur introuvable"
            });
        }
        
        req.user = users[0];
        next();
        
    } catch (error) {

        console.error("Erreur lors de la vérification du token :", error);

        res.status(401).json({
            success: false,
            message: "Token d'authentification invalide ou expiré"
        });
    }
}