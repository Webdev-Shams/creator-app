import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Videos from '../Posts/Videos';
import Photos from '../Posts/Photos';
import insta from '../../Images/insta.png';
import linked from '../../Images/linked.png';
import tweet from '../../Images/tweet.png';

const CreatorPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [nameInput, setNameInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageURL, setImageURL] = useState('');

  
    useEffect(() => {
      const url = `http://localhost:5000/user/${userId}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }, []);
  
    const handleNameInputChange = (e) => {
      setNameInput(e.target.value);
    };
  
    const handleUpdateName = () => {
      const url = `http://localhost:5000/user/${userId}`;
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameInput }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
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
      
          fetch(`http://localhost:5000/user/${userId}`, {
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
          {isEditing ? (
            <input
              type="text"
              value={nameInput}
              onChange={handleNameInputChange}
            />
          ) : (
            user.name
          )}
          {isEditing ? (
          <button className='text-base ml-4 ' onClick={handleUpdateName}>Save</button>
        ) : (
          <button className='text-base' onClick={() => setIsEditing(true)}>Edit</button>
        )}
        </p>
        <div className="flex justify-end pt-[17px]">
          <div className="w-[30px] h-[30px] mr-[25px]">
            <Link><img src={linked} alt="" /></Link>
          </div>
          <div className="w-[30px] h-[30px] mr-[25px]">
            <Link><img src={tweet} alt="" /></Link>
          </div>
          <div className="w-[30px] h-[30px] mr-[25px]">
            <Link><img src={insta} alt="" /></Link>
          </div>
        </div>
      </div>
      <div className="proPic">
            <div className="w-[200px] h-[200px] bg-slate-900 rounded-full mx-auto mt-[-115px] drop-shadow-[0px_0px_5px_rgba(0,0,0,1) overflow-hidden]">
                <img className='rounded-full' src={user.propic} alt="" />
            </div>
            <input type="file" onChange={handleImageUpload} />
            <button onClick={handleSaveImage}>save</button>
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