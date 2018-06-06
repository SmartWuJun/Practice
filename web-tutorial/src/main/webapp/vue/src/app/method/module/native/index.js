import xnNative from './nativeMethod';

const plugin = {
  install (Vue) {
    Vue.prototype.xnNative = xnNative;
    Vue.xnNative = xnNative;
  },
  xnNative:xnNative
};
export default plugin
export const install = plugin.install;
