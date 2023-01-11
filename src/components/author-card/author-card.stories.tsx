import React from 'react';
import AuthorCard from './author-card';
import {IAuthor} from '../../constants';

export default {
  title: 'AuthorPosts card',
  component: AuthorCard
};

const sampleAuthor: IAuthor = {
  '_createdAt': '',
  '_id': '',
  'name': '',
  'bio': [
    {
      '_key': '',
      '_type': '',
      'children': [
        {
          '_key': '',
          '_type': '',
          'marks': [],
          'text': ''
        }],
      'markDefs': [],
      'style': ''
    }
  ],
  'slug': {
    'current': '',
    '_type': ''
  },
  'image':
    {
      '_type': '',
      'asset':
        {
          '_ref': '',
          '_type': ''
        }
    },
  'website': '',
  'email': ''
};

export const Default = (): JSX.Element => <AuthorCard author={sampleAuthor}/>;
