/**
 * Created by Administrator on 2015/2/27.
 */
angular.module("xn.directive.form",[])
    .provider('xnValidator', [function () {
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
                                    var elementErrors = [];
                                    var error_message = angular.element(elem).attr("error_message");
                                    if(error_message){
                                        elementErrors = [error_message];
                                    } else {
                                        elementErrors = xnValidator.getErrorMessages(elem, scope[formName][elem.name].$error);
                                    }
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
    .directive("xnFormSubmit", ['$parse','xnValidator',"XN_BEGIN_REQUEST", "XN_END_REQUEST", function ($parse,xnValidator, XN_BEGIN_REQUEST, XN_END_REQUEST){
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
                    if (!angular.isFunction(form.doValidate)) {
                        formBindValidate(element.parents("form"));
                    }
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

                var formBindValidate = function(form){
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
                                        var elementErrors = [];
                                        var error_message = angular.element(elem).attr("error_message");
                                        if(error_message){
                                            elementErrors = [error_message];
                                        } else {
                                            elementErrors = xnValidator.getErrorMessages(elem, scope[formName][elem.name].$error);
                                        }
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
            }
        };
    }])
    .directive("xnSubmitEnter", ['$parse','xnValidator', "XN_BEGIN_REQUEST", "XN_END_REQUEST", function ($parse,xnValidator, XN_BEGIN_REQUEST, XN_END_REQUEST) {
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
                    if (!angular.isFunction(form.doValidate)) {
                        formBindValidate(element.parents("form"));
                    }
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

                            if (!angular.isFunction(form.doValidate)) {
                                formBindValidate(element.parents("form"));
                            }
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

                var formBindValidate = function(form){
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
                                        var elementErrors = [];
                                        var error_message = angular.element(elem).attr("error_message");
                                        if(error_message){
                                            elementErrors = [error_message];
                                        } else {
                                            elementErrors = xnValidator.getErrorMessages(elem, scope[formName][elem.name].$error);
                                        }
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
            }
        };
    }]);