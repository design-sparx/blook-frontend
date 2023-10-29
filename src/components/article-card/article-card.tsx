import React from 'react';
import {
  ActionIcon,
  Avatar,
  Card,
  Col,
  createStyles, Flex,
  Grid,
  Group,
  Image, MantineTheme,
  Menu,
  Stack,
  Text,
  UnstyledButton
} from '@mantine/core';
import {toPlainText} from '@portabletext/react';
import {FaEllipsisH, FaRegFlag} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {Post} from '../../constants/Post';
import {urlFor} from '../../client';
import {CategoryBadges} from '../category-badges';
import {DatesText} from '../dates-text';
import {readingTime} from '../../utils';

/**
 * @param post
 * @param withAuthor - require author information
 */
interface ArticleCardProps {
  post: Post;
  withAuthor?: boolean;
}

const useStyles = createStyles((theme: MantineTheme) => ({
  card: {
    borderBottom: `1px solid ${theme.colors.gray[4]}`,
    borderRadius: 0
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

/**
 * article cards
 * @param post
 * @param withAuthor
 * @constructor
 */
const ArticleCard = ({post, withAuthor}: ArticleCardProps): JSX.Element => {
  const {mainImage, title, categories, body, author, publishedAt, slug} = post;
  const mainImageUrl = Boolean(mainImage) && urlFor(mainImage).width(200).height(200).url();
  const avatarImageUrl = Boolean(author.image) && urlFor(author.image).width(50).url();
  const {classes} = useStyles();

  return (
    <Card className={classes.card} px={0}>
      <Group spacing="xs" mb="md" align="center">
        {withAuthor && (
          Boolean(author?.slug?.current) ?
            <>
              <UnstyledButton className={classes.author} component={Link} to={`/@${author.slug.current}`}>
                <Avatar src={avatarImageUrl} size="sm"/>
                <Text size="sm">{author.name}</Text>
              </UnstyledButton>
              <Text mb="xs">.</Text>
            </> :
            <>
              <Avatar size="sm"/>
              <Text>Anonymous</Text>
            </>
        )}
        <DatesText date={publishedAt}/>
        <Text mb="xs">.</Text>
        <Text size="sm">{readingTime(toPlainText(body))} min read</Text>
      </Group>
      <Stack spacing="xs">
        <Grid>
          <Col span={9}>
            {Boolean(author?.slug?.current) ?
              <Text
                size="lg"
                weight={600}
                lineClamp={1}
                mb="sm"
                component={Link}
                to={{pathname: `/@${author.slug.current}/${slug.current}`}}
                className={classes.title}
              >
                {title}
              </Text> :
              <Text
                size="lg"
                weight={600}
                lineClamp={1}
                mb="sm"
                className={classes.title}
              >
                {title}
              </Text>
            }
            <Text lineClamp={3} size="sm" color="dimmed">{toPlainText(body)}</Text>
            <Group spacing="xs" position="apart" mt="md">
              <CategoryBadges categories={categories}/>
              <Group spacing="xs">
                <Menu shadow="md" width={200} withArrow>
                  <Menu.Target>
                    <ActionIcon><FaEllipsisH size={14}/></ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<FaRegFlag size={14}/>}>Report</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Col>
          <Col span={3}>
            <Image src={mainImageUrl} withPlaceholder radius="md"/>
          </Col>
        </Grid>
      </Stack>
    </Card>
  );
};

export default ArticleCard;
