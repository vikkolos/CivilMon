import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import mongoose  from "mongoose"
import { DB_NAME } from "../constants.js"
const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DB connected sucessfully `)
    } catch (error) {
        console.log(`DB not connected sucessfully` ,error.message);
        process.exit(1)
    }
}
export default connectDB;


