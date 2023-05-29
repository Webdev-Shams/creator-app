import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Videos = () => {
  const { userId } = useParams();
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState({});


  useEffect(() => {
    const url = `http://localhost:5000/user/${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data.videoGallery) {
          setVideos(data.videoGallery);
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
        alert('Upload finished successfully!');
        console.log(data);
        // Show uploaded videos
        setVideos(data.videoGallery);
        // Reset input
        setSelectedVideos([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteVideo = (video) => {
    const filename = video;

    fetch(`http://localhost:5000/uploads/video/${filename}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Remove the deleted video from the state
        setVideos((prevVideos) => prevVideos.filter((v) => v !== video));

        // Remove the deleted video from the user object
        const updatedUser = { ...user };
        const updatedVideoGallery = updatedUser.videoGallery.filter((v) => v !== video);
        updatedUser.videoGallery = updatedVideoGallery;

        setUser(updatedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 mt-9 px-6 md:px-10 lg:px-28 overflow-hidden'>
        {videos.length > 0 ? (
          videos.slice(0).reverse().map((video, i) => (
            <div
              key={i}
              className='max-w-[300px] md:max-w-[300px] lg:max-w-[370px] max-h-[300px] md:max-h-[300px] lg:max-h-[370px] aspect-square overflow-hidden mx-auto mb-6 relative'
            >
              <video
                src={`http://localhost:5000/uploads/${video}`}
                className='w-full h-full object-cover'
                controls
              ></video>

              <div className='absolute top-4 right-4 flex space-x-2'>
                <button
                  className='bg-red-500 hover:bg-red-600 text-white font-bold hover:py-2 py-0 px-4 rounded-full'
                  onClick={() => deleteVideo(video)}
                >
                  Delete
                </button>
              </div>
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
