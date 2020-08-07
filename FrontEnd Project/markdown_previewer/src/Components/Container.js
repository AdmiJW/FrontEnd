import React from 'react';

import Editor from './Editor';
import Viewer from './Viewer';
import ToolBar from './ToolBar';

/*
    Main Container. Contains All the components
*/

class Container extends React.Component {

    render() {
        ////////////////////JSX///////////////////
        return(
            <div className='container'>
                <Editor />
                <Viewer />
                <ToolBar />
            </div>
        );
        ////////////////////JSX///////////////////
    }
}

export default Container;