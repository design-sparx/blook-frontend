import React from 'react';
import AppNav from './app-nav';
import {withRouter} from 'storybook-addon-react-router-v6';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../../redux/reducers';
import {enhancer} from 'addon-redux';
import {Container, Paper, Stack, Text} from '@mantine/core';

const store = createStore(reducer, {}, enhancer);

export default {
  title: 'App navigation',
  decorators: [withRouter],
  component: AppNav,
  loaders: [
    async () => ({
      store: await store,
    })
  ]
};

const sampleUser = {
  name: 'John Doe'
};
export const Default = (): JSX.Element => <Provider store={store}>
  <Container fluid>
    <Stack>
      <Text size="xl" weight={600}>Landing page navbar</Text>
      <Text>A navigation bar is a link to appropriate sections/pages in a website that helps readers in traversing the
        online document.</Text>
      <Text>Helps a user navigate around.</Text>
      <Paper withBorder p="lg" radius="md">
        <AppNav/>
      </Paper>
    </Stack>
  </Container>
</Provider>;
export const SignedIn = (): JSX.Element => <Provider store={store}>
  <Container fluid>
    <Stack>
      <Text size="xl" weight={600}>Landing page navbar</Text>
      <Text>Shows appropriate links for an already logged in user.</Text>
      <Paper withBorder p="lg" radius="md">
        <AppNav sampleUser={sampleUser}/>
      </Paper>
    </Stack>
  </Container>
</Provider>;
