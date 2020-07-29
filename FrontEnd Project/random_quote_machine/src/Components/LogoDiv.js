import React from 'react'


function LogoDiv(props) {
    return (
        <div className='logo'>
            <a href={getFb() } target='_blank'>
                <img className='logo-pic' id='twitter' src='https://raw.githubusercontent.com/AdmiJW/Items/master/productLanding/facebook.png' />
            </a>
            <a href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(props.quote.quoteText)}&hashtags=RandomQuoteMachine&url=${encodeURIComponent( window.location.href )}`} 
                target="_blank">
                <img className='logo-pic' id='facebook' src='https://raw.githubusercontent.com/AdmiJW/Items/master/productLanding/twitter.png' />
            </a>
        </div>
    );
}

function getFb() {
    const href = encodeURIComponent('https://www.google.com');
    const redir = encodeURIComponent('https://www.google.com');
    return `https://www.facebook.com/dialog/share?app_id=310333046684484&display=popup&href=${href}&redirect_uri=${redir}`;
}

export default LogoDiv;