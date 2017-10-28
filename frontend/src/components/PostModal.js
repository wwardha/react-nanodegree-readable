import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import {capitalizeFirstLetter, generateTimestamp} from '../utils/index';
import {addPostWitThunk, editPostWitThunk, getPostByIdWithThunk} from '../utils/readableThunk';
import uniqid from 'uniqid';
import {getPathArray} from '../utils/index';

class PostModal extends Component {  
    state = {
        category: null,
        author: '',
        title: '',
        body: ''
    };

    static propTypes = {
        closePostModal: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        posts: PropTypes.array.isRequired,
        addPost: PropTypes.func.isRequired,
        editPost: PropTypes.func.isRequired,
        getPost: PropTypes.func.isRequired
    };

    onSelectChange = (val) => {
        this.setState({ category: (val !== null) ? val.value : null});
    }

    onAuthorChange = (e) => {
        this.setState({ author: e.target.value });
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    onBodyChange = (e) => {
        this.setState({ body: e.target.value });
    }

    postMessage = (isSuccess, text) => {
        this.setState({message: {isSuccess, text}});
    }

    submitPost = () => {
        let post = {id: (!!this.props.postId) ? this.props.postId : uniqid(),
                    timestamp: generateTimestamp(),
                    category: this.state.category,
                    author: (this.state.author.trim() === '') ? 'anonymous' : this.state.author,
                    title: this.state.title,
                    body: this.state.body };

        if (!!this.props.postId) {
            this.props.editPost(post)
                .then(() => {
                    this.props.closePostModal();

                    let postId = this.getCurrentPostId();
                    if (!!postId)
                        this.props.history.push('/' + this.state.category + '/' + this.props.postId);        
                });
        }
        else {
            this.props.addPost(post)
                .then(() => {
                    this.props.closePostModal();                    
                });          
        }
    }

    getCurrentPostId = () => {
        let postId = '';
        let paths = getPathArray(this.props.location.pathname);
        
        if (paths.length > 1)  {
            postId = paths[2];
        }

        return postId;
    }

    getCurrentCategory = () => {
        let category = '';
        let paths = getPathArray(this.props.location.pathname);
        
        if (paths.length > 1)  {
            category = paths[1];
        }
     
        return (category.trim() === '') ? 'home': category;
    }
      
    getInitialCategoryValue = () => {
        const {categories} = this.props;

        let currentCategory = this.getCurrentCategory();
        let filterCategories = categories.filter((item) => item.path.trim() !== '');

        return (currentCategory === 'home') ? filterCategories[0].path : currentCategory;
    }

    componentDidMount () {
        let initialCategory = this.getInitialCategoryValue();
        const {posts, postId} = this.props;
        
        if (!!postId) {
            this.props.getPost(postId);
            
            let post = posts.filter((post) => post.id === postId)[0];
            this.setState({ category: post.category, author: post.author, title: post.title, body: post.body});            
        }
        else {
            this.setState({ category: initialCategory });            
        }
    }

    render() {
        const {author, title, body} = this.state;
        const {categories, postId} = this.props;

        let options = categories
            .filter((item) => item.path.trim() !== '')
            .reduce((obj, item) => {
                let arr = {};
                arr['label'] = capitalizeFirstLetter(item.name);
                arr['value'] = item.path;
            
                obj.push(arr);
                return obj;
            }, []);
        
        return (
            <div>
                <div className='page-header'> 
                    {(!postId) && <h3>Create New Post</h3>}
                    {(!!postId) && <h3>Edit Post</h3>}
                </div>
                <div>
                    <form>
                        <div className='form-group'>
                            <label>Category:</label>
                            <Select
                                id='category'
                                options={options}
                                value={this.state.category}
                                onChange={this.onSelectChange}
                                clearable={false}
                                deleteRemoves={false}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Author:</label>
                            <input type='text' className='form-control' id='author' onChange={this.onAuthorChange} value={author}/>
                        </div>
                        <div className='form-group'>
                            <label>Title:</label>
                            <input type='text' className='form-control' id='title' onChange={this.onTitleChange} value={title}/>
                        </div>
                        <div className='form-group'>
                            <label>Body:</label>
                            <textarea className='form-control' rows='5' id='body' onChange={this.onBodyChange} value={body}></textarea>
                        </div>
                        <div>
                            <span className='create-post-button'>
                                <label type='button' className='btn btn-primary' onClick={this.props.closePostModal}>Close</label>
                            </span>
                            <span className='create-post-button'>
                                <label type='button' className='btn btn-primary' onClick={this.submitPost}>Submit</label>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }  
}

const mapStateToProps = ({categories, posts}) => ({
     categories,
     posts
});

const mapDispatchToProps = (dispatch) => ({
    addPost: (post) => dispatch(addPostWitThunk(post)),
    editPost: (post) => dispatch(editPostWitThunk(post)),
    getPost: (postId) => dispatch(getPostByIdWithThunk(postId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostModal));