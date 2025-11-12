import mongoose, { Schema } from "mongoose";
import Jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema({
  fullname: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: Stringl,
    require: true,
    trim: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    require: true,
  },
  refreshtoken: {
    type: String,
  },
  aadharnumber: {
    type: String,
    require: true,
    match: [/^\d{12}$/, "Aadhaar number must be exactly 12 digits"],
  },
},{
 timestamps:true
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateRefreshToken =  function(){
    return Jwt.sign({
        _id :this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    },
    )
}
userSchema.methods.generateAccessToken =  function(){
    return Jwt.sign({
        _id :this._id,
        email:this.email,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    },
    )
}

export const User = mongoose.model("User",userSchema);