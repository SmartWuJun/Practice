<template>

    <div class="xn-app">
        <router-view  name="xnHeader" :title="title"  ></router-view>
        <div class="xn-main clearfix">
            <div class="module li-r">
                <div class="h3">弹出框</div>
                <li class="li "> <input class="input" type="text" @click="openByDrop($event)" v-model="calendar3.display" readonly>

                </li>
                <li class="li"> <input class="input" type="text" @click="openByDialog" :value="calendar4.display" readonly> </li>

                <transition name="fade">
                    <div class="calendar-dropdown" :style="{'left':calendar3.left+'px','top':calendar3.top+'px'}" v-if="calendar3.show">
                        <calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" :begin="calendar3.begin" :end="calendar3.end" @select="calendar3.select"></calendar>
                    </div>
                </transition>
            </div>

            <div class="module">
                <div class="h3">多选不连贯</div>
                <calendar   :multiple="calendar.multiple"
                            :multiple-today="multipleToday" @select="calendar.select"></calendar>
                <p>
                    结果:{{calendarDate}}
                </p>    <p>
                    结果:{{multipleToday}}
                </p>
            </div>
            <div class="module">
                <div class="h3">单选/英文/事件</div>
                <calendar :events="calendar1.events"
                          :lunar="calendar1.lunar"
                          :value="calendar1.value"
                          :begin="calendar1.begin" :end="calendar1.end"
                          :weeks="calendar1.weeks" :months="calendar1.months"
                          @select="calendar1.select"></calendar>
            </div>

            <div class="module">
                <div class="h3">多选/农历</div>
                <calendar :range="calendar2.range" :lunar="calendar2.lunar"
                          :value="calendar2.value" :begin="calendar2.begin" :end="calendar2.end"
                          @select="calendar2Select"></calendar>
            </div>

        </div>



        <transition name="fade">
            <div class="calendar-dialog" v-if="calendar4.show">
                <div class="calendar-dialog-mask" @click="closeByDialog"></div>

                <div class="calendar-dialog-body">
                    <calendar :range="calendar4.range" :zero="calendar4.zero"
                              :lunar="calendar4.lunar"
                              :value="calendar4.value"
                              @select="calendar4.select"></calendar>
                </div>

            </div>
        </transition>
    </div>

</template>

<script>
    import calendar from '../directive/calendar.vue'
    export default {
        name: 'countryCodeShow',
        components: {
            calendar
        },
        data() {
            return {
                title:"日历控件",
                calendarDate:[],
              multipleToday:[],

                calendar:{
                    range:false,
                    lunar:false, //显示农历
                    begin:[2017,2,16], //可选开始日期
                    end:[2018,2,16], //可选结束日期
                    multiple:true,
                    select: data => {
                       this.calendarDate=data;
                    }
                },

                calendar1:{
                    value:[2018,2,16], //默认日期
                    lunar:false, //显示农历
                    weeks:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    events:{
                        '2018-2-14':'$408','2018-2-15':'$460','2018-2-16':'$500',
                    },
                    select(value,k1,k2,$event){
                        console.log(value.toString());
                    }
                },
                calendar2:{
                    range:true,
                    value:[[2018,2,16],[2019,2,16]], //默认日期
                    lunar:true, //显示农历
                    begin:[2017,2,16], //可选开始日期
                    end:[2019,2,16] //可选结束日期

                },
                calendar3:{
                    display:"2018/02/16",
                    show:false,
                    zero:true,
                    value:[2018,2,16], //默认日期
                    lunar:true, //显示农历
                    select:(value)=>{
                        this.calendar3.show=false;
                        this.calendar3.value=value;
                        this.calendar3.display=value.join("/");
                    }
                },
                calendar4:{
                    display:"2018/02/16 ~ 2019/02/16",
                    show:false,
                    range:true,
                    zero:true,
                    value:[[2018,2,16],[2019,2,16]], //默认日期
                    lunar:true, //显示农历
                    select:(begin,end)=>{
                        console.log(begin,end)
                        this.calendar4.show=false;
                        this.calendar4.value=[begin,end];
                        this.calendar4.display=begin.join("/")+" ~ "+end.join("/");
                    }
                }
            }
        },
        methods:{
            calendar2Select:function(begin,end){
                console.log(begin.toString(),end.toString());
            },
            openByDrop(e){
                this.calendar3.show=true;
                console.log(e.target.offsetLeft);
                console.log(e.target.offsetTop);
                this.calendar3.left=e.target.offsetLeft+10;
                this.calendar3.top=e.target.offsetTop+50;

                e.stopPropagation();
                window.setTimeout(()=>{
                    document.addEventListener("click",(e)=>{
                    this.calendar3.show=false;
                    document.removeEventListener("click",()=>{},false);
                },false);
            },1000)
            },
            openByDialog(){
                this.calendar4.show=true;
            },
            closeByDialog(){
                this.calendar4.show=false;
            }
        }


    };

</script>

<style scoped>
    .xn-app{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .xn-main{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        width: 100%;
    }
    .module{
        margin-bottom: 0.3rem;
        background: #fff;
    }
    .module .h3{
        color: red;
        padding: 0 0.5rem;
        line-height: 1rem;
        border-bottom: 1px solid #dcdcdc;
    }
    .module .p{
        margin: 0.2rem 0.5rem;
    }
    .module .ul{
    }
    .module .li{
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        background: #fff;
        padding: 0 0.5rem;
        border-bottom: 1px dashed #ddd;
    }
    .mint-cell{
        border-bottom: 1px dashed #ddd;
    }


    .input{
        box-sizing: border-box;
        width:100%;
        border-radius: 2px;
        border:1px solid #dedede;
        padding:10px;
        font-size: 16px;
        background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 10px;
        padding-left: 36px;
        color:#666;
    }

    .li-r{
        position: relative;
    }

    /*transition*/
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s ease-in-out;
    }
    .fade-enter,.fade-leave-active{
        opacity: 0;
        transform: translateY(-10px);

    }

    /*下拉框*/
    .calendar-dropdown{
        background: #fff;
        position: absolute;
        left:0;
        top:0;
        padding:20px;
        border: 1px solid #eee;
        border-radius: 2px;
        z-index: 99;
    }
    .calendar-dropdown:before {
        position: absolute;
        left:30px;
        top: -10px;
        content: "";
        border:5px solid rgba(0, 0, 0, 0);
        border-bottom-color: #DEDEDE;
    }
    .calendar-dropdown:after {
        position: absolute;
        left:30px;
        top: -9px;
        content: "";
        border:5px solid rgba(0, 0, 0, 0);
        border-bottom-color: #fff;
    }

    /*弹出框*/
    .calendar-dialog{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
    }

    .calendar-dialog-mask{
        background:rgba(255,255,255,.5);
        width:100%;
        height:100%;
    }

    .calendar-dialog-body{
        background: #fff;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        padding:20px;
        border: 1px solid #eee;
        border-radius: 2px;
    }
</style>
