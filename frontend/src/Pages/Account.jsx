import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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


                setChannelData(response.data); // because backend returns an array
                console.log(response.data)
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
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                    src={channelData.coverImage || '/default-cover.jpg'}
                    alt="Cover"
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={channelData.avatar || '/default-avatar.png'}
                            alt="Avatar"
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">{channelData.fullName}</h2>
                            <p className="text-gray-500">@{channelData.userName}</p>
                            <p className="text-sm text-gray-400">{channelData.email}</p>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-6 text-sm text-gray-600">
                        <span>{channelData.subscribersCount} Subscribers</span>
                        <span>{channelData.channelSubscribedToCount} Subscribed</span>
                        {channelData.isSubscribedTo !== undefined && (
                            <span>
                                {channelData.isSubscribedTo ? 'Subscribed' : 'Not Subscribed'}
                            </span>
                        )}
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Videos</h3>
                        {channelData.videos?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {channelData.videos.map((video) => (
                                    <div key={video._id} className="border rounded p-2">
                                        <h4 className="font-medium">{video.title}</h4>
                                        <p className="text-xs text-gray-500">{video.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No videos uploaded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
