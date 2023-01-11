export interface Author {
  '_createdAt': string,
  '_id': string,
  'name': string,
  'website'?: string,
  'email': string,
  'bio'?: [
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
  'slug'?: {
    'current': string
    '_type': string
  },
  'image'?:
    {
      '_type': string,
      'asset':
        {
          '_ref': string,
          '_type': string
        }
    },
}
