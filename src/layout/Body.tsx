import React from 'react';
import './Body.scss';

type BodyProps = {
    children: any | any[];
}

function Body(props: BodyProps) {
    return (
        <div className="body">
            {props.children}
        </div>
    );
}

export default Body;
