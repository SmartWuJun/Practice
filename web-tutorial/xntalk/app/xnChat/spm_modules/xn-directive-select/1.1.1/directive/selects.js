
angular.module("xn/template/select.html",[]).run(["$templateCache", function($templateCache){
    "use strict";
    $templateCache.put("xn/template/select/xnMultipleSelectTree.html",
            "<div class='xn-tree-multipselect'>"
            +"    <div ng-click='showContent($event)'>"
            +"      <input type='text' class='form-control' name=\"{{name}}\" ng-model='showName' ng-required=\"required \" readonly='readonly'/>"
            +"      <i class='icon icon-downward-1'></i>"
            +"    </div>"
            +"    <div ng-hide=\"isHide\" class='xn-tree-list-div'>"
            +"        <div class='level-0'>"
            +"            <div class='btn btn-link f-left' ng-click='doConfirm()'><span>关闭</span></div>"
            +"            <div class='btn btn-link f-right' ng-click='doConsole()'><span>取消选择</span></div>"
            +"        </div>"
            +"        <div class='level-content'>"
            +"            <div class='level-content-box'>"
            +"                <div class='level-{{data.level}} xn-tree-item' ng-repeat='data in selectedDataList' ng-click='doChoose(data)'>"
            +"                    <div class='xn-label-checkbox' ng-style='data.style'>"
            +"                        <i class='xn-checkbox selected_space' ></i>"
            +"                        <i class='icon icon-right_3 selected_icon' ng-show='data.isSelected'></i>"
            +"                        {{data.name}}"
            +"                    </div>"
            +"                </div>"
            +"            </div>"
            +"        </div>"
            +"    </div>"
            +"</div>"
    );
    $templateCache.put("xn/template/select/xnSelectTree.html",
            "<div class='xn-tree-select'>"
            +"    <input class='form-control' name='{{name}}' id='xn_select_tree_input' ng-model='selectedData.name' ng-required='required' readonly='readonly'/>"
            +"    <div class='xn-tree-list'>"
            +"        <div class='cancel_cl' ng-click='closeSelect()'>"
            +"            <div class='btn btn-link'>取消选择</div>"
            +"        </div>"
            +"        <div class='level-content'>"
            +"        <div class='level-{{data.level}} xn-tree-item' ng-repeat='data in selectedDataList' ng-click='closeSelect(data)'>"
            +"            <div>{{data.name}}</div>"
            +"        </div>"
            +"        </div>"
            +"    </div>"
            +"</div>"
    );
    $templateCache.put("xn/template/select/lookup.html",
            "<div id='{{id}}' class='xn_select_outer'><div class='xn_select_outer_div'>"
            +"  <div class='xn_select_input_div' ng-click='showTable($event)' ng-mouseover='showDelete=true' ng-mouseout='showDelete=false'>"
            +"      <input type='text' ng-required='required' id='tableText' name='{{name}}' ng-model='showField' class='xn_select_input' readonly='readonly' placeholder=\"{{placeholder}}\" />"
            +"      <i class='icon icon-delete' ng-click='deleteData($event)' ng-show=\"showDelete\"></i>"
            +"      <span class='icon icon-apostrophe'></span>"
            +"  </div>"
            +"</div>"
            +"<div ng-show='vm.showDiv' ng-click='stopEvent($event)' id=\"{{showDivId}}\" class='xn_show_div' ng-style=vm.width >"
            +"  <div class='content'>"
            +"       <div class='sort_area'></div>"
            +"       <div ng-transclude class='transclude_div'></div>"
            +"       <div class='pagination'>"
            +"                  <div class='icon icon-up' ng-if=\"options.pageNumber>1\" ng-click='search(\"pre\", $event)'></div>"
            +"                  <div class='icon icon-up icon-up-disable' ng-if=\"options.pageNumber<=1\"></div>"
            +"                  <div class='icon icon-down' ng-if=\"options.pageNumber<options.totalCount/options.pageSize\" ng-click='search(\"next\", $event)'></div>"
            +"                  <div class='icon icon-down icon-down-disable' ng-if=\"options.pageNumber>=options.totalCount/options.pageSize\"></div>"
            +"       </div>"
            +"    </div>"
            +"   <div class='search_div'>"
            +"          <div class='search_input_div'>"
            +"               <input ng-keydown=\"find($event)\" type=\"text\" class=\"form-control lookup-input\" name=\"keyword\" ng-model=\"options.keyword\" placeholder=\"{{placeHolder}}\" >"
            +"               <span class='searc_icon_search icon icon-search' ng-click=\"search('search', $event)\"></span>"
            +"          </div>"
            +"      </div>"
            +"  </div>"
            +"</div>"
    );
    $templateCache.put("xn/template/select/xnFilterSelect.html",
            "<div class='xn-filter-select_outer' ng-click='showContent($event)'>"
            +"  <div class='input_div' ng-mouseover='deleteShow=true' ng-mouseout='deleteShow=false'>"
            +"      <i class='icon icon-delete' ng-click='deleteData($event)' ng-show='deleteShow'></i>"
            +"      <i class='icon icon-downward-1'></i>"
            +"      <input type='text' class='form-control' ng-required='required' name={{name}} ng-model='showVal' readonly='readonly'/>"
            +"  </div>"
            +"  <div ng-show='contentDiv' class='content_div_cl'>"
            +"      <input type='text' name='{{name+\"FilterOption\"}}' ng-click='keepShowContent($event)' ng-model='filterOption' placeholder='请输入要查询的内容'/>"
            +"      <ul class='content_div_ul_cl'><li class='content_div_li_cl' ng-repeat='data in selectData | xnSearch:filterOption' ng-click='select(data, $event)'>{{data.name}}</li></ul>"
            +"  </div>"
            +"</div>"
    );
    $templateCache.put("xn/template/select/xnCreateSelect.html",
            "<div class='xn-create-select_outer' ng-click='showContent($event)'>"
            +"  <div class='input_div' ng-mouseover='deleteShow=true' ng-mouseout='deleteShow=false'>"
            +"      <i class='icon icon-delete' ng-click='deleteData($event)' ng-show='deleteShow'></i>"
            +"      <i class='icon icon-downward-1'></i>"
            +"      <input type='text' class='form-control' ng-required='required' name={{name}} ng-model='showVal' readonly='readonly'/>"
            +"  </div>"
            +"  <div ng-show='contentDiv' class='content_div_cl'>"
            +"      <ul class='content_div_ul_cl'><li class='content_div_li_cl' ng-repeat='data in selectData' ng-click='select(data, $event)'>{{data.name}}</li></ul>"
            +"      <div class='content_div_create'><i class='icon icon-add' ng-click='goCreate($event)'></i><a ng-click='goCreate($event)'>{{createInfo}}</a></div>"
            +"  </div>"
            +"</div>"
    );
    $templateCache.put("xn/template/select/xnFilterInput.html",
            "<div class='xn-filter-input' id=\"{{xnFilterInputId}}\">"+
            "    <input type='text' class='form-control' name='{{name}}' ng-model='selectedData.value'  " +
            "      ng-focus=\"setListShow()\" ng-required='required'/>"+
            "      <ul class='xn-filter-input-list' ng-hide=\"0>=selectList.length\">" +
            "           <li  ng-repeat='data in selectList' ng-click='select(data)'>{{data.value}}</li>" +
            "      </ul>"+
            "</div>"
    );

    $templateCache.put("template/lookup/lookup-match.html",
        " <div class=\"xn-col-md-24\"><span ng-repeat='data in pro track by $index'><span ng-if=\"0!=$index\">-</span>{{item[data]}}</span></div>"
    );
    //xn-lookup
    $templateCache.put("xn/template/select/xnLookup.html",
        "<div id='{{id}}' class='xn-lookup-layout'>" +
        "   <div class='lookup-input-layout'>" +
        "      <div class='lookup-input-box' ng-class='{\"input-box-focus\":vm.showList}' >"+
        "           <input type='text' class='lookup-input'  ng-model='vm.keyword'  ng-required='{{vm.required}}' id='tableText' name='{{vm.name}}'  autocomplete=\"off\"   placeholder=\"{{xnPlaceholder}}\" " +
        "           ng-focus='doFocus()' ng-blur='doBlur()'  ng-keydown=\"onKeydown($event)\"/>"+
        "          <span class='more' ng-class='{\"more-active\":vm.showList}' ng-click='openList($event)'></span>"+
        "          <span class='delete'  ng-show='vm.keyword'  ng-click='delete($event)'>X</span>"+
        "      </div>"+
        "   </div>"+
        "   <div ng-if='vm.showList'  class='lookup-list-layout' ng-class='{\"lookup-list-layout-right\":vm.isRight}' style='{{vm.showWidth}}'>"+
        "      <div class='lookup-list' ng-show='!vm.isLoading && itemList.length>0'>"+
        "          <ul class='list-item'>"+
        "               <li class='item clearfix' ng-repeat=\"item in itemList track by $index\" ng-click='selectItem(item,$event)' " +
        "                   ng-class='{\"item-active\":vm.index==$index}'  ng-init='isShow=false'>" +
        "                   <div class='item-html clearfix' ng-mouseover='doMouseover($index);isShow=true'  ng-mouseout='isShow=false;'>" +
        "                       <div lookup-match index=\"$index\" data-item=\"item\" data-pro='vm.val'  template-url=\"templateUrl\"></div>"+
        "                   </div>" +
        "                   <div class='item-tooltip clearfix' ng-if='vm.index==$index &&isShow && vm.isPopup'>" +
        "                       <div class='item-tooltip-layout'>" +
        "                         <div lookup-match index=\"$index\" data-item=\"item\" data-pro='vm.val'  template-url=\"templateUrl\"></div>"+
        "                       </div>" +
        "                   </div>" +
        "               </li> "+
        "          </ul>"+
        "          <div class='page'  ng-show='vm.totalCount>vm.pageSize'>" +
        "               <div class='pre ' ng-class='{\"pre-disabled\":2>vm.pageNumber}' ng-click='doPage(\"pre\")'></div>" +
        "               <div class='next' ng-class='{\"next-disabled\":vm.maxPageSize==vm.pageNumber}' ng-click='doPage(\"next\")'></div>" +
        "           </div>"+
        "      </div>" +
        "       <div ng-show='vm.isLoading' class='tip'>正在搜索中...</div>"+
        "       <div ng-show='itemList.length==0 && !vm.isLoading' class='tip'>没有搜索到相关内容</div>"+
        "  </div>"+
        "</div>"
    );
}]);

