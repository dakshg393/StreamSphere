import axios from "axios";
import React, { useEffect, useState } from "react";
import VerticalCard from "../Card/VerticalCard";
import PlaylistCard from "../Card/PlaylistCard";
import { getAllPlaylist } from "../../api/playlist";

const Playlist=()=>{
    const [playlist,setPlaylist] = useState([])

    useEffect(()=>{

        const fetchPlaylist = async () => {
            const res = await getAllPlaylist()
        //         const response = await axios.get(`${import.meta.env.VITE_SERVER}playlist/getAllPlaylist`, {
        //   withCredentials: true,
        // });
        console.log(res.data.data);
        setPlaylist(res.data.data)
        
        }

        fetchPlaylist();
     
    },[])
    

    return(
        <div className="w-full gap-4 flex-1 overflow-y-auto flex flex-row items-center p-4 flex-wrap">
        
        {playlist!=null ? playlist.map((item)=>(
            <>
                <PlaylistCard key={item._id} thumbnail={item.thumbnail} title={item.name} description={item.description} />
            </>
        )):(
            <>
                <h1>No Plasylist Found Please Create A Playlist</h1>
            </>
        )}
        
       
        </div>
    )
}

export default Playlist