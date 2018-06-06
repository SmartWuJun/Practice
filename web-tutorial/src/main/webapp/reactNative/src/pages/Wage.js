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
    Text,
    ScrollView,
    TextInput,
    View
} from 'react-native';
import AppService from "../service/AppService";
import mainCss from "../css/css";
import Header from "./public/Header";
import TabNav from "./public/TabNav"

export default class Wage extends Component {

    static navigationOptions = ({ navigation, screenProps })=>({
        title: '工资',
        tabBarIcon: ({ tintColor }) => (
            <Image source={require('../img/wage.png')} style={[mainCss.tabIcon, {tintColor: tintColor}]} resizeMode="contain"/>
        ),
    });

    constructor(props){
        super(props);
        this.state = {
            eyes: true,
            totalMoney:0,
            showBasis:false,
            //平均
            average:0,
            totalCount:0,
            //社保总金额
            insuranceAmountCount:0,
            salaryList:[]
        };
    }
    componentWillMount(){

        AsyncStorage.getItem("sourceId",(error,result)=>{
            if (!error) {
                this.findSalaryBill(result);
            }
        })
    }

    //获取当前年月
    getYearMonth(){
        function getMonth(month) {
            if(month<10){
                return "0"+month;
            }else {
                return month;
            }
        }

        let year=new Date().getFullYear();
        let month=new Date().getMonth()+1;
        let endPeriodId=null;

        if(month===1){
            endPeriodId=year-1+"12";
        }else {
            endPeriodId=year+getMonth(month-1);
        }
        let startPeriodId=year-1+""+getMonth(month);
        return {
            startPeriodId:startPeriodId,
            endPeriodId:endPeriodId
        }
    }

    findSalaryBill=(sourceId)=>{
        let _this=this;
        let vm={
            pageSize:0,
            startPeriodId:_this.getYearMonth().startPeriodId,
            endPeriodId:_this.getYearMonth().endPeriodId,
            employeeId:sourceId,
            sortType: "DESC",
            sortColumnList:["PERIOD_ID"],
        }
        AppService.apiHumanSalaryBillFind(vm).then(data=>{
            let totalMoney=0;
            let totalCount=data.totalCount;
            let insuranceAmountCount=0;
            let salaryList=[];
            for(let i=0;i<data.result.length;i++){
                let item=data.result[i];
                totalMoney+=item.salaryBill.finalPayingAmount;
                insuranceAmountCount+=Number(item.salaryBill.insuranceAmountPerson)+Number(item.salaryBill.insuranceAmountCompany);
                salaryList.push({
                    finalPayingAmount:(item.salaryBill.finalPayingAmount).toFixed(2),
                    periodId:item.salaryBill.periodId,
                    year:(item.salaryBill.periodId).substring(0,4),
                    month:(item.salaryBill.periodId).substring(4,6),
                    monthNumber:Number((item.salaryBill.periodId).substring(4,6)),

                });
            }
            _this.setState({
                totalMoney:(totalMoney).toFixed(2),
                totalCount:totalCount,
                average:(totalMoney/totalCount).toFixed(2),
                insuranceAmountCount:(-insuranceAmountCount).toFixed(2),
                salaryList:salaryList
            })
        });
    }

    setEyes=()=>{
        this.setState(previousState => {
            return { eyes: !previousState.eyes };
        });
    };

    render() {
        return (
            <View style={mainCss.body}>
                <Header navigation={this.props.navigation} title="工资条记录"></Header>
                <View style={mainCss.main}>
                    <View  style={styles.top}>
                        <View style={styles.xnLine}>
                            <Text style={[styles.textCenter,styles.colorF,{flex: 1}]}>近12个月</Text>
                        </View>
                        <View style={[styles.xnLine,{justifyContent:"center",marginLeft:30}]}>
                            <Text style={[styles.textRight,styles.colorF]}>工资总额{this.state.eyes===true && "*****"}
                                {this.state.eyes===false && this.state.totalMoney}元</Text>
                            <TouchableOpacity  onPress={this.setEyes} >
                                {this.state.eyes===true &&<Image style={{width:20,height:20,marginLeft:10}} source={require('../img/eyesClose.png')}   resizeMode="contain"></Image>}
                                {this.state.eyes===false &&<Image style={{width:20,height:20,marginLeft:10}} source={require('../img/eyesOpen.png')}   resizeMode="contain"></Image>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View  style={styles.listLayout}>
                        <View style={styles.xnLine}>
                            <View style={[{ flex: 1,flexDirection:"column"}]} >
                                <Text style={[styles.textCenter]}>月平均收入</Text>
                                <Text style={[styles.textCenter,{fontSize:22}]}>{this.state.average}</Text>
                            </View>
                            <View style={[{ flex: 1}]} >
                                <Text style={[styles.textCenter]}>社保缴纳总额</Text>
                                <Text style={[styles.textCenter,{ fontSize:22}]}>{this.state.insuranceAmountCount}</Text>
                            </View>
                        </View>
                        <ScrollView style={styles.monthLayout}>
                            {
                             this.state.salaryList.map((v, i) => this.renderContent(v, i))
                           }
                        </ScrollView>
                    </View>
                </View>
                <TabNav navigation={this.props.navigation} nav="1"></TabNav>
            </View>
        );
    }

    //行信息
    renderContent = (v, i) =>{
        return (
            <TouchableOpacity style={styles.module} onPress={()=>{this._month(v)}}  key={i}>
                <Text style={styles.monthTitle} >{v.year}年{v.month}月</Text>
                <View style={styles.monthLine}>
                    <Image style={styles.monthImg} source={require('../img/money.png')}   resizeMode="contain"></Image>
                    <Text style={styles.monthText}>{v.monthNumber}月份工资</Text>
                    <Text style={[styles.monthText,styles.textRight,{flex:1}]}>￥{v.finalPayingAmount}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _month = (month) => {
        // console.warn(JSON.stringify(month))
        this.props.navigation.navigate("home",{ month: month })
    }
}




const styles = StyleSheet.create({
    main :{
        flex: 1
    },

    top:{
        paddingTop:15,
        paddingBottom:15,
        backgroundColor: '#0066ff'
    },
    colorF : {
        color:'#ffffff'
    },
    xnLine:{
        flexDirection: 'row',
        paddingLeft:10,
        paddingRight:10,
        marginTop:10,
        marginBottom:10,
        alignItems:"center",
    },

    listLine:{
        flexDirection: 'row',
        marginLeft:10,
        marginRight:10,
        alignItems:"center",
    },
    listLineLeft:{
        flex: 1,
        fontSize:14,
        textAlign:'left',
        justifyContent: 'center',
        paddingTop:10,
        paddingBottom:10
    },
    listLineRight:{
        flex: 1,
        fontSize:14,
        textAlign:'right',
        justifyContent: 'center',
        paddingTop:10,
        paddingBottom:10
    },
    borderB:{
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
    },
    textCenter:{
        textAlign:'center',
        justifyContent: 'center',
    },
    textLeft:{
        textAlign:'left',

    },
    textRight:{
        textAlign:"right"
    },
    listLayout:{
        flex: 1,
    },

    monthLayout:{
        flex: 1,
        paddingTop:10,
        marginBottom:10,
        overflow:"hidden"
    },
    module:{ },
    monthTitle:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"#ccc",
        color:"#0066ff"
    },
    monthLine:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        flexDirection: 'row',
    },
    monthImg:{
       width:30,
       height:30,
        marginRight:10
    },
    monthText:{
        paddingTop:10,
        height:30,
    }
});