import React from 'react';

import QuoteDiv from './QuoteDiv';
import LogoDiv from './LogoDiv';

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
        currentQuote: {},
        fetching: false
    }

    quoteFetched(quote) {
        //Fetched the same quote again. Refetch...
        if (this.state.currentQuote.quoteAuthor == quote.quoteAuthor ) {
            this.fetchQuote();
        }
        else {
            //Has to check if the current quote is empty or not. Without this code, the app when launched, will
            // add an empty object to the quoteHistory
            this.setState(state => ({
                quoteHistory: (state.currentQuote.hasOwnProperty("quoteAuthor")? 
                    [...state.quoteHistory, state.currentQuote]: state.quoteHistory),
                currentQuote: quote,
                fetching: false
            }) );
        }
    }

    fetchQuote() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const target = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

        this.setState({fetching: true} );
        fetch(proxy + target)
        .then(e => e.text() )
        .then( e => {
            e = e.replace(/\\\'/g, "'");    //Escape Quotes need to be replaced, or JSON won't parse correctly
            return JSON.parse(e);
        })
        .then(e => this.quoteFetched(e) )
        .catch( err => console.log(err, "OOPS") );
    }

    prevQuote() {
        //Set the last element of the quoteHistory as current Quote, and remove it from the quoteHistory
        this.setState(state => {
            const len = state.quoteHistory.length;
            return {
                quoteHistory: state.quoteHistory.slice(0, len - 1),
                currentQuote: state.quoteHistory[len - 1]
            };
        });
        this.props.changeBg();
    }

    nextQuote() {
        this.fetchQuote();
        
        this.props.changeBg();
    }

    render() {
        const { fetching } = this.state;
        return (
            <div className='quote'>
                <button type='button' className='arrow-btn' id='btn-left' onClick={this.prevQuote} disabled={this.state.quoteHistory.length == 0}>
                    <i className="fas fa-caret-left"></i>
                </button>
                <div className='quote-mid'>
                    <i className="fas fa-spinner" style={ 
                         fetching? { opacity: 1}: {opacity: 0}
                         } >
                    </i>
                    <QuoteDiv quote={this.state.currentQuote} fetching={fetching} />
                    <LogoDiv quote={this.state.currentQuote}/>
                </div>
                <button type='button' className='arrow-btn' id='btn-right' onClick={this.nextQuote}>
                    <i className="fas fa-caret-right"></i>
                </button>
            </div>
        );
    }

}

export default QuoteWrapper;