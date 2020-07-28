import React from 'react';

class QuoteWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.prevQuote = this.prevQuote.bind(this);
        this.nextQuote = this.nextQuote.bind(this);
        this.fetchQuote = this.fetchQuote.bind(this);
        this.quoteFetched = this.quoteFetched.bind(this);

    }

    componentDidMount() {
        this.nextQuote();
    }

    state = {
        quoteHistory: [],
        currentQuote: {}
    }

    quoteFetched(quote) {
        console.log(quote);
    }

    fetchQuote() {
        let quoteFetched = undefined;
        fetch("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en" )
        .then(e => e.json() )
        .then(e => this.quoteFetched(e) )
        .catch( err => console.log(err) );
    }

    prevQuote() {
        if (this.state.quoteHistory.length === 0) {
            this.nextQuote();
        }
        else {
            this.props.changeBg();
        }
    }

    nextQuote() {
        this.fetchQuote();
        this.setState( state => {
            if (state.quoteHistory.length >= 50) {

            }
            return state
        });
        this.props.changeBg();
    }

    render() {
        return (
            <div className='quote'>
                <button type='button' className='arrow-btn' id='btn-left' onClick={this.prevQuote}>
                    <i className="fas fa-caret-left"></i>
                </button>
                <div className='quote-mid'>

                </div>
                <button type='button' className='arrow-btn' id='btn-right' onClick={this.nextQuote}>
                    <i className="fas fa-caret-right"></i>
                </button>
            </div>
        );
    }

}

export default QuoteWrapper;