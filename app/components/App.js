/**
 * Created by jialao on 2016/10/11.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import NavigationBar from './navigationBar'

class App extends Component {
    constructor(props){
        super(props);
        this.renderScene = this.renderScene.bind(this);
    }
    renderScene(route,nav){
        let Component = route.component;
        if(route.component){
            return <Component {...this.props} {...route.params} navigator={nav} />
        }
    }
    render(){
        return (
            <Navigator renderScene={this.renderScene} initialRoute={{component:Home,title:"今日速报"}} configureScene={(route) => {
                if(route.sceneConfig){
                    return route.sceneConfig;
                }
                return Navigator.SceneConfigs.FloatFromRight;
            }} navigationBar={NavigationBar} />
        )
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