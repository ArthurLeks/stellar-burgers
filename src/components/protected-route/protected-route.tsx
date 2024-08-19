import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getCookie('accessToken');
  console.log(token);
  if (!token) {
    return <Navigate to='/login' />;
  } else return <>{children}</>;
};

export const ProtectedRouteAuth = ({ children }: ProtectedRouteProps) => {
  const token = getCookie('accessToken');
  if (token) {
    return <Navigate to='/' />;
  } else return <>{children}</>;
};
