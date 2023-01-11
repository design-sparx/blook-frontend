import React, {useEffect} from 'react';
import {Wrapper} from '../layout';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {Link, useLocation, useParams} from 'react-router-dom';
import {fetchPostBySlug, fetchPostsByAuthor} from '../redux/actions/post';
import {IPost} from '../constants';
import {
  ActionIcon,
  Avatar,
  Button,
  Card, createStyles,
  Divider,
  Group,
  Image,
  Menu, SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip
} from '@mantine/core';
import {urlFor} from '../client';
import {format} from 'date-fns';
import {FaEllipsisH, FaPauseCircle, FaPlayCircle, FaRegBookmark, FaRegFlag} from 'react-icons/fa';
import {PortableText, toPlainText} from '@portabletext/react';
import {fetchAuthorBySlug} from '../redux/actions/author';
import {ArticleCard} from '../components/article-card';
import {CategoryBadges} from '../components/category-badges';
import {Layout} from '../constants/Layout';
import {AuthorCard} from '../components/author-card';
import {SharePost} from '../components/post-share';
import {PostLoader} from '../components/post-loader';
import {readingTime} from '../utils';
import {Helmet} from 'react-helmet';
import {BackBtn} from '../components/back-btn';
import {useToggle} from '@mantine/hooks';

const {Section} = Card;
const useStyles = createStyles(() => ({
  author: {
    '&:hover, &:focus': {
      textDecoration: 'underline'
    }
  }
}));

/**
 * selected post
 * @constructor
 */
const SinglePost = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {postSlug} = useParams();
  const {
    loading: postLoading,
    error: postError,
    post: postData
  } = useAppSelector((state: any) => state.fetchPostBySlugReducer);
  const {
    loading: authorPostsLoading,
    error: authorPostsError,
    posts: authorPostsData
  } = useAppSelector((state: any) => state.fetchPostsByAuthorReducer);
  const {
    loading: authorLoading,
    error: authorError,
    author: authorData
  } = useAppSelector((state: any) => state.fetchAuthorBySlugReducer);
  const {mainImage, author, publishedAt, body, title, categories}: IPost = postData ?? {};
  const mainImageUrl = Boolean(mainImage) && urlFor(mainImage).width(800).height(800).url();
  const avatarImageUrl = Boolean(author?.image) && urlFor(author.image).width(100).url();
  const location = useLocation();
  const {classes} = useStyles();
  const [toggleSpeech, toggle] = useToggle<'read' | 'pause'>(['read', 'pause']);
  const speech = new SpeechSynthesisUtterance();

  /**
   *
   */
  const speechHandler = (msg: any): void => {
    msg.text = title + toPlainText(body);
    window.speechSynthesis.speak(msg);
    toggle();
  };

  /**
   *
   */
  const stopSpeech = (): void => {
    window.speechSynthesis.cancel();
    toggle();
  };

  useEffect(() => {
    dispatch(fetchPostBySlug(postSlug ?? '') as unknown);
    window.scrollTo(0, 0);
  }, [dispatch, location]);

  useEffect(() => {
    Boolean(author) && dispatch(fetchAuthorBySlug(author?.slug?.current ?? '') as unknown);
    Boolean(author) && dispatch(fetchPostsByAuthor(author?._id ?? '', false, title) as unknown);
  }, [postData]);

  return (
    <Wrapper layout={Layout.One} showSide={true} showRecent={true}>
      <Helmet>
        <title>Blook - {title || ''}</title>
      </Helmet>
      {Boolean(postData) ? (
        <Stack spacing="xl">
          <Card>
            <Stack spacing="xl">
              <BackBtn/>
              <Section>
                <Stack align="center">
                  <Title order={1}>{title}</Title>
                  <CategoryBadges categories={categories}/>
                </Stack>
              </Section>
              <Section>
                <Image src={mainImageUrl} withPlaceholder radius="md" height={450}/>
              </Section>
              <Section>
                <Group spacing="xs" position="apart" mb="md">
                  <Group spacing="sm">
                    <Avatar src={avatarImageUrl} size="lg" radius="md"/>
                    <Stack spacing={0}>
                      <Text
                        size="sm"
                        weight={500}
                        component={Link}
                        to={`/@${author?.slug.current}`}
                        className={classes.author}
                      >
                        {author?.name}
                      </Text>
                      <Group spacing="xs">
                        <Text size="sm" color="dimmed">{format(new Date(publishedAt), 'MMM yyyy')}</Text>
                        <Text mb="xs">.</Text>
                        <Text size="sm" color="dimmed">{readingTime(toPlainText(body))} min read</Text>
                        <Text mb="xs">.</Text>
                        {toggleSpeech === 'read' ?
                          <Button
                            leftIcon={<FaPlayCircle size={14}/>}
                            variant="subtle"
                            onClick={() => speechHandler(speech)}>Read body text aloud</Button> :
                          <Button
                            leftIcon={<FaPauseCircle size={14}/>}
                            variant="subtle"
                            color="gray"
                            onClick={() => stopSpeech()}>Cancel reading</Button>
                        }
                      </Group>
                    </Stack>
                  </Group>
                  <Group spacing="xs" position="right">
                    <SharePost/>
                    <Divider orientation="vertical"/>
                    <Group spacing="xs">
                      <Tooltip label="save">
                        <ActionIcon>
                          <FaRegBookmark size={14}/>
                        </ActionIcon>
                      </Tooltip>
                      <Menu shadow="md" width={200} withArrow>
                        <Menu.Target>
                          <ActionIcon><FaEllipsisH size={14}/></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Tooltip label="report">
                            <Menu.Item icon={<FaRegFlag size={14}/>}>Report</Menu.Item>
                          </Tooltip>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Group>
                </Group>
                <Divider/>
              </Section>
              <Section>
                <PortableText value={body}/>
              </Section>
              <Section>
                <Group spacing="xs" position="right">
                  <SharePost/>
                  <Divider orientation="vertical"/>
                  <Group spacing="xs">
                    <Tooltip label="save">
                      <ActionIcon>
                        <FaRegBookmark size={14}/>
                      </ActionIcon>
                    </Tooltip>
                    <Menu shadow="md" width={200} withArrow>
                      <Menu.Target>
                        <ActionIcon><FaEllipsisH size={14}/></ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Tooltip label="report">
                          <Menu.Item icon={<FaRegFlag size={14}/>}>Report</Menu.Item>
                        </Tooltip>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Group>
              </Section>
            </Stack>
          </Card>
          <Card px={0}>
            <Group>
              <Text weight={500}>Explore more on:</Text>
              <CategoryBadges categories={categories}/>
            </Group>
          </Card>
          {!authorLoading ?
            <Stack>
              <Title order={2}>Author information</Title>
              <Divider/>
              <AuthorCard author={authorData}/>
            </Stack>
            : <PostLoader size="md"/>
          }
          {Boolean(authorPostsData?.length) &&
						<>
							<Stack mt="md">
								<Title order={2}>More from {author?.name}</Title>
								<Divider/>
								<SimpleGrid cols={2}>
                  {!authorPostsLoading ?
                    authorPostsData?.map((a: IPost) => <ArticleCard key={a._id} post={a}/>)
                    : <PostLoader size="md"/>
                  }
								</SimpleGrid>
								<Button
									fullWidth
									variant="outline"
									mt="md"
									size="md"
									component={Link}
									to={`/${author.slug.current}`}
								>
									Read more by {author?.name}
								</Button>
							</Stack>
						</>
          }
        </Stack>
      ) : <PostLoader size="md"/>
      }
    </Wrapper>
  );
};

export default SinglePost;
