import React from 'react';
import CategoryBadges from './category-badges';
import {ICategory} from '../../constants';
import {withRouter} from 'storybook-addon-react-router-v6';
import {Container, Paper, Stack, Text} from '@mantine/core';

export default {
  title: 'Categories badges',
  decorators: [withRouter],
  component: CategoryBadges
};

const sampleCategories: ICategory[] = [
  {title: 'Travel'},
  {title: 'Business'},
  {title: 'Entertainment'}
];

export const Default = (): JSX.Element => <Container>
  <Stack>
    <Text size="xl" weight={600}>Article category badges</Text>
    <Text>List of app categories that an article is categorized as.</Text>
    <Text>This component is also part of the article card component.</Text>
    <Paper withBorder p="lg" radius="md">
      <CategoryBadges categories={sampleCategories}/>
    </Paper>
  </Stack>
</Container>;
