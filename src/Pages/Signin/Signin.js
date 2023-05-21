import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from './loading';
import auth from '../../firebase.init';
import google from '../../Images/google.png'

const Signin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    let signInError;

    if (loading) {
        return <Loading></Loading>
    }

    if(error){
        signInError= <p className='text-red-500'><small>{error?.message}</small></p>
    }

    return (
        <div className='h-screen grid items-center'>
            <div>
                <h1 className='text-[30px] font-bold'>Please Sign in or Sign up with Google</h1>
                <button
                    onClick={() => signInWithGoogle()}
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