/**
 * Created by jialao on 2016/10/17.
 */
import React, { Component } from 'react';

import {
    Component,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ListView,
    Image,
    Dimensions,
    ActivityIndicatorIOS
} from 'react-native';
import Detail from './detail'
import RefreshInfiniteListView from '../utils/refreshInfinite.ios'
const LISTVIEW_REF = 'listview'
let ds = new ListView.DataSource({
    rowHasChanged:(rl,r2) => r1 !== r2
})

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        marginTop: 56
    },
    itemList:{
        flex:1,
        paddingTop:10,
        paddingLeft:10,
        paddingRight: 10
    },
    item:{
        borderBottomWidth: 1,
        borderBottomColor: '##d9d9d9',
        borderStyle:'dashed',
        marginBottom: 17,
        paddingBottom:17,
        flexDirection: 'row'
    },
    itemLeft:{
        flex:1,
        height: 100
    },

    wrapImg:{
        width: 100,
        alignSelf:'flex-end'
    },
    itemImg:{
        width: 100,
        height: 100
    },
    itemSpan:{
        flex:1,
        paddingRight: 5
    },
    itemTitle:{
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 'bold',
        color: 'black'
    }
})


export default class Home extends Component{
    constructor(props){
        super(props)
        this._handleLinkToArticle = this._handleLinkToArticle.bind(this)
        this._renderRow = this._renderRow.bind(this)
        this._onInfinite = this._onInfinite.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
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

    componentDidMount() {
        const { actions,mainList } = this.props
        if(mainList.length < 1){
            actions.GET_LATEST_DATA()
        }
    }
    _renderRow (rowData: string, sectionID: number, rowID: number) {
        return (

            <TouchableOpacity onPress={e=>this._handleLinkToDetail(e,rowData._id)}>

                <View style={styles.item}>
                    <View style={styles.itemLeft}>

                        <Text style={[styles.itemSpan,styles.itemTitle]} numberOfLines={1}>{rowData.title}</Text>

                    </View>
                    {rowData.images.length > 0 &&
                    <View style={styles.wrapImg}>
                        <Image
                            resizeMode={'stretch'}
                            style={styles.itemImg}
                            source={{uri: data.images[0]}}
                        />
                    </View>}

                </View>
            </TouchableOpacity>
        );
    }

    _onInfinite() {
        const ThresholdHight = 150
        const { actions,UIState } = this.props
        let nativeEvent = e.nativeEvent
        let yOffset = nativeEvent.contentInset.top + nativeEvent.contentOffset.y +
            nativeEvent.layoutMeasurement.height-nativeEvent.contentSize.height;
        if(Math.abs(yOffset) < ThresholdHight){
            actions.GET_HISTORY_DATA(UIState.LoadingDate)
        }
    }

    _onRefresh(){
        const { actions,mainList } = this.props
        actions.GET_LATEST_DATA()
    }
    _renderEmptyRow(){
        return (
            <View style={{height:Dimensions.get('window').height*2/3, justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicatorIOS
                    size='large'
                    animating={true}/>
            </View>
        )
    }
    componentDidUpdate(){
        this.refs[LISTVIEW_REF].hideFooter()
        this.refs[LISTVIEW_REF].hideHeader()
    }

    render() {
        const { actions,mainList } = this.props
        return (
            <View style={styles.container}>
                <RefreshInfiniteListView
                    style={styles.itemList}
                    ref = {LISTVIEW_REF}
                    dataSource={ds.cloneWithRows(mainList)}
                    renderRow={this._renderRow}
                    onRefresh = {this._onRefresh}
                    onInfinite = {this._onInfinite}
                    initialListSize={10}
                    scrollEventThrottle={10}
                    scrollLoadHeight={200}
                    enableScrollLoad={true}

                    renderEmptyRow={this._renderEmptyRow}
                />

            </View>

        )
    }
}
