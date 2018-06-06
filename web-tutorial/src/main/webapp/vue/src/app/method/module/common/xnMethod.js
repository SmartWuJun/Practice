/**
 * Created by DEV005 on 2017/5/9.
 */
!function (a, b) {
    module.exports = b(a)
}(window, function (a, b) {
    const window=a;
    const Method=function(){
        this.goBack = function () {
            window.history.go(-1);
        };
        this.watchGoBack = function () {

            if (window.history && window.history.pushState) {
                window.onpopstate = function(event) {

                };
            }
        };
    };
    //const method=new Method();
    //window.xnMethod=method;
    return new Method();
});

