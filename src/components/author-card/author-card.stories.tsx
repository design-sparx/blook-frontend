import React from 'react';
import AuthorCard from './author-card';
import {IAuthor} from '../../constants';
import {withRouter} from 'storybook-addon-react-router-v6';
import {Container, Stack, Text} from '@mantine/core';

export default {
  title: 'Author card',
  decorators: [withRouter],
  component: AuthorCard
};

const sampleAuthor: IAuthor = {
  '_createdAt': '2022-10-22T12:55:23Z',
  '_id': '53ca9f6a-fdfb-4835-80a8-0942c7292e58',
  'bio': [{
    '_key': '527e939db2b7',
    '_type': 'block',
    'children': [{
      '_key': '894d99b97ff80',
      '_type': 'span',
      'marks': [],
      'text': 'j.stewart@randatmail.com\n395-4676-15\n'
    }],
    'markDefs': [],
    'style': 'normal'
  }],
  'email': 'johndoe@demo.com',
  'image': {
    '_type': 'image',
    'asset': {'_ref': 'image-f01770fe771e022aedb991a44c9fe230c596097e-4000x4000-jpg', '_type': 'reference'}
  },
  'name': 'Jack Stewart',
  'slug': {'_type': 'slug', 'current': 'jack-stewart'},
  'website': 'https://blook-blogger.netlify.app/'
};

export const Default = (): JSX.Element => <Container>
  <Stack>
    <Text size="xl" weight={600}>Author card</Text>
    <Text>This component holds simple information the blog creator or owner.</Text>
    <AuthorCard author={sampleAuthor}/>
  </Stack>
</Container>;
