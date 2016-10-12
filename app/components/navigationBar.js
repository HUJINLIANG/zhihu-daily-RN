/**
 * Created by jialao on 2016/10/12.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';

const {height,width} = Dimensions.get('window');

const styles = StyleSheet.create({
    navBar:{
        backgroundColor:'#000000'
    },
    navBarItem:{
        flex:1,
        justifyContent:'center'
    },
    navBarTitle:{
        width:(width-144),
        alignItems:'center'
    },
    navBarText:{
        color:'white',
        fontSize:18
    },
    navBarTitleText:{
        fontWeight:'500'
    },
    navBarLeftButton:{
        paddingLeft:10
    }
})

const NavigationBarRouteMapper = {
    LeftButton:function(route,navigator,index,navState){
        if(index === 0){
            return null;
        }
        return (
            <TouchableOpacity style={[styles.navBarItem,styles.navBarLeftButton]} onPress={()=>navigator.pop()}>
                <Text style={styles.navBarText}>
                    {'<'}Back
                </Text>
            </TouchableOpacity>
        )
    },
    RightButton:function(){
        return null;
    },
    Title:function(route,navigator,index,navS){
        return (
            <View style={[styles.navBarItem,styles.navBarTitle]}>
                <Text style={[styles.navBarText,styles.navBarTitleText]}>
                    {route.title}
                </Text>
            </View>
        )
    }

}

export default (
    <Navigator.NavigationBar style={styles.navBar} routeMapper={NavigationBarRouteMapper} />
)