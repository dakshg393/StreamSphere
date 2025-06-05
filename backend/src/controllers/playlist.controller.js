import { User } from "../models/user.model.js";
import { Playlist } from "../models/playlist.model.js";

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { mongo } from "mongoose";


const createPlaylist = asyncHandler(async (req, res) => {

    const { name, video, description } = req.body
    const user = req.user

    if (!(name.trim())) {
        throw new apiError(404, "Playlist name is required")
    }

    const playlist = await Playlist.create({
        name: name,
        description: description ? description : "",
        videos: video ? video : [],
        owner: user._id
    })

    if (!playlist) {
        throw new apiError(404, `Somthing went Wrong While creating playlist`)
    }

    res
        .status(200)
        .json(new apiResponse(200, playlist, "Playlist created Successfully"))


})

const getAllPlaylist = asyncHandler(async (req, res) => {
    const user = req.user._id
    console.log(user)
    // const play=await Playlist.find({"owner":"user"})
    const playlist =await Playlist.aggregate([
        {
            $match: {
                owner:(user)
            }
        },
        {
            $set: {
                firstVideoId: { $ifNull: [{ $arrayElemAt: ["$videos", 0] }, ""] }  //Extrect first video from videos field in watch hiistory
               }
        },
        {
            $lookup: {
                from: "videos",
                localField: "firstVideoId",
                foreignField: "_id",
                as: "firstVideoDetail"
            }
        },
        {
            $unwind: {
            path:"$firstVideoDetail",            // (flaten the field)
            preserveNullAndEmptyArrays:true
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                thumbnail: {$ifNull:["$firstVideoDetail.thumbnail",""]}
            }
        }

    ])

    if (!playlist) {
        throw new apiError("Playlist not found")
    }

    res
        .status(200)
        .json(new apiResponse(200, playlist, "Playlist Fatched Successfully"))

})



const getPlaylistDetails = asyncHandler(async (req, res) => {

    const playlistId = req.body._id

    if (!playlistId) {
        throw new apiError("Playlist not found")
    }


    const playlistDetails = await Playlist.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(playlistId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "videos",
                foreignField: "_id",
                as: "videos"
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                videos: "$videos"
            }
        }
    ]);

    if (!playlistDetails) {
        throw new apiError(401, "Playlist details not found")
    }

    res
        .status(200)
        .json(new apiResponse(200, playlistDetails, "Playlist Details featched Successfully"))

})


const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { _id, video } = req.body
    const userId = req.user._id

    try {

        const addToPlaylist = await Playlist.findOneAndUpdate(
            {
                _id:new mongoose.Types.ObjectId(_id),
                owner:new mongoose.Types.ObjectId(userId)

            },
            {
                $addToSet:{
                    videos:video
                }
            },
            {new:true}   //return updated object
        )

        if (!addToPlaylist) {
            throw new apiError(401, "Failed to Add video to Playlist ")
        }

        res
            .status(200)
            .json(new apiResponse(200, addToPlaylist, "Video  Added to Playlist Successfully"))
    }
    catch (error) {
        throw new apiError(402, `Failed to Add video in Playlist \n ${error}`)
    }

})


const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { _id, video } = req.body
    const user = req.user
    try {

        const removeVideo = await Playlist.findByIdAndUpdate(
            {
                _id:new mongoose.Types.ObjectId(_id),
                owner:new mongoose.Types.ObjectId(user)
            },
            {
                $pull:{
                    videos:{$in:video}
                }
            },
            {new:true}
        )

   
        if (!removeVideo) {
            throw new apiError(401, "Somthing Went Wrong Db Error")
        }

        res
            .status(200)
            .json(new apiResponse(200, removeVideo, "Video Remove Successfully"))

    } catch (error) {
        throw new apiError(404, `Somthing Went Wrong ${error} `)
    }
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const _id = req.body._id
    const user = req.user._id

    const deletePlaylist = await Playlist.deleteOne(
        {
            _id: _id,
            owner: user
        }
    )

    if (!deletePlaylist) {
        throw new apiError(404, `Playlist can't be Deleted`)
    }

    res
        .status(200)
        .json(new apiResponse(200, {}, "Playlist Deleted Successfully"))


})

export{
    createPlaylist,
    getAllPlaylist,
    getPlaylistDetails,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist

}