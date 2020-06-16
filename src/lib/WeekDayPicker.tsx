import React from "react";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Props {
    value: number;
    onChange: Function;
}

function WeekDayPicker (props: Props) {
    const { value, onChange } = props;

    return (
        <div className="week-day-picker">
            <label>
                My week starts on a...
                <select value={value} onChange={event => onChange(event.target.value)}>
                    {daysOfWeek.map((weekDay, weekDayIndex) => <option value={weekDayIndex + 1} key={weekDayIndex}>{weekDay}</option>)}
                </select>
            </label>
        </div>
    );
}

export default WeekDayPicker;
