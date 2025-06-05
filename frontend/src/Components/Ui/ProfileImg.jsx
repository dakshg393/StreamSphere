import React from "react";
import vite from "../../../public/vite.svg"

const ProfileImg = ({size , image={vite}  })=>{

   

    return(
        <div className={`${size} bg-green-400 rounded-full  overflow-hidden flex-none flex-nowrap shrink-0`}>
            <img src={image} alt="imagae" className="object-contain h-full w-full"></img>
        </div>
    )
}

export default ProfileImg