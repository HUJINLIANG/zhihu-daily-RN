/**
 * Created by jialao on 2016/10/25.
 */
import React, { Component } from 'react';
import {
    Component,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:64,
        paddingLeft: 10,
        paddingRight:10,
    },
    title:{
        marginTop:10,
        fontSize: liFontSize * 2,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 36
    }
})

export default class Detail extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {actions,aid} = this.props;
        if(aid){
            actions.GET_DETAIL_DATA(aid);
        }
    }
    
    render(){
        const {detail} = this.props;
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{detail.title}</Text>
                {detail.content}
            </ScrollView>
        )
    }
}


