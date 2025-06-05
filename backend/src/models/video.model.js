import mongoose, {  Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags: {
        type: [String], // Array of strings
        default: []     // Default to an empty array
    },
    duration:{
        type:Number,
        required:true,

    },
    category: {                  
        type: String,
        enum: ["Technology","Gaming","Travel","Music","Education","Sports"],
        required: true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})


videoSchema.plugin(mongooseAggregatePaginate)

export const Video =  mongoose.model("Video", videoSchema)