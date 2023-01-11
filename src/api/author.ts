import blockTools from '@sanity/block-tools';
import {client} from '../client';
import {IUser} from '../constants';
import {authorBlockContentType} from '../utils';

/**
 * create author in sanity after signup
 * @param user
 */
export const handleCreateAuthor = (user: IUser): Promise<any> => {
  const doc = {
    _type: 'author',
    name: user.displayName,
    email: user.email
  };

  return Promise.resolve(client.create(doc));
};


/**
 * create author in sanity after signup
 * @param user
 */
export const handlePatchAuthor = (user: IUser): Promise<any> => {
  const doc: any = {
    _type: 'author',
    _id: user._id,
    name: user.name,
    email: user.email,
    website: user.website,
    'slug.current': user.slug,
    bio: blockTools.htmlToBlocks(user.bio, authorBlockContentType)
  };

  if (user._id) {
    if (Boolean(user.image)) {
      return Promise.resolve(client.assets.upload('image', user.image, {
          contentType: user.image.type,
          filename: user.image.name
        })
        .then((imagesAssets) => {
          doc.image = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imagesAssets?._id,
            },
          };
          return Promise.resolve(client.patch(user._id ?? '').set(doc).commit()).then(res2 => {
            return res2;
          }).catch(error => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        }));
    } else {
      return Promise.resolve(client.patch(user._id).set(doc).commit()).then(res2 => {
        return res2;
      }).catch(error => {
        console.log(error);
      });
    }
  } else {
    return Promise.reject('missing id');
  }
};

/**
 * fetch author in sanity after login
 * @param user
 */
export const handleFetchAuthor = (user: IUser): Promise<any> => {
  return Promise.resolve(client.fetch(
    `*[_type == "author" && email == '${user.email}']{
        _id, name, email, image, bio, slug, website,_createdAt
      }`
  ));
};
