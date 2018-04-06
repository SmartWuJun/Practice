<template>
  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main clearfix">
      <mt-cell title="提交审批"  value="选择提交人"  is-link></mt-cell>
      <xn-approval-submit class="mt-20"  title="审批人"  :user-list="userList"   @remove="deleteUser"
                          @add="addUser" ></xn-approval-submit>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import { Cell} from 'mint-ui';
  import { Toast } from 'mint-ui';

  import xnApprovalSubmit from '../components/xnApprovalSubmit.vue';

  Vue.component(Cell.name, Cell);
  Vue.component("xn-approval-submit", xnApprovalSubmit);

  export default {
    name: 'ApprovalSubmit',
    data () {
      return {
        title:"审批组件",
        userList:[
          {
            id:"1",
            time:"5月10日 05:30",
            name:"晚秋",
            info:"审批通过",
            avatar:"https://img-dev.xiniunet.com/512824102474878976/8524426217032294403600.jpg@100w_100h_0e"
          },
          {
            id:"2",
            time:"5月10日 05:30",
            name:"晚秋",
            info:"审批通过",
            avatar:"https://img-dev.xiniunet.com/512824102474878976/852442621703229440/854933163183837184.jpg@1000w_1000h_0e"
          },
          {
            id:"3",
            time:"5月10日 05:30",
            name:"晚秋",
            info:"审批通过",
            avatar:"https://img-dev.xiniunet.com/512824102474878976/852442621703229440/854933163183837184.jpg@1000w_1000h_0e"
          },
          {
            id:"4",
            time:"5月10日 05:30",
            name:"晚秋",
            info:"审批通过",
            avatar:"https://img-dev.xiniunet.com/512824102474878976/852442621703229440/854933163183837184.jpg@1000w_1000h_0e"
          },
          {
            id:"5",
            time:"5月10日 05:30",
            name:"晚秋",
            info:"审批通过",
            avatar:"https://img-dev.xiniunet.com/512824102474878976/852442621703229440/854933163183837184.jpg@1000w_1000h_0e"
          },
          {
            id:"6",
            time:"5月10日 05:30",
            name:"晚秋",
            info:"审批通过",
            avatar:"https://img-dev.xiniunet.com/512824102474878976/852442621703229440/854930732286873600.jpg@100w_100h_0e"
          }
        ]
      }
    },
    methods: {
      //添加人员
      addUser:function (data) {
        console.log(data);
        Toast({
          message: '添加成功',
          position: 'middle',
          duration: 3000
        });
      },
      //删除人员
      deleteUser:function (data) {
        console.log(data);
        Toast({
          message: '删除成功',
          position: 'middle',
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
