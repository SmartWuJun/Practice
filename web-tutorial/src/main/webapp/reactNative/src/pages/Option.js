/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, {Component, PropTypes} from 'react';
import {
    AsyncStorage,
    Image,
    LayoutAnimation,
    NativeModules,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';

import AppService from "../service/AppService";
import mainCss from "../css/css";
import Header from "./public/Header";
import TabNav from "./public/TabNav"
import moment from "moment";
export default class Option extends Component {

    static navigationOptions = ({ navigation, screenProps })=>({
        title: '期权',
        tabBarIcon: ({ tintColor }) => (
            <Image source={require('../img/option.png')} style={[mainCss.tabIcon, {tintColor: tintColor}]} resizeMode="contain"/>
        ),
    });

    constructor(props){
        super(props);
        this.state = {
            tabShow: 0,
            grantedList:[],
            stockList:[],
        };
    }
    componentDidMount(){

        //获取员工 employeeId
        AsyncStorage.getItem("sourceId",(error,result)=>{
            if (!error) {
                this.optionGrantedFind(result);
                this.stockTransactionFind(result);
            }
        })

    }

    // 查询期权授予信息
    //查询可行权数量
    optionGrantedFind=(sourceId)=>{
        let  _this=this;
        let vm={
            employeeId:sourceId,
            isReleased:true
        }
        AppService.apiHumanOptionGrantedFind(vm).then(data=>{
            console.warn("期权授予"+JSON.stringify(data));
            _this.setState({
                grantedList:data.result||[]
            })
        });
    };

    //查询期权交易信息
    stockTransactionFind=(sourceId)=>{
        let  _this=this;
        let vm={
            employeeId:sourceId
        };
        AppService.apiHumanStockTransactionFind(vm).then(data=>{
            _this.setState({
                stockList:data.result||[]
            })
        });

    };
    render() {
        return (
            <View style={mainCss.body}>
                <Header navigation={this.props.navigation} title="我的工资条"></Header>
                <View style={mainCss.main}>
                    <TouchableOpacity style={styles.head} onPress={()=>{this._tab(0)}}><Text >期权授予情况</Text></TouchableOpacity>
                    {this.state.tabShow==0 &&
                        <View  style={styles.listLayout}>

                            <View style={[styles.listLine]} >
                                <Text style={[styles.th]}>授予编码</Text>
                                <Text style={[styles.th]}>授予日期</Text>
                                <Text style={[styles.th]}>授予数量</Text>
                                <Text style={[styles.th]}>授予金额</Text>
                            </View>
                            <ScrollView style={styles.xnScroll}>
                                {this.state.tabShow==0 && this.state.grantedList.map((v, i) => this.renderContent(v, i))}
                            </ScrollView>

                        </View>
                    }
                    <TouchableOpacity style={styles.head} onPress={()=>{this._tab(1)}}><Text>期权交易记录</Text></TouchableOpacity>
                    {this.state.tabShow==1 &&   <View  style={styles.listLayout}>
                            <View style={[styles.listLine]} >
                                <Text style={[styles.th]}>交易日期</Text>
                                <Text style={[styles.th]}>交易数量</Text>
                                <Text style={[styles.th]}>交易金额</Text>
                            </View>
                            <ScrollView style={styles.xnScroll}>
                                { this.state.stockList.map((v, i) => this.renderContent2(v, i))}
                            </ScrollView>
                        </View>
                    }
                    <TouchableOpacity style={styles.head} onPress={()=>{this._tab(2)}}><Text >可行权数量</Text></TouchableOpacity>
                    {this.state.tabShow==2 &&
                         <View  style={styles.listLayout}>
                            <View style={[styles.listLine]} >
                                <Text style={[styles.th]}>授予编码</Text>
                                <Text style={[styles.th]}>授予日期</Text>
                                <Text style={[styles.th]}>可行权数量</Text>
                            </View>
                            <ScrollView style={styles.xnScroll}>
                                {this.state.tabShow==2 && this.state.grantedList.map((v, i) => this.renderContent3(v, i))}
                            </ScrollView>

                        </View>
                    }
                </View>
                <TabNav navigation={this.props.navigation} nav="2"></TabNav>
            </View>
        );
    }
    _tab=(number)=>{
        this.setState({
            tabShow: number
        });
    };
    //行信息
    renderContent = (v, i) =>{
        return (
        <View style={[styles.listLine,styles.borderB]}>
            <Text style={[styles.td]}>{v.number}</Text>
            <Text style={[styles.td]}>{moment(new Date(Number(v.activeDate))).format('YYYY-MM-DD')}</Text>
            <Text style={[styles.td,styles.textRight]}>{v.quantityGranted}</Text>
            <Text style={[styles.td,styles.textRight]}>{v.unitPrice*v.quantityGranted}</Text>
        </View>
        )
    }
    //行信息
    renderContent2 = (v, i) =>{
        return (
            <View style={[styles.listLine,styles.borderB]}  key={i}>

                <Text style={[styles.td]}>{v.quantity}</Text>

            </View>
        )
    };
    //行信息
    renderContent3 = (v, i) =>{
        return (
            <View style={[styles.listLine]} key={i}>
                <Text style={[styles.td]}>{v.number}</Text>
                <Text style={[styles.td]}>{moment(new Date(Number(v.activeDate))).format('YYYY-MM-DD')}</Text>
                <Text style={[styles.td,styles.textRight]}>{v.quantityCanExercise}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main :{
        flex: 1,
        backgroundColor:"#fff"
    },
    head:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        backgroundColor:"#eee"
    },
    th:{
        flex: 1,
        justifyContent: 'center',
        textAlign:"center",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
    },
    td:{
        flex: 1,
        justifyContent: 'center',
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
    },

    listLine:{
        flexDirection: 'row',
        marginLeft:10,
        marginRight:10,
        alignItems:"center",
    },
    listLayout:{
        flex:1,
        paddingTop:10,
        paddingBottom:10
    },
    textRight:{
        textAlign:"right"
    },
});