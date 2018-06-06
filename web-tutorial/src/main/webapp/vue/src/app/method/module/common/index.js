/**
 * Created by DEV005 on 2017/5/9.
 */
import xnMethod from './xnMethod';

const plugin = {
    install (Vue) {
        Vue.prototype.$xnMethod = xnMethod;
        Vue.xnMethod = xnMethod;
    },
    xnMethod:xnMethod
};
export default plugin
export const install = plugin.install;
