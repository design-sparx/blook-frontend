import Schema from '@sanity/schema';
import slugify from 'slugify';
import {client} from '../client';

interface ISlugifier {
  input: string
  type: string
  schema: string
}

export const slugifier = ({input, type, schema}: ISlugifier): any => {
  const slug = slugify(input);
  const query = `count(*[_type=="${schema}" && slug.current == ${input}]{_id})`;
  const params = {slug: slug};
  return client.fetch(query, params).then(count => {
    console.log('Movies with identical slug', count);
    return `${slug}-${count + 1}`;
  });
};

// Start with compiling a schema we can work against
export const authorSchema = Schema.compile({
  name: 'blook.com',
  types: [
    {
      type: 'object',
      name: 'author',
      fields: [
        {
          title: 'Title',
          type: 'string',
          name: 'title'
        },
        {
          name: 'bio',
          title: 'Bio',
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    }
  ]
});

// The compiled schema type for the content type that holds the block array
export const authorBlockContentType = authorSchema.get('author')
  .fields.find((field: any) => field.name === 'bio').type;

// Start with compiling a schema we can work against
export const postSchema = Schema.compile({
  name: 'blook.com',
  types: [
    {
      type: 'object',
      name: 'post',
      fields: [
        {
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{type: 'block'}]
        },
      ]
    }
  ]
});

// The compiled schema type for the content type that holds the block array
export const postBlockContentType = postSchema.get('post')
  .fields.find((field: any) => field.name === 'body').type;

export const profileNameCreate = (names: string): string => {
  const firstChar = names?.split(' ')[0].charAt(0);
  const lastChar = Boolean(names?.split(' ').length > 1) ? names.split(' ')[1].charAt(0) : '';
  return firstChar + lastChar;
};

/**
 * calculate estimate reading time based on ->
 * https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l
 * @param text
 */
export const readingTime = (text: string): number | string => {
  // average adult reading speed (words per minute) is 225, 200 is more average
  const wpm = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
};
