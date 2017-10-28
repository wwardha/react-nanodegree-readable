import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CommentModal from './CommentModal';
import Modal from 'react-modal';
import {voteCommentWitThunk, deleteCommentWitThunk} from '../utils/readableThunk';
import {modalCommentStyle, formatTime} from '../utils/index';

class Comment extends Component {
    state = {
        commentModalIsOpen: false
    }
    
    static propTypes = {
        comment: PropTypes.object.isRequired,
        voteComment: PropTypes.func.isRequired,
        deleteComment: PropTypes.func.isRequired
    };

    voteUp = (commentId) => {
        this.vote(commentId, 'upVote');
    }
   
    voteDown = (commentId) => {
        this.vote(commentId, 'downVote');
    }

    vote = (commentId, voteStr) => {
        this.props.voteComment(commentId, voteStr);
    };

    deleteComment = (commentId) => {
        this.props.deleteComment(commentId);
    }

    openCommentModal = () => {
        this.setState(() => ({ commentModalIsOpen: true }));
    }
    
    closeCommentModal = () => {
        this.setState(() => ({ commentModalIsOpen: false }));
    }
    
    render() {
        const {commentModalIsOpen} = this.state;
        const {comment} = this.props;
        const commentDate = formatTime(comment.timestamp);

        return (
            <div id='comment'>
                <div>
                    <span className='comment-button'>
                        <label type='button' className='btn btn-default btn-xs' onClick={()=>{this.deleteComment(comment.id);}}>Delete</label>
                    </span>
                    <span className='comment-button'>
                        <label type='button' className='btn btn-default btn-xs' onClick={()=>{this.openCommentModal(comment.id); }}>Edit</label>
                    </span>
                </div>
                <div className='comment-author'>{comment.author}</div>
                <div className='comment-date'>{commentDate.toLocaleString()}</div>
                <p>
                    {comment.body}
                </p>
                <div className='comment-info'>  
                    <span className='comment-vote'>
                        <span className='label label-primary label-as-badge'>{comment.voteScore}</span> 
                    </span>
                    <span onClick={()=>{this.voteUp(comment.id);}} className='icon'><i className='fa fa-thumbs-up'></i></span>
                    <span onClick={()=>{this.voteDown(comment.id);}} className='icon'><i className='fa fa-thumbs-down'></i></span>
                </div>
                <Modal
                    isOpen={commentModalIsOpen}
                    style={modalCommentStyle}
                    contentLabel="Comment Modal"
                >
                    <CommentModal commentId={comment.id} postId={comment.parentId} closeCommentModal={this.closeCommentModal} />
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    voteComment: (commentId, voteStr) => dispatch(voteCommentWitThunk(commentId, voteStr)),
    deleteComment: (commentId) => dispatch(deleteCommentWitThunk(commentId))
});
  
export default withRouter(connect(null, mapDispatchToProps)(Comment));
