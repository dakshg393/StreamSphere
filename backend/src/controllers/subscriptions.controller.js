import {Subscription} from '../models/subscription.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import mongoose from "mongoose"
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"


// const subscribe = asyncHandler(async (req,res)=>{
//     const subscriber =  req.user.id
//     const {channel} = req.params
//     console.log(subscriber,channel)
//     if(!subscriber || !channel){
//         throw new apiError(400,"Subscriber or channel Information is missing ")
//     }

//     const isSubscribed = await Subscription.findOne({subscriber ,channel})
//     if(isSubscribed){
//         throw new apiError(401,"User alredey Subscribed this Channel")
//     }

//     const subscribed =await Subscription.create({
//         subscriber,
//         channel
//     })
    
//     if(!subscribed){
//         throw new apiError(401,"Somthing went Wrong")
//     }

//     return res
//     .status(200)
//     .json( new apiResponse(200,subscribed,"Channel Subscribed") )

// })

const subscribe = asyncHandler(async (req, res) => {
    try {
        const subscriber = req.user.id;
        const { channel } = req.params;

        console.log("Subscriber ID:", subscriber, "Channel ID:", channel);

        if (!subscriber || !channel) {
            throw new apiError(400, "Subscriber or channel information is missing");
        }

        const isSubscribed = await Subscription.findOne({ subscriber, channel });
        if (isSubscribed) {
            throw new apiError(401, "User already subscribed to this channel");
        }

        const subscribed = await Subscription.create({
            subscriber,
            channel,
        });

        if (!subscribed) {
            throw new apiError(500, "Something went wrong while subscribing");
        }

        return res
            .status(200)
            .json(new apiResponse(200, subscribed, "Channel subscribed"));

    } catch (error) {
        console.error("Subscribe Error:", error);
        return res.status(error.statusCode || 500).json(
            new apiResponse(error.statusCode || 500, null, error.message || "Internal Server Error")
        );
    }
});

const unSubscribe = asyncHandler(async (req,res)=>{
    const subscriber = req.user?.id
    const {channel} = req.params

    if(!subscriber || !channel){
        throw new apiError(400,"Subscriber or channel Information is missing ")
    }

    const isSubscribed =await  Subscription.findOne({subscriber ,channel})
    if(!isSubscribed){
        throw new apiError(404,"Channel is Not Subscribe By User that You try to Unsubsribe")
    }

    const unSubscribed = await Subscription.deleteOne({_id:isSubscribed?._id})

    if(unSubscribed.deletedCount ==0){
        throw new apiError(400,"Somthing Went wrong while Unsubscribing ")
    }

    res
    .status(200)
    .json(new apiResponse(200,unSubscribed,"Channel UnSubscribed Successfuly"))
})

export {
    subscribe,
    unSubscribe
}