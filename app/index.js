/**
 * Created by jialao on 2016/10/9.
 */
import React, { Component } from 'react';
import {Provider} from 'react-redux'


export default class Root extends Component{
    render(){
        return (
            <Provider>
                <App />
            </Provider>
        )
    }
}