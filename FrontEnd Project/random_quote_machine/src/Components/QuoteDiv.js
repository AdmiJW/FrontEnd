import React from 'react';

function QuoteDiv(props) {
    const { quoteText, quoteAuthor } = props.quote;

    return (
        <blockquote className='blockquote' style={
            props.fetching ? { opacity: 0 } : { opacity: 1 }
        } >
            <p id='text'>{quoteText}</p>
            <footer id='author' className='blockquote-footer'>
                {(quoteAuthor) ? quoteAuthor : 'Anonymous'}
            </footer>
        </blockquote>
    )
}

export default QuoteDiv;