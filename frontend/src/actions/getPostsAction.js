import {GET_POSTS} from './index';

export const getPostsAction = (posts) => ({
  type: GET_POSTS,
  posts
});