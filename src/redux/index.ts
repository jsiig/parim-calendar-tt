import { combineReducers } from 'redux';
import { calendarReducer } from './calendar';

export const rootReducer = combineReducers({
    calendar: calendarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
