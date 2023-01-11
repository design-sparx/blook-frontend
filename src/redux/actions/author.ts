import {client} from '../../client';
import {
  AUTHOR_ID_FETCH_FAIL,
  AUTHOR_ID_FETCH_REQUEST, AUTHOR_ID_FETCH_SUCCESS,
  AUTHOR_NAME_FETCH_FAIL,
  AUTHOR_NAME_FETCH_REQUEST, AUTHOR_NAME_FETCH_SUCCESS,
  AUTHOR_SLUG_FETCH_FAIL,
  AUTHOR_SLUG_FETCH_REQUEST,
  AUTHOR_SLUG_FETCH_SUCCESS
} from '../constants/author';

/**
 * fetch author by slug in url
 * @param slug
 */
const fetchAuthorBySlug = (slug: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: AUTHOR_SLUG_FETCH_REQUEST
    });
    const data = await client.fetch(
      `*[_type == "author" && slug.current == '${slug}']{
        _id, name, image, bio, slug, _createdAt, email, website
      }[0]`
    );
    dispatch({
      type: AUTHOR_SLUG_FETCH_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: AUTHOR_SLUG_FETCH_FAIL,
      payload: error.message
    });
  }
};

/**
 * fetch author by name
 * @param name
 */
const fetchAuthorByName = (name: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: AUTHOR_NAME_FETCH_REQUEST
    });
    const data = await client.fetch(
      `*[_type == "author" && name == '${name}']{
        _id, name, image, bio, slug, _createdAt, email, website
      }[0]`
    );
    dispatch({
      type: AUTHOR_NAME_FETCH_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: AUTHOR_NAME_FETCH_FAIL,
      payload: error.message
    });
  }
};

/**
 * fetch author by id
 * @param id
 */
const fetchAuthorById = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: AUTHOR_ID_FETCH_REQUEST
    });
    const data = await client.fetch(
      `*[_type == "author" && _id == '${id}']{
        _id, name, image, bio, slug, _createdAt, email, website
      }[0]`
    );
    dispatch({
      type: AUTHOR_ID_FETCH_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: AUTHOR_ID_FETCH_FAIL,
      payload: error.message
    });
  }
};

export {
  fetchAuthorBySlug,
  fetchAuthorByName,
  fetchAuthorById
};
