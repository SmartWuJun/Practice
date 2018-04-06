<template>
  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main clearfix">
      <mt-cell title="审批"  value="审批组件"  is-link></mt-cell>
      <xn-approval :approval-list="approvalList"  @agree="approvalAgree"  @refuse="approvalRefuse"
                   @referral="approvalRefuseReferral" ></xn-approval>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';

  import { Cell } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import xnApproval from '../components/xnApproval.vue';

  Vue.component( Cell.name, Cell);
  Vue.component("xn-approval", xnApproval);

  export default {
    name: 'approval',
    data () {
      return {
        title:"审批组件",
        approvalList:[
          {
            time:"5月10日 05:30",
            name:"晚秋",
            info:"审批通过",
            avatar:"https://img-dev.xiniunet.com/512824102474878976/8524426217032294403600.jpg@100w_100h_0e"
          },
          {
            time:"5月10日 05:30",
            name:"晚秋",
            info:"审批通过",
            avatar:"https://img-dev.xiniunet.com/512824102474878976/852442621703229440/854933163183837184.jpg@1000w_1000h_0e"
          },
          {
            time:"5月10日 05:30",
            name:"晚秋",
            info:"审批通过",
            avatar:"https://img-dev.xiniunet.com/512824102474878976/852442621703229440/854930732286873600.jpg@100w_100h_0e"
          }
        ]
      }
    },
    methods: {
      //同意
      approvalAgree:function (data) {
        console.log(data);
        Toast({
          message: '同意',
          position: 'middle',
          duration: 3000
        });
      },
      //拒绝
      approvalRefuse:function (data) {
        console.log(data);
        Toast({
          message: '拒绝',
          position: 'middle',
          duration: 3000
        });
      },
      //转交
      approvalRefuseReferral:function (data) {
        console.log(data);
        Toast({
          message: '转交给他人',
          position: 'middle',
          iconClass: 'xn-icon icon-telephone',
          duration: 3000
        });
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
</style>
