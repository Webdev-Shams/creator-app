// import React, { useState } from 'react';

// const Editprofile = () => {
//   const [name, setName] = useState('');
//   const [profileImage, setProfileImage] = useState('');
//   const [coverPicture, setCoverPicture] = useState('');

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleProfileImageChange = (e) => {
//     setProfileImage(e.target.value);
//   };

//   const handleCoverPictureChange = (e) => {
//     setCoverPicture(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedData = {
//       name,
//       profileImage,
//       coverPicture,
//     };

//     // Send the updated data to the server
//     const url = `http://localhost:5000/user/${userId}`;
//     fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // Handle the response from the server if needed
//         console.log(data);
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={name} onChange={handleNameChange} />
//         </label>
//         <br />
//         <label>
//           Profile Image:
//           <input
//             type="text"
//             value={profileImage}
//             onChange={handleProfileImageChange}
//           />
//         </label>
//         <br />
//         <label>
//           Cover Picture:
//           <input
//             type="text"
//             value={coverPicture}
//             onChange={handleCoverPictureChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default Editprofile;
