import {CREATE_POST} from './index';

export const createPostAction = (post) => ({
  type: CREATE_POST,
  post
});