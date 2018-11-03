const mongoose = require("mongoose");
const db = require("../models");

module.exports = {
    findAll: (req, res) => {
        //lastId displayed in UI for fakeArticles must be sent to server. If truthy in req.body, server will send back id's greater than the lastId (fake articles that aren't being displayed);
        if (req.query.lastId) {
            db.FakeArticles
                /* req.query.lastId is truthy
                query --> /?lastId=Object(id) 
                yields --> {lastId: Object(id)}
                */
                .find({_id: {$gte: req.query.lastId}})
                .populate("RealArticles")
                .sort({timeScraped: -1})
                .limit(20)
                .then(dbFArticles => res.json(dbFArticles))
                .catch(err => res.status(422).json(err));
        } else {
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
        }
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
                src: (not required)
                url:
                sourceId:
                author: (not required)
                summary:
                category: (not required)
                timePublished:
            timeScraped, articleType, articleSource are given by default, (Date.now, "fake", "The Onion")
            */
            .create(req.body)
            .then(dbFArticles => res.json(dbFArticles))
            .catch(err => res.status(422).json(err));
    },
    updateWithContent: (req, res) => {
        db.FakeArticles
        /* 
            req.body.content needs to be an array of strings.
        */
            .findOneAndUpdate({ _id: req.params.id }, {$push: {content: {$each: req.body.content}}})
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
    updateScoreOfAssociatedRealArticle: (req, res) => {
        db.FakeArticles
            .findOneAndUpdate({_id: req.params.id, "associatedRealNews._id": req.body.associatedRealNewsId}, {$set: {"associatedRealNews.$.score": req.body.score}})
            .then(updated => res.json(updated))
            .catch(err => res.status(422).json(err));
    },
    remove: (req, res) => {
        db.FakeArticles
            .findByIdAndRemove({ _id: req.params.id })
            .then(() => res.json({message: "Removal Successful"}))
            .catch(err => res.status(422).json(err));
    }
}