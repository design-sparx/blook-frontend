import React from 'react';
import {ActionIcon, Group, Text, Tooltip} from '@mantine/core';
import {FaFacebook, FaLink, FaLinkedinIn, FaTwitter} from 'react-icons/fa';

const PostShare = () => {
  return (
    <Group spacing="xs">
      <Text size="sm">Share:</Text>
      <Tooltip label="share on facebook">
        <ActionIcon>
          <FaFacebook size={14}/>
        </ActionIcon>
      </Tooltip>
      <Tooltip label="share on twitter">
        <ActionIcon>
          <FaTwitter size={14}/>
        </ActionIcon>
      </Tooltip>
      <Tooltip label="share on linkedin">
        <ActionIcon>
          <FaLinkedinIn size={14}/>
        </ActionIcon>
      </Tooltip>
      <Tooltip label="copy link">
        <ActionIcon>
          <FaLink size={14}/>
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default PostShare;
