const { verify } = require('argon2')
const jwt = require('jsonwebtoken')

const verifyToken = (req,res, next) => {
    const authHeader = req.header('Authorization')
    const tokenReceived = (authHeader? authHeader.split(' ')[1] :authHeader)

    if(!tokenReceived) 
    {
        return res.status(401).json({
            success: false,
            message: 'Chua dang nhap Admin'
        })
    }

    try {
        const tokenDecoded = jwt.verify(tokenReceived,process.env.SECRET_TOKEN)

        req.userId = tokenDecoded.userId
        next()
    } catch(err) {
        console.log(err)
        return res.status(403).json({
            success: false,
            message: "Phien dang nhap bi sai"
        })
    }
}

module.exports = verifyToken