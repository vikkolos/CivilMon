import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import app from './app.js'
import connectDB from './db/index.js'

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3002 , () => {
        console.log(`server listening at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`mongodb connection failed `, err.message)
})