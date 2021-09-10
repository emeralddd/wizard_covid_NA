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

        delete newUser.password

        res.json({
            success: true,
            message: 'Tao tai khoan thanh cong',
            user: newUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Update Analytics Data
router.put('/updateAnalytics', verifyToken, async (req,res) => {
    const {position,total,death,cured,cure} = req.body
    if(!position) {
        return res.status(400).json({
            success: false, 
            message: 'Chua chon don vi!'
        })
    }
    console.log(position)
    try {
        let newUpdateAnalytic = {total:total,death:death,cured:cured,cure:cure}//coordinates:coordinates}

		const newUpdateCondition = {position:position}

		newUpdateAnalytic = await ANALYTIC.findOneAndUpdate(
			newUpdateCondition,
			newUpdateAnalytic,
			{ new: true }
		)
        
        if(!newUpdateAnalytic) {
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

//Create Pandemic Data
router.post('/createPandemicData', verifyToken, async (req,res) => {
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

//Create Blog Post
router.post('/createBlogPost', verifyToken, async (req,res) => {
    const {title,content,imageURL,slug} = req.body

    if(!title || !content || !imageURL || !slug) {
        return res.status(400).json({
            success: false,
            message: 'Thieu thong tin'
        })
    }

    const fetchPost = await POST.findOne({slug})
    if(fetchPost) {
        return res.status(400).json({
            success: false,
            message: 'Slug da bi trung'
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
            imageURL,
            slug
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

//Create NEWS
router.post('/createNEWS', verifyToken, async (req,res) => {
    const {title,content,slug} = req.body

    if(!title || !content || !slug) {
        return res.status(400).json({
            success: false,
            message: 'Thieu thong tin'
        })
    }

    const fetchNEWS = await NEWS.findOne({slug})
    if(fetchNEWS) {
        return res.status(400).json({
            success: false,
            message: 'Slug da bi trung'
        })
    }

    try {
        const newNews = new NEWS({
            title,
            content,
            userCreated: {
                '_id':req.userId,
                'username':req.username
            },
            slug
        })

        await newNews.save()

        res.json({
            success: true,
            message: 'Tao tin tuc thanh cong',
            news: newNews
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
        if(String(req.params.id).length!=24) {
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

//Delete NEWS
router.delete('/deleteNEWS/:id', verifyToken, async (req,res) => {
    try {
        if(String(req.params.id).length!=24) {
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

//Update Post
router.put('/updateBlogPost/:id', verifyToken, async (req,res) => {
    const {title,content,slug,imageURL} = req.body

    if(!title || !content || !slug || !imageURL) {
        return res.status(400).json({
            success: false,
            message: 'Chua du thong tin'
        })
    }

    try {
        if(String(req.params.id).length!=24) {
            return res.status(401).json({
                success: false,
                message: 'Dung co hack!'
            })
        }

        let editPost = {title,content,slug,imageURL}

		const editCondition = {_id: req.params.id}
		editPost = await POST.findOneAndUpdate(
            editCondition,
            editPost,
            { new: true }
        )
        
        if(!editPost) {
            return res.status(401).json({
                success: false,
                message: 'Khong co bai viet do'
            })
        }

        res.json({
            success: true,
            message: 'Sua bai viet thanh cong',
            post: editPost
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Update NEWS
router.put('/updateNEWS/:id', verifyToken, async (req,res) => {
    const {title,content,slug} = req.body

    if(!title || !content || !slug) {
        return res.status(400).json({
            success: false,
            message: 'Chua du thong tin'
        })
    }

    try {
        if(String(req.params.id).length!=24) {
            return res.status(401).json({
                success: false,
                message: 'Dung co hack!'
            })
        }

        let editNEWS = {title,content,slug}

		const editCondition = {_id: req.params.id}
		editNEWS = await NEWS.findOneAndUpdate(
            editCondition,
            editNEWS,
            { new: true }
        )
        
        if(!editNEWS) {
            return res.status(401).json({
                success: false,
                message: 'Khong co tin tuc do'
            })
        }

        res.json({
            success: true,
            message: 'Sua tin tuc thanh cong',
            news: editNEWS
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server dang gap loi'
        })
    }
})

//Update Pandemic Details
router.put('/updatePandemicData/:id', verifyToken, async (req,res) => {
    const {title,content} = req.body

    if(!title || !content) {
        return res.status(400).json({
            success: false,
            message: 'Chua du thong tin'
        })
    }

    try {
        if(String(req.params.id).length!=24) {
            return res.status(401).json({
                success: false,
                message: 'Dung co hack!'
            })
        }

        let editData = {title,content}

		const editCondition = {_id: req.params.id}
		editData = await PANDEMIC.findOneAndUpdate(
            editCondition,
            editData,
            { new: true }
        )
        
        if(!editData) {
            return res.status(401).json({
                success: false,
                message: 'Khong co tin tuc do'
            })
        }

        res.json({
            success: true,
            message: 'Sua tin tuc thanh cong',
            data: editData
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
