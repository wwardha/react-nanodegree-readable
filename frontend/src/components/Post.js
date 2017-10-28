import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Comment from './Comment';
import PostModal from './PostModal';
import CommentModal from './CommentModal';
import {getCommentsWithThunk, votePostWitThunk, deletePostWitThunk} from '../utils/readableThunk';
import Modal from 'react-modal';
import sortBy from 'sort-by'
import {modalPostStyle, modalCommentStyle, formatTime, getPathArray} from '../utils/index';

class Post extends Component {
    state = {
        postModalIsOpen: false,
        commentModalIsOpen: false
    }

    static propTypes = {
        viewMode: PropTypes.string.isRequired,
        post: PropTypes.object.isRequired,
        comments: PropTypes.object.isRequired,
        votePost: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
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

    voteUp = (postId) => {
        this.vote(postId, 'upVote');
    }
   
    voteDown = (postId) => {
        this.vote(postId, 'downVote');
    }

    vote = (postId, voteStr) => {
        this.props.votePost(this.getCurrentCategory(), postId, voteStr);
    };

    deletePost = (postId) => {
        this.props.deletePost(postId);
    }

    viewPost = (category, postId) => {
        this.props.history.push('/' + category + '/' + postId);
    }

    openPostModal = () => {
        this.setState(() => ({ postModalIsOpen: true }));
    }

    closePostModal = () => {
        this.setState(() => ({ postModalIsOpen: false }));
    }

    openCommentModal = () => {
        this.setState(() => ({ commentModalIsOpen: true }));
    }

    closeCommentModal = () => {
        this.setState(() => ({ commentModalIsOpen: false }));
    }

    render() {
        const {postModalIsOpen, commentModalIsOpen} = this.state;
        const {post, comments, viewMode} = this.props;
        const commentsCount = (!!comments[post.id]) ? comments[post.id].length : 0; 
        const filteredComments = comments[post.id];
        const postDate = formatTime(post.timestamp);

        if(!!filteredComments)
            filteredComments.sort(sortBy('-voteScore'));   

        return (
            <div id='post'>
                <div className='container'>
                    <div className='same-height-row'>       
                        <div className='col-md-8'>
                            <div className='box same-height'>
                                <div>
                                    <span className='post-button'>
                                        <label type='button' className='btn btn-default' onClick={()=>{this.deletePost(post.id);}}>Delete</label>
                                    </span>
                                    <span className='post-button'>
                                        <label type='button' className='btn btn-default' onClick={()=>{this.openPostModal();}}>Edit</label>
                                    </span>
                                    {(viewMode === 'master') && <span className='post-button'>
                                        <label type='button' className='btn btn-default' onClick={()=>{this.viewPost(post.category, post.id);}}>View</label>
                                    </span>}
                                </div> 
                                <div className='post-author'>{post.author}</div>
                                <div className='post-date'>{postDate.toLocaleString()}</div>
                                <h3><Link to={'/' + post.category + '/' + post.id}> {post.title} </Link></h3>
                                <p onClick={()=>{this.viewPost(post.category, post.id);}}>
                                    {post.body}
                                </p>
                                <div className='post-info'>  
                                    <span className='post-vote'>
                                        <span className='label label-primary label-as-badge'>{post.voteScore}</span> 
                                    </span>
                                    <span onClick={()=>{this.voteUp(post.id);}} className='icon'><i className='fa fa-thumbs-up'></i></span>
                                    <span onClick={()=>{this.voteDown(post.id);}} className='icon'><i className='fa fa-thumbs-down'></i></span>
                                    <span className='post-comment'>{commentsCount} {(commentsCount > 1) ? 'comments' : 'comment'}</span>
                                </div> 
                            </div>
                            {(viewMode === 'detail') && (!!filteredComments && filteredComments.length !== 0) &&
                                <div>
                                    <div className='comment-create'>
                                        <span>
                                            <label type='button' className='btn btn-primary' onClick={this.openCommentModal}>New Comment</label>
                                        </span>
                                    </div>
                                    <div className='box same-height'>
                                        <ol className='comment-list'>
                                            {
                                                filteredComments.map((comment,i,{length}) => {
                                                if (i + 1 === length){
                                                
                                                    return (<li key={comment.id}>
                                                                <Comment comment={comment} />
                                                            </li>)
                                                }     
                                                else {
                                                    return (<li key={comment.id}>
                                                                <Comment comment={comment} />
                                                                <hr />
                                                            </li>)
                                                }           
                                            })}
                                        </ol>
                                    </div>
                                </div>
                            }
                            {(viewMode === 'detail') && (!!filteredComments && filteredComments.length === 0) &&
                                <div className='box same-height'>    
                                    Be first to comment on this post. <Link to={'/' + post.categgory + '/' + post.id} onClick={this.openCommentModal}>Create new comment</Link>.
                                </div>
                            }
                        </div>
                    </div>
                    <Modal
                        isOpen={postModalIsOpen}
                        style={modalPostStyle}
                        contentLabel="Post Modal"
                    >
                        <PostModal postId={post.id} closePostModal={this.closePostModal} />
                    </Modal>
                    <Modal
                        isOpen={commentModalIsOpen}
                        style={modalCommentStyle}
                        contentLabel="Comment Modal"
                    >
                        <CommentModal postId={post.id} closeCommentModal={this.closeCommentModal} />
                    </Modal>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = ({comments}) => ({
    comments
});

const mapDispatchToProps = (dispatch) => ({
    getComments: (postId) => dispatch(getCommentsWithThunk(postId)),
    votePost: (category, postId, voteStr) => dispatch(votePostWitThunk(category, postId, voteStr)),
    deletePost: (postId) => dispatch(deletePostWitThunk(postId))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));