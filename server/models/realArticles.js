const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const realArticlesSchema = new Schema ({
    title: {
        type: String, 
        required: true
    },
    url: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: false
    },
    summary: {
        type: String, 
        required: true
    },
    articleSource: {
        type: String,
        required: true
    },
    articleType: {
        type: String,
        default: "real"
    }
});

const RealArticles = mongoose.model("RealArticles", realArticlesSchema);
module.exports = RealArticles;