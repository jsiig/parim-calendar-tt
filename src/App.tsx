import React from 'react';
import { connect, ConnectedProps } from 'react-redux'

import { changeWeek, setWeekStart } from './redux/calendar'

import Header from "./layout/Header";
import Body from "./layout/Body";
import WeekPicker from "./lib/WeekPicker";
import WeekDayPicker from "./lib/WeekDayPicker";

import './App.scss';
import Card from "./lib/Card";

interface RootState {
    calendar: any;
    weekStarts: number;
    holidays: object;
}

const mapState = (state: RootState) => ({
    currentWeek: state.calendar.currentWeek,
    weekStarts: state.calendar.weekStarts,
    holidays: state.calendar.holidays
});

const mapDispatch = (dispatch: any) => {
    return {
        onWeekChange: (direction: string) => dispatch(changeWeek(direction)),
        onWeekDayChange: (value: number) => dispatch(setWeekStart(value))
    }
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function App(props: Props) {
    const { holidays, currentWeek, weekStarts } = props;
    const holidaysKeys = Object.keys(props.holidays);

    return (
        <div className="app">
            <Header />
            <Body>
                <WeekPicker currentWeek={currentWeek} onChange={(dir: string) => props.onWeekChange(dir)} />
                <WeekDayPicker value={weekStarts} onChange={props.onWeekDayChange}/>
                <div className="cards">
                    {
                        holidaysKeys.map(key => {
                            const { events } = holidays[key]
                            return(<Card day="Testday" date="testdate" events={events} key={key} />)
                        })
                    }
                    <Card day="Tuesday" date="June 17" events={
                        [{name: 'Test Event', type: 'public'}]
                    }/>
                </div>
            </Body>
        </div>
    );
}


export default connector(App)
