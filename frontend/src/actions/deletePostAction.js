import {DELETE_POST} from './index';

export const deletePostAction = (postId) => ({
  type: DELETE_POST,
  postId
});