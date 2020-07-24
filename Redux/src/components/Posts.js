import React from 'react';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {posts: [] };

        this.getFormBody = this.getFormBody.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then( e => e.json() )
        .then( e => this.setState( {posts: e} ) );
    }

    getFormBody(post) {
        const style = { backgroundColor: '#ccc', margin: '30px' };

        return (
            <div key={post.id} style={style}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <hr/>
            </div>
        );
    }

    render() {
        const arrDiv = this.state.posts.map( e => this.getFormBody(e) );
        return (
            <div>
                <h1>Posts</h1>
                {arrDiv}
            </div>
        );
    }

}

export default Posts;