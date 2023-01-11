import React, { useEffect } from 'react';
import {logoutInitiate} from '../redux/actions/user';
import {useAppDispatch} from '../hooks/hooks';
import {Container, createStyles, Loader, Title} from '@mantine/core';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const useStyles = createStyles(() => ({
  wrapper: {
    display: 'grid',
    placeItems: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center'
  }
}));

const Signout = () => {
  const {classes} = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      dispatch(logoutInitiate() as any);
      navigate('/');
    }, 3000);
  }, []);


  return (
    <div className={classes.wrapper}>
      <Helmet>
        <title>Blook - Signing out</title>
      </Helmet>
      <Container>
        <Loader size="lg" mb="md"/>
        <Title order={2}>Signing you out</Title>
      </Container>
    </div>
  );
};

export default Signout;
