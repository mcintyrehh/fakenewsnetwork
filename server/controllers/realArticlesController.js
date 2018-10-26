const db = require("../models");

module.exports = {
    findAll: (req, res) => {
        db.RealArticles
            .find(req.query)
            .limit(20) //indexing
            .then(dbRArticles => res.json(dbRArticles))
            .catch(err => res.status(422).json(err));
    },
    findById: (req, res) => {
        db.RealArticles
            .findById(req.params.id)
            .then(dbRArticles => res.json(dbRArticles))
            .catch(err => res.status(422).json(err));
    },
    create: (req, res) => {
        db.RealArticles
            /* req.body should include
                title:
                src:
                excerpt:
            */
            .create(req.body)
            .then(dbRArticles => res.json(dbRArticles))
            .catch(err => res.status(422).json(err));
    },
    update: (req, res) => {
        db.RealArticles
            .findOneAndUpdate({ _id: req.params.id }, {title: req.body.title, src: req.body.src, excerpt: req.body.excerpt})
            .then(dbRArticles => res.json(dbRArticles))
            .catch(err => res.status(422).json(err));
    },
    remove: (req, res) => {
        db.RealArticles
            .findByIdAndRemove({ _id: req.params.id })
            .then(() => res.json({message: "Removal of the Real...Successful"}))
            .catch(err => res.status(422).json(err));
    }
}