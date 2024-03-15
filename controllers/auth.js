import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/users.js'
import pkg from 'mongoose'
import Joi from 'joi'
const { create } = pkg


// register the user for the first time

export const registerUser = async (req, res) => {
    try {
        const { userName, password } = req.body
        const isExisting = await User.findOne({ userName })

        if (isExisting) {
            throw new Error(`Username ${isExisting} already used try another one`)
        }

        if (!(userName && password)) {
            return res.status(400).send("All input is required")
        }
        if (userName.length < 4) {
            return res.status(400).json({ message: "Username must be at least 4 characters long" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" })
        }

        const encryptedPassword = await hash(password, 10)
        const user = await User.create({
            userName: userName,
            password: encryptedPassword
        })

        const token = jwt.sign(
            { user_id: user._id, userName: user.userName },
            process.env.TOKEN_KEY,
            {
                expiresIn: "10d",
            }
        )
        user.token = token
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
    }
}
const registerSchema = Joi.object({
    userName: Joi.string().min(4).required(),
    password: Joi.string().min(6).required()
})



// Login for user
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body

        if (!(userName && password)) {
            return res.status(400).send("Enter email and password")
        }

        let user = await User.findOne({ userName })

        if (!user || !(await compare(password, user.password))) {
            return res.status(401).send("Invalid username or password")
        }

        const token = jwt.sign(
            { user_id: user._id, userName: user.userName },
            process.env.TOKEN_KEY,
            {
                expiresIn: "10d",
            }
        )

        const updateUser = await User.findByIdAndUpdate(user._id, {
            token: token,
        }, { new: true })

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })

        return res.status(200).json({ success: true, token })
    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

// Logout the user

export const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        console.error("Logout error:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}


