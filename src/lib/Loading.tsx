import React from "react";
import './Loading.scss';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': any;
        }
    }
}

function Loading () {
    return (
        <div className="loading">
            <h3 className="loading__text">Loading...</h3>
        </div>
    );
}

export default Loading;
