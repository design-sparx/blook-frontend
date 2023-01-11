import {Button, SimpleGrid, Stack, Text, Title} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Wrapper} from '../layout';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchPostsBySearch} from '../redux/actions/post';
import {IPost} from '../constants';
import {ArticleCard} from '../components/article-card';
import {Layout} from '../constants/Layout';
import {PostLoader} from '../components/post-loader';
import {FaChevronDown} from 'react-icons/fa';
import {Helmet} from 'react-helmet';
import {BackBtn} from '../components/back-btn';

/**
 * posts per search results
 * @constructor
 */
const Search = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const dispatch = useAppDispatch();
  const {
    loading: postsSearchLoading,
    error: postsSearchError,
    posts: postsSearchData
  } = useAppSelector((state: any) => state.fetchPostsBySearchReducer);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [initialFetching, setInitialFetching] = useState(false);

  /**
   * handle loading more data
   */
  const handleLoadMore = () => {
    setIsFetching(true);
    dispatch(fetchPostsBySearch(query ?? '', postsSearchData.items[postsSearchData.items.length - 1]._id) as any);
  };

  useEffect(() => {
    setInitialFetching(true);
    if (query !== null) {
      dispatch(fetchPostsBySearch(query) as any);
    }
  }, [dispatch, query]);

  useEffect(() => {
    if (Boolean(postsSearchData)) {
      const d: IPost[] = isFetching ? allPosts : [];
      postsSearchData?.items.forEach((p: IPost) => d.push(p));
      setAllPosts(d);
      setInitialFetching(false);
      setIsFetching(false);
    }
  }, [postsSearchData]);

  return (
    <Wrapper layout={Layout.One} showSide={false}>
      <Helmet>
        <title>Blook - Searching - {query || ''}</title>
      </Helmet>
      <Stack>
        <BackBtn/>
        <Title sx={{display: 'flex'}}>
          <Text color="dimmed">Results for&nbsp;</Text>
          <Text>&quot;{query}&quot;</Text></Title>
        <SimpleGrid cols={2}>
          {!initialFetching ?
            allPosts?.map((a: IPost) => <ArticleCard key={a._id} post={a} withAuthor/>)
            : <PostLoader size='md'/>
          }
        </SimpleGrid>
        {isFetching && <PostLoader size='md'/>}
        {Boolean(allPosts.length < postsSearchData?.total) &&
					<Button onClick={handleLoadMore} leftIcon={<FaChevronDown size={14}/>} variant="subtle">Load More</Button>
        }
      </Stack>
    </Wrapper>
  );
};

export default Search;
