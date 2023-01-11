import {
  Avatar,
  Card,
  createStyles, Group,
  MantineTheme, Stack,
  Text, UnstyledButton,
} from '@mantine/core';
import React from 'react';
import {Post} from '../../constants/Post';
import {urlFor} from '../../client';
import {Link} from 'react-router-dom';
import {DatesText} from '../dates-text';

interface TinyArticlesCardProps {
  post: Post
}

const useStyles = createStyles((theme: MantineTheme) => ({
  card: {
    borderBottom: `1px solid ${theme.colors.gray[4]}`,
    width: '100%',
    borderRadius: 0
  },
  textLink: {
    '&:hover': {
      cursor: 'pointer'
    },
    '&:focus': {
      cursor: 'pointer'
    },
  },
  title: {
    '&:hover, &:focus': {
      textDecoration: 'underline'
    }
  },
  author: {
    display: 'flex',
    gap: '0 10px',
    alignItems: 'center',

    '&:hover, &:focus': {
      textDecoration: 'underline'
    }
  }
}));

const TinyArticleCard = ({post}: TinyArticlesCardProps): JSX.Element => {
  const {classes} = useStyles();
  const {title, publishedAt, author, slug} = post;
  const avatarImageUrl = urlFor(author.image).width(50).url();

  return (
    <Card px={0} className={classes.card}>
      <Stack spacing="xs">
        <Group spacing="xs">
          <UnstyledButton className={classes.author} component={Link} to={`/@${author.slug.current}`}>
            <Avatar src={avatarImageUrl} size="sm"/>
            <Text size="sm">{author.name}</Text>
          </UnstyledButton>
          <Text mb="xs">.</Text>
          <DatesText date={publishedAt}/>
        </Group>
        <Text
          size="md"
          weight={600}
          lineClamp={2}
          component={Link}
          to={{
            pathname: `/@${author.slug.current}/${slug.current}`
          }}
          className={classes.title}
        >
          {title}
        </Text>
      </Stack>
    </Card>
  );
};

export default TinyArticleCard;
