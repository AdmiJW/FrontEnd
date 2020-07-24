import React from 'react';

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { title: '', body: '' };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState( { [e.target.name]: e.target.value } );
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            title: this.state.title,
            body: this.state.body
        };

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( post)
        })
        .then(e => e.json() )
        .then(e => console.log(e) );
    }


    render() {
        return (
            <div>
                <h2>Create New Post</h2>
                <form  onSubmit={this.onSubmit} >
                    <label>Title: </label> <br/>
                    <input type='text' name='title' value={this.state.title} onChange={this.onChange} placeholder='Enter title...' />
                    <br />
                    <label>Message: </label> <br />
                    <textarea name='body' value={this.state.body} onChange={this.onChange} placeholder='Enter message...'></textarea>

                    <br />
                    <input type='submit' />
                </form>
            </div>
        );
    }


}


export default PostForm;