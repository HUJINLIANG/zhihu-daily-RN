/**
 * Created by jialao on 2016/10/11.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../actions'


class App extends Component {
    constructor(props){
        super(props);

    }

}


function mapStateToProps(state){
    return {
        today:state.today,
        history:state.history,
        mainList:state.mainList,
        themeList:state.themeList,
        theme:state.theme,
        hot:state.hot,
        detail:state.detail
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)