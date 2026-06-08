module.exports = (req, res, next) => {

    const logger = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}`;
    console.log(logger);
    next();

};