import React from 'react';
import EmptyState from './empty-state';
import {Container, Paper, Stack, Text} from '@mantine/core';

export default {
  title: 'Empty state',
  component: EmptyState
};

export const Default = (): JSX.Element => <Container>
  <Stack>
    <Text size="xl" weight={600}>Empty state.</Text>
    <Text>Visible only when no information found.</Text>
    <Paper withBorder p="lg" radius="md">
      <EmptyState/>
    </Paper>
  </Stack>
</Container>;
