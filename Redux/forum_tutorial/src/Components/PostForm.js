import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import addPost from '../Redux/Actions/addPost';

const style = {
    backgroundColor: "#34495e",
    color: "white",
    padding: "50px 5vw",
    margin: "auto",
}

const formStyle = (height) => ({
    minHeight: height,
    width: "100%"
});

class PostForm extends React.Component {
    constructor (props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    state = {
        title: '',
        desc: ''
    };

    onSubmit(e) {
        e.preventDefault();
    
        this.props.submitPost( this.state.title, this.state.desc );
        this.setState( { title: '', desc: '' } );
        
    }

    onChange(e) {
        let change;
        if (e.target.id === 'formTitle')
            change = { title: e.target.value };
        else
            change = { desc: e.target.value };
        this.setState(change);
    }

    render() {
        return (
            <div style={style} className='formDiv'>
                <h2>Create New Post</h2>
                <form id='postForm' onSubmit={this.onSubmit}>
                    <label htmlFor='formTitle'>Title: </label> <br />
                    <input style={formStyle("20px")} type='text' name='title' id='formTitle'
                     placeholder='Enter Post Title...' onChange={this.onChange} value={this.state.title} /> <br/>
                    <label htmlFor='formText'>Description: </label> <br/>
                    <textarea style={formStyle("60px")} name='description' id='formText' 
                    placeholder='Enter Post Description...' onChange={this.onChange} value={this.state.desc} /> <br/>

                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }

}

PostForm.propTypes = {
    submitPost: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        submitPost: function(title,desc) {
            dispatch( addPost(title, desc) );
        }
    }
}

export default connect(null, mapDispatchToProps)(PostForm);