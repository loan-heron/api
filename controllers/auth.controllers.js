const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont requis"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            `INSERT INTO users (name, email, password)
             VALUES (?, ?, ?)`,
            [name, email, hashedPassword]
        );

        const user = {
            id: result.insertId,
            name,
            email,
            is_admin: false
        };

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(201).json({
            success: true,
            message: "Utilisateur créé et connecté",
            data: {
                ...user,
                token
            }
        });

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                success: false,
                message: "Email déjà utilisé"
            });
        }

        console.error("Erreur lors de la création de l'utilisateur :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la création de l'utilisateur"
        });
    }
};

exports.connectUser = async (req, res) => {
    try {
        
        const db = req.app.locals.db;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont requis"
            });
        }

        const [user] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur inexistant"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Mot de passe incorrect"
            });
        }

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.json({
            success: true,
            message: "Connexion réussie",
            data: { id: user[0].id, name: user[0].name, email: user[0].email, is_admin: user[0].is_admin, token }

        });

    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de la connexion de l'utilisateur"
        });
    }
};