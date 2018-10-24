const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const realArticlesSchema = new Schema ({
    title: {
        type: String, 
        required: true
    },
    src: {
        type: String,
        required: false
    },
    excerpt: {
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