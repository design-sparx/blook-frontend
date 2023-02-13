import React from 'react';
import AppFooter from './app-footer';
import {withRouter} from 'storybook-addon-react-router-v6';
import {createStore} from 'redux';
import reducer from '../../redux/reducers';
import {enhancer} from 'addon-redux';
import {Provider} from 'react-redux';
import {Container, Stack, Text} from '@mantine/core';

const store = createStore(reducer, {}, enhancer);

export default {
  title: 'Landing page footer',
  decorators: [withRouter],
  component: AppFooter,
  loaders: [
    async () => ({
      store: await store,
    })
  ]
};

export const Default = (): JSX.Element => <Provider store={store}>
  <Container fluid>
    <Stack>
      <Text size="xl" weight={600}>Landing page footer</Text>
      <Text>A footer is the section of content at the very bottom of a web page. It contains information that improves a
        website’s overall usability</Text>
      <AppFooter/>
    </Stack>
  </Container>
</Provider>;
