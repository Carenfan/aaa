
/*
固定写法基本不变
redux最核心的store对象模块
 */

import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'


export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))