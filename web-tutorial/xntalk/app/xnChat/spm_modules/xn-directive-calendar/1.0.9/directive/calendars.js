/**
 * Created by DEV005 on 2015/8/26.
 * 赵星
 */
angular.module("xn.directive.calendar",["xn/template/calendar.html"])
        .directive('xnYearMonth',function () {
        return {
            restrict: "A",
            templateUrl: "xn/template/calendar/yearMonth.html",
            scope: {
                selectedMonth: '=ngModel',
                yearMonth:'=yearMonth'
            },
            replace: true,
            require: "?ngModel",
            link: function (scope, elem, attrs, ngModel) {
                if (!ngModel) return;
                //var wrapper = elem.find(".xn-yearmonth-card");
                //var of = wrapper.offset();
                if(!scope.selectedMonth){
                    scope.selectedMonth={
                        text:"",
                        year:""
                    };
                }

                var selectedMonth = scope.selectedMonth;

                scope.$watch("yearMonth",function(newdata){
                    if(newdata){
                        selectedMonth.text=angular.copy(newdata);
                        selectedMonth.year=Number(angular.copy(newdata.substr(0,4)));
                        scope.year=Number(angular.copy(newdata.substr(0,4)));
                    }
                });

                scope.name= attrs.name;
                scope.year = new Date().getFullYear();
                scope.month = new Date().getMonth();
                scope.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
                scope.selectMonth = function (index) {
                    scope.month=index + 1;
                    var format="";
                    if(scope.month.toString().length==1){
                        format="0"+scope.month;
                    }else{
                        format=scope.month.toString();
                    }
                    selectedMonth.text=scope.year.toString()+format.toString();
                    selectedMonth.year=scope.year;

                    scope.openMoth=false;
                      //console.log(selectedMonth.text);

                };
                scope.previousYear = function () {
                    scope.year = scope.year - 1;
                    var format="";
                    if(scope.month.toString().length==1){
                        format="0"+scope.month;
                    }else{
                        format=scope.month.toString();
                    }
                    selectedMonth.text=scope.year.toString()+format.toString();
                    selectedMonth.year=scope.year;
                };
                scope.nextYear = function () {
                    scope.year = scope.year + 1;
                    var format="";
                    if(scope.month.toString().length==1){
                        format="0"+scope.month;
                    }else{
                        format=scope.month.toString();
                    }
                    selectedMonth.text=scope.year.toString()+format.toString();
                    selectedMonth.year=scope.year;
                };
                scope.doSelect = function () {
                    scope.openMoth=true;
                };

                scope.clear=function(){
                    selectedMonth.text="";
                    selectedMonth.year="";
                    scope.openMoth=false;
                };
                //非当前区域点击隐藏
                scope.monthId="monthId"+new Date().getTime();
                var getPar = function(tar) {
                    if(tar.id==scope.monthId){
                        scope.count++;
                    }
                    if(tar.parentElement){
                        getPar(tar.parentElement);
                    }
                };

                angular.element(document).bind("click", function(e) {
                    scope.count = 0;
                    getPar(e.target);
                    if(scope.count == 0) {
                        scope.$apply(function(){
                            scope.openMoth = false;
                        });
                    }
                });
            }
        };
    })
        .directive("xnHms", function () {
    return {
        restrict: "AC",
        templateUrl: "xn/template/calendar/hms.html",
        scope: {
            selectTime: '=ngModel'
        },
        replace: true,
        require: "?ngModel",
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return;
            scope.vm = {
                hours: "",
                minutes: "",
                seconds: "",
                isMinutes: true,
                isSeconds: true
            };

            scope.$watch("selectTime", function (newdata) {
                if(newdata){
                    scope.vm.hours = newdata.split(":")[0];
                    scope.vm.minutes = newdata.split(":")[1];
                    scope.vm.seconds = newdata.split(":")[2];
                }
            });

            //改变时间

            scope.settingTime = function (state) {
                if (scope.vm.hours) {
                    if (!scope.vm.minutes) {
                        scope.vm.minutes = "00"
                    }
                    if (!scope.vm.seconds) {
                        scope.vm.seconds = "00"
                    }
                }
                scope.selectTime = scope.vm.hours + ":" + scope.vm.minutes + ":" + scope.vm.seconds;

                scope.vm.isMinutes = false;
                scope.vm.isSeconds = false;
            };

            //清空
            scope.cleartimebox = function () {
                scope.vm.hours = "";
                scope.vm.minutes = "";
                scope.vm.seconds = "";

                scope.selectTime = "";
                scope.vm.isMinutes = true;
                scope.vm.isSeconds = true;

                scope.timebox = !scope.timebox;
            };

            scope.timebox = false;
            scope.hoursList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
            scope.minuteList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
            scope.secondList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

            //显示选择框
            scope.showhmtab = function () {
                scope.timebox = !scope.timebox;
            };
            //确定
            scope.confirmTime = function () {

                if (scope.vm.hours) {
                    scope.selectTime = scope.vm.hours + ":" + scope.vm.minutes + ":" + scope.vm.seconds;

                } else {
                    scope.selectTime = "";
                }

                scope.timebox = !scope.timebox;


            };
            //非当前区域点击隐藏timebox
            scope.timeId="timeId"+new Date().getTime();

            var getPar = function(tar) {
                if(tar.id==scope.timeId){
                    scope.count++;
                }
                if(tar.parentElement){
                    getPar(tar.parentElement);
                }
            };

            angular.element(document).bind("click", function(e) {
                scope.count = 0;
                getPar(e.target);
                if(scope.count == 0) {
                    scope.$apply(function(){

                        scope.timebox = false;
                    });
                }
            });

        }
    };

})
        .directive('xnMonthDate',function () {
        return {
        restrict: "AE",
        templateUrl: "xn/template/calendar/monthDateHtml.html",
        scope: {
            selectedDate: '=ngModel'
        },
        replace: true,
        require: "?ngModel",
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return;
            scope.vm={
                date:"",
                month:""
            };

            //获取当前月日
            var month=new Date().getMonth()+1;
            scope.vm.month = month;


            //上一个月
            scope.previousMonth = function () {
                scope.vm.date="";
                if(scope.vm.month <= 1){
                    scope.vm.month = 12;
                }else{
                    scope.vm.month = scope.vm.month - 1;

                }

            };

            //下一个月
            scope.nextMonth = function () {
                scope.vm.date="";
                if(scope.vm.month >=12){
                    scope.vm.month = 1;
                }else{
                    scope.vm.month = scope.vm.month + 1;
                }

            };

            //显示日期选择框
            scope.doSelect = function () {
                scope.openDate=true;


            };

            //显示今天的日期
            scope.dateToday =function(){
                var month=new Date().getMonth()+1;
                scope.vm.month = month;
                var date=new Date().getDate();
                scope.vm.date = date;
                scope.selectedDate=scope.vm.month+'-'+scope.vm.date;
                scope.openDate=false;
            };

            //清空
            scope.clearDate =function(){
                scope.selectedDate="";
                scope.openDate=false;
                console.log(scope.selectedDate);

            };
            //关闭
            scope.closeDate =function(){
                if(scope.vm.date==""){
                    scope.vm.date="01";
                    scope.selectedDate=scope.vm.month+'-'+scope.vm.date;
                }
                scope.openDate=false;

            };

            //按照月份判断当月天数
            scope.$watch("vm.month",function(){
            if(scope.vm.month == 4 || scope.vm.month == 6 || scope.vm.month == 9 || scope.vm.month == 11){
                scope.dateList = ["01", "02", "03", "04", "05", "06", "07", "08", "09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];

            }if(scope.vm.month == 2){
                scope.dateList = ["01", "02", "03", "04", "05", "06", "07", "08", "09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29"];

            }if(scope.vm.month == 1||scope.vm.month == 3||scope.vm.month == 5||scope.vm.month == 7||scope.vm.month == 8||scope.vm.month == 10||scope.vm.month == 12){
                scope.dateList = ["01", "02", "03", "04", "05", "06", "07", "08", "09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
                }

            });

            //选择日期
            scope.selectDate = function ($index) {
                scope.vm.date = scope.dateList[$index];
                scope.selectedDate=scope.vm.month+'-'+scope.vm.date;
                scope.openDate=false;
            };

            //非当前区域点击隐藏
            scope.dateId="date"+new Date().getTime();
            console.log(scope.dateId);

            var getPar = function(tar) {
                if(tar.id==scope.dateId){
                    scope.count++;
                }
                if(tar.parentElement){
                    getPar(tar.parentElement);
                }
            };

            angular.element(document).bind("click", function(e) {
                scope.count = 0;
                getPar(e.target);
                if(scope.count == 0) {
                    scope.$apply(function(){
                        scope.openDate=false;
                    });
                }
            });

        }
    };
})
        .directive("xnHm", function () {
        return {
            restrict: "AC",
            templateUrl: "xn/template/calendar/minute.html",
            scope: {
                selectHm: '=ngModel'
            },
            replace: true,
            require: "?ngModel",
            link: function (scope, elem, attrs, ngModel) {
                if (!ngModel) return;
                scope.vm = {
                    hours: "",
                    minutes: "",
                    isMinutes: true
                };

                scope.$watch("selectHm", function (newdata) {
                    if(newdata){
                        scope.vm.hours = newdata.split(":")[0];
                        scope.vm.minutes = newdata.split(":")[1];
                    }
                });

                //改变时间

                scope.settingTime = function (state) {

                    if(scope.vm.hours==null){
                        scope.vm.isMinutes=true;
                    }else{
                        scope.vm.isMinutes = false;
                    }
                    if (scope.vm.hours) {
                        if (!scope.vm.minutes) {
                            scope.vm.minutes = "00"
                        }
                        scope.selectHm = scope.vm.hours + ":" + scope.vm.minutes ;
                    }
                    //scope.vm.isMinutes = false;
                };

                //清空
                scope.cleartimebox = function () {
                    scope.vm.hours = "";
                    scope.vm.minutes = "";

                    scope.selectHm = "";
                    scope.vm.isMinutes = true;

                    scope.timebox = !scope.timebox;
                };

                scope.timebox = false;
                scope.hoursList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
                scope.minuteList = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

                //显示选择框
                scope.showhmtab = function () {
                    scope.timebox = !scope.timebox;
                };
                //确定
                scope.confirmTime = function () {

                    if (scope.vm.hours) {
                        scope.selectHm = scope.vm.hours + ":" + scope.vm.minutes;

                    } else {
                        scope.selectHm = "";
                        scope.vm.hours = "";
                        scope.vm.minutes = "";
                    }

                    scope.timebox = !scope.timebox;


                };
                //非当前区域点击隐藏timebox
                scope.hmId="timeId"+new Date().getTime();

                var getPar = function(tar) {
                    if(tar.id==scope.hmId){
                        scope.count++;
                    }
                    if(tar.parentElement){
                        getPar(tar.parentElement);
                    }
                };

                angular.element(document).bind("click", function(e) {
                    scope.count = 0;
                    getPar(e.target);
                    if(scope.count == 0) {
                        scope.$apply(function(){

                            scope.timebox = false;
                        });
                    }
                });

            }
        };

    })


angular.module("xn/template/calendar.html",
    [
        "xn/template/calendar/time.html",
        "xn/template/calendar/month.html",
        "xn/template/calendar/monthDate.html",
        "xn/template/calendar/hourMinute.html"
    ]);

angular.module("xn/template/calendar/hourMinute.html", []).run(["$templateCache", function ($templateCache) {
    "use strict";
    $templateCache.put("xn/template/calendar/minute.html",
        "<div class='xn-hourminute' id=\"{{hmId}}\">" +
        "<div class='clearfix width-100-percent'  ng-click=\"showhmtab()\"  >" +
        "<div class='clearfix xn-line-normal'>" +
        "<span class=\"width-60-time f-left\">{{vm.hours}}</span><span class='xn-block f-left m-6 '>时</span>"+
        "<span class=\"width-60-time f-left\">{{vm.minutes}}</span><span class='xn-block f-left m-6'>分</span>" +
        "</div>" +
        "</div>" +
        "<div class=\"hmstab\"  ng-show=\"timebox\" >" +
        "<ul>" +
        "<li>" +
        "<select class=\"time-select\" ng-model=\"vm.hours\"  ng-change=\"settingTime()\" ng-options=\"hours for hours in hoursList\" ng-required >" +
        " <option value=\"\">--小时--</option>" +
        "</select>" +
        "</li>" +
        "<li>" +
        "<select class=\"time-select\"  ng-model=\"vm.minutes\" ng-disabled=\"vm.isMinutes\" ng-change=\"settingTime()\"  ng-options=\"minutes for minutes in minuteList\" >" +
        " <option value=\"\">--分钟--</option>" +
        "</select>" +
        "</li>" +
        "</ul>" +
        "<div class=\" btncon\">" +
        "<a class=\"rightborder\"ng-click=\"confirmTime()\" >确定</a>" +
        "<a ng-click=\"cleartimebox()\">清空</a>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
}]);

angular.module("xn/template/calendar/monthDate.html",[]).run(["$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("xn/template/calendar/monthDateHtml.html",
    "<div class=\"xn-month-date\" id=\"{{dateId}}\">"+
            "<div class='date-input' ng-click=\"doSelect()\" >" +
                "<div>"+
                    "<span>{{selectedDate}}</span>" +
                "</div>"+
            "</div>"+
        "<div class=\"xn-month-date-card \" ng-show=\"openDate\">"+
         "<div class=\"cleardate\"ng-click=\"clearDate()\">清空</div>"+
                "<button type=\"button\" class=\"close\" ng-click=\"openDate=false;\">×</button>"+
            "<div>"+
                    "<button ng-click=\"previousMonth()\" class=\"button\">" +
                        "<i class=\"glyphicon glyphicon-chevron-left\"></i>" +
                    "</button>"+
                "<div class=\"month\">{{vm.month}}</div>"+
                    "<button ng-click=\"nextMonth()\" class=\"button\">" +
                        "<i class=\"glyphicon glyphicon-chevron-right\"></i>" +
                     "</button>"+
            "</div>"+
                "<ul>"+
                    "<li class=\"date\" ng-repeat=\"date in dateList\">" +
                    "<button class=\"btn btn-default\" ng-click=\"selectDate($index)\" ng-model=\"vm.date\">{{date}}</button>" +
                    "</li>"+
                "</ul>"+
        //"<div class='mt10 clearfix'>"+
        //    "<button type=\"button\" class=\"btn btn-default f-left  \"ng-click=\"closeDate()\">确定</button>"+
        //    "<button type=\"button\" class=\"btn btn-default center \"ng-click=\"dateToday()\">今天</button>"+
        //    "<button type=\"button\" class=\"btn btn-default f-right\"ng-click=\"clearDate()\">清空</button>"+
        //"</div>"+
        "</div>"+
    "</div>"
    );
}]);

