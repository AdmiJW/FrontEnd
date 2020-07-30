import React from 'react'


function LogoDiv(props) {
    return (
        <div className='logo'>

            { /* Clicking this will open a Facebook share with the link of the window's location */ }
            <a rel='noopener noreferrer' href={`http://www.facebook.com/sharer.php?u=${ encodeURIComponent(window.location.href) }`} target='_blank'>
                <img className='logo-pic' id='twitter' src='https://raw.githubusercontent.com/AdmiJW/Items/master/productLanding/facebook.png' alt='facebook logo'/>
            </a>

            { /* Clicking this will open a Twitter tweet with the link of the window's location and quote text */ }
            <a id='tweet-quote' rel='noopener noreferrer' href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(props.quote.quoteText)}&hashtags=RandomQuoteMachine&url=${encodeURIComponent( window.location.href )}`} 
                target="_blank">
                <img className='logo-pic' id='facebook' src='https://raw.githubusercontent.com/AdmiJW/Items/master/productLanding/twitter.png' alt='twitter logo'/>
            </a>
            
        </div>
    );
}



export default LogoDiv;