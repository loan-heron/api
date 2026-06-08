module.exports = (req, res, next) => {

    const userId = Number(req.params.id);

    // Admin
    if (req.user.is_admin) {
        return next();
    }

    // Utilisateur propriétaire
    if (req.user.id === userId) {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: "Accès refusé"
    });

};