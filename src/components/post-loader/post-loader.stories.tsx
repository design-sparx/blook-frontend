import React from 'react';
import PostLoader from './post-loader';
import {Container, Paper, Stack, Text} from '@mantine/core';

export default {
  title: 'Loader',
  component: PostLoader
};

export const Default = (): JSX.Element => <Container>
  <Stack>
    <Text size="xl" weight={600}>Posts/articles loading state.</Text>
    <Paper withBorder p="lg" radius="md">
      <PostLoader size="md"/>
    </Paper>
  </Stack>
</Container>;
