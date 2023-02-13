import React from 'react';
import BackBtn from './back-btn';
import {withRouter} from 'storybook-addon-react-router-v6';
import {Container, Stack, Text} from '@mantine/core';

export default {
  title: 'Back button',
  decorators: [withRouter],
  component: BackBtn
};

export const Default = (): JSX.Element => <Container>
  <Stack>
    <Text size="xl" weight={600}>Back button</Text>
    <Text>Redirects a user to the previous page.</Text>
    <BackBtn/>
  </Stack>
</Container>;
