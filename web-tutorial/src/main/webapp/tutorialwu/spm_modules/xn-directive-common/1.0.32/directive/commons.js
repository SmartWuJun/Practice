//验证
angular.module("xn.directive.common",["xn/template/common.html"]).provider('xnValidator', [function () {
    var defaultRules = {
            required: "该选项不能为空",
            maxlength: "该选项输入值长度不能大于{maxlength}",
            minlength: "该选项输入值长度不能小于{minlength}",
            email: "输入邮件的格式不正确",
            repeat: "两次输入不一致",
            pattern: "该选项输入格式不正确",
            number: "必须输入数字",
            xnuniquecheck: "该输入值已经存在，请重新输入"
        },
        elemTypes = ['text', 'password', 'email', 'number', ['textarea'], ['select'], ['select-one']];

    var validatorFn = function () {
        this.elemTypes = elemTypes;
        this.rules = [];
        this.isEmpty = function (object) {
            if (object === undefined || object === null) {
                return true;
            }
            if (object instanceof Array && object.length === 0) {
                return true;
            }
            return false;
        };
        this.defaultShowError = function (elem, errorMessages) {
            var $elem = angular.element(elem);
            var $group = $elem.parent().parent();
            if (!this.isEmpty($group) && !$group.hasClass("has-error")) {
                $group.addClass("has-error");
                $elem.after('<span class="xn-error">' + errorMessages[0] + '</span>');
            }
        };
        this.defaultRemoveError = function (elem) {
            var $elem = angular.element(elem);
            var $group = $elem.parent().parent();
            if (!this.isEmpty($group) && $group.hasClass("has-error")) {
                $group.removeClass("has-error");
                $elem.next(".xn-error").remove();
            }
        };
        this.options = {
            blurTrig: false
        }
    };

    validatorFn.prototype = {
        constructor: validatorFn,
        config: function (options) {
            this.options = angular.extend(this.options, options);
        },
        setRules: function (rules) {
            this.rules = rules;
        },
        getErrorMessage: function (validationName, elem) {
            var msgTpl = null;
            if (!this.isEmpty(this.rules[elem.name]) && !this.isEmpty(this.rules[elem.name][validationName])) {
                msgTpl = this.rules[elem.name][validationName];
            }
            switch (validationName) {
                case "maxlength":
                    if (msgTpl !== null) {
                        return msgTpl.replace("{maxlength}", elem.getAttribute("ng-maxlength"));
                    }
                    return defaultRules.maxlength.replace("{maxlength}", elem.getAttribute("ng-maxlength"));
                case "minlength":
                    if (msgTpl !== null) {
                        return msgTpl.replace("{minlength}", elem.getAttribute("ng-minlength"));
                    }
                    return defaultRules.minlength.replace("{minlength}", elem.getAttribute("ng-minlength"));
                default :
                {
                    if (msgTpl !== null) {
                        return msgTpl;
                    }
                    if (defaultRules[validationName] === null) {
                        throw new Error("该验证规则(" + validationName + ")默认错误信息没有设置！");
                    }
                    return defaultRules[validationName];
                }

            }
        },
        getErrorMessages: function (elem, errors) {
            var elementErrors = [];
            for (var err in errors) {
                if (errors[err]) {
                    var msg = this.getErrorMessage(err, elem);
                    elementErrors.push(msg);
                }
            }
            return elementErrors;
        },
        showError: function (elem, errorMessages, options) {
            var useOptions = angular.extend({}, this.options, options);
            if (useOptions.showError === false) {
                return;
            }
            angular.element(elem).removeClass("valid").addClass("error");
            if (angular.isFunction(useOptions.showError)) {
                return useOptions.showError(elem, errorMessages);
            }
            if (useOptions.showError === true) {
                return this.defaultShowError(elem, errorMessages);
            }
        },
        removeError: function (elem, options) {
            var useOptions = angular.extend({}, this.options, options);
            if (useOptions.removeError === false) {
                return;
            }
            angular.element(elem).removeClass("error").addClass("valid");
            if (angular.isFunction(useOptions.removeError)) {
                return useOptions.removeError(elem);
            }
            if (useOptions.removeError === true) {
                return this.defaultRemoveError(elem);
            }
        }
    };

    var validator = new validatorFn();

    this.config = function (options) {
        validator.config(options);
    };

    this.setRules = function (rules) {
        validator.setRules(rules);
    };

    this.$get = function () {
        return validator;
    };
}])
    //复选框list可控制排列方式
    .directive("xnCheckboxListLayout", function() {
        "use strict";
        return {
            restrict: "AC",
            templateUrl: "xn/template/checkboxListLayout.html",
            scope: {
                checkboxs:'=ngModel',
                checkboxList: "=",
                method: "&",
                layout: "@"  //控制排列方式   horizontal横排＼vertical坚排
            },
            require: "?ngModel",
            link: function (scope, elem, attrs, ngModel, fn) {
                var count = 0;
                scope.originalList = [];

                if (!ngModel) {
                    return;
                }

                if(!scope.layout) {
                    scope.layout = "horizontal"
                }

                scope.$watch("checkboxList", function(val) {
                    scope.originalList = [];
                    $.extend(scope.originalList, val);
                }, true);

                scope.$watch("originalList", function(val) {
                    var all = {value:"全部", key:"all", state:false};
                    scope.checkboxs = [];
                    count = 0;

                    for(var i= 0, len=val.length; i<len; i++) {

                        if(true!=val[i].hide) {
                            count++;
                        }

                        if(val[i].state && true!=val[i].hide) {
                            scope.checkboxs.push(val[i].key);
                        }

                    }

                    if(scope.checkboxs.length==count) {
                        all.state = true;
                    }

                    val.unshift(all);

                    ngModel.$setViewValue(scope.checkboxs);

                    if(scope.method) {
                        scope.method();
                    }
                });

                scope.change=function(checkbox){
                    checkbox.state = !checkbox.state;

                    if("all"==checkbox.key) {
                        scope.checkboxs = [];

                        if(checkbox.state) {

                            for(var i= 0,len=scope.originalList.length; i<len; i++) {

                                if(true!=scope.originalList[i].hide) {
                                    scope.originalList[i].state = true;
                                }

                                if("all"!=scope.originalList[i].key && true!=scope.originalList[i].hide) {
                                    scope.checkboxs.push(scope.originalList[i].key);
                                }

                            }

                        } else {

                            for(var i= 0,len=scope.originalList.length; i<len; i++) {

                                if(true!=scope.originalList[i].hide) {
                                    scope.originalList[i].state = false;
                                }

                            }

                        }

                    } else {

                        if(!checkbox.state) {

                            for(var i= 0,len=scope.originalList.length; i<len; i++) {

                                if(checkbox.key==scope.checkboxs[i]) {
                                    scope.checkboxs.splice(i, 1);
                                }

                            }

                        } else {
                            scope.checkboxs.push(checkbox.key);
                        }

                    }

                };
            }
        }
    })
    //复选框list
    .directive("xnCheckboxList",["$parse", function($parse) {
        "use strict";
        return {
            restrict: "AC",
            templateUrl: "xn/template/common/checkboxList.html",
            scope: {
                checkboxs:'=ngModel',
                checkboxList: "=",
                method: "&"
            },
            require: "?ngModel",
            link: function (scope, elem, attrs, ngModel) {
                var checkbox = scope.checkboxs={listKey:[],list:[]};

                if (!ngModel) {
                    return;
                }

                scope.$watch(function(){
                    return scope.checkboxList;
                }, function(newval) {
                    scope.checkboxs={
                        listKey:[],
                        list:[]
                    };
                    for(var i=0; i<newval.length;i++){
                        if(newval[i].state){
                            scope.checkboxs.listKey.push(newval[i].key);
                            scope.checkboxs.list.push(newval[i]);
                        }
                    }
                    ngModel.$setViewValue(scope.checkboxs);
                    if(scope.method) {
                        scope.method();
                    }
                },true);
            }
        };
    }])

    //单选框list可控制排列方式
    .directive("xnRadioList", function() {
        "use strict";
        return {
            restrict: "AC",
            templateUrl: "xn/template/common/radioList.html",
            scope: {
                radioChoosed: "=ngModel",
                radioList: "=",
                layout: "@"  //控制排列方式   horizontal横排＼vertical坚排
            },
            require: "?ngModel",
            link: function (scope, elem, attrs, ngModel, fn) {
                scope.originalList = [];

                if (!ngModel) {
                    return;
                }

                if(!scope.layout) {
                    scope.layout = "horizontal"
                }

                scope.$watch("radioList", function(val) {
                    scope.originalList = [];
                    $.extend(scope.originalList, val);
                }, true);

                scope.$watch("originalList", function(val) {
                    scope.radioChoosed = "";

                    for(var i= 0, len=val.length; i<len; i++) {
                        if(val[i].state ) {
                            scope.radioChoosed = val[i].key;
                        }
                    }
                    ngModel.$setViewValue(scope.radioChoosed);
                });

                scope.change=function(radio){
                    radio.state = true;
                    scope.radioChoosed = radio.key;
                    for(var i= 0, len=scope.originalList.length; i<len; i++){
                        if(scope.originalList[i].key!=radio.key){
                            scope.originalList[i].state = false;
                        }
                    }

                };
            }
        }
    })
    //禁用
    .directive("xnDisabled", ["XN_BEGIN_REQUEST", "XN_END_REQUEST", function (XN_BEGIN_REQUEST, XN_END_REQUEST) {
        'use strict';
        return {
            restrict: "A",
            link: function (scope, element) {
                scope.$on(XN_BEGIN_REQUEST, function () {
                    // got the request start notification, show the element  console.log("接收到了 XN_BEGIN_REQUEST")
                    element.attr({disabled:"disabled"});
                    element.addClass("disabled");
                });
                scope.$on(XN_END_REQUEST, function () {
                    // got the request end notification, hide the element
                    element.attr({disabled:"true"});
                    element.removeClass("disabled");
                    element.removeAttr("disabled");
                });
            }
        };
    }])
    //遍历
    .directive("xnRepeat", [function () {
        'use strict';
        return {
            restrict: "AE",
            require: "ngModel",
            link: function (scope, elem, attrs, ctrl) {
                var otherInput = elem.inheritedData("$formController")[attrs.xnRepeat];

                ctrl.$parsers.push(function (value) {
                    if (value === otherInput.$viewValue) {
                        ctrl.$setValidity("repeat", true);
                        return value;
                    }
                    ctrl.$setValidity("repeat", false);
                });
                otherInput.$parsers.push(function (value) {
                    ctrl.$setValidity("repeat", value === ctrl.$viewValue);
                    return value;
                });
            }
        };
    }])
    //将复选框变单选
    .directive("xnUniqueCheck", ['$timeout', '$http', function ($timeout, $http) {
        return{
            require: "ngModel",
            link: function (scope, elem, attrs, ngModel) {
                var doValidate = function () {
                    var attValues = scope.$eval(attrs.xnUniqueCheck);
                    var url = attValues.url;
                    var isExists = attValues.isExists;//default is true
                    $http.get(url).success(function (result) {
                        if (isExists === false) {
                            ngModel.$setValidity('xnuniquecheck', result.data);
                        }
                        else {
                            ngModel.$setValidity('xnuniquecheck', !result.data);
                        }
                    });
                };

                scope.$watch(attrs.ngModel, function (newValue) {
                    if (_.isEmpty(newValue)) {
                    } else if (!scope[elem[0].form.name][elem[0].name].$dirty) {
                        doValidate();
                    }
                });

                elem.bind("blur", function () {
                    $timeout(function () {
                        if (scope[elem[0].form.name][elem[0].name].$invalid) {
                            return;
                        }
                        doValidate();

                    });
                });
                elem.bind("focus", function () {
                    $timeout(function () {
                        ngModel.$setValidity('xnuniquecheck', true);
                    });
                });
            }
        };
    }])
    .directive('xnHasPermission', ["permissionService", function(permissionService) {
        return {
            link: function (scope, element, attrs) {
                if (!_.isString(attrs.xnHasPermission))
                    throw "hasPermission value must be a string";

                var value = attrs.xnHasPermission.trim();
                //！是非操作，标识没有该权限项
                var notPermissionFlag = value[0] === '!';
                if (notPermissionFlag) {
                    value = value.slice(1).trim();
                }

                function toggleVisibilityBasedOnPermission() {
                    var hasPermission = permissionService.hasPermission(value);

                    if (hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag)
                        element.show();
                    else
                        element.hide();
                }

                toggleVisibilityBasedOnPermission();
                scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
            }
        };
    }])
    //默认图片
    .directive('xnImg', [function () {
        return {
            restrict: "AE",
            link: function (scope, element) {
                element.bind("error",function(){
                    element.attr({src: "/home/images/logo.jpg"});
                });
            }
        };
    }])
    //必输
    .directive('xnRequired', [function () {
        return {
            restrict: "AEC",
            link: function (scope,element) {
                if( element.attr("placeholder")==undefined){
                    element.attr("placeholder","(必填)");
                }else{
                    element.attr("placeholder",element.attr("placeholder")+"(必填)");
                };
            }
        };
    }])
    //获取焦点
    .directive('xnHasFocus', function() {
        return{
            link:function(scope, element, attrs) {
                scope.$watch(attrs.xnHasFocus, function (nVal, oVal) {
                    if(oVal){
                        element[0].focus();
                    }
                });
                element.bind('blur', function() {
                    scope.$apply(attrs.xnHasFocus + " = false");
                });
                element.bind('keydown', function (e) {
                    if (e.which == 13){
                        scope.$apply(attrs.xnHasFocus + " = false");
                    }
                });
            }
        };
    })
    //发票类的表单，点击触发显示编辑框
    .directive('xnClickEdit', function(){
        return {
            require: "?ngModel",
            restrict: 'AE',
            link: function(scope, iElm, attrs){
                iElm.bind("click", function(){
                    iElm.addClass("xn-click-edit-hover");
                    iElm.find(".xn-click-input").show();
                    iElm.find(".xn-click-input").focus();
                    iElm.find(".xn-click-input").select();
                });
                if(!attrs.id){
                    iElm.find(".xn-click-input").bind("blur",function(){
                        iElm.removeClass("xn-click-edit-hover");
                        iElm.find(".xn-click-input").hide();
                    });
                }else{
                    scope.getClickPoint = function(tar) {
                        if(tar.id==attrs.id){
                            scope.count++;
                        }
                        if(tar.parentElement){
                            scope.getClickPoint(tar.parentElement);
                        }
                    };
                    angular.element(document).bind("click", function(e) {
                        scope.count = 0;
                        scope.getClickPoint(e.target);
                        if(scope.count == 0) {
                            scope.$apply(function(){
                                iElm.removeClass("xn-click-edit-hover");
                                iElm.find(".xn-click-input").hide();
                            });
                        }
                    });
                }

            }
        };
    })
    .directive('input', function(){
        return {
            require: "?ngModel",
            restrict: 'E',
            link: function(scope, iElm, attr){
                scope.elmIsFocus = false;
                if(iElm[0].type === "text" && attr.isClickSelect != "false") {
                    iElm.bind("click", function(){
                        if(!scope.elmIsFocus){
                            this.select();
                            scope.elmIsFocus = true;
                        }
                    });
                    iElm.bind("blur", function(){
                        scope.elmIsFocus = false;
                    });
                }
            }
        };
    })
    .directive('textarea', function(){
        return {
            require: "?ngModel",
            restrict: 'E',
            link: function(scope, iElm, attr){
                scope.elmIsFocus = false;
                if(iElm[0].type === "textarea" && attr.isClickSelect != "false") {
                    iElm.bind("click", function(){
                        if(!scope.elmIsFocus){
                            this.select();
                            scope.elmIsFocus = true;
                        }
                    });
                    iElm.bind("blur", function(){
                        scope.elmIsFocus = false;
                    });
                }
            }
        };
    })
    .directive('xnFixTop', [function () {
        return {
            restrict: "C",
            scope: {
                yOffset: "@",
                yShifting: "@"
            },
            link: function (scope, elm) {
                if(!scope.yShifting)
                    scope.yShifting = 0;
                if(!scope.yOffset)
                    scope.yOffset = 0;
                var startPos = $(elm).offset().top;
                var width = $(elm).css("width");
                $.event.add(window, "scroll", function() {
                    var p = $(window).scrollTop();
                    $(elm).css('position',((p + Number(scope.yShifting)) > startPos) ? 'fixed' : 'relative');
                    $(elm).css('top',((p + Number(scope.yShifting)) > startPos) ? scope.yOffset : '');
                    $(elm).css('width', width);
                });
            }
        };
    }])
    //  返回顶部与在线留言 todo  1滚动不是逐渐上去，2，没有隐藏
    .directive('xnBackToTop', ["$location","$anchorScroll",function ($location,$anchorScroll) {
        return {
            template:
                "<ul>\n" +
                "<li class='backToTop'>\n"+
                "<a  ng-click='backToTop(header,0)'>\n"+
                "<span class='gotop-icon icon  icon-up-1'></span>"+
                "<span class='gotop-font'>返回<br>顶部</span>"+
                "</a>\n"+
                "</li>\n" +
                "<li>\n"+
                "<a ng-href='{{url}}' target='_blank'>\n"+
                "<span class='gotop-icon icon icon-idea'></span>"+
                "<span class='gotop-font'>反馈<br>建议</span>"+
                "</a>\n"+
                "</li>\n" +
                "</ul>",
            restrict: "C",
            link: function (scope, elem, attrs, ngModel) {
                attrs.$observe("feedbackUrl", function (value){
                    if(value){
                        scope.url= value;
                    }else{
                        return
                    }
                });
                scope.backToTop = function(id){
                    $location.hash(id);
                    $anchorScroll();
                };
            }
        };
    }])
    .directive("xnPositiveNumber", function() {
        return {
            restrict: "A",
            require: "^ngModel",
            scope:{
                data: "=ngModel"
            },
            link: function(scope, elements, attres) {
                if(!scope.data)
                    scope.data = 0;
                if(scope.data<0)
                    scope.data = -scope.data;
                scope.$watch("data", function(val) {
                    if(scope.data<0)
                        scope.data = -scope.data;
                });
            }
        };
    })
    .directive('xnTagInput', [function () {
        return {
            restrict: "AE",
            scope: {
                data: "=ngModel",
                name: "@"
            },
            require: 'ngModel',
            priority: 1,
            link: function($scope, element, attrs, ngModel) {
                if(!ngModel) return;

                var str = $scope.data;

                if(!str) str= "";

                var strList = [];

                if(str.length>0) strList = JSON.parse(str);

                var count = 0;

                $scope.$watch("data", function(newVal, oldVal) {
                    if(newVal) strList = JSON.parse(newVal);
                    $scope.init();
                });

                $scope.bindDelete = function(id) {
                    angular.element("#"+id).on("click", function(e) {
                        angular.element("#li"+angular.element(this).attr('id')).remove();
                        strList = JSON.parse($scope.data);
                        strList.splice(Number(angular.element(this).attr('id')), 1);
                        str = JSON.stringify(strList);
                        ngModel.$setViewValue(str);
                    });
                };

                $scope.init = function() {
                    count = 0;
                    angular.element("#xnInput_out_div01").remove();
                    var xnInputDiv = "<div class='xnInput_out_div' id='xnInput_out_div01'><ul id='inner_ul' class='xnInput_ul'>";
                    xnInputDiv += "<li id='last_li'><input type='text' name='"+$scope.name+"' id='xnInput_input01' class='xnInput_input'/></li></ul></div>";
                    angular.element(element).before(xnInputDiv);
                    for(var i=0; i<strList.length; i++) {
                        angular.element("#last_li").before("<li id='li"+(count>=10?count:'0'+count)+"' class='con_li'><div>"+strList[i]+"</div><a href='javascript:void(0);' class='li_a' id='"+(count>=10?count:'0'+count)+"'><i class='icon icon-delete'></i></a></li>");
                        $scope.bindDelete(count>=10?count:'0'+count);
                        count ++;
                    }
                    angular.element("#xnInput_input01").on("focus", function(e) {
                        angular.element("#xnInput_out_div01").addClass("input_outline");
                    });
                    angular.element("#xnInput_input01").on("blur", function(e) {
                        angular.element("#xnInput_out_div01").removeClass("input_outline");
                    });
                    angular.element("#xnInput_out_div01").on("click", function(e) {
                        angular.element("#xnInput_input01").focus();
                    });
                    angular.element("#xnInput_input01").on("keydown", function(e) {
                        if(e.keyCode==13 && angular.element(this).val()) {
                            var val = angular.element(this).val();
                            var num = 0;
                            for(var i=0; i<strList.length; i++) {
                                if(strList[i]==val) num ++;
                            }
                            if(num==0) strList.push(val);
                            str = JSON.stringify(strList);
                            angular.element(this).val("");
                            ngModel.$setViewValue(str);
                            $scope.$apply();
                        }
                    });
                };

                ngModel.$parsers.push(function (value) {
                    var div = angular.element(element).prev();
                    angular.element(div)
                        .toggleClass('ng-invalid', !ngModel.$valid)
                        .toggleClass('ng-valid', ngModel.$valid)
                        .toggleClass('ng-invalid-required', !ngModel.$valid)
                        .toggleClass('ng-valid-required', ngModel.$valid)
                        .toggleClass('ng-dirty', ngModel.$dirty)
                        .toggleClass('ng-pristine', ngModel.$pristine);
                    return value;
                });
            }
        };
    }])
    .directive("logo", [function() {
        return {
            restrict: "AE",
            scope: {
                forwardUrl: "@",
                applicationCode: "@",
                logoClass: "@",
                appList: "=",
                iconBaseUrl: "@",
                allApplicationUrl: "@"
            },
            templateUrl: "logo/tpl.html"
        }
    }])
    .directive("quickSearchBox", [function() {
        var link = function($scope, element, attrs, ngModel) {
            if(!ngModel) {
                return;
            }
            $scope.data="";

            if(!$scope.ngRequired) {
                $scope.ngRequired = false;
            }

            $scope.globalSearch = function(e) {
                e.preventDefault();
                e.stopPropagation();
                $scope.boxWrapClass = "box_wrap_animation";
                angular.element("#search_box").focus();
            };

            angular.element(document).on("click", function(e) {
                $scope.$apply(function() {
                    $scope.boxWrapClass = "";
                    $scope.data="";
                });
            });

            $scope.search = function(e) {
                if(e.keyCode==13) {
                    $scope.doSearch();
                }
            };
        };
        return {
            restrict: "AEC",
            scope: {
                name: "@",
                ngRequired: "@",
                doSearch: "&",
                data: "=ngModel"
            },
            require: "ngModel",
            replace: true,
            template: "<div class='box_wrap' id='box_wrap' ng-click='globalSearch($event)' ng-class='boxWrapClass'>"+
                "<input ng-model='data' ng-keydown='search($event)' class='search_box' type='text' id=\"search_box\" ng-blur=\"changeStyle()\" placeholder=\"搜索\" name='{{name}}' ng-required='{{ngRequired}}'/>"+
                "<i class='icon icon-chaxun01' id='icon-chaxun01' ng-click='doSearch()'></i>"+
                "</div>",
            link: link
        };
    }])
    .directive("xnMessageSlide", function() {
        var link = function($scope, element, attrs, ngModel, fn) {
            $scope.messageCode = "";
            $scope.messageContent = "";

            $scope.$watch("errors", function(newVal, oldVal){
                if(newVal && newVal.length>0) {
                    var error = newVal[0];
                    if(error.code.indexOf("_")>0)
                        error.code = error.code.split("_")[1];
                    $scope.messageCode = error.code.toLocaleLowerCase();
                    $scope.messageContent = error.message;
                    $scope.errors = [];
                    setTimeout(function() {
                        if($scope.messageCode=="success") location.href= $scope.forwardUrl;
                        $scope.$apply(function(){
                            $scope.messageCode = "";
                        });
                    }, $scope.howLong);
                }
            }, true);
        };
        return {
            restrict: "AE",
            scope: {
                errors: "=",
                howLong: "=",
                forwardUrl: "="
            },
            link: link,
            replace: true,
            template: "<div id='xnMessage' class='xnMessage xnMessage_{{messageCode}}'><div class='content'><h5 class='title'>提示信息：</h5>{{messageContent}}</div></div>"
        };
    })
    .directive("xnMakesure", function() {
        var link = function($scope, element, attrs, ngModel, fn) {

            if(!$scope.content) {
                $scope.content = "";
            }

            $scope.page = document.getElementsByTagName("body")[0];

            angular.element(element).on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                var point = getMousePoint(e);
                var deleteDialog = document.getElementById("delete_dialog");

                if(deleteDialog) {
                    var parent = deleteDialog.parentNode;
                    parent.removeChild(deleteDialog);
                }
                deleteDialog = document.createElement("div");
                deleteDialog.setAttribute("id", "delete_dialog");
                deleteDialog.setAttribute("class", "delete_dialog_wrap");
                deleteDialog.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                };

                var titleUl = document.createElement("ul");
                titleUl.setAttribute("class", "dialog_title");
                var titleLiLeft = document.createElement("li");
                if($scope.title) {
                    var title = document.createElement("h4");
                    var titleText = document.createTextNode($scope.title);
                    title.appendChild(titleText);
                    titleLiLeft.appendChild(title);
                }
                var titleLiRight = document.createElement("li");
                titleLiRight.setAttribute("class", "icon icon-close");
                titleLiRight.onclick = function() {
                    deleteDialog.style.visibility = "hidden";
                };
                titleUl.appendChild(titleLiLeft);
                titleUl.appendChild(titleLiRight);

                var contentTable = document.createElement("div");
                contentTable.setAttribute("class", "content_table");

                var contentDiv = document.createElement("div");
                contentDiv.setAttribute("class", "delete_dialog_content");
                if($scope.content) {
                    var content = document.createTextNode($scope.content);
                    contentDiv.appendChild(content);
                }

                contentTable.appendChild(contentDiv);

                var btnUl = document.createElement("ul");
                btnUl.setAttribute("class", "btn_wrap");

                var btnLiLeft = document.createElement("li");
                var btnLiRight = document.createElement("li");

                var sure = document.createElement("button");
                var sureText = document.createTextNode("确定");
                sure.onclick = function() {
                    if($scope.method) {
                        $scope.$apply(function() {
                            $scope.method();
                        });
                    }
                    deleteDialog.style.visibility = "hidden";
                };
                sure.setAttribute("class", "btn-danger btn");
                sure.appendChild(sureText);
                btnLiLeft.appendChild(sure);

                var abolish = document.createElement("button");
                var abolishText = document.createTextNode("取消");
                abolish.onclick = function() {
                    deleteDialog.style.visibility = "hidden";
                };
                abolish.setAttribute("class", "btn-default btn");
                abolish.appendChild(abolishText);
                btnLiRight.appendChild(abolish);

                btnUl.appendChild(btnLiLeft);
                btnUl.appendChild(btnLiRight);

                deleteDialog.appendChild(titleUl);
                deleteDialog.appendChild(contentTable);
                deleteDialog.appendChild(btnUl);
                $scope.page.appendChild(deleteDialog);
                deleteDialog.style.top =  point.y-135+"px";
                deleteDialog.style.left =  point.x-75+"px";
            });

            angular.element(document).on("click", function(e) {
                var deleteDialog = document.getElementById("delete_dialog");

                if(deleteDialog) {
                    var parent = deleteDialog.parentNode;
                    parent.removeChild(deleteDialog);
                }
            });
        };
        return {
            restrict: "AE",
            scope: {
                content: "@",
                method: "&",
                title: "@"
            },
            link: link
        };
    })
    .directive("xnArrow", function() {
        var link = function($scope, element, attrs, ngModel, fn) {
            var time = new Date().getTime();
            $scope.id = "canvas_" + time;

            angular.element("#"+$scope.id).ready(function() {
                var canvas = document.getElementById($scope.id);

                var context = canvas.getContext("2d");

                if(!$scope.color) {
                    $scope.color = "#cdcdcd";
                }

                var init = function(co, state) {
                    var color = "#fff";

                    if(co) {
                        color = co;
                    }

                    clean();

                    if(!state) {
                        context.beginPath();
                        context.moveTo(0, 9);
                        context.lineTo(10, 17);
                        context.lineTo(20, 9);
                        context.lineTo(0, 9);
                        context.fillStyle="#ececec";
                        context.fill();
                        context.closePath();

                        context.beginPath();
                        context.moveTo(2, 5);
                        context.lineTo(10, 11);
                        context.lineTo(18, 5);
                        context.strokeStyle=color;
                        context.lineWidth = 2;
                        context.stroke();
                        context.closePath();
                    } else {
                        context.beginPath();
                        context.moveTo(2, 8);
                        context.lineTo(10, 2);
                        context.lineTo(18, 8);
                        context.strokeStyle=color;
                        context.lineWidth = 2;
                        context.stroke();
                        context.closePath();
                    }
                };

                function clean(){
                    context.clearRect(0, 0, 20, 20);
                }

                if(canvas.attachEvent) {
                    canvas.attachEvent("onmouseover", function() {
                        init($scope.color, $scope.state)
                    });
                    canvas.attachEvent("onmouseout", function() {
                        init(null, $scope.state)
                    });
                    canvas.attachEvent("onclick", function() {
                        $scope.state = !$scope.state;
                        init(null, $scope.state);
                    });
                } else {
                    canvas.addEventListener("mouseover", function() {
                        init($scope.color, $scope.state)
                    }, false);
                    canvas.addEventListener("mouseout", function() {
                        init(null, $scope.state)
                    }, false);
                    canvas.addEventListener("click", function() {
                        $scope.state = !$scope.state;
                        init(null, $scope.state);
                    });
                }

                init(null, null);

            });
        };

        return {
            restrict: "AE",
            scope: {
                state: "=",
                color: "@"
            },
            link: link,
            template: "<canvas id='{{id}}' class='arrow-box' width='20' height='20'></canvas>"
        };
    })
    .value("xnConfig", [])
    .directive("personalCenter", ["$modal","CommonService","xnConfig",function($modal,CommonService,xnConfig) {
        var config = [];
        if(xnConfig){
            config = angular.extend(config, xnConfig);
        };
        return {
            restrict: "AE",
            scope: {
                avatarUrl: "@",
                aboutUrl: "@"
            },
            templateUrl: "personalCenter/tpl.html",
            link: function(scope,element,atter,ngModel) {
                if(config) {
                    scope.xnConfig = config
                }

                //页面加载日志信息
                scope.getMessageList = function () {
                    CommonService.getMessageList().success(function (data) {
                        scope.messages = [];
                        scope.messagesAll = data.messageList;
                        if (scope.messagesAll != undefined) {
                            if (data.messageList.length > 5) {
                                for (var i = 0; i < 5; i++) {
                                    scope.messages.push(data.messageList[i]);
                                }
                            } else {
                                scope.messages = data.messageList;
                            }
                        }else{
                            scope.messagesAll=[];
                        }
                    });
                };
                scope.getMessageList();

                scope.messageDetail=function(id,type){

                    var modalInstance = $modal.open({
                        template:"<div class=\"modal-header\">"+
                            "            <h3 class=\"modal-title\">{{messageDetail.messageTitle}}</h3>"+
                            "        </div>"+
                            "        <div class=\"modal-body clearfix\" >"+
                            "            <div class=\"form-group col-sm-10 col-md-offset-1 clearfix\">"+
                            "                <dd>{{messageDetail.messageContent}}</dd>"+
                            "            </div>"+
                            "        </div>"+
                            "        <div class=\"modal-footer\">"+
                            "            <a class=\"btn btn-default col-md-2 col-md-offset-1\" ng-click=\"cancel()\" ng-href=\"{{messageDetail.messageUrl}}\" target=\"_blank\""+
                            "               ng-if=\"messageDetail.messageUrl!=undefined\">跳转</a>"+
                            "            <button class=\"btn btn-warning\" ng-click=\"cancel()\">关闭</button>"+
                            "        </div>",
                        controller:["$scope","$modalInstance","items","CommonService", function ($scope, $modalInstance,items , CommonService) {
                            var vm = {id:items.id};

                            //页面加载消息详细信息
                            $scope.getMessageDetail = function () {
                                CommonService.getMessageDetail(vm).success(function (data) {
                                    console.log(data);
                                    $scope.messageDetail = data.message;
                                });
                            };

                            $scope.doRead = function () {
                                $scope.messageReadIds = [];
                                $scope.messageReadIds.push(vm.id);
                                CommonService.doRead($scope.messageReadIds).success(function () {});
                            };

                            $scope.cancel = function () {
                                $modalInstance.dismiss("cancel");
                            };
                            $scope.getMessageDetail();
                            $scope.doRead();
                        }] ,
                        resolve: {
                            items: function () {
                                return {id:id};
                            }
                        }
                    });
                    modalInstance.result.then(function () {
                        scope.getMessageList();
                    },function () {
                        scope.getMessageList();
                    });
                }

            }

        };
    }])
    .factory("CommonService",["$http",function($http){
        var service={};
        //消息明细获取
        service.getMessageDetail=function(request) {
            var url="/api/foundation.do";
            return $http({
                method : "POST",
                url : url,
                params:{"method":"api.foundation.message.get"},
                data:request
            });
        };
        //未读消息读取
        service.getMessageList=function() {
            var url="/api/foundation.do";
            return $http({
                method : "POST",
                url : url,
                params:{"method":"api.foundation.messages.get"}
            });
        };
        //已读消息读取
        service.getReadedMessageList=function() {
            var url="/api/foundation.do";
            return $http({
                method : "POST",
                url : url,
                params:{"method":"api.foundation.readedmessage.get"}
            });
        };
        //读消息
        service.doRead=function(messageIdList) {
            var url="/api/foundation.do";
            return $http({
                method : "POST",
                url : url,
                params:{"method":"api.foundation.message.read"},
                data:{"ids":messageIdList}
            });
        };
        return service;
    }]);


