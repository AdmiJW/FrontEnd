import React from 'react';
import PropTypes from 'prop-types';


function Button({ content, type, size, onClick }) {
    type = type.toLowerCase();
    size = size.toLowerCase();

    const classNames = ['px-4', 'py-2', 'rounded', 'text-white', 'transition'];

    // Different types of buttons
    if (type === 'primary') classNames.push('bg-blue-500', 'hover:bg-blue-600');
    else if (type === 'secondary') classNames.push('bg-gray-500', 'hover:bg-gray-600');
    else if (type === 'success') classNames.push('bg-green-500', 'hover:bg-green-600');
    else if (type === 'danger') classNames.push('bg-red-500', 'hover:bg-red-600');
    else if (type === 'warning') classNames.push('bg-orange-500', 'hover:bg-orange-600');

    // Different sizes of buttons
    if (size === 'sm') classNames.push('text-sm');
    else if (size === 'lg') classNames.push('text-lg');
    else if (size === 'xl') classNames.push('text-xl');
    else if (size === '2xl') classNames.push('text-2xl');


    return (
        <button 
            type='button'
            className={ classNames.join(' ') }
            onClick={ onClick }
        >
            { content }
        </button>
    );
}


Button.propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
    onClick: PropTypes.func.isRequired,
};


export default Button;