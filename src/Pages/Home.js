import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


const Home = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [images, setImages] = useState([]);
    
    const onSubmit = async (data) => {
        const formData = new FormData();

        // Append other form data
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);

        // Append images
        images.forEach((image, index) => {
            formData.append(`image_${index}`, image);
        });

        const url = "http://localhost:5000/user";
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                alert('Account Successfully Created!');
                reset();
            } else {
                throw new Error('Failed to create account');
            }
        } catch (error) {
            console.log(error);
            alert('Error creating account');
        }
    };

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };


    return (
        <div className='h-screen grid items-center'>
            <div>
                <h1 className='text-[70px] font-bold'>Become a
                Content Creator</h1>
                <Link to="creatorform"><button className='btn btn-wide text-xl mt-6'>Let's Get Started</button></Link>    
            </div>
        </div>
    );
};

export default Home;