angular.module("xn/template/common.html",[]).run(["$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("xn/template/checkboxListLayout.html",
        "<ul class='xn-checkboxList-wrap' ng-class='\"vertical\"==layout?\"xn-checkboxList-wrap-1\":\"xn-checkboxList-wrap-2\"'>"+
            "<li ng-repeat='checkbox in originalList' ng-hide='checkbox.hide'>"+
                "<label class='xn-label-checkboxLayout' ng-click='change(checkbox)'>"+
                    "<span class='icon icon-check-box'>" +
                    "<i class='icon icon-right_3' ng-if='checkbox.state'></i>" +
                    "</span>"+
                    "<span class='xn-checkboxList-value'>{{checkbox.value}}</span>"+
                "</label>"+
            "</li>"+
        "</ul>"
    );
    $templateCache.put("xn/template/common/checkboxList.html",
            "<div class='checkboxList-outer'>"+
            "	<label class=\"mr_15 xn-label-checkbox\" ng-hide='checkbox.hide' ng-repeat=\"checkbox in checkboxList\">"+
            "  		<i class=\"xn-checkbox\"></i>"+
            "  		<i class=\"icon icon-right_3\" ng-if=\"checkbox.state\"></i>"+
            "   	<input type=\"checkbox\" class=\"xn-checkbox-input\" id=\"{{checkbox.key}}{{$index}}\" name=\"{{checkbox.key}}{{$index}}\"  " +
            "       ng-model=\"checkbox.state\">{{checkbox.value}}"+
            "	</label>"+
            "</div>"
    );
    $templateCache.put("xn/template/common/radioList.html",
        "<ul class='xn-radioList-wrap' ng-class='\"vertical\"==layout?\"xn-radioList-wrap-1\":\"xn-radioList-wrap-2\"'>"+
            "<li ng-repeat='radio in originalList'>"+
                "<label class='xn-label-radio' ng-click='change(radio)'>" +
                    "<span ng-class='radio.state?\"radio-btn-choosed\":\"radio-btn\"'></span>" +
                    "<span class='xn-radioList-value'>{{radio.value}}</span>"+
                "</label>"+
                "<span class='xn-radioList-remark' ng-if='radio.remark'>{{radio.remark}}</span>"+
            "</li>"+
        "</ul>"
    );

    $templateCache.put("logo/tpl.html",
            "<div class=\"logo_box_wrap clearfix\" ng-init=\"appDivShow=false\">"+
            "<a class=\"logo_forward\" href=\"{{forwardUrl}}\">"+
            "<div ng-mouseover=\"appDivShow=true\" ng-mouseleave=\"appDivShow=false\" class=\"{{logoClass}} logo_title xn-{{applicationCode}}\" ng-init=\"appCode='{{applicationCode}}'\">"+
            "</div>"+
            "</a>"+
            "<div ng-show=\"appDivShow\" class=\"app_widget\" ng-mouseenter=\"appDivShow=true\" ng-mouseleave=\"appDivShow=false\">"+
            "<div class=\"arrow_div\"></div>"+
            "<div class=\"widget_inner\">"+
            "<ul class=\"app_ul\">"+
            "<li class=\"app_li\" ng-repeat='app in appList'><a href=\"{{app.url}}\"><div class=\"img_div\"><img width='64' height='64' ng-src='{{iconBaseUrl}}icon/application/{{app.applicationId}}.png@64w_64h_90q.jpg'/></div><div class=\"label_div\">{{app.applicationName}}</div></a></li>"+
            "<li class=\"app_li\"><a href='{{allApplicationUrl}}'><div class=\"img_div\"><div class=\"more_app\">更多应用</div></div></a></li>"+
            "</ul>"+
            "</div>"+
            "</div>"+
            "</div>"
    );
    $templateCache.put("personalCenter/tpl.html",
            "<div ng-init=\"show=false;taskDivShow=false;showSetting=false\" class='center_box_wrap'>"+
            "   <div class=\"xn-email icon icon-tips\" ng-click=\"moreMessage()\" ng-mouseover=\"show=true\" ng-mouseleave=\"show=false\">"+
            "       <a ng-if=\"messagesAll.length>0\" class=\"badge\">{{messagesAll.length}}</a>"+
            "   </div>"+
            "   <div class=\"xn-message\" ng-show=\"show\" ng-mouseover=\"show=true\" ng-mouseleave=\"show=false\">"+
            "       <div class=\"xn-hideMessage-top\"></div>"+
            "       <div class=\"modal-content xn-hideMessage showMessage\">"+
            "           <div class=\"xn-header-message\">"+
            "               <ul class=\"content-line\">"+
            "                   <li ng-repeat=\"message in messages\">"+
            "                       <a href=\"javascript:void(0)\" ng-click=\"messageDetail(message.id)\">"+
            "                           <span class=\"xn-view\">{{message.messageTitle}}</span>"+
            "                       </a>"+
            "                   </li>"+
            "               </ul>"+
            "           </div>"+
            "            <div class=\"xn-header-message-more\">"+
            "                <a href='{{xnConfig.myUrl}}message/index.htm' >"+
            "                <span>查看所有的消息</span>"+
            "                </a>"+
            "            </div>"+
            "       </div>"+
            "   </div>"+
            "   <div class=\"xn-task icon icon-mission\" ng-mouseover=\"taskDivShow=true\" ng-mouseout=\"taskDivShow=false\">"+
            "       <a class=\"badge\" ng-if='taskCount>0'>{{taskCount}}</a>"+
            "   </div>"+
            "   <div class=\"task_list_div\" ng-show=\"taskDivShow\" ng-mouseover=\"taskDivShow=true\" ng-mouseout=\"taskDivShow=false\">"+
            "       <div class=\"arrow\"></div>"+
            "       <div class=\"mission_div\">"+
            "           <div class=\"mission_inner_div\">"+
            "               <ul>"+
            "                   <li ng-repeat=\"task in taskList\">"+
            "                       <a href=\"javascript:void(0)\">"+
            "                           <div class=\"li_div\">"+
            "                                <div class=\"avatar_div\">"+
            "                                   <img class=\"avatar f-left\" ng-src=\"{{task.owner.avatar}}\">"+
            "                               </div>"+
            "                               <div class=\"mission_body\">"+
            "                                     <div>{{task.owner.name}}</div>"+
            "                                     <div>{{task.title}}</div>"+
            "                               </div>"+
            "                           </div>"+
            "                       </a>"+
            "                  </li>"+
            "             </ul>"+
            "             </div>"+
            "                   <div class=\"more_div\">"+
            "                        <a href=\"{{xnConfig.myUrl}}message/index.htm\">查看更多动态</a>"+
            "                   </div>"+
            "             </div>"+
            "       </div>"+
            "       <div ng-mouseover=\"showSetting=true\" ng-mouseleave=\"showSetting=false\" class=\"avatar_div\">"+
            "           <img class=\"avatar f-right\" ng-src=\"{{avatarUrl}}@40w_40h_90q\">"+
            "       </div>"+
            "       <div class=\"hideSetting showSetting setting_div\" ng-show=\"showSetting\" ng-mouseover=\"showSetting=true\" ng-mouseleave=\"showSetting=false\">"+
            "       <div class=\"hideSetting-top\"></div>"+
            "           <div class=\"hideSetting-content clearfix\">"+
            "           <ul>"+
            "           <li>"+
            "           <a title=\"关于本系统\" href=\"{{aboutUrl}}\" target=\"_blank\">"+
            "           <i class=\"icon icon-system\"></i>关于本系统"+
            "           </a>"+
            "           </li>"+
            "           <li class=\"bb\">"+
            "           <a title=\"应用商店\" class=\"disabled\">"+
            "           <i class=\"icon icon-store\"></i>应用商店"+
            "           </a>"+
            "           </li>"+
            "           <li>"+
            "           <a title=\"系统偏好设置\" class=\"disabled\">"+
            "           <i class=\"icon icon-system_individuation\"></i>系统偏好设置"+
            "           </a>"+
            "           </li>"+
            "           <li>"+
            "           <a title=\"承租人信息\" href=\"{{xnConfig.myUrl}}tenant\">"+
            "           <i class=\"icon icon-renter\"></i>承租人信息"+
            "           </a>"+
            "           </li>"+
            "           <li>"+
            "           <a title=\"修改密码\" href=\"{{xnConfig.authUrl}}change.htm\">"+
            "           <i class=\"icon icon-tubiaoxiugaimima01\"></i>修改密码"+
            "           </a>"+
            "           </li>"+
            "           <li >"+
            "           <a title=\"个人信息\" href=\"{{xnConfig.myUrl}}profileView\">"+
            "           <i class=\"icon icon-personal_information\"></i>个人信息"+
            "           </a>"+
            "           </li>"+
            "           <li class=\"bb\">"+
            "           <a title=\"个人信息\" href=\"{{xnConfig.myUrl}}pan/file\">"+
            "           <i class=\"icon icon-personal_information\"></i>个人网盘"+
            "           </a>"+
            "           </li>"+
            "           <li>"+
            "           <a title=\"最近使用的功能\" class=\"disabled\">"+
            "           <i class=\"icon icon-Recently\"></i>最近使用的功能"+
            "           </a>"+
            "           </li>"+
            "           <li class=\"bb\">"+
            "           <a title=\"历史记录\" class=\"disabled\">"+
            "           <i class=\"icon icon-history\"></i>历史记录"+
            "           </a>"+
            "           </li>"+
            "           </ul>"+
            "           <a class=\"btn f-right exit btn-danger\" href=\"{{xnConfig.authUrl}}logout.htm\">注销</a>"+
            "           </div>"+
            "           </div>"+
            "</div>"
    );
}]);