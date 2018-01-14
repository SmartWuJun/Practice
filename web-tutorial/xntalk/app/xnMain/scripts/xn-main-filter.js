(function () {
    "use strict";
    angular.module("xn.talk.filter", [])
        .filter('substr', function() {
            return function(input,start) {

                String.prototype.lengthB = function( ){
                    var b = 0, l = this.length;
                    if( l ){
                        for( var i = 0; i < l; i ++ ){
                            if(this.charCodeAt( i ) > 255 ){
                                b += 2;
                            }else{
                                b ++ ;
                            }
                        }
                        return b;
                    }else{
                        return 0;
                    }
                };

                if(input){
                    var data="";
                    if(start){
                        if(input.lengthB()>start){
                            data =input.substr(0, start)+"...";
                        }else{
                            data =input.substr(0, start)
                        }
                    }else{
                        data=input;
                    }
                    return data;
                };
            }
        })

})();


