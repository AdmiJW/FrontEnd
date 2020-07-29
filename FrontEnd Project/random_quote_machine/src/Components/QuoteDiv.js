import React from 'react';

class QuoteDiv extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { quoteText, quoteAuthor } = this.props.quote;
        return (
            <blockquote className='blockquote' style={ 
                this.props.fetching? { opacity: 0}: {opacity: 1}
                } >
                <p>{quoteText}</p>
                <footer className='blockquote-footer'>
                    { (quoteAuthor)? quoteAuthor: 'Anonymous' }
                </footer>
            </blockquote>
        );
    }

}

export default QuoteDiv;