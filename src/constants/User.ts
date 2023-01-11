export interface User  {
  _id?: string
  name?: string
  website?: string
  slug?: {
    current?: string
    name?: string
    _type?: string
  } | any,
  bio?: any | string
  image?: any
  email?: string
  displayName?: string
}
