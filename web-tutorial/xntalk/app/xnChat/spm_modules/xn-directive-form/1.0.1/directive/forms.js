/**
 * Created by Administrator on 2015/2/27.
 */
angular.module("xn.directive.form",[])
    //表单验证
    .directive("xnFormValidate", ['$parse', 'xnValidator', function ($parse, xnValidator) {
        return{
            link: function (scope, form, attr) {
                var formElem = form[0],
                    formName = form.attr("name"),
                    formSubmitFn = $parse(attr.xnSubmit),
                    options = scope.$eval(attr.xnFormValidate);
                // xnFormValidate has value,watch it
                if (attr.xnFormValidate) {
                    scope.$watch(attr.xnFormValidate, function (newValue) {
                        if (newValue) {
                            options = angular.extend({}, xnValidator.options, newValue);
                        }
                    }, true)
                }
                options = angular.extend({}, xnValidator.options, options);

                //初始化验证规则，并时时监控输入值的变话
                for (var i = 0; i < formElem.length; i++) {
                    var elem = formElem[i];
                    var $elem = angular.element(elem);
                    if (xnValidator.elemTypes.toString().indexOf(elem.type) > -1 && !xnValidator.isEmpty(elem.name)) {
                        var $viewValueName = formName + "." + elem.name + ".$viewValue";
                        //监控输入框的value值当有变化时移除错误信息
                        //可以修改成当输入框验证通过时才移除错误信息，只要监控$valid属性即可
                        scope.$watch("[" + $viewValueName + "," + i + "]", function (newValue) {
                            var $elem = formElem[newValue[1]];
                            scope[formName].$errors = [];
                            xnValidator.removeError($elem, options);
                        }, true);

                        //光标移走的时候触发验证信息
                        if (options.blurTrig) {
                            $elem.bind("blur", function () {
                                if (!options.blurTrig) {
                                    return;
                                }
                                var $elem = angular.element(this);
                                if (!scope[formName][this.name].$valid) {
                                    var errorMessages = xnValidator.getErrorMessages(this, scope[formName][this.name].$error);
                                    xnValidator.showError($elem, errorMessages, options);
                                } else {
                                    xnValidator.removeError($elem, options);
                                }
                            });
                        }
                    }
                }
                //触发验证事件
                var doValidate = function () {
                    var errorMessages = [];
                    //循环验证
                    for (var i = 0; i < formElem.length; i++) {
                        var elem = formElem[i];
                        if (xnValidator.elemTypes.toString().indexOf(elem.type) > -1 && !xnValidator.isEmpty(elem.name)) {
                            if(scope[formName][elem.name]) {
                                if (scope[formName][elem.name].$valid) {
                                    angular.element(elem).removeClass("error").addClass("valid");
                                    continue;
                                } else {
                                    var elementErrors = xnValidator.getErrorMessages(elem, scope[formName][elem.name].$error);
                                    errorMessages.push(elementErrors[0]);
                                    xnValidator.removeError(elem, options);
                                    xnValidator.showError(elem, elementErrors, options);
                                    angular.element(elem).removeClass("valid").addClass("error");
                                }
                            }
                        }
                    }
                    if (!xnValidator.isEmpty(errorMessages) && errorMessages.length > 0) {
                        scope[formName].$errors = errorMessages;
                    } else {
                        scope[formName].$errors = [];
                    }
                    if (!scope.$$phase) {
                        scope.$apply(scope[formName].$errors);
                    }
                };
                scope[formName].doValidate = doValidate;
                //xnSubmit is function
                if (attr.xnSubmit && angular.isFunction(formSubmitFn)) {

                    form.bind("submit", function () {
                        doValidate();
                        if (scope[formName].$valid && angular.isFunction(formSubmitFn)) {
                            scope.$apply(function () {
                                formSubmitFn(scope);
                            });
                        }
                    });
                }
            }
        };
    }])
    .directive("xnFormSubmit", ['$parse', "XN_BEGIN_REQUEST", "XN_END_REQUEST", function ($parse, XN_BEGIN_REQUEST, XN_END_REQUEST){
        "use strict";
        return{
            link: function (scope, element, attr) {
                var validSuccessFn = $parse(attr.xnFormSubmit);
                var formName = element.parents("form").attr("name");
                var form = scope.$eval(formName);
                if (!form) {
                    throw new Error("xnFormSubmit form is empty.");
                    return;
                }
                element.bind("click", function () {
                    if (angular.isFunction(form.doValidate)) {
                        form.doValidate();
                    }
                    if (form.$valid && angular.isFunction(validSuccessFn)) {
                        scope.$apply(function () {
                            validSuccessFn(scope);
                        });
                    }
                });
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
    .directive("xnSubmitEnter", ['$parse', "XN_BEGIN_REQUEST", "XN_END_REQUEST", function ($parse, XN_BEGIN_REQUEST, XN_END_REQUEST) {
        return{
            link: function (scope, element, attr) {
                var validSuccessFn = $parse(attr.xnSubmitEnter);
                var formName = element.parents("form").attr("name");
                var form = scope.$eval(formName);
                if (!form) {
                    throw new Error("xnSubmitEnter form is empty.");
                    return;
                }
                element.bind("click", function () {
                    if (angular.isFunction(form.doValidate)) {
                        form.doValidate();
                    }
                    if (form.$valid && angular.isFunction(validSuccessFn)) {
                        scope.$apply(function () {
                            validSuccessFn(scope);
                        });
                    }
                });

                element.parents("form").bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        var currentInput = document.activeElement;
                        //获取元素设置是否回车
                        var submitEnter = true;
                        if(angular.element(currentInput).attr("data-submit-enter")=="false"){
                            submitEnter=false;
                        }
                        if (currentInput.type !== "textarea" && submitEnter) {
                            element.find("button").focus();//修改之前的代码
                            currentInput.focus();
                            if (angular.isFunction(form.doValidate)) {
                                form.doValidate();
                            }
                            event.preventDefault();
                            if (form.$valid && angular.isFunction(validSuccessFn)) {
                                scope.$apply(function () {
                                    validSuccessFn(scope);
                                });
                            }
                        }
                    }
                });
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
    }]);