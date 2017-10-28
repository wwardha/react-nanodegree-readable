import {GET_COMMENTS, DELETE_POST, GET_COMMENT, UPDATE_COMMENT, CREATE_COMMENT, DELETE_COMMENT} from '../actions/index'

const getComments = (comments={}, action) => ({
    ...comments,
    [action.postId]: action.comments
});

const deletePost = (comments={}, action) => {
    const {postId} = action;

    let {[postId]: omit, ...res} = comments;
    return res;
};

const getComment = (comments={}, action) => {
    const {comment} = action;

    let updatedComments = comments[comment.parentId]
                          .filter((item) => item.id !== comment.id)
                          .concat(comment);

    return ({...comment,
             [comment.parentId]: updatedComments
            });
};

const createComment = (comments={}, action) => {
    const {comment} = action;

    let updatedComments = comments[comment.parentId]
                          .concat(comment);

    return ({...comment,
             [comment.parentId]: updatedComments
            });
};

const deleteComment = (comments={}, action) => {
    const {comment} = action;

    let updatedComments = comments[comment.parentId]
                          .filter((item) => item.id !== comment.id)

    return ({...comment,
             [comment.parentId]: updatedComments
            });
};

export const comments = (comments={}, action) => {
    switch (action.type) {
        case GET_COMMENTS: return getComments(comments, action);
        case DELETE_POST: return deletePost(comments, action);
        case GET_COMMENT: return getComment(comments, action);
        case UPDATE_COMMENT: return getComment(comments, action);
        case CREATE_COMMENT: return createComment(comments, action);
        case DELETE_COMMENT: return deleteComment(comments, action);
        default : return comments;
    }
};