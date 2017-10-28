import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class NavBar extends Component {      
    static propTypes = {
        refreshStore: PropTypes.func.isRequired
    };

    viewCategory = (category) => {
        this.props.refreshStore(category);
    }

    render() {
        const {categories, posts} = this.props;
        
        if ((categories.length === 0) || (posts.length === 0))
        return (null);

        return (
            <div id='navbar'>  
                <div className='container'>
                    <div className='col-md-6'>
                        <ul className='menu'>
                            {categories.map((item)=>(
                                <li key={item.name}>
                                    <Link to={'/' + item.path} onClick={()=>{this.viewCategory(item.name);}}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>         
            </div>
        );
    }
}

const mapStateToProps = ({categories, posts}) => ({
    categories,
    posts
});
  
  
export default withRouter(connect(mapStateToProps)(NavBar));