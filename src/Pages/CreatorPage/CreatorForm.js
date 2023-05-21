import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


const CreatorForm = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();


    const onSubmit = data => {
        console.log(data);
        const url = "http://localhost:5000/user";
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
            console.log(result.insertedId);
            const userId = result.insertedId;
            navigate(`/user/${userId}`);
        })
        .catch(error => {
            console.log(error);
        });
        
        alert('Account has been created successfully');
        reset();
    };


    return (
        <div className='h-screen grid items-center bg-slate-900'>
            <div className='w-1/2 mx-auto bg-gray-300 px-7 py-7 rounded-md'>
                <h1 className='text-5xl font-bold mb-6'>Complete Your Profile</h1>
                
                <form className='' onSubmit={handleSubmit(onSubmit)}>
                    <input className='mb-1 w-full text-center py-3 rounded-md' placeholder='Name' {...register("name", { required: true, maxLength: 20 })} />
                    <br />
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
                    <br />
                    <input className='mb-1 w-full text-center py-3 rounded-md' placeholder='Phone Number' type="number" {...register("phone", { required: true })} />
                    <br />

                    <input className='bg-slate-900 hover:bg-slate-800 py-2 w-full text-white text-lg font-medium rounded-md cursor-pointer' type="submit" value="Submit Info"/>
                </form>
            </div>
        </div>
    );
};

export default CreatorForm;