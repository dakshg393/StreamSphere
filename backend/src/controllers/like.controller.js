import mongoose from "mongoose"
import { Like } from "../models/like.model.js"

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getLikesDetailsLogic = async (contentId,type,user)=>{
    try {
        const likeDetails = await Like.aggregate([
            {
                $match: {
                    type,
                    contentId:new mongoose.Types.ObjectId(contentId)
                }
            },
            {
                $group: {
                    _id: "contentId",
                    totalLikes: { $sum: 1 },
                    isUserLiked: {
                        $max: { $eq: ["$likedBy", user] }  //it compare if equel it return true else  flase
                    }

                }
            },
            {
                $project: {
                    _id: 0,
                    totalLikes: "$totalLikes",
                    isUserLiked: "$isUserLiked"
                }
            }

        ])
        return likeDetails.length > 0 ? likeDetails[0] : { totalLikes: 0, isUserLiked: false };
        
    }catch{
        throw new apiError(400,"Error In fatching Likes")
    }
}







const createLike = asyncHandler(async (req, res) => {
    const user = req.user._id

    const { type, contentId } = req.body

    if (!type || !contentId) {
        throw new apiError(401, "Invalid request Data not found")
    }

    const validType = ["Video", "Comment", "Tweet"]

    if (!validType.includes(type)) {
        throw new apiError(400, "Invalid Content Type ")
    }

    try {
        const like = await Like.findOneAndUpdate(
            {
            type: type,
            contentId: contentId,
            likedBy: new mongoose.Types.ObjectId(user)
            },
            {
                type: type,
                contentId: contentId,
                likedBy: new mongoose.Types.ObjectId(user)
            },
            {
                upsert:true                   
                // Create if not found, return updated doc
            }
        )

        const likeDetails = await getLikesDetailsLogic(contentId,type,user)

        res
            .status(200)
            .json(new apiResponse(200, likeDetails, `${type} liked Successfully`))
    } catch (error) {
        throw new apiError(401, `Something Went  Wrong User Cant Like ${type} `)
    }


})

const getLikesDetails = asyncHandler(async (req, res) => {

    const { type, contentId } = req.body
    const user = req.user._id

    if (!type || !contentId) {
        throw new apiError(401, "Invalid request no Data found")
    }

    try {
       

        const likeDetails = await getLikesDetailsLogic(contentId,type,user)
        res
            .status(200)
            .json(new apiResponse(200, likeDetails, "Liked Fatched Successfully"))
    } catch (error) {
        throw new apiError(401, `Somthing went Wrong `)
    }

})

const deleteLike  = asyncHandler(async(req,res)=>{
    const {type,contentId}=req.body
    const likedBy = req.user._id
    
    try {
        const like = await Like.deleteOne({
            type:type,
            contentId:contentId,
            likedBy:likedBy
        })

        
        const likeDetails = await getLikesDetailsLogic(contentId,type,likedBy) 

        res
        .status(200)
        .json(new apiResponse(200,likeDetails,"Dislike Successfully"))
    } catch (error) {
        throw new apiError(401, "Somthing Went Wrong User Cant be Like")
    }

})


export {
    createLike,
    getLikesDetails,
    deleteLike
}