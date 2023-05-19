import React, { useEffect, useState } from 'react';

const Videos = () => {
    const [vids, setVids] = useState([]);

  useEffect(() => {
    fetch("vid.json")
      .then((res) => res.json())
      .then((data) => setVids(data));
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
                {vids.map((vid, i) => (
                    <div 
                    key={i} 
                    className='
                    max-w-[300px] md:max-w-[300px] lg:max-w-[370px] 
                    max-h-[300px] md:max-h-[300px] lg:max-h-[370px] 
                    aspect-square 
                    overflow-hidden 
                    mx-auto 
                    mb-6 '>
                        {/* <video className='
                        max-w-full 
                        h-auto ' src={vid.vid} controls>
                        </video> */}
                        <video
                        src={vid.vid}
                        className="w-full h-full object-cover"
                        controls
                    ></video>
                    </div>
            ))} 
            </div>
        </div>
    );
};

export default Videos;