import blockTools from '@sanity/block-tools';
import {postBlockContentType} from '../utils';
import {client} from '../client';

export interface IPost {
  _type?: string
  title?: string
  categories?: string[]
  slug?: {
    current?: string
    name?: string
    _type?: string
  } | any,
  body?: any | string
  mainImage?: any
  author?: any
  publishedAt?: any
}

/**
 * create author in sanity after signup
 * @param post
 */
export const handleCreatePost = (post: IPost): Promise<any> => {
  const doc: any = {
    _type: 'post',
    title: post.title,
    slug: {
      _type: 'slug',
      current: post.slug
    },
    author: {
      _type: 'reference',
      _ref: post.author._id
    },
    body: blockTools.htmlToBlocks(post.body, postBlockContentType),
    publishedAt: post.publishedAt
  };

  /**
   * refine categories for posting
   */
  const categories = post.categories?.map(c => {
    return {
      _key: c,
      _ref: c,
      _type: 'reference',
    };
  });

  if (post.mainImage) {
    return Promise.resolve(client.assets.upload('image', post.mainImage, {
        contentType: post.mainImage.type,
        filename: post.mainImage.name
      })
      .then((imagesAssets) => {
        doc.mainImage = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imagesAssets?._id,
          },
        };
        return Promise.resolve(client.create(doc).then(res2 => {
          /**
           * patch slug to post title + doc id
           * add categories to doc
           */
          return Promise.resolve(client.patch(res2._id)
            .set({slug: {_type: 'slug', current: `${post.slug}-${res2._id}`}})
            .setIfMissing({categories: []})
            .insert('after', 'categories[-1]', categories || [])
            .commit().then(res3 => res3)
            .catch(error => {
              console.log(error);
            }));
        }).catch(error => {
          console.log(error);
        }));
      })
      .catch((error) => {
        console.log('Upload failed:', error.message);
      }));
  } else {
    return Promise.resolve(client.create(doc).then(res2 => {
      /**
       * patch slug to post title + doc id
       * add categories to doc
       */
      return Promise.resolve(client.patch(res2._id)
        .set({slug: {_type: 'slug', current: `${post.slug}-${res2._id}`}})
        .setIfMissing({categories: []})
        .insert('after', 'categories[-1]', categories || [])
        .commit().then(res3 => res3)
        .catch(error => {
          console.log(error);
        }));
    }).catch(error => {
      console.log(error);
    }));
  }
};

/**
 * create author in sanity after signup
 * @param id
 */
export const handleDeletePost = (id: string): Promise<any> => {
  return Promise.resolve(client.delete(id).then(res2 => {
    return res2;
  }).catch(error => {
    console.log(error);
  }));
};
