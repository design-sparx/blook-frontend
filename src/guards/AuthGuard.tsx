import React, {useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../hooks/hooks';

interface AuthGuardProps {
  children?: React.ReactNode
}

const AuthGuard = ({children}: AuthGuardProps): any => {
  const {currentUser} = useAppSelector((state: any) => state.userReducer);
  const {pathname} = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!Boolean(currentUser)) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <p>redirecting</p>;
  }

  if ((requestedLocation != null) && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation}/>;
  }

  return <>{children}</>;
};

export default AuthGuard;