angular.module("xn.directive.select",["xn/template/select.html"])
    .filter("xnSearch", [
        function () {
            return function (arr, key) {
                if(!key) {
                    return arr;
                } else {
                    var list = [];
                    for(var i=0; i<arr.length; i++) {
                        if(arr[i].name.indexOf(key)>=0)
                            list.push(arr[i]);
                    }
                    return list;
                }
            };
        }
    ])
    .directive("xnSelectTree", function() {
        return {
            restrict:"AE",
            scope:{
                selectData :"=selectData",
                selectedData : "=ngModel",
                name: "@",
                required : "@"
            },
            required: "?ngModel",
            templateUrl: "xn/template/select/xnSelectTree.html",
            link: function(scope, element, attrs) {
                if(!scope.selectData)
                    scope.selectData = [];

                if(!scope.required)
                    scope.required = false;

                if(!scope.name)
                    scope.name = "selectName";

                angular.element(".xn-tree-list").hide();

                //查找子节点
                scope.getChild = function(scope, pid, dataList, level){
                    level ++;
                    angular.forEach(dataList, function(data){
                        if(data.parentId === pid){
                            data.level = level;
                            scope.selectedDataList.push(data);
                            scope.getChild(scope, data.id, dataList, level);
                        }
                    });
                };

                //生成树结构
                scope.doList=function(){
                    scope.selectedDataList=[];
                    if(scope.selectData.length>0){
                        angular.forEach(scope.selectData,function(d){
                            if(d.parentId == null){
                                d.level = 0;
                                scope.selectedDataList.push(d);
                                scope.getChild(scope, d.id, scope.selectData, d.level);
                            }
                        });
                    }
                };

                scope.closeSelect = function(data){
                    scope.selectedData=data;
                    angular.element(".xn-tree-list").hide();
                };

                scope.$watch("selectData", function(newVal, oldVal) {
                    if(angular.isArray(newVal)){
                        scope.selectData = newVal;
                        scope.doList();
                    }
                });

                //对document绑定一个影藏Div方法
                angular.element(document).click(function (e) {
                    if(! angular.element(e.target).is("#xn_select_tree_input")){
                        angular.element(".xn-tree-list").hide();
                    }else{
                        angular.element(".xn-tree-list").toggle();
                    }
                });
            }
        };
    })
    .directive("xnMultipleSelectTree",["$timeout",function($timeout) {
        return {
            restrict:"AE",
            scope:{
                selectData: "=",
                selectedData: "=ngModel",
                name: "@",
                required: "@"
            },
            require: "^ngModel",
            replace: true,
            link: function($scope, element, attrs, ngModel, fn) {
                $scope.isHide = true;

                if(!ngModel) {
                    return ;
                }

                if(!$scope.selectData) {
                    $scope.selectData = [];
                }

                if(!$scope.selectedData) {
                    $scope.selectedData = [];
                }

                if(!$scope.required) {
                    $scope.required = false;
                }


                //查找子节点
                $scope.getChild = function($scope, pid, dataList, level, isSelected, isPush, isShow,parent){
                    level ++;
                    angular.forEach(dataList, function(data){
                        if(data.parentId === pid){
                            //添加树
                            if(isPush){
                                data.level = level;  //层级
                                data.children=[];
                                data.childActive=0;
                                //添加父元素
                                data.parent=parent;
                                //处理父级元素
                                parent.children.push(data);
                                $scope.selectedDataList.push(data);
                                data.style = {'margin-left':15*level+'px'};
                            }
                            //处理选择的数据
                            if (isShow && !data.isSelected && isSelected) {
                                var item=angular.copy(data);
                                delete  item.parent;
                                delete  item.children;
                                delete  item.childActive;
                                $scope.selectedData.push(item);
                                //激活的数量增加
                                if(angular.isObject(data.parent)){
                                    data.parent.childActive++;
                                }

                            }
                            //移除选择数据
                            if (isShow && data.isSelected && !isSelected) {
                                for(var i= 0; i<$scope.selectedData.length; i++) {
                                    if($scope.selectedData[i].id==data.id) {
                                        $scope.selectedData.splice(i, 1);
                                        i--;
                                        //激活的数量减少
                                        if(angular.isObject(data.parent)){
                                            data.parent.childActive--;
                                        }
                                    }
                                }
                            }
                            data.isSelected=isSelected;

                            $scope.getChild($scope, data.id, dataList, level, isSelected, isPush, isShow,data);
                        }
                    });
                };


                //生成树结构
                $scope.doList=function(){
                    $scope.selectedDataList=[];
                    $scope.selectDataList = $scope.selectData;
                    if($scope.selectData.length>0){
                        angular.forEach($scope.selectData,function(data){
                            if(data.parentId == null){
                                data.level = 0;
                                data.isSelected=false;
                                //子元素 父元素
                                data.children=[];
                                data.childActive=0;
                                data.parent="";
                                $scope.selectedDataList.push(data);
                                $scope.getChild($scope, data.id, $scope.selectData, data.level, false, true, false,data);
                            }
                        });
                    }
                };

                $scope.doChoose = function(data){
                    data.isSelected = !data.isSelected;
                    if(data.isSelected){
                        var item=angular.copy(data);
                        delete  item.parent;
                        delete  item.children;
                        delete  item.childActive;
                        $scope.selectedData.push(item);

                        //父级循环
                        if(angular.isObject(data.parent)){
                            data.parent.childActive++;
                            parentFactory($scope.selectedData,data.parent,"add");
                        }

                    } else {
                        for(var i= 0, len=$scope.selectedData.length; i<len; i++) {
                            if($scope.selectedData[i].id==data.id){
                                $scope.selectedData.splice(i, 1);
                                //父级循环
                                if(angular.isObject(data.parent)){
                                    data.parent.childActive--;
                                    parentFactory($scope.selectedData,data.parent,"reduce");
                                }
                                break;
                            }
                        }
                    }
                    $scope.getChild($scope, data.id, $scope.selectData, data.level, data.isSelected, false, true);
                    $scope.selectedDataName = [];
                    for(var i in $scope.selectedData){
                        $scope.selectedDataName.push($scope.selectedData[i].name);
                    }

                    $scope.showName = $scope.selectedDataName.join(",");
                };



                $scope.doConfirm = function(){
                    $scope.isHide = true;
                };

                $scope.doConsole = function(){
                    $scope.selectedData = [];
                };
                
                //递归向父亲级别传递
                function parentFactory(list,data,subtracting){
                    //父亲级别处理
                    if("add"===subtracting){
                        if(data.childActive==data.children.length){
                            data.isSelected=true;
                            var state=false;
                            //是否已存在
                            angular.forEach(list,function (selected) {
                                if(selected.id==data.id){
                                    state=true;
                                }
                            });
                            //已经在里面了就不用循环了
                            if(!state){
                                var item=angular.copy(data);
                                delete  item.parent;
                                delete  item.children;
                                delete  item.childActive;
                                list.push(item);
                                if(angular.isObject(data.parent)){
                                    data.parent.childActive++;
                                    parentFactory(list,data.parent,subtracting);
                                }
                            }
                        };
                    }else if("reduce"===subtracting){
                        if(data.childActive==data.children.length-1){
                            data.isSelected=false;
                            for(var i= 0; i<list.length; i++) {
                                if(list[i].id==data.id) {
                                    list.splice(i, 1);
                                    i--;
                                    if(angular.isObject(data.parent)){
                                        data.parent.childActive--;
                                        parentFactory(list,data.parent,"reduce");
                                    }
                                }
                            }
                            
                            
                        }
                    }


                }

                //递归循环  初始化便利子元素打钩。
                function childrenFactory(list,data) {
                    data.isSelected=true;
                     var state=false;
                    //是否已存在
                    angular.forEach(list,function (selected) {
                        if(selected.id==data.id){
                            state=true;
                        }
                    });

                    if(!state){
                        //没有数据
                        var item=angular.copy(data);
                        delete  item.parent;
                        delete  item.children;
                        delete  item.childActive;
                        console.log(item);
                        list.push(item);
                        // if(angular.isObject(data.parent)){
                        //     data.parent.childActive++;
                        //     console.log(1111111111111111);
                        //     console.log(data.parent);
                        // }
                    }

                    angular.forEach(data.children,function (child) {
                        childrenFactory(list,child)
                    })
                };

                //递归循环  初始化便利子元素打钩。
                function childrenFactory(list,data,level) {
                    data.isSelected=true;
                    var state=false;
                    //是否已存在
                    angular.forEach(list,function (selected) {
                        if(selected.id==data.id){
                            state=true;
                        }
                    });

                    if(!state){
                        //没有数据
                        var item=angular.copy(data);
                        delete  item.parent;
                        delete  item.children;
                        delete  item.childActive;
                        console.log(item);
                        list.push(item);
                        if(angular.isObject(data.parent)){
                            data.parent.childActive++;
                            //父亲循环
                            parentFactory(list,data.parent,"add");
                        }
                    }else if(level==data.level){
                        if(angular.isObject(data.parent)){
                            data.parent.childActive++;
                            //父亲循环
                            parentFactory(list,data.parent,"add");
                        }
                    }

                    angular.forEach(data.children,function (child) {
                        childrenFactory(list,child)
                    })
                };



                $scope.$watch("selectData", function(newVal, oldVal) {
                    if(angular.isArray(newVal)){
                        $scope.selectData = newVal;
                        $scope.doList();
                        if(0>=newVal.length) {
                            $scope.selectedData = [];
                            $scope.showName = "";
                        } else {
                            for(var i= 0,len=$scope.selectedData.length; i<len; i++) {
                                var count = 0;
                                for(var j= 0,l=newVal.length; j<l; j++) {
                                    if($scope.selectedData[i].id==newVal[j].id) {
                                        count ++;
                                        $scope.selectData[j].isSelected = true;
                                        //添加递归
                                        childrenFactory($scope.selectedData,$scope.selectData[j],$scope.selectData[j].level);
                                    }
                                }
                                // if(0<count) {
                                //     $scope.selectedDataName.push($scope.selectedData[i].name);
                                // }

                                //清除 所有数据中没有的字符
                                if(0>=count) {
                                    $scope.selectedData.splice(i, 1);
                                    len--;
                                    i--;
                                }
                            }

                            $scope.showName="";
                            $scope.selectedDataName = [];
                            for(var i in $scope.selectedData){
                                $scope.selectedDataName.push($scope.selectedData[i].name);
                            }

                            $scope.showName = $scope.selectedDataName.join(",");

                        }
                    }
                });

                $scope.$watch("selectedData", function(newVal, oldVal) {
                    $scope.selectedDataName = [];
                    if(angular.isArray(newVal) && newVal.length==0) {
                        $scope.showName = "";
                        $scope.doList();
                    }
                    if(angular.isArray(newVal) && newVal.length>0){
                        $scope.doConfirm();

                        for(var i= 0, len=newVal.length; i<len; i++) {
                            for(var j= 0, len1=$scope.selectData.length; j<len1; j++) {
                                if($scope.selectData[j].id==newVal[i].id) {
                                    // $scope.selectedDataName.push($scope.selectData[j].name);
                                    // $scope.selectData[j].isSelected = true;
                                    //添加递归
                                    childrenFactory($scope.selectedData,$scope.selectData[j],$scope.selectData[j].level);
                                }
                            }
                        }

                        $scope.showName = "";
                        $scope.selectedDataName = [];
                        for(var i in $scope.selectedData){
                            $scope.selectedDataName.push($scope.selectedData[i].name);
                        }
                        $scope.showName = $scope.selectedDataName.join(",");

                    }
                });

                $scope.showContent = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $scope.isHide = !$scope.isHide;
                };

                angular.element(element).click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });

                angular.element(document).click(function (e) {
                    $scope.$apply(function() {
                        $scope.isHide = true;
                    });
                });
            },
            templateUrl: "xn/template/select/xnMultipleSelectTree.html"
        };
    }])
    .directive("bothListSelect", function() {
        return {
            scope: {
                selectData :"=",
                selectedData : "=ngModel",
                title : "@selectTitle",
                language:"@"
            },
            require: "ngModel",
            restrict:"AEC",
            template :"<div class='xn_select_panel'>"
                +"<div class='xn_select_div'>"
                +"<div class='xn_select_head'>"
                +"<input type='text' class='filter_input' ng-model='filterOption' name='filterOption' placeholder='{{vm.selectName}} {{title}}'/>"
                +"</div>"
                +"<ul ng-show='selectShow' class='xn_select_body_ul'>"
                +"<li ng-click='changeCl(data.id)' class='xn_select_body_li {{data.cl}}' ng-repeat='data in selectData | xnSearch:filterOption' ng-dblclick='select(data.id)'>{{data.name}}</li>"
                +"</ul>"
                +"</div>"
                +"<div class='xn_select_middle_icondiv'>"
                +"<div class='pt_20'><i ng-click='getAll()' class='icon icon-rightward_2 xn_select_middle_icon_first'></i></div>"
                +"<div class='pt_20'><i ng-click='get()' class='icon icon-rightward_1 xn_select_middle_icon_first'></i></div> "
                +"<div class='pt_30 xn_select_middle_icon_seconde'><i ng-click='remove()' class='icon icon-leftward_1'></i></div>"
                +"<div class='pt_20 xn_select_middle_icon_seconde'><i ng-click='removeAll()' class='icon icon-leftward_2'></i></div>"
                +"</div>"
                +"<div class='xn_select_div'>"
                +"<div class='xn_select_head' ng-click='selectedShow=!selectedShow'><i ng-if='selectedShow' class='icon icon-downward-1 xn_select_shape'></i><i ng-if='!selectedShow' class='icon icon-rightward xn_select_shape'></i><span class='title_span'>{{vm.selectedName}} {{title}}</span></div>"
                +"<ul ng-show='selectedShow' class='xn_select_body_ul'><li ng-click='changeCl(dData.id)' class='xn_select_body_li {{dData.cl}}' ng-repeat='dData in selectedData' ng-dblclick='cancel(dData.id)'>{{dData.name}}</li></ul></div>"
                +"</div>",
            link: function(scope, element, attres, controller, transcludeFn) {
                if(scope.selectData==undefined)
                    scope.selectData = [];
                if(scope.selectedData==undefined)
                    scope.selectedData = [];
                scope.selectShow = true;
                scope.selectedShow = true;
                if(!scope.selectData)
                    scope.selectData = [];
                if(!scope.selectedData)
                    scope.selectedData = [];

                scope.vm={
                    selectName:"请选择",
                    selectedName:"已选择"
                };

                if(scope.language=="en"){
                    scope.vm={
                        selectName:"select ",
                        selectedName:"selected "
                    };
                }

                scope.seprateData = function() {
                    for(var i=0; i<scope.selectData.length; ) {
                        scope.selectData[i].cl = "";
                        scope.selectData[i].isChecked = false;
                        var count = 0;
                        for(var j=0; j<scope.selectedData.length; j++) {
                            scope.selectedData[j].cl = "";
                            scope.selectedData[j].isChecked = false;
                            if(scope.selectData[i].id==scope.selectedData[j].id)
                                count++;
                        }
                        if(count>0)
                            scope.selectData.splice(i, 1);
                        else
                            i++;
                    }
                };

                scope.$watch('selectData', function(newVal, oldVal) {
                    if(newVal)
                        scope.seprateData();
                });

                scope.$watch('selectedData', function(newVal, oldVal) {
                    if(newVal)
                        scope.seprateData();
                });

                //双击选择
                scope.select = function(id) {
                    for(var i=0; i<scope.selectData.length; i++) {
                        if(scope.selectData[i].id==id) {
                            scope.selectData[i].isChecked = false;
                            scope.selectData[i].cl = "";
                            scope.selectedData.push(scope.selectData[i]);
                            scope.selectData.splice(i, 1);
                        }
                    }
                };

                //双击取消选择
                scope.cancel = function(id) {
                    for(var i=0; i<scope.selectedData.length; i++) {
                        if(scope.selectedData[i].id==id) {
                            scope.selectedData[i].isChecked = false;
                            scope.selectedData[i].cl = "";
                            scope.selectData.push(scope.selectedData[i]);
                            scope.selectedData.splice(i, 1);
                        }
                    }
                };

                //选中某条数据样式加载
                scope.changeCl = function(id) {
                    for(var i=0; i<scope.selectData.length; i++) {
                        scope.selectData[i].cl = "";
                        scope.selectData[i].isChecked = false;
                        if(scope.selectData[i].id==id) {
                            scope.selectData[i].cl = "xn_selected_li";
                            scope.selectData[i].isChecked = true;
                        }
                    }
                    for(var i=0; i<scope.selectedData.length; i++) {
                        scope.selectedData[i].cl = "";
                        scope.selectedData[i].isChecked = false;
                        if(scope.selectedData[i].id==id) {
                            scope.selectedData[i].cl = "xn_selected_li";
                            scope.selectedData[i].isChecked = true;
                        }
                    }
                };

                //点击右箭头选择
                scope.get = function() {
                    for(var i=0; i<scope.selectData.length; ) {
                        scope.selectData[i].cl = "";
                        if(scope.selectShow) {
                            if(scope.selectData[i].isChecked) {
                                scope.selectData[i].isChecked = false;
                                scope.selectedData.push(scope.selectData[i]);
                                scope.selectData.splice(i, 1);
                            } else {
                                i++;
                            }
                        } else {
                            scope.selectData[i].isChecked = false;
                            scope.selectedData.push(scope.selectData[i]);
                            scope.selectData.splice(i, 1);
                        }
                    }
                };

                //点击左箭头取消选择
                scope.remove = function() {
                    for(var i=0; i<scope.selectedData.length; ) {
                        scope.selectedData[i].cl = "";
                        if(scope.selectedShow) {
                            if(scope.selectedData[i].isChecked) {
                                scope.selectedData[i].isChecked = false;
                                scope.selectData.push(scope.selectedData[i]);
                                scope.selectedData.splice(i, 1);
                            } else {
                                i++;
                            }
                        } else {
                            scope.selectedData[i].isChecked = false;
                            scope.selectData.push(scope.selectedData[i]);
                            scope.selectedData.splice(i, 1);
                        }
                    }
                };

                //选择全部
                scope.getAll = function() {
                    for(var i=0; i<scope.selectData.length; ) {
                        scope.selectData[i].cl = "";
                        scope.selectData[i].isChecked = false;
                        scope.selectedData.push(scope.selectData[i]);
                        scope.selectData.splice(i, 1);
                    }
                };

                //移除全部
                scope.removeAll = function() {
                    for(var i=0; i<scope.selectedData.length; ) {
                        scope.selectedData[i].cl = "";
                        scope.selectedData[i].isChecked = false;
                        scope.selectData.push(scope.selectedData[i]);
                        scope.selectedData.splice(i, 1);
                    }
                };
            }
        }
    })
    .directive("bothTreeListSelect", function() {
        return {
            scope: {
                selectData :"=",
                selectedData : "=ngModel",
                title : "@selectTitle",
                language:"@"
            },
            require: "ngModel",
            restrict:"AEC",
            template :"<div class='xn_tree_select_panel'>"
                +"<div class='xn_select_div'>"
                +"<div class='xn_select_head' ng-click='selectShow=!selectShow'>"
                +"<i ng-if='selectShow' class='icon icon-downward-1 xn_select_shape'></i>"
                +"<i ng-if='!selectShow' class='icon icon-rightward xn_select_shape'></i>"
                +"<span class='title_span'>{{vm.selectName}} {{title}}</span>"
                +"</div>"
                +"<ul ng-show='selectShow' class='xn_select_body_ul'>"
                +"<li ng-repeat='data in selectData'> "
                +"<div ng-click='changeCl(data,\"left\", selectData)' ng-dblclick='select(data, selectData)'class='xn_select_body_li {{data.cl}}'> {{data.name}}</div> "
                +"<ul class='inner_ul' ng-if='data.children!=undefined && data.children.length>0'> "
                +"<li ng-repeat='child in data.children'> "
                +"<div ng-click='changeCl(child, \"left\", data.children)' ng-dblclick='select(child, data.children)'class='xn_select_body_li {{child.cl}} inner_ul_div'>{{child.name}}</div>"
                +"<ul class='inner_ul' ng-if='child.children!=undefined && child.children.length>0'> "
                +"<li ng-repeat='ch in child.children'>"
                +"<div ng-click='changeCl(ch, \"left\", child.children)' ng-dblclick='select(ch, child.children)'class='xn_select_body_li {{ch.cl}} inner_thired_div'>{{ch.name}}</div>"
                +"</li>"
                +"</ul>"
                +"</li>"
                +"</ul>"
                +"</li>"
                +"</ul>"
                +"</div>"
                +"<div class='xn_select_middle_icondiv'>"
                +"<div class='pt_20'><i ng-click='getAll()' class='icon icon-rightward_2 xn_select_middle_icon_first'></i></div>"
                +"<div class='pt_20'><i ng-click='get(selectData)' class='icon icon-rightward_1 xn_select_middle_icon_first'></i></div> "
                +"<div class='pt_30 xn_select_middle_icon_seconde'><i ng-click='remove(selectedData)' class='icon icon-leftward_1'></i></div>"
                +"<div class='pt_20 xn_select_middle_icon_seconde'><i ng-click='removeAll()' class='icon icon-leftward_2'></i></div>"
                +"</div>"
                +"<div class='xn_select_div'>"
                +"<div class='xn_select_head' ng-click='selectedShow=!selectedShow'> "
                +"<i ng-if='selectedShow' class='icon icon-downward-1 xn_select_shape'></i> "
                +"<i ng-if='!selectedShow' class='icon icon-rightward xn_select_shape'></i> "
                +"<span class='title_span'>{{vm.selectedName}} {{title}}</span> "
                +"</div> "
                +"<ul ng-show='selectedShow' class='xn_select_body_ul'> "
                +"<li ng-repeat='dData in selectedData'> "
                +"<div ng-click='changeCl(dData, \"right\", selectedData)' ng-dblclick='cancel(dData, selectedData)' class='xn_select_body_li {{dData.cl}}'>{{dData.name}}</div> "
                +"<ul class='inner_ul' ng-if='dData.children!=undefined && dData.children.length>0'> "
                +"<li ng-repeat='child in dData.children'> "
                +"<div ng-click='changeCl(child,\"right\", dData.children)' ng-dblclick='cancel(child, dData.children)' class='xn_select_body_li {{child.cl}} inner_ul_div'>{{child.name}}</div>"
                +"<ul class='inner_ul' ng-if='child.children!=undefined && child.children.length>0'> "
                +"<li ng-repeat='ch in child.children'>"
                +"<div ng-click='changeCl(ch, \"right\", child.children)' ng-dblclick='cancel(ch, child.children)'class='xn_select_body_li {{ch.cl}} inner_thired_div'>{{ch.name}}</div>"
                +"</li>"
                +"</ul>"
                +"</li>"
                +"</ul>"
                +"</li> "
                +"</ul> "
                +"</div>"
                +"</div>",
            link: function(scope, element, attres, ngModel, transcludeFn) {
                if(!ngModel) return ;
                scope.selectShow = true;
                scope.selectedShow = true;
                var collection = [];
                scope.singleSelect = {};
                scope.singleSelectList = [];

                //备用数组
                //所有的数组
                scope.selectList=[];
                //已经选择的组件
                scope.selectedList=[];

                var selectState=false;
                var selectedState=false;

                scope.toword = "";
                scope.type = "init";
                scope.vm={
                    selectName:"请选择",
                    selectedName:"已选择"
                };


                if(scope.language=="en"){
                    scope.vm={
                        selectName:"select ",
                        selectedName:"selected "
                    };
                }

                if(!scope.selectData) scope.selectData = [];
                if(!scope.selectedData) scope.selectedData = [];

                //分离数据
                scope.separateData = function() {
                    if(selectState){
                        angular.extend(scope.selectData,scope.selectList);
                    }
                    if(selectedState>0){
                        angular.extend( scope.selectedData,scope.selectedList);
                    }
                    for(var i=0; i<scope.selectData.length; ) {

                        scope.selectData[i].cl = "";
                        scope.selectData[i].isChecked = false;
                        var count = 0;
                        for(var j=0; j<scope.selectedData.length; j++) {
                            scope.selectedData[j].cl = "";
                            scope.selectedData[j].isChecked = false;
                            if(scope.selectData[i].id==scope.selectedData[j].id){
                                count++;
                            }
                        }
                        if(count>0){
                            scope.selectData.splice(i, 1)

                        }else{
                            i++
                        };
                    }


                };
                //所有数据数组
                scope.$watch('selectData', function(newVal, oldVal) {
                    if(newVal && newVal.length>0 && scope.type == "init"){
                        //已经读取
                        selectState=true;
                        scope.selectList=[];
                        angular.extend(scope.selectList,newVal);
                        scope.separateData();
                        scope.createTree();
                    }
                });

                scope.$watch('selectedData', function(newVal, oldVal) {
                    if(newVal && newVal.length>0 && scope.type == "init"){
                        //已经读取
                        selectedState=true;
                        scope.selectedList=[];
                        angular.extend(scope.selectedList,newVal);
                        scope.separateData();
                        scope.createTree();
                    }
                });

                //isNew 判断pid是否是一级过滤
                scope.makeTree = function(source, result, select, level, data,isNew) {
                    level = level || 1;
                    if(!select) {
                        if(isNew){
                            var newList=[];
                            angular.extend(newList,source);
                            for(var i=0; i<source.length; ) {
                                var isParent=true;
                                //过滤是否有父亲
                                for(var n=0;n<newList.length;n++){
                                    if(source[i].pId==newList[n].id){
                                        isParent=false;
                                    }
                                }
                                if(isParent) {
                                    source[i].level = level;
                                    result.push(source[i]);
                                    source.splice(i, 1);
                                } else {
                                    i++;
                                }
                            }

                        }else{
                            for(var i=0; i<source.length; ) {
                                if(!source[i].pId) {
                                    source[i].level = level;
                                    result.push(source[i]);
                                    source.splice(i, 1);
                                } else {
                                    i++;
                                }
                            }
                        }
                        for(var i=0; i<result.length; i++) {
                            scope.makeSecondTree(source, result[i], level);
                        }
                    } else {
                        if(level==1) {
                            for(var i=0; i<source.length; ) {
                                if(source[i].pId==data.id) {
                                    if(!data.children){
                                        data.children = [];
                                    }
                                    data.children.push(source[i]);
                                    source.splice(i, 1);
                                } else {
                                    var s = 0;
                                    if(data.children) {
                                        for(var j=0; j<data.children.length; j++) {
                                            if(data.children[j].id==source[i].pId) {
                                                if(!data.children[j].children) data.children[j].children = [];
                                                data.children[j].children.push(source[i]);
                                                source.splice(i, 1);
                                                s++;
                                                break;
                                            }
                                        }
                                    } else {
                                        i++;
                                    }
                                    if(s==0) i++;
                                }
                            }
                            result.push(data);
                            for(var num in source) {
                                result.push(source[num]);
                            }
                        } else if(level==2) {
                            for(var i=0; i<source.length; ) {
                                if(source[i].pId==data.id) {
                                    if(!data.children) data.children = [];
                                    data.children.push(source[i]);
                                    source.splice(i, 1);
                                } else {
                                    i++;
                                }
                            }
                            for(var i=0; i<source.length; ) {
                                if(data && source[i].id==data.pId) {
                                    if(!source[i].children) source[i].children = [];
                                    source[i].children.push(data);
                                    data = null;
                                    break;
                                } else {
                                    i++;
                                }
                            }
                            if(data) source.push(data);
                            for(var num in source) {
                                result.push(source[num]);
                            }
                            source.splice(0, source.length);
                        } else {
                            for(var i=0; i<source.length; i++) {
                                if(source[i].level==2 && source[i].id==data.pId) {
                                    if(!source[i].children) source[i].children = [];
                                    source[i].children.push(data);
                                    data = null;
                                    break;
                                }
                                if(source[i].level==1 && source[i].children) {
                                    for(var j=0; j<source[i].children.length; j++) {
                                        if(data && source[i].children[j].id==data.pId) {
                                            if(!source[i].children[j].children) source[i].children[j].children = [];
                                            source[i].children[j].children.push(data);
                                            data = null;
                                            break;
                                        }
                                    }
                                }
                                if(!data) break;
                            }
                            if(data) source.push(data);
                            for(var num in source) {
                                result.push(source[num]);
                            }
                            source.splice(0, source.length);
                        }
                    }
                };

                scope.makeSecondTree = function(source, data, level) {
                    level ++;
                    var list = [];
                    for(var i=0; i<source.length; ) {
                        if(source[i].pId==data.id) {
                            source[i].level = level;
                            if(!data.children) data.children = [];
                            data.children.push(source[i]);
                            list.push(source[i]);
                            source.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                    for(var i=0; i<list.length; i++) {
                        scope.makeThirdTree(source, list[i], level);
                    }
                };

                scope.makeThirdTree = function(source, data, level) {
                    level ++;
                    for(var i=0; i<source.length; ) {
                        if(source[i].pId==data.id) {
                            source[i].level = level;
                            if(!data.children) data.children = [];
                            data.children.push(source[i]);
                            source.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                };

                scope.createTree = function() {
                    collection = angular.copy(scope.selectData);
                    scope.selectData.splice(0, scope.selectData.length);
                    scope.makeTree(collection, scope.selectData, false,undefined,undefined,true);

                    collection = angular.copy(scope.selectedData);
                    scope.selectedData.splice(0, scope.selectedData.length);
                    scope.makeTree(collection, scope.selectedData, false,undefined,undefined,true);
                };


                //数组还原成对象
                function  redChildren(array,list){
                    for(var i=0;i<array.length; i++){
                        if(array[i].children && array[i].children.length>0){
                            var newdata=[];
                            newdata = angular.copy(array[i].children);
                            array[i].children=[];
                            list.push(array[i]);
                            redChildren(newdata,list);
                        }else{
                            array[i].children=[];
                            list.push(array[i]);
                        }
                    }
                    return list;
                }

                scope.restoreList=function(array,data){
                    var newList=[];
                    var oldList=[];
                    var newArray=[];
                    //获取选取的
                    newArray= redChildren(array,newList);
                    //点击的数据
                    if(data.children && data.children.length>0){
                        var dataChildren=[];
                        dataChildren = angular.copy(data.children);
                        data.children=[];
                        newArray.push(data);
                        newArray = newArray.concat(redChildren(dataChildren,oldList));

                    }else{
                        data.children=[];
                        newArray.push(data);
                    }

                    return newArray;
                };


                //双击选择
                scope.select = function(data, list) {
                    scope.type = "select";
                    for(var i=0; i<list.length; i++) {
                        if(list[i].id==data.id) {
                            list[i].isChecked = false;
                            list[i].cl = "";
                            list.splice(i, 1);
                        }
                    }
                    collection = [];
                    collection = scope.restoreList(scope.selectedData,data);
                    scope.selectedData = [];
                    scope.makeTree(collection, scope.selectedData, false,undefined,undefined,true);
                };


                //双击取消选择
                scope.cancel = function(data, list) {
                    scope.type = "select";
                    for(var i=0; i<list.length; i++) {
                        if(list[i].id==data.id) {
                            list[i].isChecked = false;
                            list[i].cl = "";
                            list.splice(i, 1);
                        }
                    }
                    collection = [];
                    collection = scope.restoreList(scope.selectData,data);
                    scope.selectData = [];
                    /*    scope.makeTree(collection, scope.selectData, true, data.level, data);*/
                    scope.makeTree(collection, scope.selectData, false,undefined,undefined,true);
                };

                //选中某条数据样式加载
                scope.changeCl = function(data, toword, list) {
                    scope.singleSelect = data;
                    scope.singleSelectList = list;
                    scope.toword = toword;
                    for(var i=0; i<scope.selectData.length; i++) {
                        scope.selectData[i].cl = "";
                        scope.selectData[i].isChecked = false;
                        if(scope.selectData[i].children && scope.selectData[i].children.length>0) {
                            for(var j=0; j<scope.selectData[i].children.length; j++) {
                                scope.selectData[i].children[j].cl="";
                                scope.selectData[i].children[j].isChecked="";
                                if(scope.selectData[i].children[j].children && scope.selectData[i].children[j].children.length>0) {
                                    for(var d in scope.selectData[i].children[j].children) {
                                        scope.selectData[i].children[j].children[d].cl="";
                                        scope.selectData[i].children[j].children[d].isChecked="";
                                    }
                                }
                            }
                        }
                    }
                    for(var i=0; i<scope.selectedData.length; i++) {
                        scope.selectedData[i].cl = "";
                        scope.selectedData[i].isChecked = false;
                        if(scope.selectedData[i].children && scope.selectedData[i].children.length>0) {
                            for(var j=0; j<scope.selectedData[i].children.length; j++) {
                                scope.selectedData[i].children[j].cl="";
                                scope.selectedData[i].children[j].isChecked="";
                                if(scope.selectedData[i].children[j].children && scope.selectedData[i].children[j].children.length>0) {
                                    for(var d in scope.selectedData[i].children[j].children) {
                                        scope.selectedData[i].children[j].children[d].cl="";
                                        scope.selectedData[i].children[j].children[d].isChecked="";
                                    }
                                }
                            }
                        }
                    }
                    data.cl = "xn_selected_li";
                    data.isChecked = true;
                };

                //点击右箭头选择
                scope.get = function(list) {
                    if(scope.toword=="left") {
                        scope.select(scope.singleSelect, scope.singleSelectList);
                    }
                };

                //点击左箭头取消选择
                scope.remove = function(list) {
                    if(scope.toword=="right") {
                        scope.cancel(scope.singleSelect, scope.singleSelectList);
                    }
                };


                //选择全部
                scope.getAll = function() {
                    scope.type = "select";
                    var selectList=[];
                    var selectedList=[];
                    var newList=[];
                    newList = redChildren(scope.selectData,selectList).concat(redChildren(scope.selectedData,selectedList));
                    scope.selectData=[];
                    scope.selectedData=[];
                    //console.log(newList)
                    scope.makeTree(newList, scope.selectedData, false,undefined,undefined,true);
                };

                //移除全部
                scope.removeAll = function() {
                    scope.type = "select";
                    var selectList=[];
                    var selectedList=[];
                    var newList=[];
                    newList = redChildren(scope.selectData,selectList).concat(redChildren(scope.selectedData,selectedList));
                    scope.selectData=[];
                    scope.selectedData=[];
                    console.log(newList)

                    scope.makeTree(newList, scope.selectData, false,undefined,undefined,true);
                };


                /*
                 //选择全部
                 scope.getAll = function() {
                 scope.selectData.splice(0, scope.selectData.length);
                 scope.selectedData.splice(0, scope.selectedData.length);
                 scope.selectedData = angular.copy(scope.selectList);
                 scope.createTree();
                 };

                 //移除全部
                 scope.removeAll = function() {
                 scope.selectData.splice(0, scope.selectData.length);
                 scope.selectedData.splice(0, scope.selectedData.length);
                 scope.selectData = angular.copy(scope.selectList);
                 scope.createTree();
                 };*/
            }
        }
    })
    .directive("lookup",["$timeout", function($timeout) {
        return {
            restrict :"AEC",
            scope: {
                options : "=",
                showField : "=",
                data : "=ngModel",
                searchParameter:"=",
                required : "@",
                name : "@",
                showWidth : "@",
                placeHolder : "@",
                placeholder : "@"
            },
            require: "^ngModel",
            replace: true,
            transclude:true,
            link: function($scope, element, attres, controller, transcludeFn) {
                $scope.count = 0;
                $scope.vm={
                    showDiv:false
                };
                /* $scope.showDiv = false;*/
                $scope.showDelete = false;
                $scope.options.keyword = "";
                $scope.options.maxPageSize = 5;
                var time = new Date().getTime();
                $scope.id = "xnTableSelect_" + time;
                $scope.showDivId = "showDiv_" + time;

                if(!$scope.required) {
                    $scope.required = false;
                }

                if(!$scope.showField) {
                    $scope.showField = "";
                }

                if(!$scope.options.totalCount) {
                    $scope.options.totalCount = 0;
                }
                $scope.vm={};
                if($scope.showWidth){
                    $scope.vm.width={width:$scope.showWidth+"px"};

                }else{
                    $scope.vm.width=""
                }

                //下拉DIV显示和隐藏
                $scope.showTable = function(e) {
                    /*   e.preventDefault();
                     e.stopPropagation();*/
                    $scope.options.keyword = "";
                    $scope.options.pageNumber=1;
                    $scope.vm.showDiv = !$scope.vm.showDiv;
                    if($scope.vm.showDiv){
                        $scope.$parent[$scope.options.methodName]($scope.searchParameter)
                    };
                    $timeout(function() { element.find('.lookup-input')[0].focus(); }, 0, false);
                };

               /* $scope.find = function(e) {
                    if(event.keyCode==13){
                        e.preventDefault();
                        $scope.$parent[$scope.options.methodName]($scope.searchParameter);
                    }
                };*/
                $scope.find = function() {
                    $scope.keydownEvent();
                };
                $scope.keydownEvent=function(){
                    var e = window.event || arguments.callee.caller.arguments[0];
                    if (e && e.keyCode == 13 ) {
                        e.preventDefault();
                        $scope.$parent[$scope.options.methodName]($scope.searchParameter);
                    }
                };

                //搜索
                $scope.search = function(str, e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if("pre"==str){
                        $scope.options.pageNumber--;
                    }
                    if("next"==str){
                        $scope.options.pageNumber++;
                    }
                    if("search"==str){
                        $scope.options.pageNumber=1;
                    }
                    $scope.$parent[$scope.options.methodName]($scope.searchParameter);
                };

                //监控关键值
                $scope.$watch("data", function(newVal, oldVal) {
                    if(newVal){
                        $scope.vm.showDiv = false;
                    }
                });

                $scope.stopEvent = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                };

                var getPar = function(tar) {
                    if(tar.id==$scope.id){
                        $scope.count++;
                    }
                    if(tar.parentElement){
                        getPar(tar.parentElement);
                    }
                };
                angular.element(document).bind("click", function(e) {
                    $scope.count = 0;
                    getPar(e.target);
                    if($scope.count == 0) {
                        $scope.$apply(function(){
                            $scope.vm.showDiv = false;
                        })
                    }
                });

                $scope.deleteData = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $scope.data=undefined;
                    $scope.showField= "";
                };
            },
            templateUrl: "xn/template/select/lookup.html"
        }
    }])
    .directive("xnFilterSelect", function() {
        return {
            restrict:"AE",
            scope:{
                selectData:"=",
                selectedData: "=ngModel",
                name: "@",
                required: "@"
            },
            require: "^ngModel",
            link: function($scope, element, attres, controller, transcludeFn) {
                $scope.contentDiv = false;
                $scope.deleteShow = false;
                $scope.contentId = new Date().getTime() + "_id";

                if(!$scope.selectData) {
                    $scope.selectData = [];
                }

                if(!$scope.required) {
                    $scope.required = false;
                }

                if(!$scope.name) {
                    $scope.name = "selectName";
                }

                $scope.showContent = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $scope.contentDiv = !$scope.contentDiv;
                };

                $scope.keepShowContent=function(e){
                    e.preventDefault();
                    e.stopPropagation();
                };
                $scope.select = function(data, e){
                    e.preventDefault();
                    e.stopPropagation();
                    $scope.selectedData = data;
                    $scope.showVal = data.name;
                    $scope.contentDiv = false;
                    $scope.filterOption = "";
                };




                $scope.$watch("selectedData",function(){
                    if($scope.selectedData){
                        $scope.showVal=$scope.selectedData.name;

                    }
                });

                angular.element(document).bind("click", function (e) {
                    $scope.$apply(function () {
                        $scope.contentDiv = false;
                    });
                });

                $scope.deleteData = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $scope.showVal = "";
                    $scope.selectedData = null;
                };

            },
            templateUrl: "xn/template/select/xnFilterSelect.html"
        };
    })
    .directive("xnCreateSelect", function() {
        return {
            restrict:"AE",
            scope:{
                selectData:"=",
                selectedData: "=ngModel",
                name: "@",
                required: "@",
                createLink: "@",
                createInfo: "@"
            },
            require: "^ngModel",
            templateUrl: "xn/template/select/xnCreateSelect.html",
            link: function($scope, element, attrs, controller) {
                if(!$scope.selectData)
                    $scope.selectData = [];
                if(!$scope.required)
                    $scope.required = false;
                if(!$scope.name)
                    $scope.name = "selectName";

                $scope.count = 0;
                $scope.contentDiv = false;
                $scope.deleteShow = false;
                $scope.contentId = new Date().getTime() + "_id";

                $scope.goCreate = function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    window.location = $scope.createLink;
                }

                $scope.showContent = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $scope.contentDiv = !$scope.contentDiv;
                };

                $scope.select = function(data,e){
                    e.preventDefault();
                    e.stopPropagation();
                    $scope.selectedData = data;
                    $scope.showVal = data.name;
                    $scope.contentDiv = false;
                };

                angular.element(document).bind("click", function (e) {
                    $scope.$apply(function () {
                        $scope.contentDiv = false;
                    });
                });

                $scope.deleteData = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $scope.showVal = "";
                    $scope.selectedData = null;
                };

            }
        };
    })
    .directive("xnFilterInput", function() {
        return {
            restrict:"AE",
            scope:{
                selectList:"=",
                selectedData: "=ngModel",
                name: "@",
                required: "@"
            },
            require: "ngModel",
            templateUrl: "xn/template/select/xnFilterInput.html",
            link: function(scope, element, attres, controller) {
                scope.isShow=false;

                if(!scope.selectedData){
                    scope.selectedData ={"key":"",value:""};
                }
                if(!scope.required){
                    scope.required = false;
                }
                if(!scope.name){
                    scope.name = "selectName";
                }
                scope.xnFilterInputId = "inputId"+new Date().getTime();
                angular.element("#"+scope.xnFilterInputId+" input").live("keydown",function(e){
                    scope.selectedData.key="";
                });

                scope.select = function(data){
                    scope.selectedData =angular.copy(data);
                    angular.element("#"+scope.xnFilterInputId+" ul").hide();
                };
                scope.setListShow = function(){
                    angular.element("#"+scope.xnFilterInputId+" ul").show();
                };


                var getPar = function(tar) {
                    if(tar.id==scope.xnFilterInputId){
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
                        angular.element("#"+scope.xnFilterInputId+" ul").hide();
                    }
                });
            }
        };
    })
    .directive("triggerSelect", [function() {
        var link = function($scope, element, attrs, ngModel, fn) {
            if(!ngModel) {
                return ;
            }

            var time = new Date().getTime();

            $scope.inputId = "input_"+time;

            $scope.lbShow = false;

            $scope.selectList = [];

            if(!$scope.data) {
                $scope.data = 0;
            }

            angular.element("#"+$scope.inputId).ready(function() {
                if("true"==$scope.readonly) {
                    angular.element("#"+$scope.inputId).attr("readonly", "");
                }
                angular.element("#"+$scope.inputId).attr("name", $scope.name);
            });

            if(!$scope.selectOption) {
                $scope.selectOption = [0, 0, 1];
            }

            if($scope.selectOption) {
                if(!$scope.selectOption[0]) {
                    $scope.selectOption[0] = 0;
                }
                if(!$scope.selectOption[1]) {
                    $scope.selectOption[1] = 0;
                }
                if(!$scope.selectOption[2]) {
                    $scope.selectOption[2] = 1;
                }
            }

            for(var i=0; i<$scope.selectOption[1]; i++) {
                if(0==i%$scope.selectOption[2]) {
                    $scope.selectList.push(i);
                }
            }

            $scope.add = function(e) {
                e.preventDefault();
                e.stopPropagation();
                $scope.data = $scope.data-0;
                if($scope.selectOption[0]==$scope.selectOption[1]) {
                    $scope.data+=$scope.selectOption[2];
                } else {
                    if($scope.selectList && 0<$scope.selectList.length) {
                        if($scope.data<$scope.selectList[$scope.selectList.length-1]) {
                            $scope.data+=$scope.selectOption[2];
                        }
                    } else {
                        if($scope.data<$scope.selectOption[1]) {
                            $scope.data+=$scope.selectOption[2];
                        }
                    }
                }
            };

            $scope.subtract = function(e) {
                e.preventDefault();
                e.stopPropagation();
                $scope.data = $scope.data-0;
                if($scope.data>$scope.selectOption[0]) {
                    if($scope.data>0) {
                        $scope.data-=$scope.selectOption[2];
                    }
                    if(0>=$scope.data && "true"==$scope.minus) {
                        $scope.data-=$scope.selectOption[2];
                    }
                }
                if($scope.data<=$scope.selectOption[0]) {
                    if("true"==$scope.minus) {
                        $scope.data-=$scope.selectOption[2];
                    }
                }
            };

            $scope.select = function(option, e) {
                e.preventDefault();
                e.stopPropagation();
                $scope.data = option;
                $scope.lbShow=false;
            };

            angular.element(document).on("click", function() {
                $scope.$apply(function() {
                    $scope.lbShow=false;
                });
            });

            $scope.keepShow = function(e) {
                e.preventDefault();
                e.stopPropagation();
            };

            $scope.check = function() {
                if($scope.data>$scope.selectOption[1]-1) {
                    $scope.data = $scope.selectOption[1]-1;
                }
            };

            $scope.show = function(e) {
                e.preventDefault();
                e.stopPropagation();
                $scope.lbShow=true;
            };
        };
        return {
            restrict: "AE",
            scope: {
                data: "=ngModel",
                selectOption: "=",
                name: "@",
                required: "@",
                minus: "@",
                readonly: "@"
            },
            require: "^ngModel",
            link: link,
            replace: true,
            template: "<div class='trigger_select_wrap' ng-click='keepShow($event)'>"
                +"  <div class='input_box'>"
                +"      <input type='text' id='{{inputId}}' ng-change='check()' ng-click='show($event)' ng-model='data' class='form-control' ng-require='{{required}}'>"
                +"      <div class='ctrl_wrap'><div class='icon icon-upward-1' ng-click='add($event)'></div><div class='icon icon-downward-1' ng-click='subtract($event)'></div></div>"
                +"  </div>"
                +"  <div class='lb' ng-if='selectList && selectList.length>0' ng-show='lbShow'>"
                +"      <ul>"
                +"          <li ng-repeat='selectData in selectList' ng-click='select(selectData, $event)'>{{selectData}}</li>"
                +"      </ul>"
                +"  </div>"
                +"</div>"
        };
    }])
    .directive("xnLookup",["$timeout","$q",function($timeout,$q) {
        return {
            restrict :"EA",
            scope: {
                data : "=ngModel",
                searchKey:"@",
                searchVal:"@",
                required : "@",
                name : "@",
                isPopup:"=",
                showWidth : "@",
                pageSize : "@",
                placeholder : "@",
                callback:"&",
                method:"&"
            },
            templateUrl: "xn/template/select/xnLookup.html",
            replace: true,
            require: "^ngModel",
            link:function (scope, elements, attrs) {
                scope.templateUrl = attrs.templateUrl;
                scope.itemList=[];
                var time = new Date().getTime();
                scope.id = "xnLookup" + time;

                scope.vm={
                    isLoading:false,     //是否在查询
                    showList:false,     //显示选择框
                    maxPageSize:0,          //最大页数
                    key:scope.searchKey||"id",           //关键词
                    name:scope.name||"LookupName"+time,     //输入框名称
                    required:scope.required||false,        //输入框是否必填
                    isRight:false,                          //是否右对齐
                    isPopup:scope.isPopup||false,
                    keyword:"",
                    pageSize:Number(scope.pageSize)|| 10,
                    pageNumber:1,
                    showWidth:scope.showWidth?"width:"+scope.showWidth+"px":"width:100%"
                };
                if(scope.searchVal){
                    scope.vm.val=scope.searchVal.split("|");       //搜索关键词
                }else {
                    scope.vm.val=["name"];
                }

                scope.xnPlaceholder=scope.placeholder||"请输入提示信息！";

                //获取焦距
                scope.doFocus=function () {
                    scope.vm.showList=true;
                    getList();
                };

                //判断返回值是否正确
                scope.$watch(function () {
                    return scope.vm.showList;
                },function (newData) {
                    if(newData==false && !angular.isObject(scope.data)){
                        scope.vm.keyword="";
                    }
                });

                //keyword 负值
                function defineKeyword(data){
                    var keyword="";
                    angular.forEach(scope.vm.val,function (val,index) {
                        if(index==0){
                            keyword+=data[val];
                        }else{
                            keyword=keyword+"-"+data[val];
                        }
                    });
                    scope.vm.keyword=angular.copy(keyword);
                }


                //判断数组
                scope.$watch(function () {
                    return scope.data;
                },function (newData) {
                    if(angular.isObject(newData)){
                        defineKeyword(newData);
                    }
                });

                scope.openList=function (e) {
                    // e.preventDefault();
                    // e.stopPropagation();
                    scope.vm.showList=!scope.vm.showList;
                    if(scope.vm.showList){
                        //打开
                        // getList();
                        $timeout(function() {
                            $("#"+scope.id+" .lookup-input").focus();
                        }, 0);
                    }else {
                        //关闭
                        if(!angular.isObject(scope.data)){
                            scope.vm.keyword="";
                        }
                    }
                };

                //失去焦点
                function doBlur() {
                    $timeout(function() {
                        $("#"+scope.id+" .lookup-input").blur();
                    }, 0);
                }

                //删除数据
                scope.delete=function () {
                    interval = 0;
                    hasSearch = false;
                    scope.data="";
                    scope.vm.keyword="";
                };


                var interval = 0;
                var hasSearch = true;

                setInterval(function () {
                    interval += 10;
                    if(interval >= 350 && !hasSearch) {
                        getList();
                    }
                }, 10);

                //获取列表数据
                function getList(pageNumber) {
                    if(pageNumber!==false){
                        scope.vm.pageNumber=1
                    }
                    hasSearch = true;
                    var deferred  = $q.defer();

                    var data={
                        pageSize: scope.vm.pageSize,
                        pageNumber:scope.vm.pageNumber,
                        keyword:scope.vm.keyword
                    };
                    if(data.keyword){
                        data.keywordList=data.keyword.split("-");       //搜索关键词
                    }else {
                        data.keywordList=[""];
                    }
                    scope.vm.isLoading=true;
                    console.log(scope.vm.isLoading);

                    scope.method({data:{"deferred":deferred,data:data}});
                    // scope.method({deferred:deferred,data:data});

                    deferred.promise.then(function (data) {

                        scope.vm.isLoading=false;
                        console.log(scope.vm.isLoading);
                        //列表负值
                        scope.itemList=[];

                        scope.itemList=data.itemList ||[];
                        scope.vm.totalCount=data.totalCount;
                        //判断第几个
                        if(angular.isObject(scope.data)){
                            var state=true;
                            angular.forEach(data,function (item,index) {
                                if(item[scope.vm.key]==scope.data[scope.vm.key]){
                                    scope.vm.index=index;
                                    state=false;
                                }
                            });
                            if(state){
                                scope.vm.index=0;
                            }
                        }else {
                            scope.vm.index=0;
                        }
                        scope.vm.maxPageSize=Math.ceil(data.totalCount/scope.vm.pageSize);
                    });
                }

                //选择时调用外部方法
                function callback(data){
                    if(scope.callback){
                        scope.callback({data:data});
                    }
                }

                //初始化pageNumber
                function initPage(){
                    scope.vm.pageNumber=1;
                }


                // 按键事件
                scope.onKeydown=function (e) {
                    // //定义选中第几个
                    // var state=false;
                    console.log(e.keyCode);
                    scope.vm.showList=true;
                    switch (e.keyCode){
                        case 13:   //回车
                            var data=scope.itemList[scope.vm.index];
                            scope.data=angular.copy(data);
                            defineKeyword(data);
                            scope.vm.showList=false;
                            doBlur();
                            //调用外部方法
                            callback(data);
                            break;

                        case 33:  //上一页
                            e.preventDefault();
                            e.stopPropagation();
                            if(scope.vm.pageNumber>1){
                                scope.vm.pageNumber--;
                                getList();
                            }
                            break;
                        case 34:  //下一页
                            e.preventDefault();
                            e.stopPropagation();
                            if(scope.vm.pageNumber<scope.vm.maxPageSize){
                                scope.vm.pageNumber++;
                                getList();
                            }
                            break;
                        case 40: //向下
                            e.preventDefault();
                            e.stopPropagation();
                            if(scope.itemList.length-1>scope.vm.index){
                                scope.vm.index++;
                            }
                            break;
                        case 38://向上
                            e.preventDefault();
                            e.stopPropagation();
                            if(scope.vm.index>0){
                                scope.vm.index--;
                            }
                            break;
                        case 39:  //右边
                            break;
                        case 37:  //向左
                            break;
                        case 27:  //退出  esc
                            scope.vm.showList=false;
                            doBlur();
                            if(!angular.isObject(scope.data)){
                                scope.vm.keyword="";
                            }
                            break;
                        case 9:  //退出  teb
                            scope.vm.showList=false;
                            doBlur();
                            if(!angular.isObject(scope.data)){
                                scope.vm.keyword="";
                            }
                            break;
                        case 8://backspace
                            interval = 0;
                            hasSearch = false;
                            initPage();
                            scope.data="";
                            break;
                        case 46://删除
                            interval = 0;
                            hasSearch = false;
                            scope.vm.keyword="";
                            initPage();
                            scope.data="";
                            break;
                        default:
                            interval = 0;
                            hasSearch = false;
                            initPage();
                            // getList();
                            scope.data="";
                            break;
                    }
                };

                scope.doMouseover=function (index) {
                    scope.vm.index=index;
                };

                //上一页
                scope.doPage=function (page) {
                    if(page=="pre"){
                        //上一页
                        if(scope.vm.pageNumber>1){
                            scope.vm.pageNumber--;
                        }else {
                            return;
                        }
                    }else if(page=="next"){
                        //下一页
                        if(scope.vm.pageNumber<scope.vm.maxPageSize){
                            scope.vm.pageNumber++;
                        }else {
                            return;
                        }
                    }
                    //读取数据
                    getList(false);
                };

                //选择
                scope.selectItem=function (data,e) {
                    e.preventDefault();
                    e.stopPropagation();
                    scope.data=angular.copy(data);
                    defineKeyword(data);
                    scope.vm.showList=false;
                    doBlur();
                    callback(data);
                };

                //已开鼠标 关闭
                var getPar = function(tar) {
                    if(tar.id==scope.id){
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
                            scope.vm.showList=false;
                            doBlur();
                            if(!angular.isObject(scope.data)){
                                scope.vm.keyword="";
                            }
                        })
                    }
                });
                //对齐方式
                $timeout(function () {
                    if(scope.showWidth && $(document).width()-$("#"+scope.id).offset().left<scope.showWidth+100){
                        scope.vm.isRight=true;
                    }
                },0);

            }
        }
    }])
    .directive('lookupMatch', ['$http', '$templateCache', '$compile', '$parse', function ($http, $templateCache, $compile, $parse) {
        return {
            restrict:'EA',
            scope:{
                item:"=",
                pro:"="
            },
            link:function (scope, element, attrs) {
                var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/lookup/lookup-match.html';
                $http.get(tplUrl, {cache: $templateCache}).success(function(tplContent){
                    element.replaceWith($compile(tplContent.trim())(scope));
                });
                console.log(scope.pro);


            }
        };
    }]);
