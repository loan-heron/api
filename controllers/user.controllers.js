exports.getUsers = async (req, res) => {

    try {

        const db = req.app.locals.db;

        const [users] = await db.query("SELECT * FROM users ORDER BY id ASC");

        res.json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {

        console.error("Erreur lors de la récupération des utilisateurs :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des utilisateurs"
        });
    }
};

exports.getUserById = async (req, res) => {

    try {

        const db = req.app.locals.db;

        const userId = req.params.id;
        const [user] = await db.query(`SELECT * FROM users WHERE id = ${userId}`);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur inexistant"
            });
        }

        res.json({
            success: true,
            data: user[0]
        });

    } catch (error) {

        console.error("Erreur lors de la récupération de l'utilisateur :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de l'utilisateur"
        });
    }
};

exports.deleteUser = async (req, res) => {

    try {
        const db = req.app.locals.db;
        const userId = req.params.id;

        const [result] = await db.query(`DELETE FROM users WHERE id = ${userId}`);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur inexistant"
            });
        }

        res.json({
            success: true,
            message: "Utilisateur supprimé"
        });

    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression de l'utilisateur"
        });
    }
};

exports.setAdminUser = async (req, res) => {

    try {
        const db = req.app.locals.db;
        const userId = req.params.id;

        const [is_admin] = await db.query(`SELECT is_admin FROM users WHERE id = ${userId}`);

        if (is_admin.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur inexistant"
            });
        }

        const [result] = await db.query(`UPDATE users SET is_admin = ${!is_admin[0].is_admin} WHERE id = ${userId}`);

        res.json({
            success: true,
            message: "Droits administrateur mis à jour"
        });

    } catch (error) {
        console.error("Erreur lors de la mise à jour des droits administrateur :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour des droits administrateur"
        });
    }
};

exports.getAdminUserById = async (req, res) => {

    try {
        const db = req.app.locals.db;
        const userId = req.params.id;

        const [user] = await db.query(`SELECT is_admin FROM users WHERE id = ${userId}`);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur inexistant"
            });
        }

        res.json({
            success: true,
            data: { is_admin: user[0].is_admin }
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des droits administrateur :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des droits administrateur"
        });
    }
};

exports.getAdminUsers = async (req, res) => {

    try {
        const db = req.app.locals.db;
        const [admins] = await db.query(`SELECT * FROM users WHERE is_admin = 1`);

        res.json({
            success: true,
            data: admins
        });

    } catch (error) {
        console.error("Erreur lors de la récupération de la liste des administrateurs :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de la liste des administrateurs"
        });
    }
};

exports.getProfilUserById = async (req, res) => {

    try {
        const db = req.app.locals.db;
        const userId = req.params.id;
        const [user] = await db.query(`SELECT id, name, email FROM users WHERE id = ${userId}`);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur inexistant"
            });
        }

        res.json({
            success: true,
            data: user[0]
        });

    } catch (error) {

        console.error("Erreur lors de la récupération de l'utilisateur :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de l'utilisateur"
        });
    }
};

exports.updateProfilUserById = async (req, res) => {

    try {
        const db = req.app.locals.db;
        const userId = req.params.id;
        const { name, email } = req.body;

        const [result] = await db.query(`UPDATE users SET name = '${name}', email = '${email}' WHERE id = ${userId}`);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur inexistant"
            });
        }

        res.json({
            success: true,
            message: "Profil utilisateur mis à jour"
        });

    } catch (error) {

        console.error("Erreur lors de la mise à jour du profil utilisateur :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour du profil utilisateur"
        });
    }
};

exports.getCurrentUser = async (req, res) => {

    try {
        const db = req.app.locals.db;
        const userId = req.user.id;
        const [user] = await db.query(`SELECT id, name, email FROM users WHERE id = ${userId}`);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur inexistant"
            });
        }

        res.json({
            success: true,
            data: user[0]
        });

    } catch (error) {

        console.error("Erreur lors de la récupération de l'utilisateur :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de l'utilisateur"
        });
    }
};