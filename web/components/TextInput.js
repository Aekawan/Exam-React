import React from 'react';

function TextInput(props) {

    return (
        <label>
            {props.label}
                <input
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange} />
        </label>
    );
}

export default TextInput;