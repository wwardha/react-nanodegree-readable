import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from './NavBar';
import PostList from './PostList';
import PostDetail from './PostDetail';
import {getCategoriesWithThunk, getPostsWithThunk, getPostsByCategoryWithThunk, getCommentsWithThunk} from '../utils/readableThunk';
import {getPathArray} from '../utils/index';

class App extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    getPostsByCategory: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired
  };

  getCurrentCategory = () => {
    let category = '';
    let paths = getPathArray(this.props.location.pathname);
    
    if (paths.length > 1)  {
        category = paths[1];
    }
 
    return (category.trim() === '') ? 'home': category;
  }

  getPostList = (category) => {
    if (category === 'home')
        return this.props.getPosts();
    else {
        if (this.props.posts.length === 0)
            return this.props.getPosts();                
        else
            return this.props.getPostsByCategory(category); 
    }              
  }

  getCommentList = () => {
    this.props.posts.map((post) => {
        return this.props.getComments(post.id);
    });
  }

  refreshStore = (category) => {
    this.getPostList(category)
    .then(() => {
        this.getCommentList();
    });
  }

  componentWillMount() {
    let currentCategory = this.getCurrentCategory();
    var isCategoryExists = (this.props.categories.filter((category) => category.name === currentCategory).length > 0);

    this.props.getCategories()
    .then(() => {    
        if (isCategoryExists)
            this.refreshStore(currentCategory);  
        else
            this.refreshStore('home');  
    });  
  }

  render() {
    return (
      <div>
        <NavBar refreshStore={this.refreshStore}/>
        <Route exact path="/" component={PostList} />
        <Route exact path="/:category" component={PostList} />
        <Route path="/:category/:postId" component={PostDetail} />
      </div>
    );
  }
}

const mapStateToProps = ({categories, posts}) => ({
  categories,
  posts
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesWithThunk()),
  getPosts: () => dispatch(getPostsWithThunk()),
  getPostsByCategory: (category) => dispatch(getPostsByCategoryWithThunk(category)),
  getComments: (postId) => dispatch(getCommentsWithThunk(postId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
