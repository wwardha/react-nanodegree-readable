import {GET_CATEGORIES} from '../actions/index';

export const categories = (categories=[], action) => {
  switch (action.type) {
    case GET_CATEGORIES:  
      let home = [{name:'home', path:' '}];
      return home.concat(action.categories);
    default: 
      return categories;
  }
};