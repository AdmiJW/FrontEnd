import React from 'react';
import PropTypes from 'prop-types';

import fetchPost from '../Redux/Actions/fetchPost';

import { connect } from 'react-redux';

const style = {
    textAlign: "center",
    color: "white"
}

function postJSX(post) {
    return (
        <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
}

class PostSection extends React.Component {
    constructor (props) {
        super(props);

        this.props.fetchPost();
    }

    render() {
        return (
            <div style={style} className='postSectionDiv'>
                <h1>Posts</h1>
                {this.props.postArray.map(e => postJSX(e) )}
            </div>
        );
    }

}

PostSection.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    postArray: PropTypes.array.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPost: () => {
            fetchPost(dispatch);
        }
    };
}

function mapStateToProps( store) {
    return { postArray: store.postRed.postArray };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSection);