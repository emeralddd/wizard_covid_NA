require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3030
const mongo = require('mongoose')

const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const publicRouter = require('./routes/public')

const connectDB = async () => {
    try {
        await mongo.connect(`mongodb+srv://wizard_db:${process.env.DBPASS}@cluster0.jhfxl.mongodb.net/wizard_project?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('DB Connected Successfully!')
    } catch (err) {
        if(err) {
            console.log(err.message)
            process.exit(1)
        }
    }
}

connectDB();

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/public', publicRouter)

//app.get('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Running at ${PORT}`)
})
