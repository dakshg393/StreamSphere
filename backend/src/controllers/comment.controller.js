import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createComment = asyncHandler(async (req, res) => {
    const { text, contentId, type } = req.body
    const user = req.user._id


    if ([text, contentId, type].some(value => value == "" || value == null)) {
        throw new apiError(404, "Invalid data or data Not found")
    }

    try {


        const comment = await Comment.create(
            {
                text,
                contentId,
                type,
                owner: new mongoose.Types.ObjectId(user)
            }
        )

        res
            .status(200)
            .json(new apiResponse(200, comment, "Commented Successfully"))
    } catch (error) {
        throw new apiError(400, "Somthing Went Wrong You Are not commentet on video")
    }

})

const getAllComments = asyncHandler(async (req, res) => {
    const { type, contentId } = req.body
    if ([type, contentId].some(value => value == "" || value == null)) {
        throw new apiError(401, "Invalid Request Data not found")
    }
    const validType = ["Video", "Comment", "Tweet"]
    if (!validType.includes(type)) {
        throw new apiError(400, "Invalid Content Type")
    }
    try {
        const allComments = await Comment.find(
            {
                type,
                contentId
            }
        ).populate("owner", "userName avatar").limit(10)   //populate methond fetched the full document from owner objectId related with 

        res
            .status(200)
            .json(new apiResponse(200, allComments, "All Comments Fetched Successfully"))
    } catch (error) {
        throw new apiError(401, "Somthing Went Wrong Cant Fatch Comment")
    }

})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId, text, type, contentId } = req.body
    if ([commentId, text, type, contentId].some(value => value === "" || value === null)) {
        throw new apiError(401, "Invalid request Data not Found")
    }
    if (!["Comment", "Video", "Tweet"].includes(type)) {
        throw new apiError(404, "Invalid Content Type")
    }

    try {

        const comment = await Comment.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(commentId),
                type,
                contentId: new mongoose.Types.ObjectId(contentId),
                owner: new mongoose.Types.ObjectId(req.user._id)
            },
            {
                $set: {
                    text:text,
                }
            },
            {
                new: true
            },
            {
                upsert:true
            }
        )

        res
            .status(200)
            .json(new apiResponse(200, comment, "Comment Updated Successfully"))

    } catch (error) {
        throw new apiError(401, "Somthing Went Wrong Comment Not be Updated")
    }

})

const removeComment = asyncHandler(async (req, res) => {
    const {commentId} = req.body
    if (!commentId) {
        throw new apiError(401, "Invalid request Data not found to remove comment")
    }

    try {

        const remove = await Comment.findByIdAndDelete(commentId)

        res.
            status(200)
            .json(new apiResponse(200, {}, "Comment remove Successfully"))
    } catch (error) {
        throw new apiError(402, "Somthing Went Wrong Comment Cant Be deleted")
    }

})

export {
    createComment,
    getAllComments,
    updateComment,
    removeComment
}