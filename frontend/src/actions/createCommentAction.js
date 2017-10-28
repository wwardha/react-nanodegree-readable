import {CREATE_COMMENT} from './index';

export const createCommentAction = (comment) => ({
  type: CREATE_COMMENT,
  comment
});