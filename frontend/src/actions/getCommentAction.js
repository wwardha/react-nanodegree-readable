import {GET_COMMENT} from './index';

export const getCommentAction = (comment) => ({
    type: GET_COMMENT,
    comment
});