/**
 * Created by DEV005 on 2017/3/28.
 */
(function () {
    "user strict";
    var departmentIndexController = function ($scope, $modal, tutorialService, dialogService) {
        $scope.$emit('navShow', 0);
        $scope.$emit('subNavShow', 0);

        /*
         * pageNumber:当前页数
         * pageSize:页面显示个数
         * */
        $scope.vm = {
            pageSize: 0,
            isLoading:false
        };


        //页面绑定的树结构
        $scope.trees=[];

        //整个平级的树结构存储
        $scope.allTrees=[];

        /**/
        $scope.collapsed=false;

        /*一级树处理
        *   firstLevel
        * @param   list ：array 未处理的原始数据
        * @param  allTrees:  将要生成的平级树结构
        *  row 一级栏目奇偶行
        *  level：等级
        *  visable  ：是否显示
        *  childState：是否有子集
        *  collapsed： 图标是否打开
        * */
        function initTree (list,allTrees) {
            if(list.length > 0){
                /*一级树处理*/
                var rowNumber=0;
                angular.forEach(list,function(item){
                    //如果 parentId==null 则为一级树
                    if(item.parentId ==null){
                        if(rowNumber%2==0){
                            item.row="even";
                        }else{
                            item.row="odd";
                        }
                        rowNumber++;
                        item.level = 0;                             //等级
                        item.visable=true;                         //显示
                        allTrees.push(item);
                        //查询树的子集
                        getTreeChild(item.id,list,allTrees,0);
                    }
                });

                //判断每个树是否有子集
                hasChild(allTrees);
            }
        }


        /**
         * getTreeChild  获取树的子集
         * 递归查找下一级
         * @param pid  父级id
         * @param list ：array 未处理的原始数据
         *  @param  allTrees:  将要生成的平级树结构
         * @param level     层级数
         */
        var getTreeChild = function(pid,list,allTrees,level){
            level ++;
            angular.forEach(list,function(item){
                if(item.parentId === pid){
                    item.level = level;
                    item.visable=false;
                    allTrees.push(item);

                    //递归查询树的子集
                    getTreeChild(item.id,list,allTrees,level);
                }
            });
        };

       /*
       * hasChild  通过相邻两个数据判断后面一条数据是否是前面一条数据的子集
       *            childState：为是否含有子集，true为有，false为没有
       *            collapsed：树接头前面的图标是否是打开状态  true为“+”未打开，false为 “-” 打开
       *
        * @param  allTrees:  完整是平级树结构生成
       * */
        function hasChild (allTrees) {
            for( var i=0; i< allTrees.length-1;i++){
                if(allTrees[i].id == allTrees[i+1].parentId){
                    allTrees[i].childState=true;
                    allTrees[i].collapsed=true;
                }else{
                    allTrees[i].childState=false;
                    allTrees[i].collapsed=false;
                }
            }

            //最后一条数据处理  -
            allTrees[allTrees.length-1].childState=false;
        }


        var getParent = function(pId,orgList){
            angular.forEach($scope.allTrees,function(org){
                if(org.id === pId){
                    orgList.push(org);
                    getParent(org.parentId,orgList);
                }
            });
        };


        var countChild = function(pid,orgList){
            angular.forEach($scope.allTrees,function(org){
                if(org.parentId === pid){
                    orgList.push(org);
                    countChild(org.id,orgList);
                }
            });
        };

        /*
        * getTree  获取树的基本数据 一次性获取
        * */
        function getTree() {
            $scope.vm.isLoading=true;
            tutorialService.searchDepartment($scope.vm).success(function(data){
                $scope.vm.isLoading=false;
                if(data.errors === null || data.errors.length > 0){
                    dialogService.tip(data.errors);
                }else{
                    //数据处理
                    initTree(data.result,$scope.allTrees);

                    //将处理完成的数据负值给页面上的树
                    angular.extend($scope.trees,$scope.allTrees);
                }
            });
        }
        getTree();


        $scope.collapseTree = function(tree,parent){
            angular.forEach(tree,function(organization) {
                if(organization.parentId === parent.id){
                    organization.visable = (!parent.collapsed && parent.visable);
                    $scope.collapseTree(tree,organization);
                }
            });
        };
        $scope.toggle = function(i) {
            $scope.trees[i].collapsed=! $scope.trees[i].collapsed;
            $scope.collapseTree($scope.trees,$scope.trees[i]);

        };

        

        //删除树
        $scope.delete = function(tree) {
            var dialogDefaults = {
                size:"sm"
            };
            var dialogOptions = {
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "继续....?",
                bodyText: "您确定要删除组织吗？",
                callback: function () {
                    tutorialService.deleteDepartment({id:tree.id}).success(function(data){
                        if(data.errors === null || data.errors.length > 0){
                            dialogService.tip(data.errors);
                        }else{
                            /**
                             * 获取树的值在数组中的位置
                             * @param data 当前数据
                             * @returns {number} 返回位置
                             */
                            var location = function(data,dataList){
                                for(var i=0; i < dataList.length; i++){
                                    if(dataList[i].id===data.id){
                                        return  i;
                                    }
                                }
                            };

                            /**
                             * 查找兄弟的个数
                             * @param data       当前数据
                             * @param dataList    查询的数组
                             * @returns {number}  返回兄弟和自己的个数
                             */

                            var brothers = function(data,dataList){
                                var number = 0;
                                for(var i=0; i < dataList.length; i++){
                                    if(dataList[i].parentId===data.parentId){
                                        number++;
                                    }
                                }
                                return number;
                            };

                            /**
                             * 查找父级别位置
                             * @param data
                             * @param dataList
                             * @returns {number}
                             */

                            var locationParent = function(data,dataList){
                                for(var i=0; i < dataList.length; i++){
                                    if(dataList[i].id ===data.parentId){
                                        return i;
                                    }
                                }
                            };
                            if( brothers(tree,$scope.trees)===1){
                                if(locationParent(tree,$scope.trees)!=null){
                                    $scope.trees[locationParent(tree,$scope.trees)].childState = false;
                                }
                            }

                            if( brothers(tree,$scope.allTrees)===1){
                                if(locationParent(tree,$scope.allTrees)!=null){
                                    $scope.allTrees[locationParent(tree,$scope.allTrees)].childState = false;
                                }
                            }

                            $scope.trees.splice(location(tree,$scope.trees),1);
                            $scope.allTrees.splice(location(tree,$scope.allTrees),1);

                            /*一级判断基偶数*/
                            var rowNumber=0;
                            angular.forEach($scope.trees,function(tree){
                                if(tree.level == 0){
                                    if(rowNumber%2==0){
                                        tree.row="even";
                                    }else{
                                        tree.row="odd";
                                    }
                                    rowNumber++;
                                }
                            });

                            dialogService.tip([{"message":"删除成功！" }]);
                        }
                    });
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);

        };

        //树编辑
        $scope.edit = function (tree) {
            var item=angular.copy(tree);

            //弹出窗口
            var modalInstance = $modal.open({
                templateUrl: "eidtTree.html",
                controller:EidtTree,
                size:"",
                resolve: {
                    items: function () {
                        return item;
                    }
                }
            });
            modalInstance.result.then(function (data){

                /**
                 * 获取树的值在数组中的位置
                 * @param data 当前数据
                 * @returns
                 * {number} 返回位置
                 */
               var location = function(data,dataList){
                     for(var i=0; i < dataList.length; i++){
                         if(dataList[i].id==data.id){
                             return i;
                         }
                     }
                 };

               /* *
                *数据新加字段提取
                row 一级栏目奇偶行
                *  level：等级
                *  visable  ：是否显示
                *  childState：是否有子集
                *  collapsed： 图标是否打开*/

                var treesIndex=location(data,$scope.trees);
                var allTreesIndex=location(data,$scope.allTrees);

                /*对应的新字段*/
                var treesItem=angular.extend($scope.trees[treesIndex],data);
                var allTreesItem=angular.extend($scope.allTrees[allTreesIndex],data);

                   //数据替换
                 $scope.trees.splice(treesIndex,1,treesItem);
                 $scope.allTrees.splice(allTreesIndex,1,allTreesItem);
            });
        };

        //新建树节点
        $scope.addTree = function (tree) {
            var item={};
            if(tree != null){
                item = {
                    parentName  :tree.name,
                    parentId :tree.id
                };
            }else{
                item = {
                    parentName  :"",
                    parentId :""
                };
            }

            //弹出窗口
            var modalInstance = $modal.open({
                templateUrl: "eidtTree.html",
                controller:EidtTree,
                size:"",
                resolve: {
                    items: function () {
                        return item;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                //获取父级位置
                var location = function(data,dataList){
                    for(var i=0; i < dataList.length; i++){
                        if(dataList[i].id==data.parentId){
                            return  i;
                        }
                    }
                };

                // 从后向前查找子节点最后一个的位置

                var locationEndChild=function(index,treeList){
                    for(var i=treeList.length-1;i>=0; i--){
                        if(treeList[index].id==treeList[i].parentId){
                            return locationEndChild(i,treeList);
                        }
                    }
                    return index;
                };

                if(data.parentId==""){
                    //增加顶级树
                    data.childState = false;   //没有子集
                    data.collapsed = false;     //"-"号
                    data.visable = true;        //显示
                    data.level=0;                  //层级为0
                    $scope.trees.push(data);
                    $scope.allTrees.push(data);


                    /*一级判断基偶数*/
                    var rowNumber=0;
                    angular.forEach($scope.trees,function(tree){
                        if(tree.level == 0){
                            if(rowNumber%2==0){
                                tree.row="even";
                            }else{
                                tree.row="odd";
                            }
                            rowNumber++;
                        }
                    });
                }else{
                    //父级数据
                    var parentItem=$scope.trees[location(data,$scope.trees)];
                    //增加子级树
                    parentItem.childState = true;   //父级子集为有
                    parentItem.collapsed = false;   //图标为“-”

                    //改变兄弟节点的所以状态   显示出来
                    for(var i=0;i<$scope.trees.length; i++){
                        if($scope.trees[i].parentId===data.parentId){
                            $scope.trees[i].visable=true;
                        }
                    }

                    data.childState = false;         //没有子集
                    data.collapsed = false;          //”-“
                    data.visable = true;               //显示
                    data.level =  parentItem.level+1;  //等级

                    $scope.trees.splice(locationEndChild(location(data,$scope.trees),$scope.trees)+1,0,data);
                    $scope.allTrees.splice(locationEndChild(location(data,$scope.allTrees),$scope.allTrees)+1,0,data);
                }
            });
        };

        $scope.sortUp=function(tree){
            $scope.sortRequestList=[];
            $scope.beforeDomList=[];
            $scope.afterDomList=[];
            $scope.org={};
            $scope.orgUp={};
            //复制
            angular.extend($scope.org ,tree);
            var findIndex=0;
            for( var i=0; i< $scope.trees.length;i++){
                if($scope.org.id==$scope.trees[i].id){
                    findIndex++;
                }
                if($scope.org.parentId==$scope.trees[i].parentId){//无上级
                    if(findIndex==0){
                        var object={
                            id:$scope.trees[i].id,
                            orderIndex:0,
                            rowVersion:$scope.trees[i].rowVersion
                        }
                        $scope.beforeDomList.push(object);
                    }
                    if(findIndex==1&&$scope.org.id!=$scope.trees[i].id){
                        var object={
                            id:$scope.trees[i].id,
                            orderIndex:0,
                            rowVersion:$scope.trees[i].rowVersion
                        }
                        $scope.afterDomList.push(object);
                    }

                }
            }

            if($scope.beforeDomList.length==0){
                dialogService.error("已排序至第一位置，请检查数据");
                return;
            }
            $scope.sort={
                id:$scope.org.id,
                orderIndex:0,
                rowVersion:$scope.org.rowVersion
            }
            $scope.sortRequestList.push($scope.sort);

            $scope.sortUp={
                id:$scope.beforeDomList[$scope.beforeDomList.length-1].id,
                orderIndex:1,
                rowVersion:$scope.beforeDomList[$scope.beforeDomList.length-1].rowVersion
            }
            $scope.sortRequestList.push($scope.sortUp);

            var beforeOrderIndex=-1;
            if($scope.beforeDomList.length!=0){
                for( var i=$scope.beforeDomList.length-2; i>=0;i--){
                    var sort={
                        id:$scope.beforeDomList[i].id,
                        orderIndex:beforeOrderIndex,
                        rowVersion:$scope.beforeDomList[i].rowVersion
                    }
                    $scope.sortRequestList.push(sort);
                    beforeOrderIndex--;
                }
            }


            if($scope.afterDomList.length!=0){
                for( var i=0; i<$scope.afterDomList.length;i++){
                    var sort={
                        id:$scope.afterDomList[i].id,
                        orderIndex:2+i,
                        rowVersion:$scope.afterDomList[i].rowVersion
                    }
                    $scope.sortRequestList.push(sort);
                }
            }



            console.info($scope.org);
            console.info($scope.orgUp);

            HrService.apiHROrgListSort({sortRequestList:$scope.sortRequestList}).success(function(data){
                if(data.errors === null || data.errors.length > 0){
                    dialogService.tip(data.errors);
                }else{
                    dialogService.tip([{"message": "排序成功！"}],"/master/organization/index.htm",1000);
                    //清空数据
                    $scope.org={};
                }
            }) ;
        };

        /*排序处理*/
        $scope.sortDown=function(tree){
            $scope.sortRequestList=[];
            $scope.beforeDomList=[];
            $scope.afterDomList=[];
            $scope.item={};
            $scope.itemDown={};
            //复制
            angular.extend($scope.item ,tree);
            var findIndex=0;
            for( var i=0; i< $scope.trees.length;i++){
                if($scope.item.id==$scope.trees[i].id){
                    findIndex++;
                }
                if($scope.item.parentId==$scope.trees[i].parentId){//无上级
                    if(findIndex==0){
                        var object={
                            id:$scope.trees[i].id,
                            orderIndex:0,
                            rowVersion:$scope.trees[i].rowVersion
                        }
                        $scope.beforeDomList.push(object);
                    }
                    if(findIndex==1&&$scope.item.id!=$scope.trees[i].id){
                        var object={
                            id:$scope.trees[i].id,
                            orderIndex:0,
                            rowVersion:$scope.trees[i].rowVersion
                        }
                        $scope.afterDomList.push(object);
                    }

                }
            }

            if($scope.afterDomList.length==0){
                dialogService.error("已排序至最后位置，请检查数据");
                return;
            }

            $scope.sort={
                id:$scope.item.id,
                orderIndex:1,
                rowVersion:$scope.item.rowVersion
            }
            $scope.sortRequestList.push($scope.sort);

            $scope.sortDown={
                id:$scope.afterDomList[0].id,
                orderIndex:0,
                rowVersion:$scope.afterDomList[0].rowVersion
            }
            $scope.sortRequestList.push($scope.sortDown);

            var beforeOrderIndex=-1;
            if($scope.beforeDomList.length!=0){
                for( var i=$scope.beforeDomList.length-1; i>=0;i--){
                    var sort={
                        id:$scope.beforeDomList[i].id,
                        orderIndex:beforeOrderIndex,
                        rowVersion:$scope.beforeDomList[i].rowVersion
                    }
                    $scope.sortRequestList.push(sort);
                    beforeOrderIndex--;
                }
            }


            if($scope.afterDomList.length!=0){
                for( var i=1; i<$scope.afterDomList.length;i++){
                    var sort={
                        id:$scope.afterDomList[i].id,
                        orderIndex:1+i,
                        rowVersion:$scope.afterDomList[i].rowVersion
                    }
                    $scope.sortRequestList.push(sort);
                }
            }

            console.info($scope.item);
            console.info($scope.itemDown);


            tutorialService.searchDepartment({sortRequestList:$scope.sortRequestList}).success(function(data){
                if(data.errors === null || data.errors.length > 0){
                    dialogService.tip(data.errors);
                }else{
                    dialogService.tip([{"message": "排序成功！"}],"/master/organization/index.htm",1000);
                    //清空数据
                    $scope.item={};
                }
            }) ;
        };
        
        //树搜索
        $scope.treeSearch = function () {
            $scope.treeSearchList = [];
            if($scope.keyword != null){
                $scope.SearchName($scope.allTrees,$scope.keyword);
            } else{
                angular.extend($scope.treeSearchList,$scope.allTrees);
            }
            $scope.trees = $scope.treeSearchList;
        };

        $scope.SearchName = function (data,searchText) {
            var searchLength = searchText.length;
            var jsonArray = data;
            for(var i=0 ;i<jsonArray.length ; i++ ){
                var jsonObject = jsonArray[i];
                var name = jsonObject.name;
                var nameLength = name.length;
                var flag = false;
                for(var temp=0;temp< (nameLength-searchLength+1);temp++){
                    if(searchText == name.substring(temp,temp+searchLength)){
                        flag = true;
                        break;
                    }
                }
                if(flag){
                    var j = 0 ;
                    if(jsonObject.parentId != null){
                        var parentList = [];
                        getParent(jsonObject.parentId,parentList)
                        for(j = parentList.length-1; j >= 0 ;j--){
                            parentList[j].collapsed = false;
                            parentList[j].visable = true;
                            $scope.treeSearchList.push(parentList[j]);
                        }
                    }
                    var tempObj = {};
                    angular.extend(tempObj,jsonObject);
                    var childList = [];
                    countChild(jsonObject.id,childList);
                    if(childList.length == 0){
                        tempObj.collapsed = false;
                        tempObj.visable = true;
                        $scope.treeSearchList.push(tempObj);
                    } else {
                        tempObj.collapsed = true;
                        tempObj.visable = true;
                        $scope.treeSearchList.push(tempObj);
                        for(j = 0; j < childList.length ;j++){
                            $scope.treeSearchList.push(childList[j]);
                        }
                        i =  i + childList.length;
                    }
                }
            }
        };



        /*批量导入*/
        $scope.import = {
            title:"部门导入",
            uploadMethod:"api.inv.item.adjustment.import",
            downLoadUrl:"/inventory/api.do",
            downLoadMethod:"api.inventory.adjustment.output.template"
        };
    };


    var EidtTree = ["$scope","$modalInstance","items","tutorialService","dialogService",
        function ($scope, $modalInstance, items,tutorialService,dialogService) {
            $scope.vm = items;
            if($scope.vm.id){
                // 编辑
                /*获取新数据*/
                tutorialService.getDepartment($scope.vm).success(function(data){
                    if(data.errors === null || data.errors.length > 0){
                        dialogService.tip(data.errors);
                    }else{
                        $scope.vm=data.department;
                        var ownerEmployee={
                            id:data.department.ownerEmployeeId,
                            name:data.department.ownerEmployeeName
                        };
                        /*负责人赋值*/
                        $scope.ownerEmployee=ownerEmployee;

                        $scope.vm.title ="部门编辑";
                    }
                });
            } else {
                // 创建
                $scope.vm.title = "创建部门";
            }

            //数据加载
            $scope.getOwnerEmployee=function(backdata){
                var param={
                    isResign:false,
                    keyword:backdata.data.keyword,
                    pageNumber: backdata.data.pageNumber,
                    pageSize: backdata.data.pageSize
                };
                tutorialService.searchEmployee(param).success(function(data){
                    if (data.errors == null || data.errors.length > 0) {
                        dialogService.tip(data.errors);
                    }
                    else {
                        backdata.deferred.resolve({itemList:data.result,totalCount:data.totalCount});
                    }
                });
            };


            //数据提交
            $scope.doSave = function () {

                //负责人验证
                if(angular.isObject($scope.ownerEmployee)){
                    $scope.vm.ownerEmployeeId=$scope.ownerEmployee.id;
                    $scope.vm.ownerEmployeeName=$scope.ownerEmployee.name;
                }else {
                    $scope.vm.ownerEmployeeId=null;
                    $scope.vm.ownerEmployeeName=null;
                }

                if($scope.vm.id == null){
                    //新建
                    tutorialService.createDepartment($scope.vm).success(function(data){
                        if(data.errors === null || data.errors.length > 0){
                            dialogService.tip(data.errors);
                        }else{
                            //返回id
                            $scope.vm.id = data.id;

                            dialogService.tip([{"message": "保存成功！"}]);

                            //关闭
                            $modalInstance.close($scope.vm);

                            //清空数据
                            $scope.vm={};
                        }
                    }) ;
                } else {
                    //编辑
                    tutorialService.updateDepartment($scope.vm).success(function(data){
                        if(data.errors === null || data.errors.length > 0){
                            dialogService.tip(data.errors);
                        }else{
                            dialogService.tip([{"message": "保存成功！"}]);
                            //关闭
                            $modalInstance.close($scope.vm);
                            //清空数据
                            $scope.vm={};
                        }
                    }) ;
                }
            };

            /*取消*/
            $scope.clean = function () {
                $scope.org = {};
                $modalInstance.dismiss('cancel');
            };

            /*关闭错误*/
            $scope.closeAlert = function (index,form) {
                form.splice(index,1);
            };
        }];

    var xnPage = angular.module("xn.page", ["xn.directive.form"])
        .config(["xnValidatorProvider", function (xnValidatorProvider) {
        // 全局配置
        xnValidatorProvider.config({
            blurTrig   : false,
            showError  : false,
            removeError: false
        });
        xnValidatorProvider.setRules({
            name:{
                required: "名称不能为空！",
                maxlength:"名称长度不能超过50"
            },
            code:{
                required: "代码不能为空！",
                maxlength:"编码长度不能超过50"
            },
            type:{
                required: "类型不能为空！",
                maxlength:"类型长度不能超过50"
            }
        });

    }])
        .controller("DepartmentIndexController", ["$scope", "$modal", "tutorialService", "dialogService", departmentIndexController])

})();
