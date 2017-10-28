import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class InvalidCategory extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div>
                <div className='post-empty'>
                    <div className='container'>
                        <div className='same-height-row'>       
                            <div className='col-md-8'>
                                <div className='box same-height'>    
                                    Category <b>{this.props.category}</b> doesn't exists.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
  
export default withRouter(InvalidCategory);