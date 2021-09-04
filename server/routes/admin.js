require('dotenv').config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')
const USER = require('../models/user')
const PANDEMIC = require('../models/pandemic')
const ANALYTIC = require('../models/analytic')
const POST = require('../models/post')
const NEWS = require('../models/news')

//Create new Account
router.post('/createNewAccount', verifyToken, async (req,res) => {
    const {username,password,token} = req.body
    if(!username || !password) 
        return res.status(400).json({
            success: false, 
            message: 'Chua Nhap Username hoac Password'
        })

    if(token!=process.env.TOKENADMIN)
        return res.status(400).json({
            success: false, 
            message: 'Token nhap bi sai!'
        })

    try {
        const fetchUser = await USER.findOne({username})
        if(fetchUser) {
            return res.status(400).json({
                success: false,
                message: 'Username da bi trung'
            })
        }

        const hasedPassword = await argon2.hash(password)
        const newUser = new USER({username,password:hasedPassword})
        await newUser.save()

        const accessToken = jwt.sign(
            {userId: newUser._id},
            process.env.SECRET_TOKEN
        )

        res.json({
            success: true,
            message: 'Tao tai khoan thanh cong',
            accessToken
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Update Pandemic Data
router.post('/updatePandemicData', verifyToken, async (req,res) => {
    const {title,content} = req.body
    if(!title || !content) {
        return res.status(400).json({
            success: false, 
            message: 'Chua nhap day du thong tin!'
        })
    }

    try {
        const newUpdateData = new PANDEMIC({
            title,
            content,
            userCreated: {
                '_id': req.userId,
                'username': req.username
            }
        })
        await newUpdateData.save();

        res.json({
            success: true,
            message: 'Them dien bien dich thanh cong',
            update: newUpdateData
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Update Analytics Data
router.put('/updateAnalytics', verifyToken, async (req,res) => {
    const {position,total,death,cured} = req.body
    if(!position)
    {
        return res.status(400).json({
            success: false, 
            message: 'Chua chon don vi!'
        })
    }

    try {
        let newUpdateAnalytic = {total:total,death:death,cured:cured}

		const newUpdateCondition = {position:position}

		newUpdateAnalytic = await ANALYTIC.findOneAndUpdate(
			newUpdateCondition,
			newUpdateAnalytic,
			{ new: true }
		)
        
        if(!newUpdateAnalytic)
        {
            return res.status(401).json({
                success: false,
                message: 'Khong co don vi do'
            })
        }

        res.json({
            success: true,
            message: 'Cap nhat so lieu thanh cong',
            update: newUpdateAnalytic
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Display Account List
router.get('/displayAccountList', verifyToken, async (req,res) => {
    try {
        const listAccount = await USER.find({}).select('-password')

        res.json({
            success: true,
            listAccount
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Delete Pandemic Data
router.delete('/deletePandemicData/:id', verifyToken, async (req,res) => {
    try {
        if(String(req.params.id).length!=24)
        {
            return res.status(401).json({
                success: false,
                message: 'Dung co hack!'
            })
        }
		const deleteCondition = {_id: req.params.id}
		const deletePandemic = await PANDEMIC.findOneAndDelete(deleteCondition)
        
        if(!deletePandemic)
        {
            return res.status(401).json({
                success: false,
                message: 'Khong co dien bien do'
            })
        }

        res.json({
            success: true,
            message: 'Xoa dien bien thanh cong'
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Create Blog Post
router.post('/createBlogPost', verifyToken, async (req,res) => {
    const {title,content,imageURL} = req.body

    if(!title || !content || !imageURL) {
        return res.status(400).json({
            success: false,
            message: 'Thieu thong tin'
        })
    }

    try {
        const newBlogPost = new POST({
            title,
            content,
            userCreated: {
                '_id':req.userId,
                'username': req.username
            },
            imageURL
        })
        await newBlogPost.save()

        res.json({
            success: true,
            message: 'Tao bai viet thanh cong',
            post: newBlogPost
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Delete Blog Post
router.delete('/deleteBlogPost/:id', verifyToken, async (req,res) => {
    try {
        if(String(req.params.id).length!=24)
        {
            return res.status(401).json({
                success: false,
                message: 'Dung co hack!'
            })
        }
		const deleteCondition = {_id: req.params.id}
		const deletePost = await POST.findOneAndDelete(deleteCondition)
        
        if(!deletePost)
        {
            return res.status(401).json({
                success: false,
                message: 'Khong co bai viet do'
            })
        }

        res.json({
            success: true,
            message: 'Xoa bai viet thanh cong'
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Create NEWS
router.post('/createNEWS', verifyToken, async (req,res) => {
    const {title,content} = req.body

    if(!title || !content) {
        return res.status(400).json({
            success: false,
            message: 'Thieu thong tin'
        })
    }

    try {
        const newNews = new NEWS({
            title,
            content,
            userCreated: {
                '_id':req.userId,
                'username':req.username
            }
        })

        await newNews.save()

        res.json({
            success: true,
            message: 'Tao tin tuc thanh cong',
            post: newNews
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Delete NEWS
router.delete('/deleteNEWS/:id', verifyToken, async (req,res) => {
    try {
        if(String(req.params.id).length!=24)
        {
            return res.status(401).json({
                success: false,
                message: 'Dung co hack!'
            })
        }
		const deleteCondition = {_id: req.params.id}
		const deleteNews = await NEWS.findOneAndDelete(deleteCondition)
        
        if(!deleteNews)
        {
            return res.status(401).json({
                success: false,
                message: 'Khong co tin tuc do'
            })
        }

        res.json({
            success: true,
            message: 'Xoa tin tuc thanh cong'
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

module.exports = router
