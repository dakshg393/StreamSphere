import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"

import { apiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose"

import natural from "natural"

const createVideo = asyncHandler(async (req, res) => {


    const { title, description, duration, isPublished,category } = req.body
    const owner = req.user._id

    if ([title, description, duration, isPublished,category].some((field) => field?.trim() === "")) {
        throw new apiError(400, "All Fields are required")
    }

    const videoFileLocalpath = req.files.video[0].path
    console.log(req.files.video.path) 

    if (!videoFileLocalpath) {
        throw new apiError(400, "Video File is Missing")
    }


    const thumbnailLocalPath = req.files.thumbnail[0].path

    if (!thumbnailLocalPath) {
        throw new apiError(400, "Thumbnail File is Missing")
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalpath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!videoFile) {
        throw new apiError(400, "Video file is missing")
    }
    const video = await Video.create({
        videoFile:videoFile.url,
        thumbnail:thumbnail.url,
        title,
        description,
        duration,
        isPublished,
        owner,
        category
    })

    if (!video) {
        throw new apiError(400, "Db error video not Uplode")
    }

    res
        .status(200)
        .json(new apiResponse(200, video, "Video Successfuly Uploded"))

})


const getVideo = asyncHandler(async (req, res) => {
    const videoId = req.params.videoId
    if (!videoId) {
        throw new apiError(400, "Unvalid request video id not found")
    }
    const video = await Video.findOne({ _id: videoId }).populate('owner', 'username')
    if (!video) {
        throw new apiError(400, "Video not Found")
    }

    res
        .status(200)
        .json(new apiResponse(200, video, "Video Fatched Successfully"))

})

const updateVideo = asyncHandler(async (req, res) => {

    const { _id, title, description, isPublished } = req.body
    console.log(req.body)
    const user = req.user
    const video = await Video.findOneAndUpdate(
        {
            _id:_id,
            owner: new mongoose.Types.ObjectId(user)
        },
        {
            $set: {
                title,
                description,
                isPublished
            }
        },
        { new: true }
    )

    if (!video) {
        throw new apiError(401, "Somthing went Wrong video Cant be updated")
    }

    res
        .status(200)
        .json(new apiResponse(200, video, "Video Details SuccessFully Updated"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const _id = req.params.videoId
    console.log(req.params)
    const user = req.user
    const video = await Video.findOneAndDelete(
        {
            _id: _id,
            owner: new mongoose.Types.ObjectId(user)
        }
    )

    if (video.deleteCount == 0) {
        throw new apiError(400, "Video Can't be Deleted Somthing went Wrong")
    }

    res.
        status(200)
        .json(new apiResponse(200, {}, "Video Delated Successfully"))

})


// const recommendedVideos = asyncHandler(async (req, res) => {

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 12;
//     const skip = (page - 1) * limit;



//     const watchHistoryDetails = await User.aggregate([
//         {
//             $match: {
//                 _id: new mongoose.Types.ObjectId(req.user._id)
//             }
//         },
//         {
//             $unwind: "$watchHistory"
//         },
//         {
//             $lookup: {
//                 from: "videos",
//                 localField: "watchHistory.videoId",
//                 foreignField: "_id",
//                 as: "watchHistory.videoDetails"
//             }
//         },
//         {
//             $unwind: "$watchHistory.videoDetails"
//         },
//         {
//             $sort: { "watchHistory.watchedAt": -1 }
//         },
//         {
//             $limit: 5
//         },
//         {
//             $project: {
//                 keywords: {
//                     $split: [{
//                         $toLower: {
//                             $concat: ["$watchHistory.videoDetails.title", " ", "$watchHistory.videoDetails.description"]
//                         }
//                     }, " "]
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: null,
//                 allKeywords: { $push: "$keywords" }
//             }
//         },
//         {
//             $project: {
//                 keywords: { $unwind: "$allKeywords" }, // Unwind the sub-arrays
//             }
//         },
//         {
//             $group: {
//                 _id: null,
//                 keywords: { $push: "$keywords" } // Collect all keywords into a single array
//             }
//         }
//     ]);


//     const keywords = watchHistoryDetails[0].keywords
//     const paragraph = keywords.join(" ")


//     const extractNouns = (paragraph) => {
//         const tokenizer = new natural.WordTokenizer();
//         const words = tokenizer.tokenize(paragraph);

//         // Proper initialization of Lexicon and RuleSet
//         const lexicon = new natural.Lexicon('EN', 'NN');
//         const ruleSet = new natural.RuleSet('EN');
//         const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

//         // Proper tagging with initialized tagger
//         const taggedWords = tagger.tag(words);

//         // Filtering nouns based on POS tags
//         const nouns = taggedWords.taggedWords
//             .filter(({ tag }) => tag.startsWith('NN'))
//             .map(({ token }) => token);

//         return nouns;
//     };



//     const extractedNouns = extractNouns(paragraph)


//     const videos = await Video.aggregate([
//         {
//             $project: {
//                 _id: 1,
//                 title: 1,
//                 description: 1,
//                 matchCount: {
//                     $size: {
//                         $setIntersection: [
//                             extractedNouns,
//                             {
//                                 $concatArrays: [
//                                     { $split: ["$title", " "] },
//                                     { $split: ["$description", " "] }
//                                 ]
//                             }
//                         ]
//                     }
//                 }
//             }
//         },
//         { $sort: { matchCount: -1 } },
//         { $skip: skip },      //skip the number of videos according to page
//         { $limit: limit } // Limit the number of recommendations
//     ]);

//     if (!videos) {
//         throw new apiError(400, "Video not found")
//     }

//     res
//         .status(200)
//         .json(new apiResponse(200, videos, "Video fetched Successfully"))

// })

const recommendedVideos = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const watchHistoryDetails = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.user._id) } },
        { $unwind: "$watchHistory" },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory.videoId",
                foreignField: "_id",
                as: "watchHistory.videoDetails"
            }
        },
        { $unwind: "$watchHistory.videoDetails" },
        { $sort: { "watchHistory.watchedAt": -1 } },
        { $limit: 5 },
        {
            $project: {
                keywords: {
                    $split: [{
                        $toLower: {
                            $concat: ["$watchHistory.videoDetails.title", " ", "$watchHistory.videoDetails.description"]
                        }
                    }, " "]
                }
            }
        },
        { $unwind: "$keywords" },
        {
            $group: {
                _id: null,
                allKeywords: { $addToSet: "$keywords" }
            }
        }
    ]);

    if (!watchHistoryDetails.length || !watchHistoryDetails[0].allKeywords.length) {
        return res.status(200).json(new apiResponse(200, [], "No recommendations available"));
    }

    const allKeywords = watchHistoryDetails[0].allKeywords;
    const paragraph = allKeywords.join(" ");

    const extractNouns = (text) => {
        const tokenizer = new natural.WordTokenizer();
        const words = tokenizer.tokenize(text.toLowerCase());

        const lexicon = new natural.Lexicon('EN', 'NN');
        const ruleSet = new natural.RuleSet('EN');
        const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
        const tagged = tagger.tag(words);

        return tagged.taggedWords
            .filter(({ tag }) => tag.startsWith('NN'))
            .map(({ token }) => token.toLowerCase());
    };

    const extractedNouns = extractNouns(paragraph);

    if (!extractedNouns.length) {
        return res.status(200).json(new apiResponse(200, [], "No relevant keywords found"));
    }

    const videos = await Video.aggregate([
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                matchCount: {
                    $size: {
                        $setIntersection: [
                            extractedNouns,
                            {
                                $map: {
                                    input: {
                                        $split: {
                                            $toLower: {
                                                $concat: ["$title", " ", "$description"]
                                            }
                                        },
                                        as: "word",
                                        in: "$$word"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        },
        { $sort: { matchCount: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);

    return res.status(200).json(new apiResponse(200, videos, "Video fetched successfully"));
});

const getVideoByCategory = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;


    const  category  = req.params.category
    if (!category) {
        throw new apiError(400, "Category not found")
    }

    const videos = await Video.find(
        { category: category, isPublished: true }
    )
        .skip(skip)   // Skip videos based on the page number
        .limit(limit) // Limit the number of videos returned
        .exec(); // for imediet execute of query



    if (!videos) {
        throw new apiError(400, "Video not found")
    }

    res
        .status(200)
        .json(new apiResponse(200, videos, `${category} Videos fatched successfully`))

})


// const getTrandingVideos = asyncHandler(async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 12;
//     const skip = (page - 1) * limit;

//     const trendingVideos = await Video.aggregate([
//         {
//             $match: {
//                 isPublished: true
//             }
//         },
//         {
//             $sort: { views: -1 }
//         },
//         {
//             $limit: limit
//         }
//     ]).skip(skip)   // Skip videos based on the page number
//         .limit(limit) // Limit the number of videos returned
//         .exec();

//     if (!trendingVideos) {
//         throw new apiError(401, "Trending videos not Found")
//     }

//     res
//         .status(200)
//         .json(new apiResponse(200, trendingVideos, "Trending videos featched Successfully"))

// })
const getTrandingVideos = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const trendingVideos = await Video.aggregate([
    {
      $match: {
        isPublished: true,
      },
    },
    {
      $sort: { views: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: "users", // name of the users collection
        localField: "owner", // video.owner
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    {
      $unwind: "$ownerDetails",
    },
    {
      $project: {
        title: 1,
        description: 1,
        views: 1,
        thumbnail: 1,
        createdAt: 1,
        "owner": {
          _id: "$ownerDetails._id",
          userName: "$ownerDetails.userName",
          avatar: "$ownerDetails.avatar",
        },
      },
    },
  ]);

  if (!trendingVideos || trendingVideos.length === 0) {
    throw new apiError(401, "Trending videos not found");
  }

  res
    .status(200)
    .json(new apiResponse(200, trendingVideos, "Trending videos fetched successfully"));
});


export {
    createVideo,
    getVideo,
    updateVideo,
    deleteVideo,
    recommendedVideos,
    getVideoByCategory,
    getTrandingVideos
}