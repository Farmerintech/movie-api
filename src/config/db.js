import mongoose from "mongoose"

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI); 
       console.log("MoongoDB connected successfuly...")
       return
    } catch (error) {
        console.log(`error connecting to mongoDB, ${error}`)
        
    }
    process.exit(1)
}