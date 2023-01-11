import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, SimpleGrid, Stack, Text, Title} from '@mantine/core';
import {Wrapper} from '../layout';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {useLocation, useParams} from 'react-router-dom';
import {fetchPostsByCategory} from '../redux/actions/post';
import {IPost} from '../constants';
import {ArticleCard} from '../components/article-card';
import {Layout} from '../constants/Layout';
import {PostLoader} from '../components/post-loader';
import {FaChevronDown} from 'react-icons/fa';
import {Helmet} from 'react-helmet';
import {BackBtn} from '../components/back-btn';
import {EmptyState} from '../components/empty-state';

/**
 * posts per categories
 * @constructor
 */
const CategoryPosts = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {category} = useParams();
  const {
    loading: categoryPostsLoading,
    error: categoryPostsError,
    posts: categoryPostsData
  } = useAppSelector((state: any) => state.fetchPostsByCategoryReducer);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [initialFetching, setInitialFetching] = useState(false);
  const location = useLocation();

  /**
   * handle loading more data
   */
  const handleLoadMore = () => {
    setIsFetching(true);
    if (category != null) {
      dispatch(fetchPostsByCategory(category, categoryPostsData?.items[categoryPostsData?.items.length - 1]._id));
    }
  };

  useEffect(() => {
    setInitialFetching(true);
    if (category != null) {
      dispatch(fetchPostsByCategory(category) as any);
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (Boolean(categoryPostsData)) {
      const d: IPost[] = isFetching ? allPosts : [];
      categoryPostsData?.items.forEach((p: IPost) => d.push(p));
      setAllPosts(d);
      setInitialFetching(false);
      setIsFetching(false);
    }
  }, [categoryPostsData]);

  return (
    <Wrapper layout={Layout.One} showSide={false}>
      <Helmet>
        <title>Blook - {category || ''}</title>
      </Helmet>
      <Stack>
        <BackBtn/>
        <Card px={0}>
          <Text color="dimmed">Category</Text>
          <Title order={1} mb="lg">{category}</Title>
          {!categoryPostsLoading ? <Text mb="lg">{categoryPostsData?.total} posts</Text> : <PostLoader size="sm"/>}
          <Divider/>
        </Card>
        {allPosts.length == 0 ? <EmptyState/> : <SimpleGrid cols={2}>
            {!initialFetching ?
              allPosts?.map((a: IPost) => <ArticleCard key={`category-article-${a._id}`} post={a} withAuthor={true}/>) :
              <PostLoader size='md'/>
            }
          </SimpleGrid>
        }
        {isFetching && <PostLoader size='md'/>}
        {Boolean(allPosts.length < categoryPostsData?.total) &&
					<Button onClick={handleLoadMore} leftIcon={<FaChevronDown size={14}/>} variant="subtle">Load More</Button>
        }
      </Stack>
    </Wrapper>
  );
};

export default CategoryPosts;
