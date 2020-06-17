import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux'

import {changeWeek, changeWeekStartDay, getVisibleHolidays} from './redux/calendar'

import Header from "./layout/Header";
import Body from "./layout/Body";
import WeekPicker from "./lib/WeekPicker";
import WeekDayPicker from "./lib/WeekDayPicker";
import Error from "./lib/Error";
import Loading from "./lib/Loading";

import './App.scss';
import Card from "./lib/Card";

interface RootState {
    calendar: any;
}

const mapState = (state: RootState) => ({
    loading: state.calendar.loading,
    error: state.calendar.error,
    currentWeek: state.calendar.currentWeek,
    weekStarts: state.calendar.weekStarts,
    weekStartsObj: state.calendar.weekStartsObj,
    holidays: getVisibleHolidays(state.calendar.holidays, state.calendar.currentWeek)
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
    }, []);

    const holidaysKeys = Object.keys(props.holidays);
    const cards = holidaysKeys.map(key => {
        const { day, date, events } = holidays[key];
        return <Card day={day} date={date} events={events} key={key} />
    });

    let renderable: JSX.Element;

    if (loading) {
        renderable = (<Loading />);
    } else if (error) {
        renderable = (<Error onRetry={() => onLoad()} error={error} />);
    } else {
        renderable = (<div className="cards">{cards}</div>);
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
