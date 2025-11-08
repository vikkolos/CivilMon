import mongoose  from "mongoose"
import { DB_NAME } from "../constants.js"
const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect("mongodb://localhost:27017/DB_NAME");
        console.log(`DB connected sucessfully `,connectionInstance.connections)
    } catch (error) {
        console.log(`DB not connected sucessfully` ,error.message);
        process.exit(1)
    }
}
export default connectDB;