import React, {useEffect, useState} from 'react';
import {useForm} from '@mantine/form';
import {
  Alert,
  Anchor,
  Button, Checkbox, Container, createStyles,
  Divider, Image, Grid,
  Group, Paper,
  PaperProps,
  PasswordInput, SimpleGrid,
  Stack,
  Text,
  TextInput, Transition, UnstyledButton
} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {IAuth} from '../constants';
import {googleSignInInitiate, registerInitiate} from '../redux/actions/user';
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

const Register = (props: PaperProps): JSX.Element => {
  const {classes} = useStyles();
  const {
    loading: registerLoading,
    error: registerError,
    currentUser
  } = useAppSelector((state: any) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
      terms: true
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
    }
  });

  useEffect(() => {
    if (Boolean(currentUser)) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    setShowError(Boolean(registerError));
  }, [registerLoading]);

  const handleSubmit = (values: IAuth): any => {
    const {
      email,
      password,
      displayName,
      confirmPassword
    } = values;
    if (password !== confirmPassword) {
      return;
    }

    dispatch(registerInitiate({
      email,
      password,
      displayName
    }) as any);
  };

  const handleGoogleSubmit = (): void => {
    dispatch(googleSignInInitiate());
  };

  const handleFacebookSubmit = (): void => {
    console.log('');
  };

  const handleCloseAlert = (): void => {
    setShowError(false);
  };

  return (
    <div>
      <Helmet>
        <title>Blook - Get started</title>
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
                  {registerError}
                </Alert>
              )}
            </Transition>
            <Paper radius="sm" p="xl" mt="md" {...props}>
              <Text size="xl" weight={500}>Get started</Text>

              <SimpleGrid cols={2} my="md">
                <Button onClick={handleGoogleSubmit} leftIcon={<FaGoogle/>}>Sign up with Google</Button>
                <Button onClick={handleFacebookSubmit} leftIcon={<FaFacebook/>}>Sign up with Facebook</Button>
              </SimpleGrid>

              <Divider label="Or continue with email" labelPosition="center" my="lg"/>

              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack>
                  <TextInput
                    label="Display name"
                    placeholder="Your name"
                    value={form.values.displayName}
                    onChange={(event) => form.setFieldValue('displayName', event.currentTarget.value)}
                  />
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
                    placeholder="your password"
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                    error={form.errors.password === true && 'Password should include at least 6 characters'}
                  />
                  <PasswordInput
                    required
                    label="Confirm Password"
                    placeholder="confirm password"
                    value={form.values.confirmPassword}
                    onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                    error={form.errors.password === true && 'Password should include at least 6 characters'}
                  />
                  <Checkbox
                    label="I accept terms and conditions"
                    checked={form.values.terms}
                    onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                  />
                </Stack>

                <Group position="apart" mt="xl">
                  <Anchor
                    component={Link}
                    type="button"
                    color="dimmed"
                    size="sm"
                    to="/login"
                  >
                    Already have an account? Login
                  </Anchor>
                  <Button type="submit" leftIcon={<FaSignInAlt/>} loading={registerLoading}>Sign up</Button>
                </Group>
              </form>
            </Paper>
          </Container>
        </Grid.Col>
        <Grid.Col span={7}>
          <Image
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            fit="cover"
            height='100vh'
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Register;
