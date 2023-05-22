import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

const EditProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [nameInput, setNameInput] = useState('');
  const navigate = useNavigate();
  const [socialMedia, setSocialMedia] = useState({
    instagram: '',
    linkedin: '',
    twitter: '',
  });

  useEffect(() => {
    // Fetch user data from the server
    const url = `https://smith-server.vercel.app/user/${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleSocialMediaInputChange = (e) => {
    const { name, value } = e.target;
    setSocialMedia((prevSocialMedia) => ({
      ...prevSocialMedia,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const updatedData = {
      name: nameInput,
      socialMedia,
    };

    // Send updated user information to the server
    const url = `https://smith-server.vercel.app/user/${userId}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          alert("successfully updated!");
          navigate(`/user/${userId}`);
        } else {
          
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="h-screen text-white grid place-items-center">
      <div className=' w-1/2 mx-auto'>
        <h1 className='text-4xl mb-4'>Edit Your Profile</h1>
        <div>
          <label className='text-lg'>
            Name:
            <input className="bg-gray-100 text-slate-900 w-full rounded-md text-lg p-3"
              type="text"
              value={nameInput}
              placeholder={user.name}
              onChange={handleNameInputChange}
            />
          </label>
        </div>
        <div>
          <label className='text-lg'>
            Instagram:
            <input className="bg-gray-100 text-slate-900 w-full rounded-md text-lg p-3"
              type="text"
              name="instagram"
              value={socialMedia.instagram}
              onChange={handleSocialMediaInputChange}
            />
          </label>
        </div>
        <div>
          <label className='text-lg'>
            LinkedIn:
            <input className="bg-gray-100 text-slate-900 w-full rounded-md text-lg p-3"
              type="text"
              name="linkedin"
              value={socialMedia.linkedin}
              onChange={handleSocialMediaInputChange}
            />
          </label>
        </div>
        <div>
          <label className='text-lg'>
            Twitter:
            <input className="bg-gray-100 text-slate-900 w-full mb-4 rounded-md text-lg p-3"
              type="text"
              name="twitter"
              value={socialMedia.twitter}
              onChange={handleSocialMediaInputChange}
            />
          </label>
        </div>
        <button className='bg-lime-500 hover:bg-lime-600 px-6 py-2 rounded-sm mr-5 text-xl' onClick={handleSaveChanges}>Save</button>
        <Link to={`/user/${userId}`}><button className='bg-red-500 hover:bg-red-600 px-6 py-2 rounded-sm text-xl'>Cancel</button></Link>
      </div>
    </div>
  );
};

export default EditProfile;
