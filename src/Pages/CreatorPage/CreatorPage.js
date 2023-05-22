import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Videos from '../Posts/Videos';
import Photos from '../Posts/Photos';
import insta from '../../Images/insta.png';
import linked from '../../Images/linked.png';
import tweet from '../../Images/tweet.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const CreatorPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [nameInput, setNameInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [userF] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
    };

  
    useEffect(() => {
      const url = `https://smith-server.vercel.app/user/${userId}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }, []);
  
    const handleNameInputChange = (e) => {
      setNameInput(e.target.value);
    };
  
    const handleUpdateName = () => {
      const url = `https://smith-server.vercel.app/user/${userId}`;
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameInput }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({ ...user, name: data.name });
          setIsEditing(false);
        })
        .catch((error) => console.log(error));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const fileURL = URL.createObjectURL(file);
        setImageFile(file);
        setImageURL(fileURL);
      };
      const handleSaveImage = () => {
        if (imageFile) {
          const formData = new FormData();
          formData.append('image', imageFile);
      
          fetch(`https://smith-server.vercel.app/user/${userId}`, {
            method: 'PUT',
            headers: {
          'Content-Type': 'application/json',
            },
            body: JSON.stringify({ propic: formData }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Update the image URL or perform any other desired actions
              console.log('Image uploaded successfully');
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      };
            

    const [on, setOn] = useState(false);

    const showMenu = () => {
        setOn(!on);
    };

    return (
        <div className='h-screen text-white'>
            <div
        className="cover h-[330px] bg-slate-900 grid grid-cols-2"
        style={{
          backgroundImage: `url()`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <p className="text-left text-white text-[24px] mt-[20px] ml-[22px] font-[600]">
          {/* {isEditing ? (
            <input
              type="text"
              value={nameInput}
              onChange={handleNameInputChange}
              placeholder={user.name}
              className='text-black'
            />
          ) : (
           
          )}
          {isEditing ? (
          <button className='text-base ml-4 inline-block bg-lime-300 px-6 ml-6 text-slate-900 rounded-sm' onClick={handleUpdateName}>Save</button>
        ) : (
          <button className='text-base inline-block bg-gray-300 px-6 ml-6 text-slate-900 rounded-sm' onClick={() => setIsEditing(true)}>Edit</button>
        )} */}
         {user.name}
        </p>
        <div className='flex justify-end pt-[17px]'>
          <div className='w-[30px] h-[30px] mr-[25px]'>
              <Link to={user.socialMedia && user.socialMedia.linkedin ? (user.socialMedia.linkedin) : null}><img src={linked} alt="" /></Link>
          </div>
          <div className='w-[30px] h-[30px] mr-[25px]'>
          <Link to={user.socialMedia && user.socialMedia.twitter ? (user.socialMedia.twitter) : null}><img src={tweet} alt="" /></Link>
          </div>
          <div className='w-[30px] h-[30px] mr-[25px]'>
          <Link to={user.socialMedia && user.socialMedia.instagram ? (user.socialMedia.instagram) : null}><img src={insta} alt="" /></Link>
          </div>
        </div>
      </div>
      <div className="proPic">
            <div className="w-[200px] h-[200px] bg-slate-900 rounded-full mx-auto mt-[-115px] drop-shadow-[0px_0px_5px_rgba(0,0,0,1) overflow-hidden]">
                <img className='rounded-full' src={user.propic} alt="" />
            </div>
            {/* <input type="file" onChange={handleImageUpload} />
            <button onClick={handleSaveImage}>save</button> */}
            <div className='grid grid-cols-2 w-[220px] mx-auto'>
              <Link to={`/edit-profile/${userId}`}>
                <p className='text-base mt-4 border-white border-2 w-[100px] mx-auto bg-white text-black'>Edit Profile</p>
              </Link>
              <Link to="/">
                <button onClick={logout} className='text-base mt-4 border-white border-2 w-[100px] mx-auto'>Sign Out</button>
              </Link>
            </div>
        </div>

      <div>
        <div className="tabs grid grid-cols-2">
          <a
            onClick={showMenu}
            className={on ? 'tab tab-bordered text-base text-white' : 'tab-active tab tab-bordered text-base text-white'}
          >
            PHOTOS
          </a>
          <a
            onClick={showMenu}
            className={on ? 'tab-active tab tab-bordered text-base text-white' : 'tab tab-bordered text-base text-white'}
          >
            VIDEOS
          </a>
        </div>
        {on ? <Videos /> : <Photos />}
      </div>          
        </div>
    );
};

export default CreatorPage;