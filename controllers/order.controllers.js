exports.getOrders = async (req, res) => {
    // Logique pour récupérer toutes les commandes
    try {

        const db = req.app.locals.db;
        const [orders] = await db.execute("SELECT * FROM orders");
        res.json(orders);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des commandes" });
    }
};

exports.getOrderById = async (req, res) => {
    // Logique pour récupérer une commande par ID
    try {

        const { id } = req.params;
        const db = req.app.locals.db;
        const [order] = await db.execute("SELECT * FROM orders WHERE id = ?", [id]);
        if (order.length === 0) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }
        res.json(order[0]);
    } catch (error) {
        console.error("Erreur lors de la récupération de la commande :", error);
        res.status(500).json({ error: "Erreur lors de la récupération de la commande" });
    }
};

exports.createOrder = async (req, res) => {
    // Logique pour créer une nouvelle commande
    try {

        const { userId, productId, quantity, status } = req.body;
        const db = req.app.locals.db;
        const [result] = await db.execute("INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)", [userId, productId, quantity, status]);
        res.status(201).json({ id: result.insertId, userId, productId, quantity, status });
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        res.status(500).json({ error: "Erreur lors de la création de la commande" });
    }
};

exports.updateOrder = async (req, res) => {
    // Logique pour mettre à jour une commande existante
    try {

        const { id } = req.params;
        const { userId, productId, quantity, status } = req.body;
        const db = req.app.locals.db;
        if (userId) {
            await db.execute("UPDATE orders SET user_id = ? WHERE id = ?", [userId, id]);
        }
        if (productId) {
            await db.execute("UPDATE orders SET product_id = ? WHERE id = ?", [productId, id]);
        }
        if (quantity) {
            await db.execute("UPDATE orders SET quantity = ? WHERE id = ?", [quantity, id]);
        }
        if (status !== undefined) {
            await db.execute("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
        }
        res.json({ id, userId, productId, quantity, status });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la commande" });
    }
};

exports.deleteOrder = async (req, res) => {
    // Logique pour supprimer une commande
    try {

        const { id } = req.params;
        const db = req.app.locals.db;
        const [result] = await db.execute("DELETE FROM orders WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }
        res.json({ message: "Commande supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la commande :", error);
        res.status(500).json({ error: "Erreur lors de la suppression de la commande" });
    }
};

exports.getMyOrders = async (req, res) => {
    // Logique pour récupérer les commandes d'un utilisateur spécifique
    try {
        const userId = req.user.id;
        const db = req.app.locals.db;
        const [orders] = await db.execute("SELECT * FROM orders WHERE user_id = ?", [userId]);
        res.json(orders);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des commandes de l'utilisateur" });
    }
};