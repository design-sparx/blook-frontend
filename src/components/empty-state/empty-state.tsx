import React from 'react';
import {Image, Stack, Text} from '@mantine/core';
import NoDataImg from '../../asset/img/no-data.png';

const EmptyState = () => {
  return (
    <Stack align="center">
      <Image
        radius="md"
        src={NoDataImg}
        alt="no data image"
        width={200}
      />
      <Text>No posts found</Text>
    </Stack>
  );
};

export default EmptyState;
