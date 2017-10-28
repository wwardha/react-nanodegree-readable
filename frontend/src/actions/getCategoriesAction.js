import {GET_CATEGORIES} from './index';

export const getCategoriesAction = (categories) => ({
  type: GET_CATEGORIES,
  categories
});