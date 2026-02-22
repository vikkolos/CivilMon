import mongoose,{Schema} from "mongoose"
import Jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const representativeSchema = new Schema({
    fullname: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
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
    state: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,  
    },
    wardnumber: {
      type: String,
      require: true,
    },
    issues:[{
      type:Schema.Types.ObjectId,
      ref:"Issue"
    }],
    rating:{
      type: Number,
      default:0,
    }
    
  },{
   timestamps:true
  });

representativeSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

representativeSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

representativeSchema.methods.generateRefreshToken =  function(){
    return Jwt.sign({
        _id :this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    },
    )
}
representativeSchema.methods.generateAccessToken =  function(){
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
export const Representative = mongoose.model("Respresentative",representativeSchema)