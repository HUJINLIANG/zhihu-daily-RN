/**
 * Created by jialao on 2016/10/14.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    PullToRefreshViewAndroid,
    Text,
    TouchableOpacity,
    View,
    Image,
    Component,
    ListView,
} from 'react-native';

const styles = StyleSheet.create({
    
})

class Row extends Component{
    render () {
        const {key,data,linkToDetail} = this.props
        return (
            <TouchableOpacity onPress={e=>linkToDetail(e,data.id)} >
                <View style={styles.item}>
                    <View style={styles.articleLeft}>
                        
                        <Text style={[styles.articleSpan,styles.articleTitle]} numberOfLines={1}>{data.title}</Text>
                        
                    </View>
                    {data.images.length > 0 &&
                    <View style={styles.wrapImg}>
                        <Image
                            resizeMode={'stretch'}
                            style={styles.articleImg}
                            source={{uri: data.images[0]}}
                        />
                    </View>}

                </View>
            </TouchableOpacity>
        )
    }
}

export default class Home extends Component{
    constructor(props){
        super(props)
        this._onInfinite = this._onInfinite.bind(this)
        this._handleLinkToDetail = this._handleLinkToDetail.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
    }
    componentDidMount(){
        const { actions,mainList } = this.props
        if(mainList.length < 1){
            actions.GET_LATEST_DATA()
        }
    }
    _handleLinkToDetail (e,aid) {
        e.preventDefault()
        const { navigator } = this.props;
        if(navigator && aid) {
            navigator.push({
                title: "详情",
                component: Detail,
                params:{
                    aid:aid
                }
            })
        }
    }
    _onInfinite(e){
        const ThresholdHight = 150
        const { actions,UIState,options } = this.props
        let nativeEvent = e.nativeEvent
        let yOffset = nativeEvent.contentInset.top + nativeEvent.contentOffset.y +
            nativeEvent.layoutMeasurement.height-nativeEvent.contentSize.height;
        if(Math.abs(yOffset) < ThresholdHight){
            actions.GET_HISTORY_DATA(UIState.LoadingDate)
        }
    }
    _onRefresh() {
        const { actions } = this.props
        
        actions.GET_LATEST_DATA()
    }
    render() {
        const {mainList} = this.props
        const rows = mainList.map((row, ii) => {
            return <Row key={ii} data={row} linkToDetail={this._handleLinkToDetail} />;
        });
        return (
            <PullToRefreshViewAndroid
                style={styles.container}
                onRefresh={this._onRefresh}
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor={'#eeeeee'}
            >
                <ScrollView
                    style={styles.itemList}
                    scrollEventThrottle={10}
                    onScroll={this._onInfinite}>
                    {rows}
                </ScrollView>
            </PullToRefreshViewAndroid>
        )
    }

}
