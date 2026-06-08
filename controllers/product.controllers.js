exports.getProducts = async (req, res) => {
    try {

        const db = req.app.locals.db;
        const [products] = await db.execute("SELECT * FROM products");
        res.json(products);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

exports.getProductById = async (req, res) => {
    try {

        const { id } = req.params;
        const db = req.app.locals.db;
        const [product] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);
        if (product.length === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }
        res.json(product[0]);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

exports.createProduct = async (req, res) => {
    try {

        const { name, description, price } = req.body;
        const db = req.app.locals.db;
        const [result] = await db.execute("INSERT INTO products (name, description, price) VALUES (?, ?, ?)", [name, description, price]);
        res.status(201).json({ id: result.insertId, name, description, price });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

exports.deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const db = req.app.locals.db;
        const [result] = await db.execute("DELETE FROM products WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }
        res.status(200).json({ message: "Produit supprimé avec succès" });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

exports.updateProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, description, price } = req.body;
        const db = req.app.locals.db;
        if (name) {
            await db.execute("UPDATE products SET name = ? WHERE id = ?", [name, id]);
        }
        if (description) {
            await db.execute("UPDATE products SET description = ? WHERE id = ?", [description, id]);
        }
        if (price) {
            await db.execute("UPDATE products SET price = ? WHERE id = ?", [price, id]);
        }
        res.status(200).json({ message: "Produit mis à jour avec succès" });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};