import React, {useEffect, useState} from 'react';
import {
  Button,
  Container,
  createStyles,
  Group, Loader,
  MantineTheme,
  Overlay,
  SimpleGrid,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import {FaGithub, FaSearch} from 'react-icons/fa';
import {useLocation, Link, useNavigate} from 'react-router-dom';
import {HeroNav} from '../common/hero-nav';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {ICategory, IPost} from '../constants';
import {fetchAllPosts} from '../redux/actions/post';
import {fetchAllCategories} from '../redux/actions/categories';
import {ArticleCard} from '../components/article-card';
import {AppFooter} from '../common/app-footer';
import {PostLoader} from '../components/post-loader';
import {Helmet} from 'react-helmet';

const useStyles = createStyles((theme: MantineTheme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 150,
    paddingBottom: 150,
    backgroundImage:
      'url(https://images.unsplash.com/photo-1461773518188-b3e86f98242f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (max-width: 520px)': {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  body: {
    marginTop: theme.spacing.xl * 2,
    marginBottom: theme.spacing.xl * 2,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

const Landing = () => {
  const {classes} = useStyles();
  const dispatch = useAppDispatch();
  const {
    loading: postsLoading,
    error: postsError,
    posts: postsData
  } = useAppSelector((state: any) => state.fetchAllPostsReducer);
  const {
    loading: categoriesLoading,
    error: categoriesError,
    categories: categoriesData
  } = useAppSelector((state: any) => state.fetchAllCategoriesReducer);
  const {currentUser} = useAppSelector((state: any) => state.userReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * on enter pressed
   * @param event
   */
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      navigate({pathname: '/search', search: `?q=${searchTerm}`});
    }
  };

  useEffect(() => {
    const unsub = () => {
      dispatch(fetchAllPosts(null, 50) as any);
      dispatch(fetchAllCategories() as any);
    };

    return () => unsub();
  }, [dispatch, location]);

  useEffect(() => {
    if (currentUser !== null) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Helmet>
        <title>Blook - You&apos;re only a stranger once</title>
      </Helmet>
      <HeroNav/>
      <div className={classes.wrapper}>
        <Overlay color="#000" opacity={0.65} zIndex={1}/>
        <Container className={classes.inner}>
          <Title className={classes.title}>
            You&apos;re only a stranger once
          </Title>

          <Container size={640} className={classes.body}>
            <TextInput
              size="md"
              icon={<FaSearch size={18}/>}
              placeholder='search'
              onKeyDown={handleKeyDown}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
            />
            <Group spacing="sm" position="center" mt="lg">
              <Text color="white">Top categories:</Text>
              {!categoriesLoading ? (
                categoriesData?.slice(0, 8).map((c: ICategory) =>
                  <Button
                    key={c._id}
                    size="sm"
                    variant="white"
                    component={Link}
                    to={`/tag/${c.title}`}
                  >
                    {c.title}
                  </Button>
                )
              ) : <>
                <Loader color="white" size="sm"/>
                <Text color="white">loading</Text>
              </>
              }
            </Group>
          </Container>

          <div className={classes.controls}>
            <Button size="lg" className={classes.control} component={Link} to='/register'>
              Get started
            </Button>
          </div>
        </Container>
      </div>
      <Container my="xl">
        <SimpleGrid cols={2}>
          {!postsLoading ? postsData?.items?.map((post: IPost) =>
              <ArticleCard key={post._id} post={post} withAuthor/>)
            : <PostLoader size='md'/>
          }
        </SimpleGrid>
      </Container>
      <AppFooter/>
    </>
  );
};

export default Landing;
