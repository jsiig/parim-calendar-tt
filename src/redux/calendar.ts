import typedAction from "./lib/typedAction";
import { Dispatch, AnyAction } from 'redux';
import api from "../api";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import { AxiosResponse } from "axios";

dayjs.extend(isoWeek);

// @ts-ignore
window.dayjs = dayjs;

type CalendarState = {
    holidays: object;
    loading: boolean;
    weekStarts: number;
    error: string | null;
    currentWeek: Dayjs;
};


const initialState: CalendarState = {
    holidays: {},
    loading: true,
    currentWeek: dayjs().startOf('isoWeek').isoWeekday(1),
    weekStarts: 1,
    error: null
};



export const changeWeekStartDay = (day: number) => {
    return (dispatch: Dispatch<AnyAction>) => {

    }
}


export const loadCalendarItems = (dateRangeStart: string, dateRangeEnd: string) => {
    return (dispatch: Dispatch<any>) => {
        api.getHolidays(dateRangeStart, dateRangeEnd).then(data => {
            console.log(data)
            dispatch(setEvents(data));
            dispatch(setError(null));
        }).catch(error => {
            dispatch(setError(error));
        });
    };
};

export const changeWeek = (direction: string) => {
    return (dispatch: Dispatch<any>, getState: Function) => {
        const { calendar } = getState();
        const { weekStarts, currentWeek } = calendar;

        const previousWeekStart = currentWeek.subtract(1, 'week')
            .startOf('isoWeek')
            .isoWeekday(weekStarts);
        const nextWeekStart = currentWeek.add(1, 'week')
            .startOf('isoWeek')
            .isoWeekday(weekStarts);

        const week = direction === 'NEXT' ? nextWeekStart : previousWeekStart;

        dispatch(setWeek(week));

        const startFormatted = week.format('YYYY-MM-DD');
        const endFormatted = week.endOf('isoweek').format('YYYY-MM-DD');

        return dispatch(loadCalendarItems(startFormatted, endFormatted));
    };
};

const setEvents = (events: any) => {
    const { holidays } = events;
    return typedAction('calendar/SET_EVENTS', holidays);
};

export const setWeekStart = (day: number) => {
    console.log(day)
    return typedAction('calendar/SET_WEEK_START', day);
};

export const setError = (error: string | null) => {
    return typedAction('calendar/SET_ERROR', error)
};

export const setWeek = (week: Dayjs) => {
    return typedAction('calendar/SET_WEEK', week)
}


type CalendarAction = ReturnType<typeof setEvents | typeof setWeekStart | typeof setError | typeof setWeek>;
export function calendarReducer(
    state = initialState,
    action: CalendarAction
): CalendarState {
    switch (action.type) {
        case 'calendar/SET_EVENTS':
            return {
                ...state,
                holidays: {
                    ...state.holidays,
                    ...action.payload
                },
                loading: false
            };
        case 'calendar/SET_WEEK_START':
            return {
                ...state,
                weekStarts: action.payload
            };
        case 'calendar/SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'calendar/SET_WEEK':
            return {
                ...state,
                currentWeek: action.payload
            };
        default:
            return state;
    }
}
