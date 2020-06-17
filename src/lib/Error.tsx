import React from "react";
import './Error.scss';

interface Props {
    error?: string;
    onRetry: Function
}

function Error (props: Props) {
    const { error, onRetry } = props;
    return (
        <div className="error">
            <h3>Oh no, something went wrong!</h3>
            { error && error.length ? (<h4>API Returned: {error}</h4>) : ''}
            <button className="error__retry" onClick={() => onRetry()}>Try again?</button>
        </div>
    );
}

export default Error;
