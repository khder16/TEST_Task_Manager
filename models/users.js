import { Schema, model } from 'mongoose'


// User schema with Password and Username


const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: {
        type: String
    },
    refreshToken: {
        type: String
    },
},
    {
        timestamps: true,
    }
)
userSchema.index({ username: 1 })

export default model('User', userSchema)