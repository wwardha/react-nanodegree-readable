import {int, isIn} from './index';

const baseUrl = 'http://localhost:3001';

const fetchSettings = (method, body=false) => ({
  headers: {
    'Authorization': '*',
    'Content-Type': 'application/json'
  },
  method,
  body: (body) ? JSON.stringify(body) : null
});

const fetchApi = (url, method, body) =>
  fetch(url, fetchSettings(method, body))
    .then(res => res.json())
    .catch(res => console.log(res));
    
export const getCategoriesApi = () =>
  fetchApi(
    `${baseUrl}/categories`,
    'GET');

export const getPostsApi = () =>
  fetchApi(
    `${baseUrl}/posts`,
    'GET');

export const getPostByIdApi = (id) =>
  fetchApi(
    `${baseUrl}/posts/${String(id)}`,
    'GET');

export const getPostsByCategoryApi = (category) =>
  fetchApi(
    `${baseUrl}/${String(category)}/posts`,
    'GET');

export const addPostApi = ({id, timestamp, title, body, author, category}) =>
  fetchApi(
    `${baseUrl}/posts`,
    'POST',
    {
      id: String(id),
      timestamp: int(timestamp),
      title: String(title),
      body: String(body),
      author: String(author),
      category: String(category)
    });

export const votePostApi = (id, vote) =>
  fetchApi(
    `${baseUrl}/posts/${String(id)}`,
    'POST',
    {option: isIn(vote, ['upVote', 'downVote'])});

export const editPostApi = ({id, author, title, body, category}) =>
  fetchApi(
    `${baseUrl}/posts/${String(id)}`,
    'PUT',
    {
      id: String(id),
      author: String(author),
      title: String(title),
      body: String(body),
      category: String(category)
    });

export const deletePostApi = (id) =>
  fetchApi(
    `${baseUrl}/posts/${String(id)}`,
    'DELETE');

export const getCommentsApi = (id) =>
  fetchApi(
    `${baseUrl}/posts/${String(id)}/comments`,
    'GET');

export const getCommentApi = (id) =>
  fetchApi(
    `${baseUrl}/comments/${String(id)}`,
    'GET');

export const addCommentApi = ({id, timestamp, body, author, parentId}) =>
  fetchApi(
    `${baseUrl}/comments`,
    'POST',
    {
      id: String(id),
      timestamp: int(timestamp),
      body: String(body),
      author: String(author),
      parentId: String(parentId)
    });

export const voteCommentApi = (id, vote) =>
  fetchApi(
    `${baseUrl}/comments/${String(id)}`,
    'POST',
    {option: isIn(vote, ['upVote', 'downVote'])});

export const editCommentApi = ({id, author, body}) =>
  fetchApi(
    `${baseUrl}/comments/${String(id)}`,
    'PUT',
    {
      id: String(id),
      author: String(author),
      body: String(body)
    });

export const deleteCommentApi = (id) =>
  fetchApi(
    `${baseUrl}/comments/${String(id)}`,
    'DELETE');