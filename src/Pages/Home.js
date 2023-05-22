import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


const Home = () => {    

    return (
        <div className='h-screen grid items-center'>
            <div>
                <h1 className='text-[70px] text-white font-bold'>Become a
                Content Creator</h1>
                <Link to="creatorform"><button className='btn btn-wide text-xl mt-6'>Let's Get Started</button></Link>    
            </div>
        </div>
    );
};

export default Home;