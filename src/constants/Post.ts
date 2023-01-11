export interface Post {
  '_createdAt'?: string,
  '_id': string,
  '_rev'?: string,
  '_type'?: string,
  '_updatedAt'?: string,
  'author': {
    '_ref'?: string,
    '_type'?: string,
    'name': string,
    '_id': string,
    'slug': {
      'current': string
      '_type': string
    },
    image: {
      '_type': string,
      'asset':
        {
          '_ref': string,
          '_type': string
        }
    },
  },
  'body': [
    {
      '_key': string,
      '_type': string,
      'children': [
        {
          '_key': string,
          '_type': string,
          'marks': [],
          'text': string
        }],
      'markDefs': [],
      'style': string
    }
  ],
  'categories':
    Array<{
      '_key'?: string,
      '_ref'?: string,
      '_type'?: string,
      'title': string
    }>,
  'mainImage':
    {
      '_type': string,
      'asset':
        {
          '_ref': string,
          '_type': string
        }
    },
  'publishedAt': string,
  'slug': {
    '_type': string,
    'current': string
  },
  'title': string
}
