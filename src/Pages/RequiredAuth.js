import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Signin/loading';

const RequiredAuth = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
    }
    return children;
};

export default RequiredAuth;