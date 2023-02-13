import React from 'react';
import DatesText from './dates-text';
import {withRouter} from 'storybook-addon-react-router-v6';
import {Code, Container, Stack, Text} from '@mantine/core';
import {format} from 'date-fns';

export default {
  title: 'Dates',
  decorators: [withRouter],
  component: DatesText
};

export const Default = (): JSX.Element => <Container>
  <Stack>
    <Text size="xl" weight={600}>Readable date format.</Text>
    <Text>Standardized date format.</Text>
    <Text>Extends date-fns format function.</Text>
    <Code>{format(new Date(new Date().toDateString()), 'MMM d, yyyy')}</Code>
  </Stack>
</Container>;
