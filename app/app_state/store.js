import { configureStore } from '@reduxjs/toolkit'
import {_allReducers} from './reducers/_allReducers'
import {initialState} from './initialState';

const store = configureStore({reducer:_allReducers});
export default store;