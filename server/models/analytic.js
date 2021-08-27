const mongo = require('mongoose')
const Schema = mongo.Schema

const Case = new Schema({
        position: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        death: {
            type: Number,
            required: true
        },
        cured: {
            type: Number,
            required: true
        }
    }
)
module.exports = mongo.model('covidcase',Case)