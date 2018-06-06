/**
 * Created by DEV005 on 2017/7/31.
 */

angular.module('app.directive',[])
.directive("xnInputRegex",["$timeout", function() {
    return {
        restrict:"AE",
        replace:"true",
        scope:{
            ngModel:"=ngModel"
        },
        required: "?ngModel",
        link: function( scope,element, attrs, ngModel){
            var vm={
                regexFirst:new RegExp(attrs.regexFirst),
                regexOther:new RegExp(attrs.regexOther,"g"),
                convert:attrs.convert,   //   lower 小写   upper //大写
                min:attrs.min,
                max:attrs.max
            };

            //
            //

            //匹配起始位置
            function  regexFirst(val){
                if(val.length){
                    return val.replace(vm.regexFirst,'')
                }else {
                    return val;
                }
            }
            //匹配中间位置
            function  regexOther(val){
                if(val.length){
                    return val.replace(vm.regexOther,'')
                }else {
                    return val;
                }
            }

            /**
             *
             * @param val  // //   lower 小写   upper //大写
             */
            function convert(val){
                if(val.length){
                    switch (vm.convert){
                        case "lower":
                            return val.toLowerCase ;
                            break;
                        case "upper":
                            return val.toUpperCase();
                            break;
                        default:
                            return val;
                            break;
                    }
                }else {
                    return val;
                }
            }
            /**
             *
             * 最大值
             */
            function max(val){
                if(val!=undefined || val!=null||  val!=""){
                    if(Number(val)>vm.max){
                        return vm.max;
                    }else {
                        return val;
                    }
                }else {
                    return val;
                }
            }

            function min(val){
                if(val!=undefined || val!=null||  val!=""){
                    if(Number(val)<Number(vm.min)){
                        return Number(vm.min);
                    }else {
                        return val;
                    }
                }else {
                    return val;
                }
            }


            element.on("blur",function(){
                var data=scope.ngModel;

                if(data.length ){
                    //大小写限制转换
                    if(vm.convert){
                        data=convert(data);
                    }
                    //首字母限制
                    if(vm.regexFirst){
                        data=regexFirst(data);
                    }
                    //其他地方限制
                    if(vm.regexOther){
                        data=regexOther(data);
                    }
                    if(vm.max){
                        data=max(data);
                    }
                    if(vm.min){
                        data=min(data);
                    }
                    scope.$apply(function(){
                        scope.ngModel=data;
                    });
                }
            });

        }
    };
}])
.directive("xnInputCheckbox",["$timeout", function() {
    return {
        restrict:"AE",
        replace:"true",
        scope:{
            ngModel:"=ngModel"
        },
        required: "?ngModel",
        link: function( scope,element, attrs, ngModel){
            console.log(scope.ngModel);
            if(scope.ngModel=="true"){
                scope.ngModel=true;
            }else if(scope.ngModel=="false"){
                scope.ngModel==false;
            }else if(scope.ngModel=="") {
                scope.ngModel==false;
            }

            scope.$watch(function(){
                return scope.ngModel;
            },function(newadata){
                if(newadata=="true"){
                    scope.ngModel=true;
                }else if(newadata=="false"){
                    scope.ngModel==false;
                }else if(newadata=="") {
                    scope.ngModel==false;
                }
            })

        }
    };

}])
.directive("inputShortcuts", function() {
    return {
        restrict:"AE",
        replace:"true",
        scope:{
            ngModel:"=ngModel",
            method:"&",
            index:"@"
        },
        required: "?ngModel",
        link: function( scope,element, attrs, ngModel){
            var index=scope.index;
            element.on("keydown",function(event){
                if(event.keyCode==13){
                    if(scope.method) {
                        scope.$apply(function(){
                            scope.method();
                        })
                    }
                }
            });
        }
    };

});