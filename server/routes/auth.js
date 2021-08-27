const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const USER = require('../models/user')
const jwt = require('jsonwebtoken')

//Login
router.post('/login', async (req,res) => {
    const {username,password} = req.body
    if(!username || !password) 
        return res.status(400).json({
            success: false, 
            message: 'Chua Nhap Username hoac Password'
        })
    
    try {
        const fetchUser = await USER.findOne({username})
        if(!fetchUser)
        {
            return res.status(400).json({
                success: false, 
                message: 'Ten dang nhap sai'
            })
        }
        
        const passwordCheck = await argon2.verify(fetchUser.password,password)
        
        if(!passwordCheck)
        {
            return res.status(400).json({
                success: false, 
                message: 'Mat khau sai'
            })
        }

        const accessToken = jwt.sign(
            {userId: fetchUser._id},
            process.env.SECRET_TOKEN
        )

        res.json({
            success: true,
            message: 'Dang nhap thanh cong',
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

module.exports = router