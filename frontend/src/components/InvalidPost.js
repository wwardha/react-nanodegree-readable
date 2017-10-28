import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class InvalidPost extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div>
                <div className='post-empty'>
                    <div className='container'>
                        <div className='same-height-row'>       
                            <div className='col-md-8'>
                                <div className='box same-height'>    
                                    Post <b>{this.props.postId}</b> was not found or has been deleted.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
  
export default withRouter(InvalidPost);