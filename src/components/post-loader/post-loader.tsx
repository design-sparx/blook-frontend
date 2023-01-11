import React from 'react';
import {Group, Loader, MantineNumberSize, Text} from '@mantine/core';

interface IPostLoaderProps {
  size: MantineNumberSize
}

const PostLoader = ({size}: IPostLoaderProps) => {
  return (
    <Group position="center">
      <Loader size={size}/>
      <Text>Loading</Text>
    </Group>
  );
};

export default PostLoader;
