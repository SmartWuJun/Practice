(function () {
    "user strict";

    // 视频首页控制器
    var videoIndexController = function ($scope, tutorialService, foundationService, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 3);
        $scope.$emit('subNavShow', 0);

        $scope.vm = {
            status: "UPLOADED",      // 默认状态-已上传视频列表
            pageNumber: 1,  // 当前页数
            pageSize: 10,   // 页面显示个数
            isLoading: false, // 是否加载中
            sortType: "DESC"
        };
        $scope.tenantId = "";

        $scope.showList = [];       // 当前显示的列表
        $scope.videoList = [];      // 已存在视频列表
        $scope.uploadingList = [];  // 上传中视频列表

        $scope.changeTab = function (tab) {
            $scope.vm.status = tab;
            if(tab === "UPLOADED") {
                $scope.showList = $scope.videoList;
            } else if (tab === "UPLOADING") {
                $scope.showList = $scope.uploadingList;
            }
        };

        // 选择添加文件
        $scope.selectFile = function () {
            $("#files").click();
        };

        // 获取视频列表数据
        $scope.getList = function () {
            $scope.videoList = [];
            $scope.vm.isLoading = true;

            // 模糊查询信息信息
            tutorialService.searchVideo($scope.vm).success(function (data) {
                $scope.vm.isLoading = false;
                if (data.errors === null || data.errors.length > 0) {
                    /*如果失败弹出提示框报错*/

                    /*dialogService.tip 提示方法
                     * type: Array 提示内容
                     * url: 跳转页面
                     * time :延迟关闭时间 ，毫秒
                     * */
                    dialogService.tip(data.errors, null, null)
                } else {
                    /*成功处理*/
                    $scope.videoList = data.result;
                    $scope.vm.totalCount = data.totalCount;

                    $scope.showList = $scope.videoList;
                }
            })
        };

        // 搜索已上传视频
        $scope.doSearch = function () {
            $scope.vm.pageNumber = 1;
            $scope.getList();
        };

        /*执行查询方法*/
        $scope.doSearch();

        $scope.getTicket = function (param, callback) {
            // 获取文件上传凭证
            tutorialService.getVideoUploadAuth(param).success(function (data) {
                if (data.errors === null || data.errors.length > 0) {
                    // 如果失败弹出提示框报错
                    dialogService.tip(data.errors, null, null)
                } else {
                    $scope.tenantId = data.tenantId;
                    callback(data);
                }
            })
        };

        var uploader = new VODUpload({
            // 文件上传失败
            'onUploadFailed': function (uploadInfo, code, message) {
                // log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
            },
            // 文件上传完成
            'onUploadSucceed': function (uploadInfo) {
                // 处理视频路径，将bucket信息加入endpoint信息中
                var fileUrl = uploadInfo.endpoint.replace("://", "://" + uploadInfo.bucket + ".") + "/" + uploadInfo.object;
                var video = {
                    videoFileUrl: fileUrl,
                    title: uploadInfo.file.name
                };

                // 调用后台接口创建视频记录
                tutorialService.createVideo(video).success(function (data) {
                    if (data.errors === null && data.errors.length > 0) {
                        dialogService.tip(data.errors);
                    } else {
                        // 执行查询方法
                        $scope.doSearch();
                        $scope.$apply();
                    }
                })
            },
            // 文件上传进度
            'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
                for(var i=0; i<$scope.uploadingList.length; i++) {
                    var v = $scope.uploadingList[i];
                    if (uploadInfo.file.id === v.id) {
                        var video = $scope.uploadingList[i];
                        video.percent = Math.ceil(uploadedSize * 100 / totalSize) + "%";
                        video.uploadedSize = uploadedSize;
                        $scope.$apply();
                        break;
                    }
                }
            },
            // STS临时账号会过期，过期时触发函数
            'onUploadTokenExpired': function () {
                // log("onUploadTokenExpired");
                // OSS直接上传:STS方式，安全但是较为复杂，建议生产环境下使用。
                // 临时账号过期时，在onUploadTokenExpired事件中，用resumeWithToken更新临时账号，上传会续传。
                // 实现时，从新获取STS临时账号用于恢复上传
                $scope.getTicket({}, function (data) {
                    uploader.resumeUploadWithToken(data.accessKeyId, data.accessKeySecret, data.securityToken, data.expiration);
                });
            },
            // 开始上传
            'onUploadstarted': function (uploadInfo) {
                // log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
             }
        });

        $scope.getTicket({}, function (data) {
            // OSS直接上传:STS方式，安全但是较为复杂，建议生产环境下使用。
            // 临时账号过期时，在onUploadTokenExpired事件中，用resumeWithToken更新临时账号，上传会续传。
            uploader.init(data.accessKeyId, data.accessKeySecret, data.securityToken, data.expiration);
        });

        // 当文件列表发生了变化
        $("#files").on("change", function (event) {

            var nameList = [];
            for(var i=0; i<event.target.files.length; i++) {
                if(!event.target.files[i].id) {
                    nameList.push(event.target.files[i].name);
                }
            }
            tutorialService.getVideoUploadInfo({nameList : nameList}).success(function (data) {
                var infoList = data.infoList;

                for(var i=0; i<event.target.files.length; i++) {
                    var info = infoList[i];
                    var file = event.target.files[i];
                    file.id = info.id;

                    var video = {
                        id : file.id,
                        title : file.name,
                        type :file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length),
                        size : file.size
                    };
                    $scope.uploadingList.push(video);
                    var userData = '{"Vod":{"Title":"' + info.title + '"}}';
                    uploader.addFile(file, info.endpoint, info.bucket, info.fileUrl, userData);
                }
                uploader.startUpload();
            });
            // 切换到待上传列表
            if($scope.vm.status !== "UPLOADING") {
                $scope.changeTab("UPLOADING");
            }
            $scope.$apply();
        });
    };

    // 视频查看控制器
    var videoOpenController = function ($scope, $location, tutorialService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 3);
        $scope.$emit('subNavShow', 0);

        $scope.video = {
            id:toolsService.parameter("id", $location.absUrl())
        };

        // 获取视频和封面信息
        tutorialService.getVideo($scope.video).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.video = data.video;
            }
        });

        // 删除视频
        $scope.doDelete = function () {
            var dialogDefaults = {
                size: "sm"
            };
            var dialogOptions = {
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "继续....?",
                bodyText: "您确定要删除当前视频吗？",
                callback: function () {
                    tutorialService.deleteVideo({id : $scope.video.id}).success(function (data) {
                        if (data.errors === null || data.errors.length > 0) {
                            dialogService.tip(data.errors);
                        } else {
                            dialogService.tip([{"message": "删除成功！"}], "/tutorial/video/index.htm", 1000);
                        }
                    });
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);
        };
        // 上线视频
        $scope.online = function () {
            var dialogDefaults = {
                size: "sm"
            };
            var dialogOptions = {
                closeButtonText: "取消",
                actionButtonText: "确定上线",
                headerText: "继续....?",
                bodyText: "您确定要上线当前视频吗？",
                callback: function () {
                    tutorialService.publishVideo({id : $scope.video.id, rowVersion : $scope.video.rowVersion, publish : true}).success(function (data) {
                        if (data.errors === null || data.errors.length > 0) {
                            dialogService.tip(data.errors);
                        } else {
                            dialogService.tip([{"message": "上线成功！"}], "/tutorial/video/open.htm?id=" + $scope.video.id, 1000);
                        }
                    });
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);
        };
        // 下线视频
        $scope.offline = function () {
            var dialogDefaults = {
                size: "sm"
            };
            var dialogOptions = {
                closeButtonText: "取消",
                actionButtonText: "确定下线",
                headerText: "继续....?",
                bodyText: "下线后视频将无法播放，您确定要下线当前视频吗？",
                callback: function () {
                    tutorialService.publishVideo({id : $scope.video.id, rowVersion : $scope.video.rowVersion, publish : false}).success(function (data) {
                        if (data.errors === null || data.errors.length > 0) {
                            dialogService.tip(data.errors);
                        } else {
                            dialogService.tip([{"message": "下线成功！"}], "/tutorial/video/open.htm?id=" + $scope.video.id, 1000);
                        }
                    });
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);
        }
    };

    // 视频播放控制器
    var videoPlayController = function ($scope, $location, tutorialService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 3);
        $scope.$emit('subNavShow', 0);

    };

    // 视频独立上传控制器
    var videoUploadController = function ($scope, $location, tutorialService, foundationService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 3);
        $scope.$emit('subNavShow', 0);

        $scope.video = {
        };
        $scope.tenantId = "";

        $scope.selectFile = function () {
            $("#files").click();
        };

        // 获取上传凭证方法
        $scope.getTicket = function (param, callback) {
            // 获取文件上传凭证
            tutorialService.getVideoUploadAuth(param).success(function (data) {
                if (data.errors === null || data.errors.length > 0) {
                    // 如果失败弹出提示框报错
                    dialogService.tip(data.errors, null, null)
                } else {
                    $scope.tenantId = data.tenantId;
                    callback(data);
                }
            })
        };

        var uploader = new VODUpload({
            // 文件上传完成
            'onUploadSucceed': function (uploadInfo) {
                var fileUrl = uploadInfo.endpoint.replace("://", "://" + uploadInfo.bucket + ".") + "/" + uploadInfo.object;
                var video = {
                    videoFileUrl: fileUrl,
                    title: uploadInfo.file.name
                };

                // 调用后台接口创建视频记录
                tutorialService.createVideo(video).success(function (data) {
                    if (data.errors === null && data.errors.length > 0) {
                        dialogService.tip(data.errors);
                    } else {
                        $scope.$apply();
                    }
                })
            },
            // 文件上传进度
            'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
                $scope.video.percent = Math.ceil(uploadedSize * 100 / totalSize) + "%";
                $scope.video.uploadedSize = uploadedSize;
                $scope.$apply();
            },
            // STS临时账号会过期，过期时触发函数
            'onUploadTokenExpired': function () {
                $scope.getTicket({}, function (data) {
                    uploader.resumeUploadWithToken(data.accessKeyId, data.accessKeySecret, data.securityToken, data.expiration);
                });
            }
        });

        $scope.getTicket({}, function (data) {
            // OSS直接上传:STS方式，安全但是较为复杂，建议生产环境下使用。
            // 临时账号过期时，在onUploadTokenExpired事件中，用resumeWithToken更新临时账号，上传会续传。
            uploader.init(data.accessKeyId, data.accessKeySecret, data.securityToken, data.expiration);
        });

        $("#files").on("change", function (event) {
            foundationService.getId().success(function (data) {
                var id = data.id;
                var file = event.target.files[0];

                $scope.video = {
                    id : id,
                    title : file.name,
                    type :file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length),
                    size : file.size
                };

                // 添加文件
                var userData = '{"Vod":{"Title":"' + file.name + '"}}';
                uploader.addFile(file, "http://oss-cn-shanghai.aliyuncs.com", "xn-video-dev", "video/" + $scope.tenantId + "/" + id + "." + file.type.split("/")[1], userData);
                // 启动文件上传
                uploader.startUpload();
            });
        });
    };

    var xnPage = angular.module("xn.page", ["xn.directive.form"])
        .config(["xnValidatorProvider", function (xnValidatorProvider) {
            // 全局配置
            xnValidatorProvider.config({
                blurTrig: false,
                showError: false,
                removeError: false
            });
            xnValidatorProvider.setRules({
                number: {
                    required: "单号不能为空！"
                },
                employee: {
                    required: "员工不能为空！"
                },
                beginDate: {
                    required: "开始时间不能为空！"
                },
                entryDate: {
                    required: "结束时间不能为空！"
                }
            });
        }])
        .controller("VideoIndexController", ["$scope", "tutorialService", "foundationService", "dialogService", videoIndexController])
        .controller("VideoOpenController", ["$scope", "$location", "tutorialService", "dialogService", "toolsService", videoOpenController])
        .controller("VideoPlayController", ["$scope", "$location", "tutorialService", "dialogService", "toolsService", videoPlayController])
        .controller("VideoUploadController", ["$scope", "$location", "tutorialService", "foundationService", "dialogService", "toolsService", videoUploadController])
})();