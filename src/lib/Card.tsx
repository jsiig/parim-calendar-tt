import React from "react";
import classNames from "classnames";
import dayjs from "dayjs";

import "./Card.scss"

interface Event {
    type: string;
    name: string;
}

interface Props {
    day: string;
    date: string;
    dateUnformatted: string;
    events: Array<Event>;
}

function Card (props: Props) {
    const { events, day, date, dateUnformatted } = props;
    const isPublic = events.filter(e => e.type === 'public').length;
    const isFolk = !isPublic && events.filter(e => e.type === 'folk').length;
    const today = dayjs().isSame(dateUnformatted, 'day');

    const classes = {
        'card--none': !events.length,
        'card--folk':  isFolk,
        'card--public': isPublic,
        "card--today": today
    };

    const eventClasses = (event: Event) => ({
        'card__event--public': event.type === 'public',
        'card__event--folk': event.type === 'folk'
    });

    const renderEvents = (
        events.length ?
            events.map(
                (event, index) => (
                    <h5 className={classNames("card__event", eventClasses(event))} key={index}>{event.name}</h5>
                )
            )
            : (<h5 className="card__event">No holidays</h5>)
    );

    return (
        <div className={classNames("card__container", classes)}>
            <div className="card">
                <div className="card__header">
                    <h3 className="card__day">{day}</h3>
                    <h4 className="card__date">{date}</h4>
                    { isPublic ? <ion-icon name="ice-cream-outline"></ion-icon> : '' }
                    { isFolk ? <ion-icon name="flower-outline"></ion-icon> : '' }
                </div>
                <div className="card__body">
                    {renderEvents}
                </div>
            </div>
        </div>
    );
}

export default Card;
