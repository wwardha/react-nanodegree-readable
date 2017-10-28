import {UPDATE_COMMENT} from './index';

export const updateCommentAction = (comment) => ({
  type: UPDATE_COMMENT,
  comment
});