/**
 * Created by DEV005 on 2017/8/23.
 */
 import { AppRegistry } from 'react-native';
 import app from './app.js';

if (!__DEV__) {
 global.console = {
  info: () => {},
  log: () => {},
  warn: () => {},
  error: () => {},
 };
 global.debug = true;
}
// 注意，这里用引号括起来的'HelloWorldApp'必须和你init创建的项目名一致

AppRegistry.registerComponent('salary', () => app);
