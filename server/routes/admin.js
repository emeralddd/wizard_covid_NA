require('dotenv').config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const USER = require('../models/user')
const UPDATE = require('../models/pandemic')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

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
    if(!title || !content)
    {
        return res.status(400).json({
            success: false, 
            message: 'Chua nhap day du thong tin!'
        })
    }

    try {
        const newUpdateData = new UPDATE({title,content,userCreated: req.userId})
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

module.exports = router