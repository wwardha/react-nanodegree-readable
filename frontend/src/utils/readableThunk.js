import {getCategoriesApi, getPostsApi, getPostByIdApi, getPostsByCategoryApi, getCommentsApi, 
        votePostApi, deletePostApi, addPostApi, editPostApi, getCommentApi, voteCommentApi,
        editCommentApi, addCommentApi, deleteCommentApi} from './readableAPI';
import {getCategoriesAction} from '../actions/getCategoriesAction';
import {getPostsAction} from '../actions/getPostsAction';
import {deletePostAction} from '../actions/deletePostAction';
import {createPostAction} from '../actions/createPostAction';
import {updatePostAction} from '../actions/updatePostAction';
import {getCommentsAction} from '../actions/getCommentsAction';
import {getCommentAction} from '../actions/getCommentAction';
import {updateCommentAction} from '../actions/updateCommentAction';
import {createCommentAction} from '../actions/createCommentAction';
import {deleteCommentAction} from '../actions/deleteCommentAction';


export const getCategoriesWithThunk = () =>
dispatch =>
  getCategoriesApi()
    .then(response => dispatch(getCategoriesAction(response.categories)));

export const getPostsWithThunk = () =>
dispatch =>
  getPostsApi()
    .then(response => dispatch(getPostsAction(response)));

export const getPostByIdWithThunk = (id) =>
dispatch =>
  getPostByIdApi(id)
    .then(response => {
        if(!response.error) {
          let posts = [];
          posts.push(response);
          dispatch(getPostsAction(posts));  
        }
    });

export const getPostsByCategoryWithThunk = (categoryId) =>
dispatch =>
  getPostsByCategoryApi(categoryId)
    .then(response => dispatch(getPostsAction(response)));

export const getCommentsWithThunk = (postId) =>
dispatch =>
  getCommentsApi(postId)
    .then(response => dispatch(getCommentsAction(response, postId)));

export const votePostWitThunk = (category, postId, voteStr) =>
(dispatch) =>
  votePostApi(postId, voteStr)
    .then(response => (category.trim() === 'home') ? dispatch(getPostsWithThunk()) : dispatch(getPostsByCategoryWithThunk(category)));

export const deletePostWitThunk = (postId) =>
(dispatch) =>
  deletePostApi(postId)
    .then(() => dispatch(deletePostAction(postId)));

export const addPostWitThunk = (post) =>
(dispatch) =>
  addPostApi(post)
    .then(response => dispatch(createPostAction(response)));

export const editPostWitThunk = (post) =>
(dispatch) =>
  editPostApi(post)
    .then(response => dispatch(updatePostAction(response)));

export const getCommentWithThunk = (commentId) =>
dispatch =>
  getCommentApi(commentId)
    .then(response => dispatch(getCommentAction(response)));

export const voteCommentWitThunk = (commentId, voteStr) =>
(dispatch) =>
  voteCommentApi(commentId, voteStr)
    .then(response => dispatch(getCommentWithThunk(commentId)));

export const editCommentWitThunk = (comment) =>
(dispatch) =>
  editCommentApi(comment)
    .then(response => dispatch(updateCommentAction(response)));

export const addCommentWitThunk = (comment) =>
(dispatch) =>
  addCommentApi(comment)
    .then(response => dispatch(createCommentAction(response)));
    
export const deleteCommentWitThunk = (commentId) =>
(dispatch) =>
  deleteCommentApi(commentId)
    .then(response => dispatch(deleteCommentAction(response)));    