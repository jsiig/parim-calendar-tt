import React, { Fragment, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
    changeWeek,
    changeWeekStartDay,
    getWeek
} from './redux/calendar';
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

const mapState = (state: RootState) => ({
    loading: state.calendar.loading,
    error: state.calendar.error,
    currentWeek: state.calendar.currentWeek,
    weekStarts: state.calendar.weekStarts,
    holidays: getWeek(state.calendar.holidays, state.calendar.currentWeek)
});

const mapDispatch = (dispatch: any) => ({
    onWeekChange: (direction: string) => dispatch(changeWeek(direction)),
    onWeekDayChange: (value: number) => dispatch(changeWeekStartDay(value)),
    onLoad: () => dispatch(changeWeek())
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux) {
    const {
        holidays,
        currentWeek,
        weekStarts,
        loading,
        error,
        onLoad,
        onWeekChange,
        onWeekDayChange
    } = props;


    useEffect(() => {
        onLoad();
    }, []); // eslint-disable-line

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

    const noEvents = (
        holidaysKeys.filter((key: string) => holidays[key].events.length > 0).length ?
            '' : <div className="no-events">No holidays to display for this week :(</div>
    );

    let renderable: JSX.Element;

    if (loading) {
        renderable = (<Loading />);
    } else if (error) {
        renderable = (<Error onRetry={() => onLoad()} error={error} />);
    } else {
        renderable = (<div className="cards">{cards}{noEvents}</div>);
    }


    return (
        <div className="app">
            <Header />
            <Body>
                <div className="controls">
                    <WeekPicker currentWeek={currentWeek} onChange={(dir: string) => onWeekChange(dir)} />
                    <WeekDayPicker value={weekStarts} onChange={onWeekDayChange}/>
                </div>
                {renderable}
            </Body>
        </div>
    );
}


export default connector(App)
