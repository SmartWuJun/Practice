/**
 * Created by tdzl2003 on 12/18/16.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Button,
    Text,
    View,
    NativeModules,
    AsyncStorage
} from 'react-native';

import AppService from "../service/AppService";
import mainCss from "../css/css"
import Header from "./public/Header"
import TabNav from "./public/TabNav"


export default class Home extends Component {

  static navigationOptions = ({ navigation, screenProps })=>({
    title: '首页',
    tabBarIcon: ({ tintColor }) => (
        <Image source={require('../img/home.png')} style={[mainCss.tabIcon, {tintColor: tintColor}]} resizeMode="contain"/>
    ),
  });

  constructor(props){
    super(props);
    this.state = {
      eyes: true,
      money:0,
      showBasis:false,
      monthDate:{},
      month:null,
      periodId:null,
    };
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
    let periodId=null;
    if(month===1){
      return {
        month:12,
        periodId:periodId=year-1+"12"
      };
    }else {
      return {
        month:month-1,
        periodId:year+getMonth(month-1)
      };
    }

  }

  componentWillMount(){
    let _this=this;

    //是否有数据
    let params=this.props.navigation.state.params;

    if(params){
      _this.setState({
        month:params.monthNumber,
        periodId:params.periodId
      })
    }else {
      _this.setState({
        month:_this.getYearMonth().month,
        periodId:_this.getYearMonth().month
      })
    }

    //
    // periodId
    //获取基本信息
    AsyncStorage.getItem("sourceId",(error,result)=>{
        if (!error) {
          if(result==null){
            this.getPassportId();
          }else {
            _this.getData(result);
          }
        }
    })

  }

  getPassportId=()=>{
    NativeModules.security.getPassportId().then((result) => {
          AppService.getPassport({id:result}).then(data=>{
            AsyncStorage.setItem("tenantId",data.passport.tenantId);
            AsyncStorage.setItem("userId",data.passport.userId);
            this.getUser(data.passport.tenantId,data.passport.userId)
          });
        }
    ).catch((error) => {
      console.log(error)
    });
  };

  // 查询用户信息
  getUser=(tenantId,userId)=>{
    let  _this=this;
    let vm={
      tenantId:tenantId,
      id:userId
    }
    AppService.getUser(vm).then(data=>{
      AsyncStorage.setItem("sourceId",data.user.sourceId);

      //  获取数据
      _this.getData(data.user.sourceId);
    })

  };

  //获取页面数据
  getData=(sourceId)=>{
    let vm={
      periodId:this.state.periodId,
      employeeId:sourceId,
    };

    AppService.apiHumanSalaryBillFind(vm).then(data=> {
     console.warn("单月");
     console.warn(JSON.stringify(data));
    })

  };


  setEyes=()=>{
    this.setState(previousState => {
      return { eyes: !previousState.eyes };
    });
  };

  render() {
   /* {
      this.props.musicData.map((v, i) => this.renderContent(v, i))
    }*/

    // console.warn(JSON.stringify(this.props.navigation))
    return (
       <View style={mainCss.body}>
          <Header navigation={this.props.navigation} title="我的工资条"></Header>
         <View style={mainCss.main}>
           <View  style={styles.top}>
             <View style={styles.xnLine}>
               <Text style={[styles.textCenter,styles.colorF,{flex: 1}]}>实发工资</Text>

             </View>
             <View style={[styles.xnLine,{justifyContent:"center"}]}>
               <Text style={[styles.textRight,styles.colorF,{flex: 1}]}>{this.state.eyes===true && "*****"}{this.state.eyes===false && this.state.money}</Text>
               <TouchableOpacity style={[{flex: 1}]} onPress={this.setEyes} >
                 {this.state.eyes===true &&<Image style={{width:20,height:20,marginLeft:10}} source={require('../img/eyesClose.png')}   resizeMode="contain"></Image>}
                 {this.state.eyes===false &&<Image style={{width:20,height:20,marginLeft:10}} source={require('../img/eyesOpen.png')}   resizeMode="contain"></Image>}
               </TouchableOpacity>
             </View>
             <View style={[styles.xnLine]}>
               <Text style={[styles.textLeft,styles.colorF,{ flex: 1,fontSize:16}]}>应发工资：77777.00</Text>
               <Text style={[styles.textRight,styles.colorF,{ flex: 1,fontSize:16}]}>发薪月份：{this.state.month}月</Text>
             </View>
           </View>
           <View  style={styles.listLayout}>
             <View style={styles.module}>
               <TouchableOpacity style={[styles.xnLine,styles.head]} >
                 <Text style={[styles.textLeft,{ flex: 1,fontSize:16}]}>增减项</Text>
                 <Text style={[styles.textRight,{ flex: 1,fontSize:16}]}>共:50000</Text>
               </TouchableOpacity>

               <View style={[styles.listLine,styles.borderB]}>
                 <Text style={styles.listLineLeft}>绩效</Text>
                 <Text style={[styles.listLineRight]}>1000</Text>
               </View>
               <View style={[styles.listLine,styles.borderB]}>
                 <Text style={styles.listLineLeft}>奖金</Text>
                 <Text style={[styles.listLineRight]}>1000</Text>
               </View>
               <View style={[styles.listLine,styles.borderB]}>
                 <Text style={styles.listLineLeft}>提成</Text>
                 <Text style={[styles.listLineRight]}>1000</Text>
               </View>
             </View>
             <View style={styles.module}>
               <TouchableOpacity style={[styles.xnLine,styles.head]} >
                 <Text style={[styles.textLeft,{ flex: 1,fontSize:16}]}>五险一金</Text>
                 <Text style={[styles.textRight,{ flex: 1,fontSize:16}]}>共:500</Text>
               </TouchableOpacity>
               <View style={[styles.listLine,styles.borderB]}>
                 <Text style={styles.listLineLeft}>五险一金个人缴纳</Text>
                 <Text style={[styles.listLineRight]}>1000</Text>
               </View>
               <View style={[styles.listLine]}>
                 <Text style={styles.listLineLeft}>五险一金公司缴纳</Text>
                 <Text style={[styles.listLineRight]}>1000</Text>
               </View>
             </View>
             <View style={styles.module}>
               <TouchableOpacity style={[styles.xnLine,styles.head]} >
                 <Text style={[styles.textLeft,{ flex: 1,fontSize:16}]}>个税</Text>
                 <Text style={[styles.textRight,{ flex: 1,fontSize:16}]}>-200</Text>
               </TouchableOpacity>
               <View style={[styles.listLine,styles.borderB]}>
                 <Text style={styles.listLineLeft}>五险一金个人缴纳</Text>
                 <Text style={[styles.listLineRight]}>1000</Text>
               </View>
               <View style={[styles.listLine]}>
                 <Text style={styles.listLineLeft}>五险一金公司缴纳</Text>
                 <Text style={[styles.listLineRight]}>1000</Text>
               </View>
             </View>
             <View style={styles.module}>
               <TouchableOpacity style={[styles.xnLine,styles.head]} >
                 <Text style={[styles.textLeft,{ flex: 1,fontSize:16}]}>税后应扣</Text>
                 <Text style={[styles.textRight,{ flex: 1,fontSize:16}]}>-200</Text>
               </TouchableOpacity>
               <View style={[styles.listLine,styles.borderB]}>
                 <Text style={styles.listLineLeft}>五险一金个人缴纳</Text>
                 <Text style={[styles.listLineRight]}>1000</Text>
               </View>
               <View style={[styles.listLine]}>
                 <Text style={styles.listLineLeft}>五险一金公司缴纳</Text>
                 <Text style={[styles.listLineRight]}>1000</Text>
               </View>
             </View>
           </View>
         </View>
          <TabNav navigation={this.props.navigation} nav="0"></TabNav>
       </View>
    );
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
    flex:1,
    paddingTop:10
  },
  module:{
  },
  head:{
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
  }

});