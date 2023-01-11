import React from 'react';
import CategoryBadges from './category-badges';
import {ICategory} from '../../constants';

export default {
  title: 'Categories badges',
  component: CategoryBadges
};

const sampleCategories: ICategory[] = [
  {title: 'Travel'},
  {title: 'Business'}
];

export const Default = (): JSX.Element => <CategoryBadges categories={sampleCategories}/>;
