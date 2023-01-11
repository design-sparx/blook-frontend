import React, {useEffect} from 'react';
import {Button, Group, Stack} from '@mantine/core';
import {Wrapper} from '../layout';
import {ICategory} from '../constants';
import {Link} from 'react-router-dom';
import {Layout} from '../constants/Layout';
import {PostLoader} from '../components/post-loader';
import {Helmet} from 'react-helmet';
import {BackBtn} from '../components/back-btn';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchAllCategories} from '../redux/actions/categories';

/**
 * all categories page
 * @constructor
 */
const Categories = () => {
  const dispatch = useAppDispatch();
  const {
    loading: categoriesLoading,
    error: categoriesError,
    categories: categoriesData
  } = useAppSelector((state: any) => state.fetchAllCategoriesReducer);

  useEffect(() => {
    const unsub = (): void => {
      dispatch(fetchAllCategories() as any);
    };

    return () => unsub();
  }, [dispatch]);

  return (
    <Wrapper layout={Layout.One} showSide={false}>
      <Helmet>
        <title>Blook - Categories</title>
      </Helmet>
      {!categoriesLoading ?
        <>
          <Stack>
            <BackBtn/>
            <Group>
              {categoriesData?.sort((a: ICategory, b: ICategory) => a.title.localeCompare(b.title)).map((c: ICategory) =>
                <Button key={c.title} component={Link} to={`/tag/${c.title}`} variant="outline" color="dark">
                  {c.title}
                </Button>
              )}
            </Group>
          </Stack>
        </>
        : <PostLoader size='md'/>
      }
    </Wrapper>
  );
};

export default Categories;
