import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Photos = () => {
  const { userId } = useParams();
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState({});
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
        alert('Upload finished successfully!');
        console.log(data);
        // Show uploaded images
        setImages(data.imageGallery);
        // Reset input
        setSelectedImages([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteImage = () => {
    const { image, index } = fullScreenImage;
  
    // Delete the image from the server
    fetch(`http://localhost:5000/uploads/image/${image}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
  
        // Delete the image filename from the user object's imageGallery
        const updatedGallery = [...images];
        updatedGallery.splice(index, 1);
        setImages(updatedGallery);
  
        // Close the full-screen view
        closeFullScreen();
      })
      .catch((error) => {
        console.error(error);
      });
  };  
  
  const openFullScreen = (image, index) => {
    setFullScreenImage({ image, index });
    setIsFullScreen(true);
  };
  

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setFullScreenImage(null);
  };
  

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 mt-9 px-6 md:px-10 lg:px-28 overflow-hidden'>
        {images.length > 0 ? (
          images.slice(0).reverse().map((image, i) => (
            <div
              key={i}
              className='max-w-[300px] md:max-w-[300px] lg:max-w-[370px] max-h-[300px] md:max-h-[300px] lg:max-h-[370px] aspect-square overflow-hidden mx-auto mb-6'
              onClick={() => openFullScreen(image)}
            >
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

      {isFullScreen && (
  <div className='fixed top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center'>
    <div className='relative'>
      <img
        className='max-h-screen'
        src={`http://localhost:5000/uploads/${fullScreenImage.image}`}
        alt=''
      />
      <div className='absolute top-4 right-4 flex space-x-2'>
        <button
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full'
          onClick={deleteImage}
        >
          Delete
        </button>
        <button
          className='bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full'
          onClick={closeFullScreen}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      <div className='fixed bottom-6 left-0 right-0 flex justify-center'>
        <div className='bg-gray-800 drop-shadow-lg w-[500px] mx-auto pb-3 rounded-full'>
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