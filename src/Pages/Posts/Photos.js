import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Photos = () => {
  const { userId } = useParams();
    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState([]);
    const [user, setUser] = useState({});

    
    useEffect(() => {
        const url = `http://localhost:5000/user/${userId}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            if (data.imageGallery) {
                setImages(data.imageGallery);
              }
          });
      }, [userId]);

    const handleImageUpload = (event) => {
      const files = event.target.files;
      setSelectedImages(Array.from(files));
    };
  
    const handleUpload = (userId) => {
      const formData = new FormData();
      formData.append('userId', userId);
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });
    
      fetch('http://localhost:5000/user/upload/images', {
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
        {images.length > 0 ? (
          images.map((image, i) => (
            <div
              key={i}
              className='max-w-[300px] md:max-w-[300px] lg:max-w-[370px] max-h-[300px] md:max-h-[300px] lg:max-h-[370px] aspect-square overflow-hidden mx-auto mb-6'>
              <img
                className='max-w-full h-auto'
                src={`http://localhost:5000/uploads/${image}`}
                alt=''
              />
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>

      <div className='fixed bottom-6 left-0 right-0 flex justify-center'>
        <div className='bg-gray-800 drop-shadow-lg w-[500px] mx-auto  pb-3 rounded-full'>
            <input type='file' multiple onChange={handleImageUpload} />
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

export default Photos;
