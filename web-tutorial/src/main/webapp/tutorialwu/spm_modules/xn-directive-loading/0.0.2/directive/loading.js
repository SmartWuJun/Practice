/**
 * Created by DEV005 on 2015/2/26.
 * 赵星
 */
angular.module("xn.directive.loading",[])
    .directive('xnNprogress', ["XN_BEGIN_REQUEST", "XN_END_REQUEST",function (XN_BEGIN_REQUEST, XN_END_REQUEST) {
        return {
            restrict: "A",
            link: function (scope, element) {
                // hide the element initially


                scope.$on(XN_BEGIN_REQUEST, function () {
                    // got the request start notification, show the element  console.log("接收到了 XN_BEGIN_REQUEST")
                    NProgress.start();
                });

                scope.$on(XN_END_REQUEST, function () {
                    // got the request end notification, hide the element
                    NProgress.done();
                });
            }
        };
    }]);