import React, { useEffect } from "react";
import HorizontalCard from "../Card/HorizontalCard";
import VerticalCard from "../Card/VerticalCard";
import axios from "axios";

const WatchHistory = () => {
    useEffect(()=>{
        const fetchHistory= async()=>{
                const response = await axios.get(`${import.meta.env.VITE_SERVER}users/history`, {
          withCredentials: true,
        });
        console.log(response.data);
        
        }

        fetchHistory();
     
    },[])
    return (
        <div className="w-full flex-1 overflow-y-auto flex flex-col items-center">
        <div className="w-full flex-1 overflow-y-auto flex flex-col items-center">
            <h1 className="text-xl font-semibold w-full text-start p-6">History</h1>
            <div className="w-full gap-4 flex flex-wrap justify-center items-center">
                <HorizontalCard/>
            </div>

           
        </div>
        </div>
    )
}

export default WatchHistory