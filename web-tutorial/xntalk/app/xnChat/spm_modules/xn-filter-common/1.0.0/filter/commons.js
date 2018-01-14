(function () {
    "use strict";
    angular.module("xn.filter.common", [])
        .filter("titleCase", function () {
            return function (input) {
                var words = input.split(" ");
                for (var i = 0; i < words.length; i++) {
                    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
                }
                return words.join(" ");
            };
        })
        .filter('pageOffset', function() {
            return function(input, start) {
                if(input){
                    start = parseInt(start, 10);
                    return input.slice(start);
                };
            }
        })
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
                }

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
        .filter("bankNumber", [
            function (){
                return function (input) {
                    // var bankNumber = Number(input).toFixed(0).toString().split("");
                    if(!input)
                        return ;
                    var bankNumber = input.split("");
                    var index=0;
                    angular.forEach(bankNumber,function(bank){
                        if(index%5===4){
                            bankNumber.splice(index,0,"-");
                        }
                        index++;
                    });
                    return bankNumber.join("");

                };
            }
        ])

        .filter("barcode", [
            function (){
                return function (input) {
                    var pro="*";
                    if(input){
                        input=pro.concat(input);
                        input =input.concat(pro);
                    }

                    return input;
                };
            }
        ])

        .filter("fileName", [
            function (){
                return function (input) {
                    var filename;
                    var index=input.lastIndexOf(".");
                    filename=input.substring(index+1);
                    return filename;
                };
            }
        ])
        .filter("isImg", [
            function (){
                return function (input) {
                    var filename=[];
                    var state=false;
                    var index=input.lastIndexOf(".");
                    filename=input.substring(index+1);
                    switch (filename)
                    {   case "gif":
                        case "bmp":
                        case "jpeg":
                        case "jpg":
                        case "png":
                            state=true;
                            break;
                    }

                    return state;
                };
            }
        ])

        .filter("cardBankName", [
            function () {
                return function (input,id) {
                    var cardBankName=input;
                    switch (id)
                    {
                        case "10":
                        case "17":
                        case "12":
                        case "18":
                        case "16":
                        case "6":
                        case "14":
                            cardBankName="";
                            break;
                    }
                    return cardBankName;
                };
            }
        ])
        .filter("money", function () {
            return function (input, retain, isState, sign) {
                /**
                 * retain  小数的位数
                 * isState  小数是否保留0，true为保留，falase为舍弃
                 * @type {boolean}
                 */
                if(!retain)
                    retain = 2;
                if(!isState)
                    isState = false;
                if(sign==undefined)
                    sign = "￥";
                if(input){
                    var number=Number(retain);
                    var moneyList =[];
                    moneyList =Number(input).toFixed(number).toString().split(".");
                    var money = moneyList[0].split("");
                    var frac = moneyList[1].split("");
                    frac.unshift(".");
                    //整数加“，”
                    var index=0;
                    if(money[0]==="-"){
                        for( var i=money.length;i>1;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }else{
                        for( var i=money.length;i>0;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }
                    //小数舍弃
                    if(!isState){
                        for(var i=frac.length ; i>3;i--){
                            if(frac[i-1]==0){
                                frac.pop();
                            }else{
                                break;
                            }
                        }
                    }
                    money=money.concat(frac);
                    money.splice(0,0,""+sign);
                    return money.join("");
                }else{
                    return sign+"0.00";
                }
            };
        })

        .filter("moneySingle", function () {
            return function (input,retain,isState) {
                /**
                 * retain  小数的位数
                 * isState  小数是否保留0，true为保留，false为舍弃
                 * @type {boolean}
                 */

                var state =false;
                if(isState){
                    state=true;
                }

                if(input){
                    var number=2;
                    if(retain){
                        number=Number(retain);
                    }

                    var moneyList =[];
                    moneyList =Number(input).toFixed(number).toString().split(".");

                    var money = moneyList[0].split("");
                    var frac = moneyList[1].split("");
                    frac.unshift(".");


                    //整数加“，”
                    var index=0;
                    if(money[0]==="-"){
                        for( var i=money.length;i>1;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }else{
                        for( var i=money.length;i>0;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }

                    //小数舍弃

                    if(!state){
                        for(var i=frac.length ; i>3;i--){
                            if(frac[i-1]==0){
                                frac.pop();
                            }else{
                                break;
                            }
                        }
                    }else{}

                    money=money.concat(frac);
                    money.splice(0,0," ");
                    return money.join("");
                }else{
                    return "0.00";
                }
            };
        })





        .filter("moneyNoSymbol", function () {
            return function (input) {
                if(input){
                    var money = Number(input).toFixed(2).toString().split("");
                    var index=0;
                    if(money[0]==="-"){
                        for( var i=money.length-3;i>1;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }else{
                        for( var i=money.length-3;i>0;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }
                    return money.join("");
                }else{
                    return "0.00";
                }
            };
        })
        .filter("moneyCharacter", [
            function () {
                return function (input) {
                    var money="";
                    switch (input)
                    {
                        case "0":
                            money="零";
                            break;
                        case "1":
                            money="壹";
                            break;
                        case "2":
                            money="贰";
                            break;
                        case "3":
                            money="叁";
                            break;
                        case "4":
                            money="肆";
                            break;
                        case "5":
                            money="伍";
                            break;
                        case "6":
                            money="陆";
                            break;
                        case "7":
                            money="柒";
                            break;
                        case "8":
                            money="捌";
                            break;
                        case "9":
                            money="玖";
                            break;
                        default :
                            money="";
                            break;

                    }
                    return money;
                };
            }
        ])
        .filter("website", function () {
            return function (input) {
                var website = input;
                if(website != null && website.length > 4){
                    if (input.substring(0, 4) != "http") {
                        website = ( "http://" + input);
                    }
                }
                return website;
            };
        })
        .filter("percent", function () {
            return function (input) {
                if(input){
                    var percent=Number(input*100).toFixed(2);
                    percent=percent+"%";
                    return percent;
                }else{
                    return  input;
                }

            };
        })
        .filter("intPercent", function () {
            return function (input) {
                if(input){
                    var percent=Number(input*100).toFixed(0);
                    percent=percent+"%";
                    return percent;
                }else{
                    return  input;
                }

            };
        })
        .filter("mobilePhone", function () {
            return function (input) {
                var phone = input;

                if (input && input.length === 11) {
                    phone = (input.substring(0, 3) + " " + input.substring(3, 7) + " " + input.substring(7, 11));
                }
                return phone;
            };
        })
        .filter("firstText", [
            function () {
                return function (input) {
                    return input ? input.substring(0, 1).toLocaleUpperCase() : "";
                };
            }
        ])
        .filter("dateFormat", [
            function () {
                return function (input) {
                    input=Number(input);
                    return input ?  moment(input).format("YYYY-MM-DD") : "";
                };
            }
        ])
        .filter("timeFullFormat", [
            function () {
                return function (input) {
                    input=Number(input);
                    return input ?  moment(input).format("YYYY-MM-DD HH:mm") : "";
                };
            }
        ])
        .filter("timeReturnFormat", [
            function () {
                return function (input) {

                    if(input){
                        if(input.indexOf(" ")==10){
                            var time ;
                            time =input.substr(0,10)+"\r\n"+input.substr(11,5);
                            return time ;
                        }else{
                            input=Number(input);
                            return input ?  moment(input).format("YYYY-MM-DD")+ "\r\n" + moment(input).format("HH:mm") : "";
                        }
                    }else{
                        return;
                    }

                };
            }
        ])
        .filter("timeFormat", [
            function () {
                return function (input) {
                    input=Number(input);
                    return input ?  moment(input).format("HH:mm") : "";
                };
            }
        ])
        .filter("sex", [
            function () {
                return function (input) {
                    var sex="未知";
                    switch (input)
                    {
                        case "F":
                            sex="女";
                            break;
                        case "M":
                            sex="男";
                            break;
                        case "X":
                            sex="保密";
                            break;
                        default :
                            sex="未知";
                            break;

                    }
                    return sex;
                };
            }
        ])
        .filter("sexIcon", [
            function () {
                return function (input) {
                    var icon="icon-user";
                    switch (input)
                    {
                        case "F":
                            icon="icon-female";
                            break;
                        case "M":
                            icon="icon-male";
                            break;
                        default :
                            break;

                    }
                    return icon;
                };
            }
        ])
        .filter("bookImage", [
            function () {
                return function (input) {
                    if(input==null)
                    {
                        return "/home/images/books.png"
                    }
                    else
                    {
                        return input;
                    }

                };
            }
        ])
        .filter("isActive", [
            function () {
                return function (input) {
                    var isActive="有效";
                    switch (input)
                    {
                        case false:
                            isActive="无效";
                            break;
                        case true:
                            isActive="有效";
                            break;
                        default :
                            break;

                    }
                    return isActive;
                };
            }
        ])
        .filter("yesNo", [
            function () {
                return function (input) {
                    var yesNo="";
                    switch (input)
                    {
                        case false:
                            yesNo="否";
                            break;
                        case true:
                            yesNo="是";
                            break;
                        default :
                            break;

                    }
                    return yesNo;
                };
            }
        ])

        .filter("userSourceType", [
            function () {
                return function (input) {
                    var userSourceType="";
                    var  inputData="";
                    if(input){
                        inputData=input.toUpperCase()
                    }
                    switch (inputData)
                    {
                        case "EMPLOYEE":
                            userSourceType="员工";
                            break;
                        case "OTHER":
                        case "NONE":
                            userSourceType="用户";
                            break;
                        case "ISV":
                            userSourceType="开发者";
                            break;
                        case "MEMBER":
                            userSourceType="会员";
                            break;
                        case "CUSTOMER":
                            userSourceType="采购商";
                            break;
                        case "SUPPLIER":
                            userSourceType="供应商";
                            break;
                        default :
                            userSourceType=input;
                            break;
                    }
                    return userSourceType;
                };
            }
        ])
        .filter("applicationName", [
            function () {
                return function (input) {
                    var applicationName="";
                    switch (input)
                    {
                        case "common":
                            applicationName="ERP应用";
                            break;
                        case "system":
                            applicationName="系统管理";
                            break;
                        case "membership":
                            applicationName="会员管理";
                            break;
                        case "library":
                            applicationName="图书管理";
                            break;
                        case "hr":
                        case "humanresource":
                            applicationName="人力资源";
                            break;
                        default :
                            applicationName=input;
                            break;
                    }
                    return applicationName;
                };
            }
        ])
        .filter("employeeType", [
            function () {
                return function (input) {
                    var paperType="";
                    switch (input)
                    {
                        case "EMPLOYEE":
                            paperType="正式员工";
                            break;
                        case "OUTSOURCING":
                            paperType="外包";
                            break;
                        case "INTERNAL":
                            paperType="实习生";
                            break;
                        default :
                            paperType="未提供";
                            break;
                    }
                    return paperType;
                };
            }
        ])
        .filter("birthDateType", [
            function () {
                return function (input) {
                    var paperType="";
                    switch (input)
                    {
                        case "LUNAR":
                            paperType="农历";
                            break;
                        case "GREGORIAN":
                            paperType="公历";
                            break;
                        default :
                            paperType="未提供";
                            break;
                    }
                    return paperType;
                };
            }
        ])
        .filter("paperType", [
            function () {
                return function (input) {
                    var paperType="";
                    switch (input)
                    {
                        case "IDENTITY":
                            paperType="身份证";
                            break;
                        case "PASSPORT":
                            paperType="护照";
                            break;
                        case "PERMIT":
                            paperType="通行证";
                            break;
                        default :
                            paperType="未提供";
                            break;
                    }
                    return paperType;
                };
            }
        ])
        .filter("educationDegree", [
            function () {
                return function (input) {
                    var paperType="";
                    switch (input)
                    {
                        case "DOCTOR":
                            paperType="博士";
                            break;
                        case "MASTER":
                            paperType="硕士";
                            break;
                        case "BACHELOR":
                            paperType="本科";
                            break;
                        case "COLLEGE":
                            paperType="大专";
                            break;
                        case "HIGHSCHOOL":
                            paperType="高中";
                            break;
                        case "SECONDARY":
                            paperType="中专";
                            break;
                        case "JUNIORHIGH":
                            paperType="初中";
                            break;
                        case "REST":
                            paperType="其它";
                            break;
                        default :
                            paperType="未提供";
                            break;
                    }
                    return paperType;
                };
            }
        ])
        .filter("maritalStatus", [
            function () {
                return function (input) {
                    var paperType="";
                    switch (input)
                    {
                        case "SINGLE":
                            paperType="未婚";
                            break;
                        case "MARRIED":
                            paperType="已婚";
                            break;
                        case "DIVORCED":
                            paperType="离异";
                            break;
                        default :
                            paperType="未提供";
                            break;
                    }
                    return paperType;
                };
            }
        ])
        .filter("bloodGroup", [
            function () {
                return function (input) {
                    var paperType="";
                    switch (input)
                    {
                        case "A":
                            paperType="A型";
                            break;
                        case "B":
                            paperType="B型";
                            break;
                        case "AB":
                            paperType="AB型";
                            break;
                        case "O":
                            paperType="O型";
                            break;
                        default :
                            paperType="未提供";
                            break;
                    }
                    return paperType;
                };
            }
        ])
        .filter("militaryStatus", [
            function () {
                return function (input) {
                    var paperType="";
                    switch (input)
                    {
                        case "NOT":
                            paperType="未服";
                            break;
                        case "PASSED":
                            paperType="已服";
                            break;
                        default :
                            paperType="未提供";
                            break;
                    }
                    return paperType;
                };
            }
        ])

        //采购管理
        .filter("itemType", [
            function () {
                return function (input) {
                    var itemType="";
                    switch (input)
                    {
                        case "GOODS":
                            itemType="货物";
                            break;
                        case "SERVICE":
                            itemType="服务";
                            break;
                    }
                    return itemType;
                };
            }
        ])
        .filter("itemBasis", [
            function () {
                return function (input) {
                    var itemBasis="";
                    switch (input)
                    {
                        case "QUANTITY":
                            itemBasis="按数量";
                            break;
                        case "AMOUNT":
                            itemBasis="按金额";
                            break;
                    }
                    return itemBasis;
                };
            }
        ])
        .filter("classType", [
            function () {
                return function (input) {
                    var classType="";
                    switch (input)
                    {
                        case "DISH":
                            classType="美食菜品";
                            break;
                        case "BOOK":
                            classType="图书";
                            break;
                        case "CLOTHES":
                            classType="服装鞋帽箱包";
                            break;
                        case "FOOD":
                            classType="食品";
                            break;
                        case "DRUG":
                            classType="药品";
                            break;
                        case "COMPONENT":
                            classType="制造零配件";
                            break;
                        case "STANDARD_PRODUCT":
                            classType="常规商品";
                            break;
                        case "STANDARD_SERVICE":
                            classType="常规服务";
                            break;
                        default:classType="常规商品";
                    }
                    return classType;
                };
            }
        ])
        .filter("itemBasis", [
            function () {
                return function (input) {
                    var itemBasis="";
                    switch (input)
                    {
                        case "QUANTITY":
                            itemBasis="按数量";
                            break;
                        case "AMOUNT":
                            itemBasis="按金额";
                            break;
                    }
                    return itemBasis;
                };
            }
        ])
        .filter("pricingMethod", [
            function () {
                return function (input) {
                    var pricingMethod="";
                    switch (input)
                    {
                        case "QUANTITY":
                            pricingMethod="数量";
                            break;
                        case "AMOUNT":
                            pricingMethod="重量";
                            break;
                        case "AMOUNT":
                            pricingMethod="时间";
                            break;
                    }
                    return pricingMethod;
                };
            }
        ])
        .filter("requisitionType", [
            function () {
                return function (input) {
                    var requisition="";
                    switch (input)
                    {
                        case "INTERNAL":
                            requisition="内部请购";
                            break;
                        case "STANDARD":
                            requisition="标准请购";
                            break;
                    }
                    return requisition;
                };
            }
        ])
        .filter("accountingEventType", [
            function () {
                return function (input) {
                    var ownerType="";
                    switch (input)
                    {
                        case "SUBMIT":
                            ownerType="提交";
                            break;
                        case "CANCEL":
                            ownerType="取消";
                            break;
                        case "REVERSE":
                            ownerType="反冲";
                            break;
                        default :
                            ownerType = input;
                            break;
                    }
                    return ownerType;
                };
            }
        ])
        .filter("accountingEventSourceType", [
            function () {
                return function (input) {
                    var ownerType="";
                    switch (input)
                    {
                        case "AR_INVOICE":
                            ownerType="应收-发票";
                            break;
                        case "AP_INVOICE":
                            ownerType="应付-发票";
                            break;
                        case "AP_PAYMENT":
                            ownerType="应付-付款";
                            break;
                        case "AR_RECONCILE":
                            ownerType="应收-核销";
                            break;
                        case "AR_RECEIPT":
                            ownerType="应收-收款";
                            break;
                        default :
                            ownerType = input;
                            break;
                    }
                    return ownerType;
                };
            }
        ])
        .filter("invoiceType", [
            function () {
                return function (input) {
                    var invoiceType="";
                    switch (input)
                    {
                        case "PREPAYMENT":
                            invoiceType="预付款";
                            break;
                        case "STANDARD":
                            invoiceType="标准";
                            break;
                        case "DEBIT_MEMO":
                            invoiceType="借项通知单";
                            break;
                        case "CREDIT_MEMO":
                            invoiceType="贷项通知单";
                            break;
                        case "CANCEL":
                            invoiceType="反转";
                            break;
                    }
                    return invoiceType;
                };
            }
        ])
        .filter("ARInvoiceType", [
            function () {
                return function (input) {
                    var invoiceType="";
                    switch (input)
                    {
                        case "PRERECEIPT":
                            invoiceType="预收款";
                            break;
                        case "STANDARD":
                            invoiceType="标准";
                            break;
                        case "DEBIT_MEMO":
                            invoiceType="借项通知单";
                            break;
                        case "CREDIT_MEMO":
                            invoiceType="贷项通知单";
                            break;
                        default:
                            invoiceType=input;
                            break;
                    }
                    return invoiceType;
                };
            }
        ])
        .filter("ARCustomerType", [
            function () {
                return function (input) {
                    var customerType="";
                    switch (input)
                    {
                        case "STANDARD":
                            customerType="标准";
                            break;
                        case "TEMPORARY":
                            customerType="临时";
                            break;
                        case "EMPLOYEE":
                            customerType="员工";
                            break;
                        case "OPERATING_UNIT":
                            customerType="经营单元";
                            break;
                        case "INTERNAL":
                            customerType="内部";
                            break;
                        default :
                            customerType=input;
                            break;
                    }
                    return customerType;
                };
            }
        ])
        .filter("journalSourceType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "AP_INVOICE":
                            input="应付-发票";
                            break;
                        case "AP_PAYMENT":
                            input="应付-付款";
                            break;
                        case "AP_RECONCILE":
                            input="应付-核销";
                            break;
                        case "AR_INVOICE":
                            input="应收-发票";
                            break;
                        case "AR_RECEIPT":
                            input="应收-收款";
                            break;
                        case "AR_RECONCILE":
                            input="应收-核销";
                            break;
                        case "MANUAL":
                            input="总账-手工";
                            break;
                        case "REVERSE":
                            input="总账-反转";
                            break;
                        case "RETAIL":
                        case "RM_SETTLEMENT":
                            input="零售-结算";
                            break;
                        case "RM_CASH_DEPOSIT":
                        case "RM_CASH_NOTE":
                            input = "零售-现金缴款";
                            break;
                        case "RM_EXPENSE_DEPOSIT":
                        case "RM_DAILY_EXPENSE":
                            input = "零售-门店费用";
                            break;
                        case "RM_DAILY_PURCHASE":
                            input = "零售-日常采购单";
                            break;
                        case "INV_PUR_RECEIPT":
                            input = "库存-采购收货";
                            break;
                        case "INV_PUR_RETURN":
                            input = "库存-采购退货";
                            break;
                        case "INV_SALE_RECEIPT":
                            input = "库存-销售收货";
                            break;
                        case "INV_SALE_RETURN":
                            input = "库存-销售退货";
                            break;
                        case "INV_ADJUSTMENT":
                            input = "库存-库存调整";
                            break;
                    }
                    return input;
                };
            }
        ])
        .filter("accountType",[
            function(){
                return function(input){
                    var accountType="";
                    switch(input)
                    {
                        case "ASSET":
                            accountType="资产";
                            break;
                        case "LIABILITY":
                            accountType="负债";
                            break;
                        case "COMMON":
                            accountType="共同类";
                            break;
                        case "OWNERS_EQUITY":
                            accountType="所有者权益";
                            break;
                        case "COST":
                            accountType="成本";
                            break;
                        case "PROFIT_LOSS":
                            accountType="损益";
                            break;
                    }
                    return accountType;
                }
            }
        ])
        .filter("code",[
            function(){
                return function(input){
                    var code="";
                    switch(input)
                    {
                        case "CASH" :
                            code="现金";
                            break;
                        case "BANK" :
                            code="银行";
                            break;
                    }
                    return code;
                }
            }
        ])

        .filter("taxId", [
            function () {
                return function (input) {
                    var taxId="";
                    switch (input)
                    {
                        case "0":
                            taxId="PUR_0%";
                            break;
                        case "6":
                            taxId="PUR_6%";
                            break;
                        case "17":
                            taxId="PUR_17%";
                            break;
                        default :
                            break;

                    }
                    return taxId;
                };
            }
        ])

        .filter("taxType", [
            function () {
                return function (input) {
                    var taxType="";
                    switch (input)
                    {
                        case "SMALL":
                            taxType="小规模纳税人";
                            break;
                        case "GENERAL":
                            taxType="一般纳税人";
                            break;
                        default :
                            break;

                    }
                    return taxType;
                };
            }
        ])
        .filter("orderType", [
            function () {
                return function (input) {
                    var taxType="";
                    switch (input)
                    {
                        case "STANDARD":
                            taxType="直接采购";
                            break;
                        case "INTERNAL":
                            taxType="申请采购";
                            break;
                        default :
                            break;

                    }
                    return taxType;
                };
            }
        ])
        .filter("salesType", [
            function () {
                return function (input) {
                    var taxType="";
                    switch (input)
                    {
                        case "STANDARD":
                            taxType="标准订单";
                            break;
                        case "INTERNAL":
                            taxType="内部订单";
                            break;
                        default :
                            break;

                    }
                    return taxType;
                };
            }
        ])

        .filter("ownerType", [
            function () {
                return function (input) {
                    var ownerType="";
                    switch (input)
                    {
                        case "PRIVATE":
                            ownerType="个人";
                            break;
                        case "CORPORATE":
                            ownerType="公司";
                            break;
                    }
                    return ownerType;
                };
            }
        ])
        .filter("operatingUnitType", [
            function () {
                return function (input) {
                    var operatingUnitYype="";
                    switch (input)
                    {
                        case "HQ":
                            operatingUnitYype="总部";
                            break;
                        case "SHOP":
                            operatingUnitYype="分部门店";
                            break;
                        case "FACTORY":
                            operatingUnitYype="分部工厂";
                            break;
                    }
                    return operatingUnitYype;
                };
            }
        ])
        .filter("moneyType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "CNY":
                            input="人民币";
                            break;
                        case "HKD":
                            input="港币";
                            break;
                        case "USD":
                            input="美元";
                            break;
                    }
                    return input;
                };
            }
        ])


        // 添加供应商类别的过滤器
        .filter("supplierType", [
            function () {
                return function (input) {
                    var requisition="";
                    switch (input)
                    {
                        case "INTERNAL":
                            requisition="内部供应商";
                            break;
                        case "STANDARD":
                            requisition="标准供应商";
                            break;
                        case "TEMPORARY":
                            requisition="临时供应商";
                            break;
                    }
                    return requisition;
                };
            }
        ])
        // 添加供应商类别的过滤器
        .filter("customerType", [
            function () {
                return function (input) {
                    var requisition="";
                    switch (input)
                    {
                        case "INTERNAL":
                            requisition="内部";
                            break;
                        case "STANDARD":
                            requisition="标准";
                            break;
                    }
                    return requisition;
                };
            }
        ])

        // 添加发运网络类别的过滤器 DIRECT:直接发运  INTRANSIT:在途发运
        .filter("transferType", [
            function () {
                return function (input) {
                    var requisition="";
                    switch (input)
                    {
                        case "INTRANSIT":
                            requisition="在途发运";
                            break;
                        case "DIRECT":
                            requisition="直接发运";
                            break;
                    }
                    return requisition;
                };
            }
        ])
        .filter("cycleCountType", [
            function () {
                return function (input) {
                    var back="";
                    switch (input)
                    {
                        case "ALL":
                            back="所有";
                            break;
                        case "ITEM":
                            back="商品";
                            break;
                        case "CATEGORY":
                            back="类别";
                            break;
                        case "BRAND":
                            back="品牌";
                            break;
                    }
                    return back;
                };
            }
        ])
        .filter("timeType", [
            function () {
                return function (input) {
                    var back="";
                    switch (input)
                    {
                        case "NEVER_OPEN":
                            back="从未打开";
                            break;
                        case "OPEN":
                            back="打开";
                            break;
                        case "CLOSED":
                            back="关闭";
                            break;
                        case "FUTURE_OPEN":
                            back="将来打开";
                            break;
                        case "FINALLY_CLOSED":
                            back="永久关闭";
                            break;
                    }
                    return back;
                };
            }
        ])
        .filter("periodType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "STANDARD":
                            input="标准期间";
                            break;
                        case "ADJUST":
                            input="调整期间";
                            break;
                    }
                    return input;
                };
            }
        ])
        .filter("periodStatus", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "CLOSED":
                            input="已关闭";
                            break;
                        case "OPEN":
                            input="已开启";
                            break;
                        case "REOPEN":
                            input="重新打开";
                            break;
                        case "FINALLY_CLOSE":
                            input="永久关闭";
                            break;
                    }
                    return input;
                };
            }
        ])
        //汇率类型
        .filter("exchangeType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "CORPORATE":
                            input="公司";
                            break;
                    }
                    return input;
                };
            }
        ])
        .filter("capitalAccountType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "BANK":
                            input="银行";
                            break;
                        case "CASH":
                            input="现金";
                            break;
                    }
                    return input;
                };
            }
        ])
        //打印小票
        .filter("itemNameList", [
            function () {
                return function (input) {
                    var itemName=input;
                    switch (itemName)
                    {
                        case "GOODS_ABBREVIATION":
                            itemName="商品简称";
                            break;
                        case "GOODS_ABBREVIATION_AND_ARTICLE_NUMBER":
                            itemName="商品简称和货号";
                            break;
                        case "ARTICLE_NUMBER":
                            itemName="货号";
                            break;
                        case "GOODS_FULL_NAME_AND_ARTICLE_NUMBER":
                            itemName="商品全称和货号";
                            break;
                        default :
                            break;
                    }
                    return itemName;
                };
            }
        ])
        .filter("capitalAccountOwnerType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "PRIVATE":
                            input="个人";
                            break;
                        case "CORPORATE":
                            input="公司";
                            break;
                    }
                    return input;
                };
            }
        ])
        .filter("capitalSourceType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "TRANSFER":
                            input="资金调拨单";
                            break;
                        case "ADJUSTMENT":
                            input="资金调整单";
                            break;
                        case "AP_PAYMENT":
                            input="应付-付款单";
                            break;
                        case "AR_RECEIPT":
                            input="应收-收款单";
                            break;
                        case "RETAIL":
                        case "RM_SETTLEMENT":
                            input="零售-结算单";
                            break;
                        case "RM_CASH_DEPOSIT":
                            input="零售-现金缴款单";
                            break;
                        case "RM_DAILY_EXPENSE":
                            input="零售-日常费用单";
                            break;
                        case "RM_DAILY_PURCHASE":
                            input="零售-日常采购单";
                            break;
                    }
                    return input;
                };
            }
        ])
        .filter("centerType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "COST":
                            input="成本中心";
                            break;
                        case "PROFIT":
                            input="利润中心";
                            break;
                    }
                    return input;
                };
            }
        ])
        //资金调整类型
        .filter("capitalAdjustmentType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "IN":
                            input="进账";
                            break;
                        case "OUT":
                            input="出帐";
                            break;
                        default :
                            input = "unsupport type";
                            break;
                    }
                    return input;
                };
            }
        ])
        //是否绑定物料
        .filter("inventoryType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "COMMON":
                            input="普通";
                            break;
                        case "COMBINE":
                            input="捆绑";
                            break;
                    }
                    return input;
                };
            }
        ])
        .filter("journalType", function() {
            return function(input) {
                switch(input) {
                    case "ACCOUNTING":
                        input = "记账凭证";
                        break;
                    case "ALLOCATION":
                        input = "分摊凭证";
                        break;
                    case "INTER":
                        input = "内部往来";
                        break;
                }
                return input;
            }
        })
        //内部发货是否收货完成
        .filter("isFullReceipt", function() {
            return function(input) {
                switch(input) {
                    case true:
                        input = "已完成";
                        break;
                    case false:
                        input = "未完成";
                        break;
                }
                return input;
            }
        })
        //是否绑定物料
        .filter("isPrepayment", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case true:
                            input="预付款";
                            break;
                        case false:
                            input="正常付款";
                            break;
                    }
                    return input;
                };
            }
        ])
        //审批结果
        .filter("approveResult", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "AGREED":
                            input="同意";
                            break;
                        case "DISAGREED":
                            input="不同意";
                            break;
                    }
                    return input;
                };
            }
        ])

        //面积
        .filter("square", [
            function () {
                return function (input, retain) {
                    if(!retain)
                        retain = 10;
                    if(input){
                        var number=Number(retain);
                        var squareList =Number(input).toFixed(number).toString().split(".");
                        var square = squareList[0].split("");
                        var frac = squareList[1].split("");
                        frac.unshift(".");
                        //整数加“，”
                        var index=0;
                        for( var i=square.length;i>0;i--){
                            index++;
                            if(index%4===0){
                                square.splice(i,0,",");
                                index++;
                            }
                        }
                        //小数舍弃
                        for(var i=frac.length ; i>1;i--){
                            if(frac[i-1]==0){
                                frac.pop();
                            }else{
                                break;
                            }
                        }
                        if(frac!="."){
                            square=square.concat(frac);
                        }
                        square.splice(0,0," ");
                        input = square.join("") + " ㎡";
                    }
                    return input;
                };
            }
        ])
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
        ]);

})();
