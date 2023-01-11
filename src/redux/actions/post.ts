import {client} from '../../client';
import {
  POST_FETCH_FAIL,
  POST_FETCH_REQUEST,
  POST_FETCH_SUCCESS,
  POSTS_FETCH_RECENT_SUCCESS,
  POSTS_FETCH_RECENT_REQUEST,
  POSTS_FETCH_RECENT_FAIL,
  POSTS_FETCH_REQUEST,
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAIL,
  POSTS_FETCH_AUTHOR_REQUEST,
  POSTS_FETCH_AUTHOR_SUCCESS,
  POSTS_FETCH_AUTHOR_FAIL,
  POSTS_CATEGORY_FETCH_REQUEST,
  POSTS_CATEGORY_FETCH_SUCCESS,
  POSTS_CATEGORY_FETCH_FAIL,
  POSTS_SEARCH_FETCH_REQUEST,
  POSTS_SEARCH_FETCH_SUCCESS, POSTS_SEARCH_FETCH_FAIL,
} from '../constants/post';

/**
 * fetch all posts
 * @param lastId can be number or null
 * @param length
 */
const fetchAllPosts = (lastId?: any, length?: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: POSTS_FETCH_REQUEST
    });
    const data = await client.fetch(
      `{
      "items": *[_type == "post" && _id > '${Boolean(lastId) ? lastId : 0}'] [0...${Boolean(length) ? length : 10}] {
        _id, title, slug, mainImage, publishedAt, body,
        author->{name, slug, image, _id},
        categories[]->{title},
      },
      "total": count(*[_type == "post"])
      }`
    );
    dispatch({
      type: POSTS_FETCH_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: POSTS_FETCH_FAIL,
      payload: error.message
    });
  }
};

/**
 * fetch posts by slug as filter
 * @param slug
 */
const fetchPostBySlug = (slug: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: POST_FETCH_REQUEST
    });
    const data = await client.fetch(
      `*[_type == 'post' && slug.current == '${slug}']{      
              _id, title, slug, mainImage, publishedAt, body,
              author->{name, slug, image, _id},
              categories[]->{title}
            }[0]`
    );
    dispatch({
      type: POST_FETCH_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: POST_FETCH_FAIL,
      payload: error.message
    });
  }
};

/**
 * fetch all recent posts
 */
const fetchRecentPosts = () => async (dispatch: any) => {
  try {
    dispatch({
      type: POSTS_FETCH_RECENT_REQUEST
    });
    const data = await client.fetch(
      `*[_type == 'post']{                                
                _id, title, slug, mainImage, publishedAt, body,
                author->{name, slug, image, _id},
                categories[]->{title}
              } | order(publishedAt, desc)[0...5]`
    );
    dispatch({
      type: POSTS_FETCH_RECENT_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: POSTS_FETCH_RECENT_FAIL,
      payload: error.message
    });
  }
};

/**
 * fetch posts by author as filter, options included are fetch posts including current posts or not
 * @param author
 * @param excludeCurrentPost
 * @param currentPostTitle
 * @param lastId
 */
const fetchPostsByAuthor = (author: string, excludeCurrentPost: boolean, currentPostTitle: string, lastId?: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: POSTS_FETCH_AUTHOR_REQUEST
    });
    const data = excludeCurrentPost ? await client.fetch(
        `{
        "items": *[_type == 'post' && 
          author._ref in *[_type=='author' && 
          _id=='${author}']._id && _id > '${Boolean(lastId) ? lastId : 0}'] [0...10] {      
            _id, title, slug, mainImage, publishedAt, body,
            author->{name, slug, image, _id},
            categories[]->{title}
          },
        "total": count(*[_type == "post" && author._ref in *[_type=='author' && name=='${author}']._id])
        }`
      )
      : await client.fetch(
        `{
        "items": *[_type == 'post' && title != "${currentPostTitle}" && 
          author._ref in *[_type=='author' && 
          _id=='${author}']._id && _id > '${Boolean(lastId) ? lastId : 0}'] [0...10] {      
            _id, title, slug, mainImage, publishedAt, body,
            author->{name, slug, image, _id},
            categories[]->{title}
          },
          "total": count(*[_type == "post" && 
            title != "${currentPostTitle}" && 
            author._ref in *[_type=='author' && 
            _id=='${author}']._id]
          )
        }`
      );
    dispatch({
      type: POSTS_FETCH_AUTHOR_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: POSTS_FETCH_AUTHOR_FAIL,
      payload: error.message
    });
  }
};

/**
 * fetch posts by category as filter
 * @param category
 * @param lastId
 */
const fetchPostsByCategory = (category: string, lastId?: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: POSTS_CATEGORY_FETCH_REQUEST
    });
    const data = await client.fetch(
      `{
      "items": *[_type == 'post' && '${category}' in categories[]->title && _id > '${Boolean(lastId) ? lastId : 0}'] [0...10] {      
              _id, title, slug, mainImage, publishedAt, body,
              author->{name, slug, image, _id},
              categories[]->{title}
            },
      "total": count(*[_type == 'post' && '${category}' in categories[]->title])
      }`
    );
    dispatch({
      type: POSTS_CATEGORY_FETCH_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: POSTS_CATEGORY_FETCH_FAIL,
      payload: error.message
    });
  }
};

/**
 * fetch posts by search query
 * @param search
 * @param lastId
 */
const fetchPostsBySearch = (search: string, lastId?: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: POSTS_SEARCH_FETCH_REQUEST
    });
    const data = await client.fetch(
      `{
      "items": *[_type == 'post' && (title match '${search}' || title match '${search}*') && _id > '${Boolean(lastId) ? lastId : 0}'] [0...10] {      
              _id, title, slug, mainImage, publishedAt, body,
              author->{name, slug, image, _id},
              categories[]->{title}
            },
      "total": count(*[_type == 'post' && (title match '${search}' || title match '${search}*')])
      }`
    );
    dispatch({
      type: POSTS_SEARCH_FETCH_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: POSTS_SEARCH_FETCH_FAIL,
      payload: error.message
    });
  }
};


export {
  fetchAllPosts,
  fetchPostBySlug,
  fetchRecentPosts,
  fetchPostsByAuthor,
  fetchPostsByCategory,
  fetchPostsBySearch
};
