const db = require("../models");

module.exports = {
    findAll: (req, res) => {
        db.RealArticles
            .find(req.query)
            .sort
    }
}