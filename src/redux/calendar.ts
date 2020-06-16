import typedAction from "./lib/typedAction";
import { Dispatch, AnyAction } from 'redux';
import api from "../api";

type CalendarState = {
    holidays: object;
    loading: boolean;
    weekStarts: string;
    error: string | null;
};

const initialState: CalendarState = {
    holidays: {},
    loading: true,
    weekStarts: 'monday',
    error: null
};

const setEvents = (events: object) => {
    return typedAction('calendar/SET_EVENTS', events);
};

export const setWeekStart = (day: string) => {
    return typedAction('calendar/SET_WEEK_START', day);
};

export const setError = (error: string | null) => {
    return typedAction('calendar/SET_ERROR', error)
};

export const loadCalendarItems = (dateRangeStart: string, dateRangeEnd: string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        return api.getHolidays(dateRangeStart, dateRangeEnd).then(data => {
            dispatch(setEvents(data));
            dispatch(setError(null));
        }).catch(error => {
            dispatch(setError(error));
        });
    };
};

type CalendarAction = ReturnType<typeof setEvents | typeof setWeekStart | typeof setError>;

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
        default:
            return state;
    }
}
