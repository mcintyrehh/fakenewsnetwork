const db = require("../models");

module.exports = {
    findAll: (req, res) => {
        db.FakeArticles
            /* req.query 
            query --> /?title=GOP 
            yields --> {title: GOP}
            if empty returns all entries,
            could be used for implementing a search input
            */
            .find(req.query)
            .populate("RealArticles")
            .sort({timeScraped: -1})
            .limit(20)
            .then(dbFArticles => res.json(dbFArticles))
            .catch(err => res.status(422).json(err));
    },
    findById: (req, res) => {
        db.FakeArticles
            .findById(req.params.id)
            .populate("RealArticles")
            .then(dbFArticles => res.json(dbFArticles))
            .catch(err => res.status(422).json(err));
    },
    create: (req, res) => {
        db.FakeArticles
            /* req.body should include
                title: 
                src: 
                author:
                excerpt:
            timeScraped & articleType are given by default, (Date.now, "fake") 
            */
            .create(req.body)
            .then(dbFArticles => res.json(dbFArticles))
            .catch(err => res.status(422).json(err));
    },
    updateWithKeywords: (req, res) => {
        db.FakeArticles
            /* 
                req.body.keywords needs to be an array of strings.
            */
            .findOneAndUpdate({ _id: req.params.id }, {$push: {keywords: {$each: req.body.keywords}}})
            .then(dbFArticles => res.json(dbFArticles))
            .catch(err => res.status(422).json(err));
    },
    updateWithRealNews: (req, res) => {
        db.FakeArticles
            //req.body should be {realNewsArticle: ObjectId(id)}
            .findOneAndUpdate({ _id: req.params.id }, {$push: {associatedRealNews: {$each: [req.body], $sort: {score: -1}}}},{multi: true})
            .then(dbFArticles => res.json(dbFArticles))
            .catch(err => res.status(422).json(err));
    },
    remove: (req, res) => {
        db.FakeArticles
            .findByIdAndRemove({ _id: req.params.id })
            .then(() => res.json({message: "Removal Successful"}))
            .catch(err => res.status(422).json(err));
    }
}