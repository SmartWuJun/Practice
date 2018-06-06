/**
 * 获取设备尺寸
 */
import { Dimensions} from 'react-native';
import Orientation from 'react-native-orientation'
import { observable } from 'mobx'
const size = module.exports = observable({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
})

Orientation.addOrientationListener(v => {
    if (v) {
      size.width = Dimensions.get('window').width
      size.height = Dimensions.get('window').height
    }
  }
)
