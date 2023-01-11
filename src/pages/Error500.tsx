import React from 'react';
import {createStyles, Title, Text, Button, Container, Group} from '@mantine/core';
import {Helmet} from 'react-helmet';
import {BackBtn} from '../components/back-btn';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const Error500 = (): JSX.Element => {
  const {classes} = useStyles();

  return (
    <>
      <Helmet>
        <title>Blook - Server error</title>
      </Helmet>
      <Container className={classes.root}>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          Our servers could not handle your request. Don&apos;t worry, our development team was already notified. Try
          refreshing the page.
        </Text>
        <Group position="center">
          <BackBtn/>
          <Button variant="light">
            Refresh the page
          </Button>
        </Group>
      </Container>
    </>
  );
};

export default Error500;
