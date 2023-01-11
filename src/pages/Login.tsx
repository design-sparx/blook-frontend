import React, {useEffect, useState} from 'react';
import {useForm} from '@mantine/form';
import {
  Alert,
  Anchor,
  Button, Container, createStyles,
  Divider, Grid,
  Group, Image, Paper,
  PaperProps,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Transition, UnstyledButton
} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {IAuth} from '../constants';
import {googleSignInInitiate, loginInitiate} from '../redux/actions/user';
import {FaExclamationCircle, FaFacebook, FaGoogle, FaSignInAlt} from 'react-icons/fa';
import {FcNews} from 'react-icons/fc';
import {Helmet} from 'react-helmet';

const useStyles = createStyles(() => ({
  wrapper: {
    display: 'grid',
    placeItems: 'center',
    alignItems: 'center',
    minHeight: '90vh',
  }
}));

const Login = (props: PaperProps): JSX.Element => {
  const {classes} = useStyles();
  const {
    loading: loginLoading,
    error: loginError,
    currentUser
  } = useAppSelector((state: any) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
    }
  });

  useEffect(() => {
    if (currentUser !== null) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    setShowError(Boolean(loginError));
  }, [loginLoading]);

  /**
   * handle login submit
   * @param values
   * @param event
   */
  const handleSubmit = (values: IAuth, event: React.SyntheticEvent): void => {
    event.preventDefault();
    const {
      email,
      password
    } = values;

    if ((email.length === 0) || (password.length === 0)) {
      return;
    }

    dispatch(loginInitiate({
      email,
      password
    }) as any);
  };

  const handleGoogleSubmit = (): void => {
    dispatch(googleSignInInitiate() as any);
  };

  const handleFacebookSubmit = (): void => {
    // dispatch(fbSignInInitiate() as any);
  };

  const handleCloseAlert = (): void => {
    setShowError(false);
  };

  return (
    <div>
      <Helmet>
        <title>Blook - Login</title>
      </Helmet>
      <Grid gutter={0}>
        <Grid.Col span={5}>
          <UnstyledButton p="md" sx={{display: 'flex', gap: 8}} component={Link} to="/">
            <FcNews size={24}/>
            <Text size="lg" weight={500}>Blook</Text>
          </UnstyledButton>

          <Container fluid className={classes.wrapper}>
            <Transition mounted={showError} transition="fade" duration={400} timingFunction="ease">
              {(styles) => (
                <Alert
                  style={styles}
                  icon={<FaExclamationCircle size={16}/>}
                  title="Bummer!"
                  color="red"
                  variant="filled"
                  radius="sm"
                  withCloseButton
                  onClose={handleCloseAlert}
                >
                  {loginError}
                </Alert>
              )}
            </Transition>
            <Paper radius="sm" p="xl" mt="md" {...props}>
              <Text size="xl" weight={500}>Welcome back</Text>

              <SimpleGrid cols={2} my="md">
                <Button onClick={handleGoogleSubmit} leftIcon={<FaGoogle/>}>Sign in with Google</Button>
                <Button onClick={handleFacebookSubmit} leftIcon={<FaFacebook/>}>Sign in with Facebook</Button>
              </SimpleGrid>

              <Divider label="Or continue with email" labelPosition="center" my="lg"/>

              <form onSubmit={form.onSubmit((values, event) => handleSubmit(values, event))}>
                <Stack>
                  <TextInput
                    required
                    label="Email"
                    placeholder="hello@mantine.dev"
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email === true && 'Invalid email'}
                  />
                  <PasswordInput
                    required
                    label="Password"
                    placeholder="Your password"
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                    error={form.errors.password === true && 'Password should include at least 6 characters'}
                  />
                </Stack>
                <Group position="apart" mt="xl">
                  <Anchor
                    component={Link}
                    type="button"
                    color="dimmed"
                    size="sm"
                    to="/register"
                  >
                    Don&apos;t have an account? Sign up
                  </Anchor>
                  <Button type="submit" leftIcon={<FaSignInAlt/>} loading={loginLoading}>Sign in</Button>
                </Group>
              </form>
            </Paper>
          </Container>
        </Grid.Col>
        <Grid.Col span={7}>
          <Image
            src="https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80"
            fit="cover"
            height='100vh'
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Login;
