import React from "react";
import vite from "../../../public/vite.svg"

const ProfileImg = ({size ,onClick, image={vite}  })=>{

   

    return(
        <div  onClick={onClick} className={`${size}  rounded-full  overflow-hidden flex-none flex-nowrap shrink-0`}>
            <img src={image} alt="profile" className="object-cover h-full w-full" />
        </div>
    )
}

export default ProfileImg