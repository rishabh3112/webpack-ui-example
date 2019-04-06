import { configureStore } from 'redux-starter-kit';
import webpackReducer from './reducers/webpackReducer';

const store = configureStore({
    reducer: {
        'webpack': webpackReducer,
    }
})

export default store;