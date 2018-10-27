const db = require("../models");

module.exports = {
    findAll: (req, res) => {
        if (req.query.lastId) {
            db.RealArticles
                .find({_id: {$gte: req.query.lastId}})
                .limit(20) 
                .then(dbRArticles => res.json(dbRArticles))
                .catch(err => res.status(422).json(err));
        } else {
            db.RealArticles
                .find(req.query)
                .limit(20) 
                .then(dbRArticles => res.json(dbRArticles))
                .catch(err => res.status(422).json(err));
        }
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
                url:
                summary:
                articleSource: 
            */
            .create(req.body)
            .then(dbRArticles => res.json(dbRArticles))
            .catch(err => res.status(422).json(err));
    },
    update: (req, res) => {
        db.RealArticles
            .findOneAndUpdate({ _id: req.params.id }, {title: req.body.title, src: req.body.src, summary: req.body.excerpt})
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