angular.module("xn/template/calendar/month.html",[]).run(["$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("xn/template/calendar/yearMonth.html",
            "<div class=\"xn-year-month\" id=\"{{monthId}}\">"+
            "    <input type=\"text\" name=\"{{name}}\" class=\"form-control\" value=\"{{selectedMonth.text}}\" " +
            "       ng-click=\"doSelect()\" placeholder=\"请选择年月\" />"+
            "    <div class=\"xn-year-month-card \" ng-show=\"openMoth\">\n"+
       /*     "          <button type=\"button\" class=\"close\" ng-click=\"openMoth=!openMoth;\">×</button>\n"+*/
            "         <div>\n"+
            "             <button ng-click=\"previousYear()\" class=\"button\">\n" +
            "                 <i class=\"glyphicon glyphicon-chevron-left\"></i>\n" +
            "             </button>\n"+
            "             <div class=\"year\" >{{year}}</div>\n"+
            "             <button ng-click=\"nextYear()\" class=\"button\">\n" +
            "                 <i class=\"glyphicon glyphicon-chevron-right\"></i>\n" +
            "             </button>\n"+
            "       </div>\n"+
            "       <ul  class='clearfix'>\n"+
            "          <li class=\"month\"   ng-repeat=\"month in months\">\n" +
            "               <button class=\"btn btn-default\" ng-click=\"selectMonth($index)\"  >{{ month}}</button>\n" +
            "          </li>\n"+
            "       </ul>\n"+
            "       <div class='bottom clearfix'>"+
            "           <button class=\"btn btn-sm btn-danger\" ng-click=\"clear()\"  >清空</button>"+
            "           <button class=\"btn  btn-sm  btn-success\"  ng-click=\"openMoth=!openMoth;\"  >关闭</button>"+
            "       </div>"+
            "   </div>\n"+
            "</div>"
    );
}]);

