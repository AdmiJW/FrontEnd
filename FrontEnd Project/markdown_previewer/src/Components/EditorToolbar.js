import React from 'react';
import PropTypes from 'prop-types';

import sounds from './sound';


class EditorToolbar extends React.Component {
    constructor (props) {
        super(props);

        this.iconClicked = this.iconClicked.bind(this);
    }

    //  Called when one of the icon in toolbar is clicked. Will call the editor component's insert text method
    iconClicked(e) {
        sounds.playSelect();
        const id = e.target.id;
        const { toolClick } = this.props;
        const getInsertText = {
            'bold-text': '**Strong Text**',
            'italic-text': '_Emphasized Text_',
            'blockquote-text': '> Block Quote',
            'link-text': '[Link](http://)',
            'picture-text': '![Alt Text](http://)',
            'code-text': '`Inline Code`',
            'list-text': '- List Item',
            'ollist-text': '1. List Item'
        }

        toolClick(null, getInsertText[id] );
    }

    render() {
        return (
            <div className='editor-toolbar' id='editor-toolbar'>
                <div>
                    <abbr title='Bold'> <i className='fa fa-bold' id='bold-text' 
                        onClick={ this.iconClicked } ></i> </abbr>
                    <abbr title='Italic'> <i className='fa fa-italic' id='italic-text'
                        onClick={ this.iconClicked }></i> </abbr>
                </div>
                <div>
                    <abbr title='Block Quote'> <i className='fa fa-quote-left' id='blockquote-text'
                        onClick={ this.iconClicked }></i> </abbr>
                    <abbr title='Link'> <i className='fa fa-link' id='link-text'
                        onClick={ this.iconClicked }></i> </abbr>
                    <abbr title='Picture'> <i className='fa fa-image' id='picture-text'
                        onClick={ this.iconClicked }></i> </abbr>
                    <abbr title='Code Block'> <i className='fa fa-code' id='code-text'
                        onClick={ this.iconClicked }></i> </abbr>
                </div>
                <div>
                    <abbr title='Unordered List'> <i className='fa fa-list' id='list-text'
                        onClick={ this.iconClicked }></i> </abbr>
                    <abbr title='Ordered List'> <i className='fa fa-list-ol' id='ollist-text'
                        onClick={ this.iconClicked }></i> </abbr>
                </div>
            </div>
        )
    }

}

EditorToolbar.propTypes = {
    toolClick: PropTypes.func.isRequired
}

export default EditorToolbar;