import {Post} from './Post';

export interface Posts {
  'ms': number,
  'query': string,
  'result': {
    items: Post[],
    total: number
  }
}
