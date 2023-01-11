import React from 'react';
import {Button, Group} from '@mantine/core';
import {ICategory} from '../../constants';
import { Link } from 'react-router-dom';

interface CategoryProps {
  categories: ICategory[]
}

const CategoryBadges = ({categories}: CategoryProps): JSX.Element => {
  return (
    <Group spacing="sm">
      {categories?.map((c, i) =>
        <Button
          key={`category-${i}`}
          color="dark"
          variant="default"
          component={Link}
          compact
          to={{
            pathname: `/tag/${c.title}`
          }}
        >
          {c.title}
        </Button>)}
    </Group>
  );
};

export default CategoryBadges;
