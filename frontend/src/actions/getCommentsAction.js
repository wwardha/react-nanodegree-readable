import {GET_COMMENTS} from './index';

export const getCommentsAction = (comments, postId) => ({
    type: GET_COMMENTS,
    comments,
    postId
});