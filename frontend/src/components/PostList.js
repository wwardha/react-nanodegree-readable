import React, { Component } from 'react';
import Post from './Post';
import PostModal from './PostModal';
import InvalidCategory from './InvalidCategory';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setPostSortAction} from '../actions/setPostSortAction';
import {getPostsWithThunk, getPostsByCategoryWithThunk} from '../utils/readableThunk';
import Modal from 'react-modal';
import {modalPostStyle} from '../utils/index';
import sortBy from 'sort-by'
import {getPathArray} from '../utils/index';

class PostList extends Component {
  state = {
    postModalIsOpen: false
  }

  static propTypes = {
    currentPostSort: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
    setPostSortAction: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    getPostsByCategory: PropTypes.func.isRequired
  };

  getCurrentCategory = () => {
    let category = '';
    let paths = getPathArray(this.props.location.pathname);
    
    if (paths.length > 1)  {
        category = paths[1];
    }
 
    return (category.trim() === '') ? 'home': category;
  }

  sortPostBy = (item) => {
    this.props.setPostSortAction(item);
  }

  openCreatePostModal = (postId) => this.setState(() => ({ postModalIsOpen: true }))

  closePostModal = () => {
    this.setState(() => ({ postModalIsOpen: false }));
  }

  render() {
    const {postModalIsOpen} = this.state
    const {currentPostSort, categories, posts} = this.props;

    if ((categories.length === 0) || (posts.length === 0))
      return (null);

    let currentCategory = this.getCurrentCategory();
    let filteredPosts = (currentCategory.trim() === 'home') ? posts : posts.filter((post) => post.category === currentCategory);
    filteredPosts.sort(sortBy('-' + currentPostSort));   

    let isCategoryExists = (categories.filter((category) => category.name === currentCategory).length > 0);
    
    return (
      <div>
        <div className='container'>
          <div className='col-md-6'>
            {filteredPosts.length >= 1 && isCategoryExists &&
              <div className='dropdown post-header'>
                <div className='container'>
                  <div className='same-height-row'>       
                    <div className='col-md-8'>
                      <div className='same-height'>
                        <span>
                          <label type='button' className='btn btn-primary' onClick={this.openCreatePostModal}>New Post</label>
                        </span>
                        {filteredPosts.length > 1 &&
                        <span className='post-sort'>
                          <label className='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>
                            Sorting Posts by {(currentPostSort === 'timestamp') ? 'Post Date' : 'Vote'}
                            &nbsp;<span className='caret'></span>
                          </label>
                          <ul className='dropdown-menu dropdown-menu-right'>
                            <li><Link to={'/' + currentCategory} onClick={()=>{this.sortPostBy('timestamp');}}>Post Date</Link></li>
                            <li><Link to={'/' + currentCategory} onClick={()=>{this.sortPostBy('voteScore');}}>Vote</Link></li>
                          </ul>                        
                        </span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {filteredPosts.length === 0 && isCategoryExists &&
              <div className='post-empty'>
                <div className='container'>
                  <div className='same-height-row'>       
                    <div className='col-md-8'>
                      <div className='box same-height'>    
                        What's on your mind. <Link to={'/' + currentCategory} onClick={this.openCreatePostModal}>Create new post</Link>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {isCategoryExists && 
              <ol className='post-list'>
                {filteredPosts.map((post) => (
                  <li key={post.id}>
                    <Post viewMode='master' post={post} />
                  </li>
                ))}
              </ol>
            }
            {filteredPosts.length === 0 && !isCategoryExists &&
              <InvalidCategory category={currentCategory} />
            }
          </div>
          {isCategoryExists && 
            <Modal
              isOpen={postModalIsOpen}
              style={modalPostStyle}
              contentLabel="Post Modal"
            >
              <PostModal closePostModal={this.closePostModal}/>
            </Modal>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({settings, categories, posts}) => ({
  currentPostSort: (settings.sort === null) ? 'voteScore' : settings.sort,
  categories,
  posts
});

const mapDispatchToProps = (dispatch) => ({
  setPostSortAction: (item) => dispatch(setPostSortAction(item)),
  getPosts: () => dispatch(getPostsWithThunk()),
  getPostsByCategory: (category) => dispatch(getPostsByCategoryWithThunk(category))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));