import typedAction from "./lib/typedAction";
import { Dispatch } from 'redux';
import api from "../api";

import dayjs, { Dayjs } from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const KEY_FORMAT = 'YYYY-MM-DD';

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

const keysSince = (since: Dayjs): Dayjs[] => {
    const existingKeys: Dayjs[] = [];
    let i;

    for (i = 0; i < 7; i++) {
        existingKeys.push(since.add(i, 'day'));
    }

    return existingKeys;
};

export const getWeek = (holidays: any, since: Dayjs) => {
    const keys = keysSince(since).map(key => key.format(KEY_FORMAT));

    const week: any = {};

    keys.forEach(key => {
        if (holidays[key]) week[key] = holidays[key];
    });

    return week;
};

export const changeWeekStartDay = (day: number) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(setWeekStart(day));
        dispatch(changeWeek());
    }
};

export const loadCalendarItems = (dateRangeStart: Dayjs, dateRangeEnd: Dayjs) => {
    return async (dispatch: Dispatch<any>, getState: Function) => {
        dispatch(startLoading());

        const startFormatted = dateRangeStart.format(KEY_FORMAT);
        const endFormatted = dateRangeEnd.format(KEY_FORMAT);
        const storeHolidays = getState().calendar.holidays;
        const existingKeys: Dayjs[] = keysSince(dateRangeStart);

        // If we already have all the data for this view,
        // let's not do any more API requests
        if (
            existingKeys.filter(
                item => storeHolidays[item.format(KEY_FORMAT)]
            ).length === 7
        ) {
            return dispatch(finishLoading());
        }

        try {
            const { data } = await api.getHolidays(startFormatted, endFormatted);
            const { holidays } = data;
            const storableHolidays: any = {};

            // Creates keys in store for all days,
            // including ones without any holidays
            existingKeys.forEach((item: Dayjs) => {
                const formattedKey = item.format(KEY_FORMAT);
                const day = item.format('dddd');
                const date = item.format('MMM D');

                storableHolidays[formattedKey] = {
                    events: holidays[formattedKey] ? holidays[formattedKey] : [],
                    day,
                    date
                };
            });


            dispatch(setHolidays(storableHolidays));
            dispatch(setError(null));
        } catch(e) {
            if (e.response) dispatch(setError(e.response.data.reason));
            else dispatch(setError(''));
        } finally {
            dispatch(finishLoading());
        }
    };
};

export const changeWeek = (direction?: string) => {
    return (dispatch: Dispatch<any>, getState: Function) => {
        const { calendar } = getState();
        const { weekStarts, currentWeek } = calendar;

        const currentWeekStart = currentWeek.startOf('isoWeek').isoWeekday(weekStarts);

        const previousWeekStart = currentWeek.subtract(1, 'week')
            .startOf('isoWeek')
            .isoWeekday(weekStarts);

        const nextWeekStart = currentWeek.add(1, 'week')
            .startOf('isoWeek')
            .isoWeekday(weekStarts);

        let start = currentWeekStart;
        if (direction === 'NEXT') start = nextWeekStart;
        else if (direction === 'PREV') start = previousWeekStart;

        dispatch(setWeek(start));

        const end = start.endOf('isoWeek');

        return dispatch(loadCalendarItems(start, end));
    };
};

const setHolidays = (events: object) => {
    return typedAction('calendar/SET_HOLIDAYS', events);
};

export const setWeekStart = (day: number) => {
    return typedAction('calendar/SET_WEEK_START', day);
};

export const setError = (error: string | null) => {
    return typedAction('calendar/SET_ERROR', error)
};

export const setWeek = (week: Dayjs) => {
    return typedAction('calendar/SET_WEEK', week)
};

export const startLoading = () => {
    return typedAction('calendar/START_LOADING')
};

export const finishLoading = () => {
    return typedAction('calendar/FINISH_LOADING')
};

type CalendarAction = ReturnType<typeof setHolidays |
    typeof setWeekStart |
    typeof setError |
    typeof setWeek |
    typeof startLoading |
    typeof finishLoading>;

export function calendarReducer(
    state = initialState,
    action: CalendarAction
): CalendarState {
    switch (action.type) {
        case 'calendar/SET_HOLIDAYS':
            return {
                ...state,
                holidays: {
                    ...state.holidays,
                    ...action.payload
                }
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
        case 'calendar/START_LOADING':
            return {
                ...state,
                loading: true
            };
        case 'calendar/FINISH_LOADING':
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
