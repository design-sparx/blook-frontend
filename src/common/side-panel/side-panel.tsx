import React, {useEffect} from 'react';
import {Button, Divider, SimpleGrid, Stack, Title} from '@mantine/core';
import {Link} from 'react-router-dom';
import {FaChevronRight} from 'react-icons/fa';
import {CategoryBadges} from '../../components/category-badges';
import {ILayout, IPost} from '../../constants';
import TinyArticleCard from '../../components/tiny-article-card/tiny-article-card';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchRecentPosts} from '../../redux/actions/post';
import {fetchAllCategories} from '../../redux/actions/categories';
import {Layout} from '../../constants/Layout';
import {ArticleCard} from '../../components/article-card';
import {PostLoader} from '../../components/post-loader';

interface ISidePanelProps {
  layout: ILayout
  showTopics?: boolean
  showRecent?: boolean
}

const SidePanel = ({showTopics, layout, showRecent}: ISidePanelProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    loading: recentLoading,
    error: recentError,
    posts: recentPostsData
  } = useAppSelector((state: any) => state.fetchRecentPostsReducer);
  const {
    loading: categoriesLoading,
    error: categoriesError,
    categories: categoriesData
  } = useAppSelector((state: any) => state.fetchAllCategoriesReducer);

  useEffect(() => {
    dispatch(fetchRecentPosts() as any);
    dispatch(fetchAllCategories(10) as any);
  }, [dispatch]);

  return (
    <Stack spacing="md">
      {showTopics &&
        (!categoriesLoading ?
            <>
              <Stack spacing="xl">
                <Title order={2}>Trending topics</Title>
                <Divider/>
                <CategoryBadges categories={categoriesData}/>
                <Button
                  component={Link}
                  to="/categories"
                  variant="subtle"
                  rightIcon={<FaChevronRight size={14}/>}
                >
                  See all categories
                </Button>
              </Stack>
            </>
            : <PostLoader size='md'/>
        )
      }
      {showRecent &&
        (!recentLoading ?
            <>
              <Stack spacing="md" mt={Layout.One === layout ? 'lg' : 0}>
                <Title order={2}>Recent articles</Title>
                <Divider/>
                <SimpleGrid cols={layout === Layout.Two ? 1 : 2}>
                  {recentPostsData?.map((post: IPost) =>
                    layout === Layout.Two ?
                      <TinyArticleCard key={post._id} post={post}/> :
                      <ArticleCard key={post._id} post={post}/>
                  )}
                </SimpleGrid>
              </Stack>
            </>
            : <PostLoader size='md'/>
        )
      }
    </Stack>
  );
};

export default SidePanel;
