import {combineReducers} from 'redux';
import {settings} from './settings';
import {categories} from './categories';
import {posts} from './posts';
import {comments} from './comments';

export default combineReducers({
  settings,
  categories,
  posts,
  comments
});