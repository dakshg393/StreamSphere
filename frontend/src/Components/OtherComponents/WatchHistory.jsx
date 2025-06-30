import React, { useEffect, useState } from "react";
import HorizontalCard from "../Card/HorizontalCard";
import { getWatchHistory } from "../../api/user";

const WatchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getWatchHistory();
        console.log(response.data.data);
        setHistory(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch watch history", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="w-full flex-1 overflow-y-auto flex flex-col items-center">
      <div className="w-full flex-1 overflow-y-auto flex flex-col items-center">
      
        <div className="w-full gap-4 flex flex-wrap justify-center items-center">
          {history.length === 0 ? (
            <h1>No watch history found</h1>
          ) : (
            history.map((video) => (
               <HorizontalCard
              key={video._id}
              id={video._id}
              thumbnail={video.thumbnail}
              title={video.title}
              owner={video.owner}
              views={video.views}
              createdAt={video.createdAt}
            />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchHistory;
