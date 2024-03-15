import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './database/db.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import auth from './routers/authRout.js'
import tasks  from './routers/tasksRout.js'
const PORT = process.env.PORT || 3000
const app = express()


app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())



app.use('/users', auth)
app.use('/tasks', tasks)

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
        await connectDB("mongodb://localhost:27017/Task")
    } catch (err) {
        console.log(err)
    }
}

start()