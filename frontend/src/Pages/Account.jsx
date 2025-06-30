import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VerticalCard from '../Components/Card/VerticalCard';
import { unsubscribeFromChannel } from '../api/subscription';

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

    const subscribeHandler=async()=>{
        if(channelData.isSubscribedTo){
            try {
                const res = unsubscribeFromChannel(_id)
                channelData.isSubscribedTo = false
                
            } catch (error) {
                
            }
            
            
        }else{
            const res = await unsubscribeFromChannel()
        }
    }

    return (
  
        <section className="w-full h-full flex flex-col">
            {/* Heading */}
            <div className=" w-full  shadow flex items-center rounded-2xl border-1 px-4">
                <div className=' w-full h-90 drop-shadow-2xl  p-2'>
                    <div className=' w-full h-40 '>
                        <img src={channelData?.coverImage} className='w-full h-full' />
                    </div>
                    <div className=' h-40 px-5 flex justify-start '>
                        <img src={channelData?.avatar} alt='Profile Image' className='h-full aspect-square transform -translate-y-[40%] rounded-full ' />
                        <div className='p-4'>
                            <h1>{channelData?.fullName}</h1>
                            <h2>@{channelData?.userName}</h2>
                            <h3>Subscriber {channelData?.subscribersCount} </h3>
                            <button onClick={()=>subscribeHandler()} className={`${channelData.isSubscribedTo && "bg-purple-500"} border-1 p-2 mt-2 rounded-2xl`}>Subscribe</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scrollable Video List */}
            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center gap-4">



            </div>
        </section>
    );
};

export default Account;
