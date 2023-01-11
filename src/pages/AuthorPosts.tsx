import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  createStyles,
  Divider,
  Group,
  Image,
  MantineTheme,
  SimpleGrid,
  Stack,
  Text,
  Title
} from '@mantine/core';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {useLocation, useParams} from 'react-router-dom';
import {fetchAuthorBySlug} from '../redux/actions/author';
import {IAuthor, IPost} from '../constants';
import {Wrapper} from '../layout';
import {fetchPostsByAuthor, fetchRecentPosts} from '../redux/actions/post';
import {ArticleCard} from '../components/article-card';
import {urlFor} from '../client';
import {PortableText} from '@portabletext/react';
import {Layout} from '../constants/Layout';
import {FaChevronDown} from 'react-icons/fa';
import {PostLoader} from '../components/post-loader';
import {Helmet} from 'react-helmet';
import {BackBtn} from '../components/back-btn';
import {EmptyState} from '../components/empty-state';

const useStyles = createStyles((theme: MantineTheme) => ({
  card: {
    borderRadius: theme.radius.sm,
    background: theme.colors.gray[0]
  }
}));

/**
 * posts per author
 * @constructor
 */
const AuthorPosts = (): JSX.Element => {
  const {classes} = useStyles();
  const dispatch = useAppDispatch();
  const {authorSlug} = useParams();
  const {
    loading: authorLoading,
    error: authorError,
    author: authorData
  } = useAppSelector((state: any) => state.fetchAuthorBySlugReducer);
  const {
    loading: authorPostsLoading,
    error: authorPostsError,
    posts: authorPostsData
  } = useAppSelector((state: any) => state.fetchPostsByAuthorReducer);
  const {bio, name, image}: IAuthor = authorData ?? {};
  const authorImageUrl = Boolean(image) && urlFor(image).width(300).url();
  const location = useLocation();
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [initialFetching, setInitialFetching] = useState(false);

  /**
   * handle loading more data
   */
  const handleLoadMore = () => {
    setIsFetching(true);
    dispatch(fetchPostsByAuthor(
      authorData._id ?? '',
      false,
      '',
      authorPostsData?.items[authorPostsData?.items.length - 1]?._id as any
    ));
  };

  useEffect(() => {
    dispatch(fetchAuthorBySlug(authorSlug ?? '') as any);
    dispatch(fetchRecentPosts() as any);
  }, [dispatch, location]);

  useEffect(() => {
    setInitialFetching(true);
    if (Boolean(authorData)) {
      dispatch(fetchPostsByAuthor(
        authorData._id,
        false,
        '',
        null
      ));
    }
  }, [authorData]);

  useEffect(() => {
    if (Boolean(authorPostsData)) {
      const d: IPost[] = isFetching ? allPosts : [];
      authorPostsData?.items.forEach((p: IPost) => d.push(p));
      setAllPosts(d);
      setInitialFetching(false);
      setIsFetching(false);
    }
  }, [authorPostsData]);

  return (
    <Wrapper layout={Layout.One} showSide={false}>
      <Helmet>
        <title>Blook - {name || ''}</title>
      </Helmet>
      <Stack spacing="xl">
        <BackBtn/>
        <Title order={2}>Author information</Title>
        <Divider/>
        {!authorLoading ?
          <Card className={classes.card}>
            <Group position="apart">
              <Box>
                <Text weight={500} size="lg">{name}</Text>
                <PortableText value={bio ?? []}/>
              </Box>
              <Box>
                <Image src={authorImageUrl} withPlaceholder radius="md" height={100} width={100}/>
              </Box>
            </Group>
          </Card>
          : <PostLoader size='md'/>
        }
        <Title order={2}>{authorPostsData?.total} posts</Title>
        <Divider/>
        {allPosts.length == 0 ? <EmptyState/> :
          <SimpleGrid cols={2}>
            {!initialFetching ?
              allPosts?.map((a: IPost) => <ArticleCard key={`author-article-${a._id}`} post={a}/>) :
              <PostLoader size='md'/>
            }
          </SimpleGrid>
        }
        {isFetching && <PostLoader size='md'/>}
        {Boolean(allPosts.length < authorPostsData?.total) &&
					<Button onClick={handleLoadMore} leftIcon={<FaChevronDown size={14}/>} variant="subtle">Load More</Button>
        }
      </Stack>
    </Wrapper>
  );
};

export default AuthorPosts;
