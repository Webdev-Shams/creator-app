import React from 'react';
import Photos from '../Posts/Photos';
import Videos from '../Posts/Videos';

const Banner = () => {
    return (
        <div>
            <div className='cover h-[330px] text-white bg-slate-900'>
            </div>
            <div className='proPic'>
                <div className='w-[200px] h-[200px] bg-slate-900 rounded-full mx-auto mt-[-115px] drop-shadow-[0px_0px_5px_rgba(0,0,0,1)]'></div>
            </div>
            <div>
                <Photos></Photos>
                <Videos></Videos>
            </div>
        </div>
    );
};

export default Banner;