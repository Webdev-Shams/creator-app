import React, { useEffect, useState } from 'react';

const Photos = () => {
    const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("img.json")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

    return (
        <div>
            <div 
            className='
            grid 
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3  
            gap-9
            mt-9 
            px-6 md:px-10 lg:px-28 
            overflow-hidden'>
                {images.map((image, i) => (
                    <div 
                    key={i} 
                    className='
                    max-w-[300px] md:max-w-[300px] lg:max-w-[370px] 
                    max-h-[300px] md:max-h-[300px] lg:max-h-[370px] 
                    aspect-square 
                    overflow-hidden 
                    mx-auto 
                    mb-6 '>
                        <img 
                        className='
                        max-w-full 
                        h-auto ' 
                        src={image.img} 
                        alt="" />
                    </div>
            
            ))} 
            </div>
        </div>
    );
};

export default Photos;