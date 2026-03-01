import mongoose, { Schema } from "mongoose";

const reportIssue = new Schema({
    issueType:{
        type: String,
        require: true,
         trim: true,
    },
    images:[
        {
            type:String,
        }
    ],
    description:{
        type:String,
        require:true,
        trim:true,
    },
    location:{
        address:{
            type:String,
            require:true,
            trim:true,
        },
        state:{
            type:String,
            require:true,
            trim:true,
        },
        district:{
            type:String,
            require:true,
            trim:true,
        },
        wardNumber:{
            type:Number,
            require:true,
            trim:true,
        },
        area:{
            type:String,
            require:true,
            trim:true,
        },

    },
    severity:{
        type:String,
        require:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref : "User"
    },
    resolved:{
        type:Boolean,
        default:false,
    },
    rating: {
        type: Number,
        min :1 ,
        max: [10, " rating must be less than or equal to 10"]
      },
    status :{
        type :String,
        default:"unresolved"
    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:"Representative"
    }
},{
    timestamps:true
})
export const Issue  = mongoose.model("Issue",reportIssue);

