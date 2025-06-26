import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VerticalCard from '../Components/Card/VerticalCard';

const Account = () => {
    const { _id } = useParams();
    const [channelData, setChannelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER}users/c/${_id}`,
                    { withCredentials: true }
                );


                setChannelData(response.data.data[0]); // because backend returns an array
                console.log(response.data.data[0])
            } catch (err) {
                setError(err.response?.data?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchChannel();
    }, [_id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!channelData) return <p>No data found.</p>;

    return (
        <section className="w-full h-screen   flex flex-wrap  md:p-5 p-2  mb-2 bg-white    overflow-y-auto">

            <div className=' w-full h-96 drop-shadow-2xl rounded-2xl border-1 p-2'>
                <div className=' w-full h-40 '>
                    <img src={channelData?.coverImage} className='w-full h-full' />
                </div>
                <div className=' h-40 px-5 flex justify-start '>
                    <img src={channelData?.avatar} alt='Profile Image' className='h-full aspect-square transform -translate-y-[40%] rounded-full ' />
                    <div className='p-4'>
                        <h1>{channelData?.fullName}</h1>
                        <h2>@{channelData?.userName}</h2>
                        <h3>Subscriber {channelData?.subscribersCount} </h3>
                        <button className='bg-purple-500 p-2 mt-2 rounded-2xl'>Subscribe</button>
                    </div>
                </div>




            </div>

            <div className='  mt-5 w-full'>
                <div>
                    <div className='flex items-center justify-center w-full bg-blue-400 h-10 border-1'>
                        <span className='w-1/2 text-center '> Video </span>
                        <span className='w-1/2 text-center '>Twwets</span>
                    </div>
                    {channelData?.videos?.length > 0 ? (
                        <div className="flex flex-wrap gap-4 items-center justify-center">
                            {channelData.videos.map((video) => (
                                <VerticalCard
                                    key={video._id}
                                    thumbnail={video.thumbnail}
                                    title={video.title}
                                    owner={video.owner}
                                    views={video.views}
                                    createdAt={video.createdAt}
                                    id={video._id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            <p className="text-lg font-medium">No videos uploaded yet.</p>
                            <p className="text-sm">Please check back later or explore other content.</p>
                        </div>
                    )}
                </div>
            </div>


        </section>
    );
};

export default Account;
