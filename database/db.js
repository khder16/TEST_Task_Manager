import { connect } from "mongoose"

const connectDB = async (url) => {
    await connect(url)
    console.log('Connected To DB Successfully')
}

export default connectDB