angular.module("xn/template/calendar/time.html", []).run(["$templateCache", function ($templateCache) {
    "use strict";
    $templateCache.put("xn/template/calendar/hms.html",
        "<div class='xn-directive-time' id=\"{{timeId}}\">" +
            "<div class=\"time-input\" ng-click=\"showhmtab()\"  >" +
                "<div ng-if=\"vm.hours\">" +
                    "<span >{{vm.hours}}</span> :" +
                    "<span>{{vm.minutes}}</span> :" +
                    "<span>{{vm.seconds}}</span>" +
                "</div>" +

            "</div>" +
            "<div class=\"hmstab\"  ng-show=\"timebox\" >" +
                "<ul>" +
                    "<li>" +
                        "<select class=\"time-select\" ng-model=\"vm.hours\"  ng-change=\"settingTime()\" ng-options=\"hours for hours in hoursList\" ng-required >" +
                        " <option value=\"\">--小时--</option>" +
                        "</select>" +
                    "</li>" +
                    "<li>" +
                        "<select class=\"time-select\"  ng-model=\"vm.minutes\" ng-disabled=\"vm.isMinutes\" ng-change=\"settingTime()\"  ng-options=\"minutes for minutes in minuteList\" >" +
                        " <option value=\"\">--分钟--</option>" +
                        "</select>" +
                    "</li>" +
                    "<li>" +
                        "<select class=\"time-select\" ng-model=\"vm.seconds\"  ng-disabled=\"vm.isSeconds\"  ng-change=\"settingTime()\"  ng-options=\"seconds for seconds in secondList\" >" +
                        " <option value=\"\">--秒--</option>" +
                        "</select>" +
                    "</li>" +
                "</ul>" +
                "<div class=\" btncon\">" +
                "<a class=\"rightborder\"ng-click=\"confirmTime()\" >确定</a>" +
                "<a ng-click=\"cleartimebox()\">清空</a>" +
                "</div>" +
            "</div>" +
        "</div>"
    );
}]);



