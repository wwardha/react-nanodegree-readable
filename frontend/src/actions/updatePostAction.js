import {UPDATE_POST} from './index';

export const updatePostAction = (post) => ({
  type: UPDATE_POST,
  post
});