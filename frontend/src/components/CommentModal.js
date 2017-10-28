import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {generateTimestamp} from '../utils/index';
import {getCommentWithThunk, addCommentWitThunk, editCommentWitThunk} from '../utils/readableThunk';
import uniqid from 'uniqid';

class CommentModal extends Component {  
    state = {
        author: '',
        body: ''
    };

    static propTypes = {
        closeCommentModal: PropTypes.func.isRequired,
        comments: PropTypes.object.isRequired,
        addComment: PropTypes.func.isRequired,
        editComment: PropTypes.func.isRequired,
        getComment: PropTypes.func.isRequired
    };

    onAuthorChange = (e) => {
        this.setState({ author: e.target.value });
    }

    onBodyChange = (e) => {
        this.setState({ body: e.target.value });
    }

    submitComment = () => {
        let comment = {id: (!!this.props.commentId) ? this.props.commentId : uniqid(),
                       timestamp: generateTimestamp(),
                       author: (this.state.author.trim() === '') ? 'anonymous' : this.state.author,
                       body: this.state.body, 
                       parentId: this.props.postId};

        if (!!this.props.commentId) {
            this.props.editComment(comment)
                .then(() => {
                    this.props.closeCommentModal();
                });
        }
        else {
            this.props.addComment(comment)
                .then(() => {
                    this.props.closeCommentModal();                    
                });          
        }
    }

    componentDidMount () {
        const {comments, postId, commentId} = this.props;
        
        if (!!commentId) {
            this.props.getComment(commentId);
            
            let comment = comments[postId].filter((item) => item.id === commentId)[0];
            this.setState({ author: comment.author, body: comment.body});            
        }
    }

    render() {
        const {author, body} = this.state;
        const {commentId} = this.props;
        
        return (
            <div>
                <div className='page-header'> 
                    {(!commentId) && <h3>Create New Comment</h3>}
                    {(!!commentId) && <h3>Edit Comment</h3>}
                </div>
                <div>
                    <form>
                        <div className='form-group'>
                            <label>Author:</label>
                            <input type='text' className='form-control' id='author' onChange={this.onAuthorChange} value={author}/>
                        </div>
                        <div className='form-group'>
                            <label>Body:</label>
                            <textarea className='form-control' rows='5' id='body' onChange={this.onBodyChange} value={body}></textarea>
                        </div>
                        <div>
                            <span className='create-post-button'>
                                <label type='button' className='btn btn-primary' onClick={this.props.closeCommentModal}>Close</label>
                            </span>
                            <span className='create-post-button'>
                                <label type='button' className='btn btn-primary' onClick={this.submitComment}>Submit</label>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }  
}

const mapStateToProps = ({comments}) => ({
    comments
});

const mapDispatchToProps = (dispatch) => ({
    addComment: (comment) => dispatch(addCommentWitThunk(comment)),
    editComment: (comment) => dispatch(editCommentWitThunk(comment)),
    getComment: (commentId) => dispatch(getCommentWithThunk(commentId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentModal));