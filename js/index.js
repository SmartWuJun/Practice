//var dialogDefaults = {
            //    size: "sm"
            //};
            //var dialogOptions = {
            //    closeButtonText: "取消",
            //    actionButtonText: "确定离职",
            //    headerText: "继续....?",
            //    bodyText: "您确定要设置当前员工离职吗？",
            //    callback: function () {
            //
            //        var params={
            //            id:$scope.employee.id,
            //            resignDate:new Date().format('yyyy-MM-dd')
            //        };
            //        tutorialService.resignEmployee(params).success(function (data) {
            //            if (data.errors === null || data.errors.length > 0) {
            //                /*如果失败弹出提示框报错*/
            //                dialogService.tip(data.errors);
            //            } else {
            //                /*dialogService.tip 提示方法
            //                 * type: Array 提示内容
            //                 * url: 跳转页面
            //                 * time :延迟关闭时间 ，毫秒
            //                 * */
            //                dialogService.tip([{"message": "离职成功！"}], "/tutorial/employee/index.htm",1000);
            //            }
            //        });
            //    }
            //};
            //dialogService.confirm(dialogDefaults, dialogOptions);