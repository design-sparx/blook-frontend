import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  createStyles,
  Divider, Grid,
  Image,
  MantineTheme, SimpleGrid,
  Stack,
  Text,
  Title
} from '@mantine/core';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {Link, useLocation} from 'react-router-dom';
import {fetchAuthorById} from '../redux/actions/author';
import {IAuthor, IPost} from '../constants';
import {Wrapper} from '../layout';
import {fetchPostsByAuthor} from '../redux/actions/post';
import {ArticleCard} from '../components/article-card';
import {urlFor} from '../client';
import {PortableText} from '@portabletext/react';
import {Layout} from '../constants/Layout';
import {FaChevronDown, FaPenNib, FaUserEdit} from 'react-icons/fa';
import {PostLoader} from '../components/post-loader';
import {Helmet} from 'react-helmet';

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
const UserProfile = (): JSX.Element => {
  const {classes} = useStyles();
  const dispatch = useAppDispatch();
  const {
    loading: authorLoading,
    error: authorError,
    author: authorData
  } = useAppSelector((state: any) => state.fetchAuthorByIdReducer);
  const {
    loading: authorPostsLoading,
    error: authorPostsError,
    posts: authorPostsData
  } = useAppSelector((state: any) => state.fetchPostsByAuthorReducer);
  const {bio, name, image, email, website}: IAuthor = authorData ?? {};
  const authorImageUrl = Boolean(image) && urlFor(image).width(300).url();
  const location = useLocation();
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [initialFetching, setInitialFetching] = useState(false);
  const {currentUser} = useAppSelector((state: any) => state.userReducer);

  /**
   * handle loading more data
   */
  const handleLoadMore = () => {
    setIsFetching(true);
    dispatch(fetchPostsByAuthor(
      authorData._id,
      false,
      '',
      null
    ));
  };

  useEffect(() => {
    dispatch(fetchAuthorById(currentUser._id ?? ''));
  }, [dispatch, location]);

  useEffect(() => {
    setInitialFetching(true);
    if (Boolean(authorData)) {
      dispatch(fetchPostsByAuthor(
        authorData._id,
        false,
        '',
        null));
    }
    setInitialFetching(false);
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
    <Wrapper layout={Layout.One} showSide={false} showRecent={false}>
      <Helmet>
        <title>Blook - {name || ''}</title>
      </Helmet>
      <Stack spacing="xl">
        <Title order={2}>My profile information</Title>
        <Divider/>
        {!authorLoading ?
          <Card px={0}>
            <Grid>
              <Grid.Col span={10}>
                <Stack mb="md">
                  <Text weight={500}>Name: {name}</Text>
                  <Text weight={500}>Email: {email}</Text>
                  {Boolean(website) &&
										<Text weight={500} size="md" component='a' href={website} target="_blank">
											Website: {website}
										</Text>
                  }
                  <div>
                    <Text>Bio</Text>
                    <PortableText value={bio ?? []}/>
                  </div>
                </Stack>
              </Grid.Col>
              {Boolean(authorImageUrl) &&
								<Grid.Col span={2}>
									<Box>
										<Image src={authorImageUrl} withPlaceholder radius="md" fit="cover"/>
									</Box>
								</Grid.Col>
              }
            </Grid>
            <Button leftIcon={<FaUserEdit/>} component={Link} to='edit' variant="light">Edit your profile</Button>
          </Card>
          : <PostLoader size='md'/>
        }
        <Title order={2}>My posts</Title>
        <Divider/>
        {!initialFetching ?
          allPosts.length > 0 ?
            <SimpleGrid cols={2}>
              {allPosts?.map((a: IPost) => <ArticleCard key={`author-article-${a._id}`} post={a}/>)}
            </SimpleGrid> :
            <Stack align="center">
              <Title order={2}>Hello, you are yet to write a story...</Title>
              <Button variant="light" size="md" leftIcon={<FaPenNib size={14}/>} mt="md">To start, click here</Button>
            </Stack> :
          <PostLoader size='md'/>
        }
        {isFetching && <PostLoader size='md'/>}
        {(Boolean(allPosts.length < authorPostsData?.total) && allPosts.length > 0) &&
					<Button onClick={handleLoadMore} leftIcon={<FaChevronDown size={14}/>} variant="subtle">Load More</Button>
        }
      </Stack>
    </Wrapper>
  );
};

export default UserProfile;
