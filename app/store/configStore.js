/**
 * Created by jialao on 2016/10/10.
 */
import {createStore,compose,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const finalCreateStore = compose(applyMiddleware(thunkMiddleware))(createStore)

export default function configStore(initialState){
    return finalCreateStore(rootReducer,initialState)
}