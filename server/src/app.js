import express  from "express"; 
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"100kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.router.js";
import issueRouter from "./routes/issue.router.js"
import repRouter from "./routes/representative.router.js"
app.use("/api/v1/users",userRouter)
app.use("/api/v1/issues",issueRouter)
app.use("/api/v1/rep",repRouter)

export default app;