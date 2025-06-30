import React from "react";
import vite from "../../../public/vite.svg"
import ProfileImg from "../Ui/ProfileImg";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../../Utils/otherUtils";

const VerticalCard = ({ isSmall = 0, thumbnail = "", title = "", owner = "", views = "", createdAt = "", id = "" }) => {
    return (
        <Link to={`/video/${id}`} className=" w-full p-2.5  min-w-[300px] max-w-[350px] h-100 flex flex-col  rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300 border border-black bg-gray-100/50">

            {/* Thumbnail Section */}
            <div id="thumbnai" className="w-full h-1/2 border-1">
                <img src={thumbnail} alt="Video Thumbnail" className="w-full h-full object-contain" />
            </div>

            {/* Video Details Section */}
            <div id="" className="p-2 h-1/2 flex flex-col gap-1 ">
                <h1 className="text-lg  font-semibold h-1/2 line-clamp-2 ">{title}</h1>
                <h2 className="text-sm text-gray-700 h-[35%] flex items-center gap-x-2"><span><ProfileImg size={"h-8 w-8"} image={owner.avatar} /></span> {owner.userName}</h2>
                <h2 className={`text-xs text-gray-500 h-[15%]`}>
                    {views} views <span className="ml-2">{formatRelativeTime(createdAt)}</span>
                </h2>

            </div>

        </Link>


    )
}

export default VerticalCard