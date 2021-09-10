require('dotenv').config()
const express = require('express')
const router = express.Router()
const LIST = require('../models/pandemic')
const POST = require('../models/post')
const NEWS = require('../models/news')
const ANA = require('../models/analytic')

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

//Display Analytic
router.get('/displayAnalytic', async (req,res) => {
    try {
        const listAna = await ANA.find({})

        res.json({
            success: true,
            listAna
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Find each Post
router.get('/getEachPost/:id', async (req,res) => {
    const id = req.params.id
    const fetchPost = await POST.findOne({slug:id})
    if(fetchPost) {
        return res.json({
            success: true,
            fetchPost
        })
    } else {
        return res.status(404).json({
            success: false,
            message: "Not Found"
        })
    }
    
})

//Find each NEWS
router.get('/getEachNEWS/:id', async (req,res) => {
    const id = req.params.id
    const fetchNEWS = await NEWS.findOne({slug:id})
    if(fetchNEWS) {
        return res.json({
            success: true,
            fetchNEWS
        })
    } else {
        return res.status(404).json({
            success: false,
            message: "Not Found"
        })
    }
    
})

module.exports = router