/**
 * Created by jialao on 2016/10/9.
 */
import React, { Component } from 'react';
import {Provider} from 'react-redux'
import configStore from './store/configStore'
import App from './components/App'

const store = configStore();
export default class Root extends Component{
    render(){
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}