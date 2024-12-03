import mongoose  from 'mongoose';

const connectDB = async () => {
    try {
        
        const conn = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log(`MongoDB Connected :${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)

    }
}

    
export default connectDB