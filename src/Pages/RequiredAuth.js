import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loading from './Signin/loading';

const RequiredAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default RequiredAuth;
