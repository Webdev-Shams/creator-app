import React, { useState } from 'react';
import Photos from '../Posts/Photos';
import Videos from '../Posts/Videos';
import insta from '../../Images/insta.png';
import linked from '../../Images/linked.png';
import tweet from '../../Images/tweet.png';
import coverBg from './cover-bg.png';

const Banner = () => {
    const [on,seton] = useState(false);
    const showMenu = () => {
        seton(!on)
    }
    
    return (
        <div>
            <div className='cover h-[330px] bg-slate-900 grid grid-cols-2' style={{
                backgroundImage: `url(${coverBg})`, 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover'
                }}>
                <p className='text-left text-[24px] mt-[20px] ml-[22px] font-[600]'>Smith T</p>
                <div className='flex justify-end pt-[17px]'>
                    <div className='w-[30px] h-[30px] mr-[25px]'><img src={linked} alt="" /></div>
                    <div className='w-[30px] h-[30px] mr-[25px]'><img src={tweet} alt="" /></div> 
                    <div className='w-[30px] h-[30px] mr-[25px]'><img src={insta} alt="" /></div>                   
                </div>
            </div>
            <div className='proPic'>
                <div className='w-[200px] h-[200px] bg-slate-900 rounded-full mx-auto mt-[-115px] drop-shadow-[0px_0px_5px_rgba(0,0,0,1) overflow-hidden]'>
                    <img className='rounded-full' src={linked} alt="" />
                </div>
            </div>
            <div>
            <div className="tabs grid grid-cols-2">
                <a onClick={showMenu} className={on ? 'tab tab-bordered text-base' : 'tab-active  tab tab-bordered text-base'}>PHOTOS</a> 
                <a onClick={showMenu} className={on ? 'tab-active tab tab-bordered text-base' : 'tab tab-bordered text-base'}>VIDEOS</a> 
            </div>
            {on ? <Videos /> : <Photos />}
            </div>
        </div>
    );
};

export default Banner;