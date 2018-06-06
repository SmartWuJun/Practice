<template >
  <div class="xn-approval ">
    <ul class="approval-list">
      <li class="approval-item" v-for="approval in approvalResult" >
        <div class="item-body">
          <div class="state"></div>
           <div class="avatar"><img v-lazy="approval.avatar" /></div>
           <div class="item-content">
             <span class="time">{{approval.time}}</span>
             <span class="name">{{approval.name}}</span>
             <span class="info">{{approval.info}}</span>
           </div>
        </div>
      </li>
      <div class="xn-text-center xn-page-ptb" v-if="approvalResult.length==0">暂无审批记录</div>
    </ul>
    <div class="approval-foot clearfix">
      <div class="foot-box">
        <div class="approval-btn"  @click="agree" ><span>同意</span></div>
        <div class="approval-btn"  @click="refuse"><span>拒绝</span></div>
        <div class="approval-btn"  @click="referral"><span>转交</span></div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'xnApproval',
    data() {
      return {
        xnAgree:"我同意了！",
        xnRefuse:"我拒绝了你！",
        xnReferral:"我要转交！"
      };
    },
    methods: {
      agree: function () {
        /*同意*/
        this.$emit('agree',this.xnAgree)
      },
      refuse:function () {
        /*拒绝*/
        this.$emit('refuse',this.xnRefuse)
      },
      referral:function () {
       /*转交*/
        this.$emit('referral',this.xnReferral)
      }
    },
    props:{
      approvalList: {
        type: Array,
        default:[]
      }
    },
    computed: {
      approvalResult: function () {
        return this.approvalList
      }
    }
  };
</script>

<style   scoped>
  .xn-approval{
    width: 100%;
  }
  .xn-approval .approval-list{
    border-top: 1px solid #dddddd;
  }
  .xn-approval .approval-item{
    padding-top: 0.31rem;
  }
  .xn-approval .approval-item:before{
    content: "";
    display: inline-block;
    border-bottom: 1px solid #ddd;
    float: left;
  }
  .xn-approval .approval-item .item-body{
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    margin-right: 0.9rem;
    margin-left: 2rem;
    min-height: 2.1rem;
    position: relative;
  }
  .xn-approval .approval-item .item-body:after{
    content:"";
    display: block;
    position: absolute;
    z-index: 1;
    top:-0.31rem;
    left: -1rem;
    bottom: -0.1rem;
    border-left:1px solid #ddd;
  }
  .xn-approval .approval-item:last-child .item-body:after{
    height: 0.5rem;
  }
  .xn-approval .approval-item .item-body:before{
    content: "";
    float: left;
    background: #fff;
    display: inline-block;
    transform: rotate(45deg);
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    margin:0.3rem 0 0 -0.14rem;
    width: 0.2rem;
    height: 0.2rem;
  }
  .xn-approval .approval-item .item-body .state{
    float: left;
    height: 0.4rem;
    width: 0.4rem;
    background: #999999;
    position: relative;
    margin:0.16rem 0 0 -1.28rem;
    z-index: 9;
    border-radius: 50%;
  }
  .xn-approval .approval-item:first-child .item-body .state{
    float: left;
    height: 0.54rem;
    width: 0.54rem;
    background: #55c36e;
    position: relative;
    margin:0.16rem 0 0 -1.35rem;
    z-index: 9;
    border-radius: 50%;
  }
  .xn-approval .approval-item .item-body .avatar{
    float: left;
    margin: 0.3rem 0.3rem 0 0.3rem;
    width:1.4rem;
    height: 1.4rem;
    border-radius: 4px;
  }
  .xn-approval .approval-item .item-body .avatar img{
    float: left;
    width:1.4rem;
    height: 1.4rem;
  }

  .xn-approval .approval-item .item-body .item-content{
     overflow: hidden;
     margin: 0.4rem 0.3rem 0.3rem 0;
  }
  .xn-approval .approval-item .item-body .time{
     font-size: 12px;
     float: right;
     display: inline-block;
      color:#999
  }
  .xn-approval .approval-item .item-body .name{
     font-size: 16px;
     display: block;
     overflow: hidden;
  }
  .xn-approval .approval-item .item-body .info{
     font-size: 12px;
    display: block;
    overflow: hidden;
    color:#999
  }

  /*foor*/
  .xn-approval .approval-foot{
    margin-bottom: 1.333rem;
    padding-bottom: 0.31rem;
  }
  .xn-approval .foot-box{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    height: 1.333rem;
    border-top: 1px solid #dddddd;
    background: #fff;
    display: flex;
    display: -webkit-flex; /* Safari */
/*    flex-direction: row;      !*排列顺序*!
    flex-wrap: nowrap;  !*换行*!*/
    flex-flow:row nowrap;
    justify-content:center;
    align-items:center;
  }
  .xn-approval .approval-foot .approval-btn{
    width: 33%;
    text-align:center;
    color:#3399ff;
    display: flex;
    display: -webkit-flex; /* Safari */
    align-items:center;   /*垂直居中*/
  }
  .xn-approval .approval-foot .approval-btn span{
    font-size: 16px;
    line-height:1.333rem;
    text-align:center;
    color:#3399ff;
    display: inline-block;
    width: 100%;
  }
  .xn-approval .approval-foot .approval-btn:before{
    content: "";
    display: inline-block;
    float: left;
    height: 20px;
    border-left: 1px solid #dddddd;
  }
  .xn-approval .approval-foot .approval-btn:first-child:before{
    border-left: 1px solid transparent;
  }

</style>
