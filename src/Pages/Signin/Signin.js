import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from './loading';
import auth from '../../firebase.init';
import google from '../../Images/google.png';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRedirect = async () => {
      if (user) {
        const url = `https://smith-server.vercel.app/users?email=${user.email}`;
        try {
          const response = await fetch(url);
          const result = await response.json();

          if (result.alreadyExists) {
            // User with this email already exists, redirect to creator page or any other page as needed
            navigate(`/creatorpage`);
          } else {
            // New user, redirect to creator form
            navigate('/creatorform');
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    checkUserRedirect();
  }, [user, navigate]);

  let signInError;

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    signInError = <p className='text-red-500'><small>{error?.message}</small></p>;
  }

  return (
    <div className='h-screen grid items-center'>
      <div>
        <h1 className='text-[30px] font-bold text-white'>Please Sign in with Google</h1>
        <button
          onClick={handleSignIn}
          className="btn text-xl px-32 bg-white hover:bg-stale-900 mt-9"
        >
          <img className='w-[50px]' src={google} alt="" />
        </button>
        {signInError}
      </div>
    </div>
  );
};

export default Signin;
