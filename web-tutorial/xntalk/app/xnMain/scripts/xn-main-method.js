
    (function () {
        "use strict";
        angular.module("xn.talk.method", [])
            .service("xnAppTool",function () {
                "use strict";
                /**
                 * 设置localStorage
                 * name:名称
                 *value:值
                 * url:设置网址
                 * */
                this.setStorage=function (name,value) {
                    localStorage.setItem(name,value)
                };
                /**
                 *getStorage
                 * @param name
                 * @param value
                 * @param url
                 */
                this.getStorage=function (name) {
                   return localStorage.getItem(name)
                };
                /**
                 *delStorage
                 * @param name
                 * @returns {null}
                 */
                this.deleteStorage=function (name) {
                    localStorage.removeItem(name)
                };

                /**
                 *清除
                 * @param name
                 * @returns {null}
                 */
                this.clearStorage=function (name) {
                    localStorage.clear()
                };

            })
    })();

