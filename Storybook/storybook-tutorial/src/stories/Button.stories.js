import React from 'react';

import Button from '../components/Button';

export default {
    title: 'Component/Button',
    component: Button,

    // one use of argTypes is to tell storybook that an property shall be event handler (Action)
    // Note that Storybook automatically generate the callback function. We do not need to pass it to args anymore.
    argTypes: {
        onClick: { action: 'Button clicked' },
    }
}


function Template(args) {
    return <Button {...args} />;
}


export const Primary = Template.bind({});
Primary.args = {
    content: 'Primary',
    type: 'primary',
    size: 'md',
};


export const Secondary = Template.bind({});
Secondary.args = {
    content: 'Secondary',
    type: 'secondary',
    size: 'md',
};


export const Success = Template.bind({});
Success.args = {
    content: 'Success',
    type: 'success',
    size: 'md',
};


export const Danger = Template.bind({});
Danger.args = {
    content: 'Danger',
    type: 'danger',
    size: 'md',
};


export const Warning = Template.bind({});
Warning.args = {
    content: 'Warning',
    type: 'warning',
    size: 'md',
};


export const Large = Template.bind({});
Large.args = {
    content: 'Large',
    type: 'primary',
    size: 'lg',
};


export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
    content: 'Extra Large',
    type: 'primary',
    size: 'xl',
};


export const DoubleExtraLarge = Template.bind({});
DoubleExtraLarge.args = {
    content: 'Double Extra Large',
    type: 'primary',
    size: '2xl',
};


export const Small = Template.bind({});
Small.args = {
    content: 'Small',
    type: 'primary',
    size: 'sm',
};