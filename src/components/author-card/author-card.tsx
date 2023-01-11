import React from 'react';
import {
  Avatar,
  Card,
  createStyles,
  MantineTheme, Stack,
  Text
} from '@mantine/core';
import {IAuthor} from '../../constants';
import {urlFor} from '../../client';
import {PortableText} from '@portabletext/react';
import {format} from 'date-fns';

interface AuthorCardProps {
  author: IAuthor
}

const useStyles = createStyles((theme: MantineTheme) => ({
  card: {
    backgroundColor: theme.colors.gray[0]
  }
}));

const AuthorCard = ({author}: AuthorCardProps): JSX.Element => {
  const {classes} = useStyles();
  const {bio, image, name, _createdAt}: IAuthor = author ?? {};
  const avatarImageUrl = Boolean(image) && urlFor(image).width(200).url();

  return (
    <Card p="md" className={classes.card}>
      <Stack spacing="xs">
        <Avatar src={avatarImageUrl} size="xl" radius="md"/>
        <Text weight={500} size="lg">{name}</Text>
        <PortableText value={bio ?? []}/>
        <Text>Joined on: {format(new Date(_createdAt ?? null), 'MMM dd, yyyy')}</Text>
      </Stack>
    </Card>
  );
};

export default AuthorCard;
