/**
 * Created by YQ on 2017/6/26.
 */
import React,{Component,PropTypes}from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity
}from 'react-native';




/**
 * @author YASIN
 * @version [Android YASIN V01, ]
 * @blog http://blog.csdn.net/vv_bug
 * @description
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */
import {
    PixelRatio,
}from 'react-native';
import Dimensions from 'Dimensions';
export var screenW = Dimensions.get('window').width;
export var screenH = Dimensions.get('window').height;
var fontScale = PixelRatio.getFontScale();
export var pixelRatio =PixelRatio.get();

export const DEFAULT_DENSITY=2;
const w2 = 750/DEFAULT_DENSITY;
const h2 = 1334/DEFAULT_DENSITY;


/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 * @constructor
 */
function scaleSize(size) {
    var scaleWidth = screenW / w2;
    var scaleHeight = screenH / h2;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size/DEFAULT_DENSITY;
}


export default class LoadingMore extends Component {
    static propTypes = {
        isLoading: PropTypes.bool
    }
    static defaultProps = {
        isLoading: false
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isLoading: props.isLoading
        };
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View
                    style={{flexDirection:'row',alignSelf:'center',alignItems:'center',padding:scaleSize(10) }}>
                    <ActivityIndicator size={'small'} animating={true} style={{width:scaleSize(15),height:scaleSize(30)}}
                    />
                    <Text style={{ marginLeft:scaleSize(15) }}>
                        正在加载...
                    </Text>
                </View>
            );
        } else if(this.props.onLoading){
            return (
              null
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: nextProps.isLoading
        });
    }
}