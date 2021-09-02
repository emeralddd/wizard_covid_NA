const mongo = require('mongoose')
const Schema = mongo.Schema

const News = new Schema({
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.now(),
            required: true
        },
        userCreated: {
            type: Schema.Types.Mixed
        }

    }
)
module.exports = mongo.model('news', News)