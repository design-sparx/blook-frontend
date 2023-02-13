import React from 'react';
import PostShare from './post-share';
import {withRouter} from 'storybook-addon-react-router-v6';
import {Container, Paper, Stack, Text} from '@mantine/core';

export default {
  title: 'Article sharing',
  decorators: [withRouter],
  component: PostShare
};

export const Default = (): JSX.Element => <Container>
  <Stack>
    <Text size="xl" weight={600}>Article sharing options.</Text>
    <Text>Sharing of articles via known social media platforms.</Text>
    <Paper withBorder p="lg" radius="md">
      <PostShare/>
    </Paper>
  </Stack>
</Container>;
