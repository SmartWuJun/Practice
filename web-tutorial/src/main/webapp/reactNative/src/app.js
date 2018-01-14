/**
 * Created by DEV005 on 2017/8/23.
 */
import React, { Component } from 'react';
import { BackHandler,AppState,StyleSheet,View,Text,
    ToastAndroid, UI,UIManager,DeviceEventEmitter,
    NativeEventEmitter, NativeModules,AsyncStorage} from 'react-native';

import { StackNavigator,TabNavigator } from 'react-navigation';
import AppService from "./service/AppService";
//横竖屏
import Orientation from 'react-native-orientation';
//键盘启用与消失
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

//
// import {Subscribe,SubscribeDOM} from 'react-subscribe';
//通信
// import RPC from './utils/rpc';
//通信
// import hookNavigator from './utils/hookNavigator';


import Home from './pages/Home';
import Wage from './pages/Wage';
import Option from './pages/Option';

const Navigator  = StackNavigator({
    home:{screen:Home},
    wage:{screen:Wage},
    option:{screen:Option}
},{
    headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
});

class App extends Component{
    // componentWillMount(){
    //     let _this=this;
    //     //
    //     // periodId
    //     //获取基本信息
    //     AsyncStorage.setItem("sourceId","")
    //     this.getPassportId();
    //
    // }
    // getPassportId=()=>{
    //     NativeModules.security.getPassportId().then((result) => {
    //             AppService.getPassport({id:result}).then(data=>{
    //                 AsyncStorage.setItem("tenantId",data.passport.tenantId);
    //                 AsyncStorage.setItem("userId",data.passport.userId);
    //             });
    //         }
    //     ).catch((error) => {
    //         console.log(error)
    //     });
    // };
    //
    // // 查询用户信息
    // getUser=(tenantId,userId)=>{
    //     let  _this=this;
    //     let vm={
    //         tenantId:tenantId,
    //         id:userId
    //     }
    //     AppService.getUser(vm).then(data=>{
    //         AsyncStorage.setItem("sourceId",data.user.sourceId);
    //
    //         //  获取数据
    //         _this.getData(data.user.sourceId);
    //     })
    //
    // };

    render() {
        return  <View style={styles.root}><Navigator/></View>
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1
    }

});
export default App;