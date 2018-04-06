angular.module("xn.directive.navigation",[]).directive('xnNav', ["$window",function ($window) {
    return {
        restrict: "AC",
        link: function (scope, element,attrs) {
            var scrollTop=0;
            var setTop=attrs.xnNavTop;
            if(setTop==undefined || setTop=="null"){
                setTop=element[0].offsetTop;
            }
            angular.element($window).bind("scroll", function(e){
                scrollTop=angular.element("body")[0].scrollTop||document.documentElement.scrollTop;
                if(scrollTop>setTop){
                    element.css({"position": "fixed","top":"0px","z-index":"999"});
                }else{
                    element.css({"position": "relative","top":"0px","z-index":"999"});
                }
            })
        }
    };
}]);

