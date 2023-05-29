import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Videos = () => {
    const { userId } = useParams();
    const [vids, setVids] = useState([]);
    const [user, setUser] = useState({});
    const [selectedVideos, setSelectedVideos] = useState([]);


    useEffect(() => {
        const url = `http://localhost:5000/user/${userId}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            if (data.imageGallery) {
                setVids(data.videoGallery);
                console.log(vids);
              }
          });
      }, [userId]);

      const handleVideoUpload = (event) => {
        const files = event.target.files;
        setSelectedVideos(Array.from(files));
      };
    
      const handleUpload = (userId) => {
        const formData = new FormData();
        formData.append('userId', userId);
        selectedVideos.forEach((video) => {
          formData.append('videos', video);
        });
      
        fetch('http://localhost:5000/user/upload/videos', {
          method: 'PUT',
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 mt-9 px-6 md:px-10 lg:px-28 overflow-hidden'>
                {vids.length > 0 ? (
                vids.map((vid, i) => (
                    <div
                    key={i}
                    className='max-w-[300px] md:max-w-[300px] lg:max-w-[370px] max-h-[300px] md:max-h-[300px] lg:max-h-[370px] aspect-square overflow-hidden mx-auto mb-6'>
                    <video
                        src={`http://localhost:5000/uploads/${vid}`}
                        className='w-full h-full object-cover'
                        controls
                    ></video>
                    </div>
                ))
                ) : (
                <p></p>
                )}
            </div>
            
            <div className='fixed bottom-6 left-0 right-0 flex justify-center'>
                <div className='bg-gray-800 drop-shadow-lg w-[500px] mx-auto  pb-3 rounded-full'>
                <input type='file' accept='video/*' multiple onChange={handleVideoUpload} />
                <button
                    onClick={() => handleUpload(userId)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-4'
                    >
                        Upload
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default Videos;