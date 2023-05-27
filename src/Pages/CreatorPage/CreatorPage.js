// Import necessary dependencies and images
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
  const [userF] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const [on, setOn] = useState(false);

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const url = `http://localhost:5000/user/${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
        setIsLoading(false);
      });
  }, []);

  // Conditionally render based on isLoading and user availability
if (isLoading) {
  return <div>Loading...</div>;
}

if (!user) {
  return <div>User not found</div>;
}


  const showMenu = () => {
    setOn(!on);
  };

  return (
    <div className="h-screen text-white">
      <div
        className="cover h-[330px] bg-slate-900 grid grid-cols-2"
        style={{
          backgroundImage: `url(http://localhost:5000/uploads/${user.coverImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <p className="text-left text-white text-[24px] mt-[20px] ml-[22px] font-[600]">
          {user.name}
        </p>
        <div className="flex justify-end pt-[17px]">
          <div className="w-[30px] h-[30px] mr-[25px]">
            <Link
              to={
                user.socialMedia && user.socialMedia.linkedin
                  ? user.socialMedia.linkedin
                  : null
              }
            >
              <img src={linked} alt="" />
            </Link>
          </div>
          <div className="w-[30px] h-[30px] mr-[25px]">
            <Link
              to={
                user.socialMedia && user.socialMedia.twitter
                  ? user.socialMedia.twitter
                  : null
              }
            >
              <img src={tweet} alt="" />
            </Link>
          </div>
          <div className="w-[30px] h-[30px] mr-[25px]">
            <Link
              to={
                user.socialMedia && user.socialMedia.instagram
                  ? user.socialMedia.instagram
                  : null
              }
            >
              <img src={insta} alt="" />
            </Link>
          </div>
        </div>
      </div>
      <div className="proPic">
        <div className="w-[200px] h-[200px] bg-slate-900 rounded-full mx-auto mt-[-115px] drop-shadow-[0px_0px_5px_rgba(0,0,0,1) overflow-hidden]">
          <img className="rounded-full" src={`http://localhost:5000/uploads/${user.profileImage}`} alt="" />
        </div>
        <div className="grid grid-cols-2 w-[220px] mx-auto">
          <Link to={`/edit-profile/${userId}`}>
            <p className="text-base mt-4 border-white border-2 w-[100px] mx-auto bg-white text-black">
              Edit Profile
            </p>
          </Link>
          <Link to="/">
            <button
              onClick={logout}
              className="text-base mt-4 border-white border-2 w-[100px] mx-auto"
            >
              Sign Out
            </button>
          </Link>
        </div>
      </div>

      <div>
        <div className="tabs grid grid-cols-2">
          <a
            onClick={showMenu}
            className={
              on
                ? 'tab tab-bordered text-base text-white'
                : 'tab-active tab tab-bordered text-base text-white'
            }
          >
            PHOTOS
          </a>
          <a
            onClick={showMenu}
            className={
              on
                ? 'tab-active tab tab-bordered text-base text-white'
                : 'tab tab-bordered text-base text-white'
            }
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


// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import Videos from '../Posts/Videos';
// import Photos from '../Posts/Photos';
// import insta from '../../Images/insta.png';
// import linked from '../../Images/linked.png';
// import tweet from '../../Images/tweet.png';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import auth from '../../firebase.init';
// import { signOut } from 'firebase/auth';

// const CreatorPage = () => {
//     const { userId } = useParams();
//     const [user, setUser] = useState({});
//     const [nameInput, setNameInput] = useState('');
//     const [userF] = useAuthState(auth);

//     const logout = () => {
//         signOut(auth);
//     };

  
//     useEffect(() => {
//       const url = `http://localhost:5000/user/${userId}`;
//       fetch(url)
//         .then((res) => res.json())
//         .then((data) => setUser(data));
//         console.log(user.name);
//     }, []);
  
   
//     const [on, setOn] = useState(false);

//     const showMenu = () => {
//         setOn(!on);
//     };

//     return (
//         <div className='h-screen text-white'>
//             <div
//               className="cover h-[330px] bg-slate-900 grid grid-cols-2"
//               style={{
//                 backgroundImage: `url(${user.coverImage})`,
//                 backgroundRepeat: 'no-repeat',
//                 backgroundSize: 'cover',
//               }}
//             >
//               <p className="text-left text-white text-[24px] mt-[20px] ml-[22px] font-[600]">
//               {user.name}
//               </p>
//               <div className='flex justify-end pt-[17px]'>
//                 <div className='w-[30px] h-[30px] mr-[25px]'>
//                     <Link to={user.socialMedia && user.socialMedia.linkedin ? (user.socialMedia.linkedin) : null}><img src={linked} alt="" /></Link>
//                 </div>
//                 <div className='w-[30px] h-[30px] mr-[25px]'>
//                 <Link to={user.socialMedia && user.socialMedia.twitter ? (user.socialMedia.twitter) : null}><img src={tweet} alt="" /></Link>
//                 </div>
//                 <div className='w-[30px] h-[30px] mr-[25px]'>
//                 <Link to={user.socialMedia && user.socialMedia.instagram ? (user.socialMedia.instagram) : null}><img src={insta} alt="" /></Link>
//                 </div>
//               </div>
//             </div>
//             <div className="proPic">
//                   <div className="w-[200px] h-[200px] bg-slate-900 rounded-full mx-auto mt-[-115px] drop-shadow-[0px_0px_5px_rgba(0,0,0,1) overflow-hidden]">
//                       <img className='rounded-full' src={user.profileImage} alt="" />
//                   </div>
//                   {/* <input type="file" onChange={handleImageUpload} />
//                   <button onClick={handleSaveImage}>save</button> */}
//                   <div className='grid grid-cols-2 w-[220px] mx-auto'>
//                     <Link to={`/edit-profile/${userId}`}>
//                       <p className='text-base mt-4 border-white border-2 w-[100px] mx-auto bg-white text-black'>Edit Profile</p>
//                     </Link>
//                     <Link to="/">
//                       <button onClick={logout} className='text-base mt-4 border-white border-2 w-[100px] mx-auto'>Sign Out</button>
//                     </Link>
//                   </div>
//               </div>

//             <div>
//               <div className="tabs grid grid-cols-2">
//                 <a
//                   onClick={showMenu}
//                   className={on ? 'tab tab-bordered text-base text-white' : 'tab-active tab tab-bordered text-base text-white'}
//                 >
//                   PHOTOS
//                 </a>
//                 <a
//                   onClick={showMenu}
//                   className={on ? 'tab-active tab tab-bordered text-base text-white' : 'tab tab-bordered text-base text-white'}
//                 >
//                   VIDEOS
//                 </a>
//               </div>
//               {on ? <Videos /> : <Photos />}
//             </div>          
//         </div>
//     );
// };

// export default CreatorPage;