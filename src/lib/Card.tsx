import React from "react";
import classNames from "classnames";

import "./Card.scss"

interface Event {
    type: string;
    name: string;
}

interface Props {
    day: string;
    date: string;
    events: Array<Event>;
}

function Card (props: Props) {
    const { events, day, date } = props;
    const isPublic = events.filter(e => e.type === 'public').length;
    const isFolk = !isPublic && events.filter(e => e.type === 'folk').length;

    const classes = {
        'card--none': !events.length,
        'card--folk': events.length && isFolk,
        'card--public': events.length && isPublic
    };

    return (
        <div className={classNames("card", classes)}>
            <div className="card__header">
                <h3 className="card__day">{day}</h3>
                <h4 className="card__date">{date}</h4>
            </div>
            <div className="card__body">
                {   events.length ?
                    events.map((event, index) => (<h5 className="card__event" key={index}>{event.name}</h5>))
                    : (<h5 className="card__event">No holidays</h5>)
                }
            </div>
        </div>
    )
}

export default Card;
