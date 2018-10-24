const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const fakeArticlesSchema = new Schema ({
    title: {
        type: String, 
        required: true
    },
    src: {
        type: String, 
        required: false
    },
    author: {
        type: String, 
        required: false
    },
    excerpt: {
        type: String,
        required: true
    },
    articleType: {
        type: String,
        default: "fake"
    },
    timeScraped: {
        type: Date,
        default: Date.now
    },
    keywords: [{
        type: String,
        required: false
    }],
    associatedRealNews: [{
        type: Schema.Types.ObjectId,
        ref: "RealArticles" 
    }]
});

const FakeArticles = mongoose.model("FakeArticles", fakeArticlesSchema);
module.exports = FakeArticles;