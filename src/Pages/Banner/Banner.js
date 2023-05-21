import React, { useEffect, useState } from 'react';
import Photos from '../Posts/Photos';
import Videos from '../Posts/Videos';
import insta from '../../Images/insta.png';
import linked from '../../Images/linked.png';
import tweet from '../../Images/tweet.png';
import coverBg from './cover-bg.png';
import { useNavigate, useParams } from 'react-router-dom';
import Home from '../Home';

const Banner = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const url = `http://localhost:3000/user/${userId}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setUser(data));
    } ,[]);


    const [on, setOn] = useState(false);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(() => {
        // Retrieve subscription status from local storage
        const subscribedStatus = localStorage.getItem('subscribed');
        return subscribedStatus === 'true';
      });

    const showMenu = () => {
        setOn(!on);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
          localStorage.setItem('subscribed', 'true');
          setSubscribed(true);
        } else {
          alert('Please enter a valid email address.');
        }
    };

    const validateEmail = (email) => {
        // Email validation logic (you can use a library or custom logic)
        // Return true if the email is valid, false otherwise
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    

    return (
        <div>
            <div className='cover h-[330px] bg-slate-900 grid grid-cols-2' style={{
                backgroundImage: `url(${user.coverimg})`, 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover'
                }}>
                <p className='text-left text-[24px] mt-[20px] ml-[22px] font-[600]'>{user.name}</p>
                <div className='flex justify-end pt-[17px]'>
                    <div className='w-[30px] h-[30px] mr-[25px]'><img src={linked} alt="" /></div>
                    <div className='w-[30px] h-[30px] mr-[25px]'><img src={tweet} alt="" /></div> 
                    <div className='w-[30px] h-[30px] mr-[25px]'><img src={insta} alt="" /></div>                   
                </div>
            </div>
            <div className='proPic'>
                <div className='w-[200px] h-[200px] bg-slate-900 rounded-full mx-auto mt-[-115px] drop-shadow-[0px_0px_5px_rgba(0,0,0,1) overflow-hidden]'>
                    <img className='rounded-full' src={user.proimg} alt="" />
                </div>
            </div>
            <div>
            {!subscribed ? (
            <div>
                <h2>Subscribe to access content</h2>
                <form onSubmit={handleSubscribe}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
                </form>
            </div>
            ) : (
            <div>
                <div className="tabs grid grid-cols-2">
                <a onClick={showMenu} className={on ? 'tab tab-bordered text-base' : 'tab-active tab tab-bordered text-base'}>PHOTOS</a>
                <a onClick={showMenu} className={on ? 'tab-active tab tab-bordered text-base' : 'tab tab-bordered text-base'}>VIDEOS</a>
                </div>
                {on ? <Videos /> : <Photos />}
            </div>
            )}
            </div>
        </div>
    );
};

export default Banner;