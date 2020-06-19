import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeWeek, changeWeekStartDay, getWeek } from './redux/calendar';
import { RootState } from "./redux";

import Header from "./layout/Header";
import Body from "./layout/Body";
import WeekPicker from "./lib/WeekPicker";
import WeekDayPicker from "./lib/WeekDayPicker";
import Error from "./lib/Error";
import Loading from "./lib/Loading";
import CardEllipsis from "./lib/CardEllipsis";

import './App.scss';
import Card from "./lib/Card";

function Cards ({ holidays }: any) {
    const holidaysKeys = Object.keys(holidays);
    const onlyHolidaysKeys = holidaysKeys.filter(key => holidays[key].events.length);

    const cards = holidaysKeys.map(key => {
        const { day, date, events } = holidays[key];

        const lastWithEvents = onlyHolidaysKeys.length - 1 === onlyHolidaysKeys.indexOf(key);
        const adjacentToNext = onlyHolidaysKeys.indexOf(holidaysKeys[holidaysKeys.indexOf(key) + 1]) !== -1;

        return (
            <Fragment key={key}>
                <Card day={day} date={date} events={events} dateUnformatted={key} />
                {
                    events.length && !lastWithEvents && !adjacentToNext ? <CardEllipsis /> : ''
                }
            </Fragment>
        );
    });

    return (
        <>
            {cards}
        </>
    )
}

function App() {
    const dispatch = useDispatch()
    const holidays = useSelector((state: RootState) => getWeek(state.calendar.holidays, state.calendar.currentWeek))
    const { currentWeek, weekStarts, loading, error } = useSelector((state: RootState) => state.calendar)

    useEffect(() => {
        dispatch(changeWeek());
    }, []); // eslint-disable-line

    let renderable: JSX.Element;
    if (loading) {
        renderable = (
            <Loading />
        );
    } else if (error) {
        renderable = (
            <Error onRetry={() => dispatch(changeWeek())} error={error} />
        );
    } else {
        renderable = (
            <div className="cards">
                <Cards holidays={holidays} />
            </div>
        );
    }

    return (
        <div className="app">
            <Header />
            <Body>
                <div className="controls">
                    <WeekPicker currentWeek={currentWeek} onChange={(dir: string) => dispatch(changeWeek(dir))} />
                    <WeekDayPicker value={weekStarts} onChange={dispatch(changeWeekStartDay)} />
                </div>
                {renderable}
            </Body>
        </div>
    );
}


export default App;
