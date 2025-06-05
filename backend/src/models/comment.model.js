import mongoose, { Schema, Types } from "mongoose";

const comment = new Schema({
    text:{
        type:String,
        require:true
    },
    contentId: {
        type: Schema.Types.ObjectId,
        refPath: 'type',
        require:true
    },
    type: {
        type: String,
        enums: ["Comment","Video","Tweet"],
        require:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Comment = mongoose.model("Comment",comment)