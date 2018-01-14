/**
 * Created by DEV005 on 2017/8/29.
 */
import React from "react";
import {StyleSheet,View,Text,Image,TouchableHighlight,TouchableOpacity,NativeModules} from 'react-native';

export default class Header extends React.Component{
    //返回上一页
    _back=()=>{
        this.props.navigation.goBack();
    };
    //关闭
    _close=()=>{
         NativeModules.system.navTo("BACK");
    };
    render() {

        return (
            <View style={styles.xnHeader}>
                <TouchableOpacity style={styles.renderLeft} onPress={this._back}>
                    <Image style={styles.img} source={require('../../img/back.png')}  resizeMode="contain"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.renderLeft} onPress={this._close}>
                    <Image  style={styles.img} source={require('../../img/close.png')}  resizeMode="contain"/>
                </TouchableOpacity>
                <View style={styles.renderCenter}>{this.props.title && <Text style={styles.title}>{this.props.title}</Text>}</View>
                <View style={styles.renderRight}>
                </View>
                <TouchableOpacity style={styles.renderRight}>
                    <Image style={styles.img} source={require('../../img/Group.png')}   resizeMode="contain"></Image>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    xnHeader:{
        height: 50,
        backgroundColor: '#0066ff',
        flexDirection: 'row',
    },
    renderLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    renderRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    img:{
        width:20,
        height:20
    },
    renderCenter: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    }

});