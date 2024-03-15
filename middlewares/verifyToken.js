const config = process.env
import User from '../models/users.js'
import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.query.token || req.headers["x-access-token"]
        if (!token) {
            return res.status(403).send("A token is required for authentication")
        }
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        var user = await User.findById(decoded.user_id)
        req.user = user._id
        return next()

    } catch (error) {
        return res.status(401).send("Invalid Token ")
    }

}





