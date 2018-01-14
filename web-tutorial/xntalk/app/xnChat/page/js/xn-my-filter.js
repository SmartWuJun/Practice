(function () {
    "use strict";
    angular.module("xn.my.filter", [])
        .filter("fileSize",function() {
            return function (input) {
                if(input){
                    if (input < 1024) {
                        return input + "B";
                    } else if (input < 1024 * 1024) {
                        return Math.round(input / 1024) + "KB";
                    } else if (input < 1024 * 1024 * 1024){
                        return (input / 1024 / 1024).toFixed(2) + "MB";
                    } else {
                        return (input / 1024 / 1024 / 1024).toFixed(2) + "GB";
                    }
                }
            };
        })
        /*.filter("diskFileType", function () {
                return function (input) {


                    return "img";
                };
            }
        )*/
        .filter("diskFileType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "folder":
                            input="folder";
                            break;
                        case "xlsx":
                        case "xls":
                            input="xls";
                            break;
                        case "docx":
                        case "doc":
                            input="doc";
                            break;
                        case "pptx":
                        case "ppt":
                            input="ppt";
                            break;
                        case "txt":
                            input="txt";
                            break;
                        case "pdf":
                            input="pdf";
                            break;
                        case "zip":
                        case "rar":
                            input="zip";
                            break;
                        case "jpeg":
                        case "jpg":
                        case "png":
                        case "gif":
                            input="img";
                            break;
                        default:
                            input="other";
                            break;
                    }
                    return input;
                };
            }
        ])
})();

