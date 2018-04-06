/**
 * Created by YQ on 2016/9/9.
 */
/**
 * Created by YQ on 2016/8/4.
 */

(function () {
    

    function bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        var k = 1024;
        sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseInt( (bytes / Math.pow(k, i)) + ' ') + sizes[i];
        //(0) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }
    var sendFileController = function($rootScope, $scope, $http, $q, $filter, myApp) {

        $scope.$watch('eleSendFileIsShow', function(newValue, oldValue, scope){
            if(newValue == false)
            {
                $scope.fileName="";
                $scope.fileSize="";
            }

        });


        $scope.sendFile = function () {

            if($scope.nativeImage && !$scope.nativeImage.isEmpty() )
            {

                var that = myApp.yunXin,
                    scene = that.$chatEditor.data('type'),
                    to = that.$chatEditor.data('to');
                var buffer = $scope.nativeImage.toJPEG(80);
                var blob = new Blob(buffer, {type:"application/octet-stream"});
                {
                    yunXin.mysdk.nim.sendFile({
                        scene: scene,
                        to: to,
                        type: 'image',
                        dataURL:$scope.nativeImage.toDataURL(),
                        uploadprogress: function (data) {
                            console && console.log(data.percentageText);
                        },
                        uploaderror: function () {
                            console && console.log('上传失败');
                        },
                        uploaddone: function (file) {
                            console && console.log('上传完成，服务器处理中...');
                        },
                        beforesend: function (msgId) {
                            console && console.log('正在发送消息, id=' + msgId);
                        },
                        done: yunXin.sendMsgDone.bind(yunXin)
                    });
                }

            }
            $scope.eleSendFileIsShow = false;

        };

        $scope.setFile = function (fileName, fileSize) {
            $scope.fileSize = bytesToSize(fileSize);
            $scope.fileName = fileName;

        };


    };
    var myApp =  angular.module("xn.sendFile", []);
    myApp.service('myApp', function() {
        this.yunXin = yunXin;
    });

    myApp.controller("sendFileController", ["$rootScope", "$scope", "$http","$q", "$filter", "myApp", sendFileController])


})();
