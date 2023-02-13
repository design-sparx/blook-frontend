import React from 'react';
import HeroNav from './hero-nav';
import {withRouter} from 'storybook-addon-react-router-v6';
import {createStore} from 'redux';
import reducer from '../../redux/reducers';
import {enhancer} from 'addon-redux';
import {Provider} from 'react-redux';
import {Container, Paper, Stack, Text} from '@mantine/core';

const store = createStore(reducer, {}, enhancer);

export default {
  title: 'Hero navigation',
  decorators: [withRouter],
  component: HeroNav,
  loaders: [
    async () => ({
      store: await store,
    })
  ]
};

export const Default = (): JSX.Element => <Provider store={store}>
  <Container fluid>
    <Stack>
      <Text size="xl" weight={600}>In-app application navbar</Text>
      <Text>A navigation bar is a link to appropriate sections/pages in a website that helps readers in traversing the
        online document.</Text>
      <Text>Helps a user navigate around once launched the application.</Text>
      <Paper withBorder p="lg" radius="md">
        <HeroNav/>
      </Paper>
    </Stack>
  </Container>
</Provider>;
