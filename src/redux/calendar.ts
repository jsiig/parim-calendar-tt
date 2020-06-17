import typedAction from "./lib/typedAction";
import { Dispatch, AnyAction } from 'redux';
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



export const changeWeekStartDay = (day: number) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(setWeekStart(day));
        dispatch(changeWeek());
    }
}

const keysFrom = (since: Dayjs): Dayjs[] => {
    const existingKeys: Dayjs[] = [];
    let i;

    for (i = 0; i < 7; i++) {
        existingKeys.push(since.add(i, 'day'));
    }

    return existingKeys;
}

export const getVisibleHolidays = (holidays: any, since: Dayjs) => {
    const keys = keysFrom(since).map(key => key.format(KEY_FORMAT));

    const visibleHolidays: any = {};

    keys.forEach(key => {
        if (holidays[key]) visibleHolidays[key] = holidays[key];
    });

    return visibleHolidays;
}


export const loadCalendarItems = (dateRangeStart: Dayjs, dateRangeEnd: Dayjs) => {
    return async (dispatch: Dispatch<any>, getState: Function) => {
        dispatch(startLoading());

        const startFormatted = dateRangeStart.format(KEY_FORMAT);
        const endFormatted = dateRangeEnd.format(KEY_FORMAT);
        const storeHolidays = getState().calendar.holidays;
        const existingKeys: Dayjs[] = keysFrom(dateRangeStart);

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

            existingKeys.forEach((item: Dayjs) => {
                const formattedKey = item.format(KEY_FORMAT);
                const day = item.format('dddd');
                const date = item.format('MMM D');

                storableHolidays[formattedKey] = {
                    events: holidays[formattedKey] ? holidays[formattedKey] : [],
                    day,
                    date
                }
            });


            dispatch(setEvents({ holidays: storableHolidays }));
            dispatch(setError(null));
        } catch(e) {
            if (e.response) dispatch(setError(e.response.data.reason));
            else dispatch(setError(''))
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

        const end = start.endOf('isoweek');

        return dispatch(loadCalendarItems(start, end));
    };
};


const setEvents = (events: any) => {
    const { holidays } = events;
    return typedAction('calendar/SET_EVENTS', holidays);
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

type CalendarAction = ReturnType<
    typeof setEvents |
    typeof setWeekStart |
    typeof setError |
    typeof setWeek |
    typeof startLoading |
    typeof finishLoading
    >;
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
