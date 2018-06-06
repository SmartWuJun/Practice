/**
 * Created by DEV005 on 2017/8/29.
 */
import React from "react";
import {StyleSheet,View,Text,Image,TouchableHighlight,TouchableOpacity,NativeModules} from 'react-native';

export default class TabNav extends React.Component{
    constructor(props){
        super(props);
    }
    //返回上一页
    _tabNav(page){
         this.props.navigation.navigate(page)
    };
    render() {
        return (
            <View style={styles.xnNav}>
                <TouchableOpacity style={[styles.navItem,this.props.nav==0 && styles.active]} onPress={()=>{this._tabNav("home")}}>
                    {this.props.nav!=0 &&<Image style={styles.img} source={require('../../img/home.png')}  resizeMode="contain"/>}
                    {this.props.nav==0 &&<Image style={styles.img} source={require('../../img/home-active.png')}  resizeMode="contain"/>}
                    <Text style={[styles.title,this.props.nav==0 && styles.titleActive]}>首页</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={[styles.navItem,this.props.nav==1 && styles.active]} onPress={()=>{this._tabNav("wage")}}>
                    {this.props.nav!=1 &&<Image style={styles.img} source={require('../../img/wage.png')}  resizeMode="contain"/>}
                    {this.props.nav==1 &&<Image style={styles.img} source={require('../../img/wage-active.png')}  resizeMode="contain"/>}
                    <Text style={[styles.title,this.props.nav==1 && styles.titleActive]}>工资</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={[styles.navItem,this.props.nav==2 && styles.active]} onPress={()=>{this._tabNav("option")}}>
                    {this.props.nav!=2 &&<Image style={styles.img} source={require('../../img/option.png')}  resizeMode="contain"/>}
                    {this.props.nav==2 &&<Image style={styles.img} source={require('../../img/option-active.png')}  resizeMode="contain"/>}
                    <Text style={[styles.title,this.props.nav==2 && styles.titleActive]}>期权</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    xnNav:{
        height: 50,
        backgroundColor:"#eee",
        flexDirection: 'row',
    },
    active:{
      // backgroundColor:"#0066ff"
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    img:{
        width:20,
        height:20,
        marginTop:3
    },
    title:{
        color:"#666",
        fontSize:12,
        marginTop:3
    },
    titleActive:{
        color:"#0066ff",
    },


});