const mongo = require('mongoose')
const Schema = mongo.Schema

const Post = new Schema({
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        dateCreated: {
            type: Date,
            default: Date.now(),
            required: true
        },
        userCreated: {
            type: Schema.Types.Mixed
        },
        imageURL: {
            type: String
        },
        slug: {
            type: String,
            required: true,
            unique: true
        }

    }
)
module.exports = mongo.model('posts', Post)