import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Loading from '../Signin/loading';


const CreatorForm = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    
      let signInError;
    
      if (loading) {
        return <Loading />;
      }
    
      if (error) {
        signInError = <p className='text-red-500'><small>{error?.message}</small></p>;
      }

    const onSubmit = (data) => {
        const url = "https://smith-server.vercel.app/user";
        fetch(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(result => {
            console.log(result);
            const userId = result.insertedId;
            if (userId) {
              // Object with the same email already exists, redirect to creator page
              navigate(`/user/${userId}`);
            } else {
              // New object created, redirect to creator page
              navigate(`/user/${result.insertedId}`);
            }
          })
          .catch(error => {
            console.log(error);
          });
      
        reset();
      };
      
    return (
        <div className='h-screen grid items-center bg-slate-900'>
            <div className='w-1/2 mx-auto bg-gray-300 px-7 py-7 rounded-md'>
                {/* <h1 className='text-5xl font-bold mb-6'>Complete Your Profile</h1> */}
                
                <form className='' onSubmit={handleSubmit(onSubmit)}>
                    {/* <input className='mb-1 w-full text-center py-3 rounded-md' placeholder='Name' {...register("name", { required: true, maxLength: 20 })} />
                    <br /> */}
                    <input
                    className='mb-1 w-full text-center py-3 rounded-md' placeholder='Enter Your Email' value={user.email}
                        {...register("email", {
                        required: "required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered value does not match email format"
                        }
                        })}
                        aria-invalid={errors.mail ? "true" : "false"}
                        type="email"
                    />
                    {/* <br />
                    <input className='mb-1 w-full text-center py-3 rounded-md' placeholder='Phone Number' type="number" {...register("phone", { required: true })} />
                    <br /> */}

                    <input className='bg-slate-900 hover:bg-slate-800 py-2 w-full text-white text-lg font-medium rounded-md cursor-pointer' type="submit" value="Proceed"/>
                </form>
            </div>
        </div>
    );
};

export default CreatorForm;