require('dotenv').config()
const express = require('express')
const router = express.Router()
const LIST = require('../models/pandemic')

//Display Pandemic Full Data
router.get('/displayPandemicFullData', async (req,res) => {
    try {
        const listData = await LIST.find({})

        res.json({
            success: true,
            listData
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

module.exports = router