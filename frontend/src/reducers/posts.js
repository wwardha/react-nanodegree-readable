import {GET_POSTS, DELETE_POST, CREATE_POST, UPDATE_POST} from '../actions/index';

const getPosts = (posts=[], action) => {
  let itemsKeys = [];
  let postsKeys = action.posts.reduce((keys, post) => {
                    itemsKeys.push(post.id);
                    keys = itemsKeys;
                    return keys;
                  },[]);
               
  let result = posts.filter((post) => {
      return postsKeys.indexOf(post.id) === -1;
  });

  return result.concat(action.posts);
}

const deletePost = (posts=[], action) => {
  return posts.filter((post) => {
      return post.id !== action.postId;
  });
}

const createPost = (posts=[], action) => {
  return posts.concat(action.post);
}

const updatePost = (posts=[], action) => {
  return posts
         .filter((post) => (post.id !== action.post.id))
         .concat(action.post);
}

export const posts = (posts=[], action) => {
  switch (action.type) {
    case GET_POSTS: return getPosts(posts, action);
    case DELETE_POST: return deletePost(posts, action);
    case CREATE_POST: return createPost(posts, action);
    case UPDATE_POST: return updatePost(posts, action);
    default: return posts;
  }
};