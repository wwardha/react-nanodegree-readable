import {DELETE_COMMENT} from './index';

export const deleteCommentAction = (comment) => ({
  type: DELETE_COMMENT,
  comment
});