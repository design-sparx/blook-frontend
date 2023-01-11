import React, {useEffect, useState} from 'react';
import {Button, Group, Loader, MANTINE_SIZES, Stack, Text} from '@mantine/core';
import {FaChevronDown} from 'react-icons/fa';
import {ArticleCard} from '../components/article-card';
import {IPost} from '../constants';
import {fetchAllPosts} from '../redux/actions/post';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {Wrapper} from '../layout';
import {Layout} from '../constants/Layout';
import {PostLoader} from '../components/post-loader';
import {Helmet} from 'react-helmet';

/**
 * home page
 * @constructor
 */
const Home = () => {
  const dispatch = useAppDispatch();
  const {
    loading: postsLoading,
    error: postsError,
    posts: postsData
  } = useAppSelector((state: any) => state.fetchAllPostsReducer);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [initialFetching, setInitialFetching] = useState(false);

  /**
   * handle loading more data
   */
  const handleLoadMore = () => {
    setIsFetching(true);
    dispatch(fetchAllPosts(postsData.items[postsData.items.length - 1]._id) as any);
  };

  useEffect(() => {
    setInitialFetching(true);
    const unsub = () => {
      dispatch(fetchAllPosts(null) as any);
      setInitialFetching(false);
    };

    return () => unsub();
  }, [dispatch]);

  useEffect(() => {
    if (Boolean(postsData)) {
      const d: IPost[] = isFetching ? allPosts : [];
      postsData?.items.forEach((p: IPost) => d.push(p));
      setAllPosts(d);
      setInitialFetching(false);
      setIsFetching(false);
    }
  }, [postsData]);

  return (
    <Wrapper showTopics layout={Layout.Two} showSide={true} showRecent={true}>
      <Helmet>
        <title>Blook - Home</title>
      </Helmet>
      <Stack>
        {!initialFetching ? allPosts?.map((post: IPost) => <ArticleCard key={post._id} post={post} withAuthor/>)
          : <PostLoader size='md'/>
        }
        {isFetching && <PostLoader size='sm'/>}
        {Boolean(allPosts.length < postsData?.total) &&
					<Button onClick={handleLoadMore} leftIcon={<FaChevronDown size={14}/>} variant="subtle">Load More</Button>
        }
      </Stack>
    </Wrapper>
  );
};

export default Home;
