require('dotenv').config()
const express = require('express')
const router = express.Router()
const LIST = require('../models/pandemic')
const POST = require('../models/post')
const NEWS = require('../models/news')

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

//Display Blog Post List
router.get('/displayBlogPost', async (req,res) => {
    try {
        const listPost = await POST.find({})

        res.json({
            success: true,
            listPost
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Display News List
router.get('/displayNEWS', async (req,res) => {
    try {
        const listNews = await NEWS.find({})

        res.json({
            success: true,
            listNews
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