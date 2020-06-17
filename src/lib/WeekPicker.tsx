import React from "react";
import './WeekPicker.scss';
import { Dayjs } from "dayjs";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': any;
        }
    }
}

interface Props {
    onChange: Function;
    currentWeek: Dayjs;
}

function WeekPicker (props: Props) {
    return (
        <div className="week-picker">
            <button className="week-picker__button" onClick={() => props.onChange('PREV')}><ion-icon name="chevron-back-outline"></ion-icon></button>
            <div className="week-picker__week-container">
                <h4 className="week-picker__title">Week of</h4>
                <h5 className="week-picker__week">{props.currentWeek.format('dddd MMMM D, YYYY')}</h5>
            </div>
            <button className="week-picker__button" onClick={() => props.onChange('NEXT')}><ion-icon name="chevron-forward-outline"></ion-icon></button>
        </div>
    );
}

export default WeekPicker;
