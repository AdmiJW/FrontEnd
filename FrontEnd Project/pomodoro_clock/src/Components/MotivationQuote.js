import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Actions from '../Redux/Actions/Actions';

import $ from 'jquery';



 //  Time interval to fetch quotes
const QUOTE_FETCH_TIMER = 60000;   



class MotivationQuote extends React.Component {

    //  As soon as this component mounts, begin the interval timer to fetch quote and update
    componentDidMount() {
        const { fetchingQuote, fetchedQuote } = this.props;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const target = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

        const fetchQuoteFunc = () => {
            fetchingQuote();        // Dispatch action to show spinner

            fetch(proxy + target)
            .then(e => e.text() )
            .then(text => {
                text = text.replace(/\\'/g, "'");  // Replace the single quotes in the Quote, else will be error
                return JSON.parse(text);
            })
            .then(quoteJSON => {
                const quoteDiv = $('#motiv-quote');
                if (quoteJSON.quoteText.length >= 130) {    //  If the quote is large text, append class lg-quote
                    quoteDiv.addClass('lg-quote');
                } else {
                    quoteDiv.removeClass('lg-quote');
                }

                fetchedQuote(quoteJSON);        //  Dispatch the newly fetched Quote to update store
            })
            .catch(err => {
                console.log(err);
                fetchedQuote({              //  In case of failure, dispatch a fake quote displaying error message
                    quoteText: "Quote Fetching Failed",
                    quoteAuthor: ""
                });
            });
        }

        //  When the component just newly mounted, immediately start fetching one new quote
        fetchQuoteFunc();

        //  Fetch the quote in fixed intervals
        window.setInterval( ()=> {
            fetchQuoteFunc();
        }, QUOTE_FETCH_TIMER);
            
    }


    render() {
        const { quote } = this.props;

        //  If there is no quote, apply the class to show the spinner
        const classNameMotiv = 'motiv' + ( (!quote)? ' loading': '');

        const quoteTxt = quote? quote.quoteText: '';
        const quoteAuthor = quote? quote.quoteAuthor === ''? 'Anonymous': quote.quoteAuthor: '';

        return (
            <div className={ classNameMotiv } id='motiv'>
                <i className="las la-spinner la-5x" id='spinner'></i>
                <p className='motiv-quote' id='motiv-quote'>{ quoteTxt }</p>
                <footer className='motiv-cite' id='motiv-cite'>{ quoteAuthor }</footer>
            </div>
        );
    }
}

//==========================================
//  PROPTYPES AND MAP TO PROPS
//==========================================
MotivationQuote.propTypes = {
    fetchingQuote: PropTypes.func.isRequired,
    fetchedQuote: PropTypes.func.isRequired,

    quote: PropTypes.object
}

function mapDispatchToProps( dispatch ) {
    return {
        fetchingQuote: () => {
            dispatch( Actions.quoteFetching() );
        },
        fetchedQuote: (quoteJSON) => {
            dispatch ( Actions.quoteFetched(quoteJSON) );
        }
    };
}

function mapStateToProps( store ) {
    return {
        quote: store.quote
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MotivationQuote);