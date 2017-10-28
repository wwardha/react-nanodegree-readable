import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Post from './Post';
import InvalidPost from './InvalidPost';
import {getPostByIdWithThunk, getCommentsWithThunk} from '../utils/readableThunk';
import {getPathArray} from '../utils/index';

class PostDetail extends Component {
    static propTypes = {
        getPost: PropTypes.func.isRequired,
        getComments: PropTypes.func.isRequired
    };
    
    getCurrentPostId = () => {
        let postId = '';
        let paths = getPathArray(this.props.location.pathname);
        
        if (paths.length > 1)  {
            postId = paths[2];
        }

        return postId;
    }

    componentWillMount() {
        let postId = this.getCurrentPostId();

        this.props.getPost(postId)
        .then(() => {
            this.props.getComments(postId);
        });
    }

    render() {
        const {posts} = this.props;
        let postId = this.getCurrentPostId();
        let filteredPosts = posts.filter((post) => post.id === postId);

        let isPostExists = (filteredPosts.filter((post) => post.id === postId).length > 0);

        return (
            <div>
                <div className='container'>
                    <div className='col-md-6'>
                        {isPostExists &&
                            <ol className='post-list'>
                                {filteredPosts.map((post) => (
                                    <li key={post.id}>
                                        <Post viewMode='detail' post={post} />
                                    </li>
                                ))}
                            </ol>
                        }
                        {!isPostExists &&
                            <InvalidPost postId={postId} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({posts}) => ({
    posts
});

const mapDispatchToProps = (dispatch) => ({
    getPost: (postId) => dispatch(getPostByIdWithThunk(postId)),
    getComments: (postId) => dispatch(getCommentsWithThunk(postId))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));