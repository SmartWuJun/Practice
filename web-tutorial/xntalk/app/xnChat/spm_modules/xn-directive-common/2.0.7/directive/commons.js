//验证
angular.module("xn.directive.common",["xn/template/common.html"])
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
    .directive('xnFixed', ["$window","$timeout",function ($window,$timeout) {
        return {
            restrict: "AC",
            link: function (scope, element,attrs) {
                var scrollTop=0;
                var setTop=attrs.xnNavTop;
                if(setTop==undefined || setTop=="null"){
                    setTop=element[0].offsetTop;
                }
                $timeout(function () {
                    element.parent().css("height",element.height());
                },0);

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
    }])
    .value("xnConfig", [])
    .filter('substr', function() {
        return function(input,start) {

            String.prototype.lengthB = function( ){
                var b = 0, l = this.length;
                if( l ){
                    for( var i = 0; i < l; i ++ ){
                        if(this.charCodeAt( i ) > 255 ){
                            b += 2;
                        }else{
                            b ++ ;
                        }
                    }
                    return b;
                }else{
                    return 0;
                }
            };

            if(input){
                var data="";
                if(start){
                    if(input.lengthB()>start){
                        data =input.substr(0, start)+"...";
                    }else{
                        data =input.substr(0, start)
                    }
                }else{
                    data=input;
                }
                return data;
            };
        }
    })
    .directive("headerInfoCenter", ["$modal","CommonService","xnConfig",function($modal,CommonService,xnConfig) {
        var config = [];
        var defaultInfoConfig={"isShowApp":true,"isShowCustomer":true,"isShowYun":true,"isShowAddressBook":true};
        if(xnConfig){
            config = angular.extend(config, xnConfig);
        };
        return {
            restrict: "AE",
            scope: {
                aboutUrl: "@",
                iconBaseUrl: "@",
                defaultShow:"="
            },
            templateUrl: "headerInfoCenter/tpl.html",
            link: function(scope,element,atter,ngModel) {
                if(config){
                    scope.xnConfig = config
                }
                /*赋值哪些显示哪些不显示*/
                if(scope.defaultShow && angular.isObject(scope.defaultShow)){
                    scope.showConfig=angular.extend(defaultInfoConfig, scope.defaultShow);
                }else {
                    scope.showConfig=defaultInfoConfig;
                }
                /*获取应用列表*/
                scope.getAppList=function(){
                    CommonService.getCommonlyAppList().success(function(data) {
                        scope.appList = [];
                        scope.appAll = data.result;
                        if (scope.appAll != undefined) {
                            if (data.result.length > 8) {
                                for (var i = 0; i <8; i++) {
                                    scope.appList.push(data.result[i]);
                                }
                            } else {
                                scope.appList = data.result;
                            }
                        }else{
                            scope.appAll=[];
                        }
                    });
                };
                scope.getAppList();

                //获取消息列表
                scope.getMessageList = function () {
                    CommonService.getMessageList().success(function (data) {
                        scope.messages = [];
                        scope.messagesAll = data.result;
                        if (scope.messagesAll != undefined) {
                            if (data.result.length > 10) {
                                for (var i = 0; i < 10; i++) {
                                    scope.messages.push(data.result[i]);
                                }
                            } else {
                                scope.messages = data.result;
                            }
                        }else{
                            scope.messagesAll=[];
                        }
                    });
                };
                scope.getMessageList();
                /*获取任务列表*/
                scope.getTaskList = function () {
                    CommonService.getTaskList().success(function (data) {
                        scope.tasks = [];
                        scope.tasksAll = data.result;
                        if (scope.tasksAll != undefined) {
                            if (data.result.length > 10) {
                                for (var i = 0; i < 10; i++) {
                                    scope.tasks.push(data.result[i]);
                                }
                            } else {
                                scope.tasks = data.result;
                            }
                        }else{
                            scope.tasksAll=[];
                        }
                    });
                };
                scope.getTaskList();

                scope.messageDetail=function(id){
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
            /*  var url="http://local.xiniunet.com/api/foundation.do";*/
            var url=xnConfig.myUrl+"api/foundation.do";
            return $http({
                method : "get",
                withCredentials:true,
                url : url,
                params:{"method":"api.foundation.message.get","ids":[request.id]}
                //data:request
            });
        };
        //未读消息读取
        service.getMessageList=function() {
            var url=xnConfig.myUrl+"api/foundation.do";
            return $http({
                method : "POST",
                withCredentials:true,
                url : url,
                params:{"method":"api.foundation.messages.get"}
            });
        };
        //已读消息读取
        service.getReadedMessageList=function() {
            var url=xnConfig.myUrl+"api/foundation.do";
            return $http({
                method : "POST",
                withCredentials:true,
                url : url,
                params:{"method":"api.foundation.readedmessage.get"}
            });
        };
        //读消息
        service.doRead=function(messageIdList) {
            /*    var url="http://local.xiniunet.com/api/foundation.do";*/
            var url=xnConfig.myUrl+"api/foundation.do";
            return $http({
                method : "POST",
                withCredentials:true,
                url : url,
                params:{"method":"api.foundation.message.read","ids":messageIdList}
            });
        };
        //待办任务获取
        service.getTaskList=function() {
            var url=xnConfig.myUrl+"api/foundation.do";
            return $http({
                method : "POST",
                withCredentials:true,
                url : url,
                params:{"method":"api.foundation.tasks.get"}
            });
        };
        //获取应用列表
        service.getCommonlyAppList = function () {
            var url = xnConfig.myUrl+"system/api.do";
            return $http({
                method: "POST",
                withCredentials:true,
                url: url,
                params: {"method": "api.platform.application.get.commonly"}
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

    $templateCache.put("headerInfoCenter/tpl.html",
        "<div class='xn-pharos clearfix'>"
        + " <ul class='header-right clearfix' ng-init='phoneApp=false;showApp=false;showMessage=false;showTask=false;showPersonInfo=false;'>"
        +"      <li class='header-li' ng-show='showConfig.isShowApp'>"
        +"          <span class='light-item'  ng-mouseover='phoneApp=true;' ng-mouseleave='phoneApp=false'><a class='light-txt'>手机APP</a>"
        +"              <div class='header-list phone-app' ng-show='phoneApp==true' ng-mouseover='phoneApp=true;' ng-mouseleave='phoneApp=false'>"
        +"                  <div class='hide-tri'></div>"
        +"                  <div class='header-info-ul'>"
        +                           "<img src='https://cdn.xiniunet.com/web/auth/img/xntalk.jpg' width='100%'>"
        +"                  </div>"
        +"              </div>"
        +"          <span>"
        +"      </li>"
        +"      <li class='header-li' ng-class=\"!showConfig.isShowCustomer&&!showConfig.isShowYun&&!showConfig.isShowAddressBook?'header-none':''\">"
        +"          <span class=\"light-item\"  ng-show='showConfig.isShowYun'><a class='light-txt ' href='{{xnConfig.myUrl}}pan/file.htm'  target='_blank'>云盘</a></span>"
        +"          <span class=\"light-item\"  ng-show='showConfig.isShowCustomer'><a class='light-txt ' href='{{xnConfig.serviceUrl}}feedback/create.htm' target='_blank'>客服</a></span>"
        +"          <span class=\"light-item\"  ng-show='showConfig.isShowAddressBook'><a class='light-txt' href='{{xnConfig.employeeUrl}}addressBook.htm' target='_blank'>企业通讯录</a></span>"
        +"      </li>"
        +"      <li class='header-li'>"
        +"          <span class=\"light-item\"><a class='deep-txt' href='{{xnConfig.employeeUrl}}index.htm' target=\"_self\">首页</a></span>"
        +"          <span class=\"light-item\" ng-mouseover='showApp=true;' ng-mouseleave='showApp=false'>"
        +"              <a class='deep-txt  orange-txt' href='{{xnConfig.employeeUrl}}application.htm' target=\"_self\" >应用中心</a>"
        //#*常用应用下拉框*#
        +"              <div class='header-list app-list' ng-show='showApp==true' ng-mouseover='showApp=true;' ng-mouseleave='showApp=false'>"
        +"                  <div class='hide-tri'></div>"
        +"                  <ul class='header-info-ul'>"
        +"                      <li class='header-info-li' ng-repeat='app in appList' ng-if=\"$index<8\" >"
        +"                          <a href='{{app.url}}'>"
        +"                              <img class ='app-img' ng-src='{{iconBaseUrl}}icon/application/{{app.applicationId}}.png'/>"
        +"                              <span>{{app.applicationName}}</span>"
        +"                          </a>"
        +"                      </li>"
        +"                      <div class=\"header-no-info\" ng-if=\"appList.length==0\"><span class='img'>暂无常用应用</span></div>"
        +"                      <li class='header-info-li info-bottom'>"
        +"                          <a href='{{xnConfig.employeeUrl}}application.htm'>"
        +"                              <span class ='app-all-img'><i class='icon icon-app'></i></span>"
        +"                              <span class='app-name'>全部应用</span>"
        +"                          </a>"
        +"                      </li>"
        +"                  </ul>"
        +"              </div>"
        +"          </span>"
        +"       </li>"
        +"      <li class='header-li'>"
        +"          <span class=\"light-item\"  ng-mouseover='showMessage=true;' ng-mouseleave='showMessage=false'>"
        +"              <a class='deep-txt' href='{{xnConfig.myUrl}}message/index.htm'>消息<span class='number' ng-show='messagesAll.length>0'>{{messagesAll.length}}</span></a>"
        //消息下拉框
        +"              <div class='header-list message-list' ng-show='showMessage==true' ng-mouseover='showMessage=true;' ng-mouseleave='showMessage=false'>"
        +"                  <div class='hide-tri'></div>"
        +"                  <ul class='header-info-ul'>"
        +"                     <li class='header-info-li' ng-repeat='message in messages'>"
        +"                          <a ng-click='messageDetail(message.id)'><span>{{message.messageTitle | substr:20}}</span></a>"
        +"                      </li>"
        +"                      <div class=\"header-no-info\" ng-if=\"messages.length==0\"><span class='img'>暂无消息</span></div>"
        +"                      <li class='header-info-li info-bottom xn-text-center' >"
        +"                          <a href='{{xnConfig.myUrl}}message/index.htm'>查看全部</a>"
        +"                      </li>"
        +"                  </ul>"
        +"               </div>"
        +"           </span>"
        +"           <span  class=\"light-item\" ng-mouseover='showTask=true;' ng-mouseleave='showTask=false'>"
        +"              <a  class='deep-txt ' href='{{xnConfig.myUrl}}task/futrue.htm'>任务<span class='number'ng-show='tasksAll.length>0'>{{tasksAll.length}}</span></a>"
        //任务下拉框
        +"              <div class='header-list task-list' ng-show='showTask==true' ng-mouseover='showTask=true;' ng-mouseleave='showTask=false'>"
        +"                  <div class='hide-tri'></div>"
        +"                  <ul class='header-info-ul'>"
        +"                       <li class='header-info-li' ng-repeat='task in tasks'>"
        +"                           <a href='{{task.assignReason}}'>"
        +"                            <span>{{task.owner.name}}{{task.assignCode | substr:40}}</span>"
        +"                            </a>"
        +"                       </li>"
        +"                      <div class=\"header-no-info\" ng-if=\"tasks.length==0\"><span class='img'>暂无任务</span></div>"
        +"                       <li class='header-info-li info-bottom xn-text-center'>"
        +"                           <a href='{{xnConfig.myUrl}}task/futrue.htm'><span>查看全部</span></a>"
        +"                       </li>"
        +"                  </ul>"
        +"               </div>"
        +"           </span>"
        +"       </li>"
        +"       <li class='header-li'>"
        +"          <span class=\"light-item\" ng-mouseover='showPersonInfo=true;' ng-mouseleave='showPersonInfo=false'>"
        +"              <a  class='deep-txt ' href='{{xnConfig.myUrl}}task/futrue.htm'>个人中心</a>"
        +"              <div class='header-list info-list' ng-show='showPersonInfo==true' ng-mouseover='showPersonInfo=true;'ng-mouseleave='showPersonInfo=false'>"
        +"                  <div class='hide-tri'></div>"
        +"                  <ul class='header-info-ul'>"
        +"                      <li class='header-info-li'>"
        +"                          <a title='个人信息' href='{{xnConfig.myUrl}}profileView'>"
        +"                           <i class='icon icon-individual'></i><span>个人信息</span></a>"
        +"                      </li>"
        +"                      <li class='header-info-li '>"
        +"                          <a title='承租人信息' href='{{xnConfig.myUrl}}tenant'>"
        +"                          <i class='icon icon-renter '></i><span>承租人信息</span></a>"
        +"                      </li>"
        +"                      <li class='header-info-li '>"
        +"                          <a title='个人网盘' href='{{xnConfig.myUrl}}pan/file'>"
        +"                          <i class='icon icon-onlinedisk '></i><span>个人网盘</span></a>"
        +"                      </li>"
        +"                      <li class='header-info-li'>"
        +"                          <a title='修改密码' href='{{xnConfig.authUrl}}change.htm'>"
        +"                          <i class='icon icon-modifypassword '></i><span>修改密码</span></a>"
        +"                      </li>"
        +"                      <li class='header-info-li'>"
        +"                          <a title='关于本系统' href='{{aboutUrl}}' target='_blank'>"
        +"                          <i class='icon icon-aboutthissystem'></i><span>关于本系统</span></a>"
        +"                      </li>"
        +"                      <li class='header-info-li info-bottom'>"
        +"                          <a title='退出' href='{{xnConfig.authUrl}}logout.htm'>"
        +"                          <i class='icon icon-quit'></i><span>退出</span></a>"
        +"                      </li>"
        +"                  </ul>"
        +"              </div>"
        +"          </span>"
        +"      </li>"
        +"  </ul>"
        +"</div>"
    );
}]);