<template >
  <div class="xn-approval-submit">
    <div class="approval-title">{{title}}</div>
    <ul class="approval-users clearfix">
      <li class="user" v-for="(user,index) in userResult" >
        <i class="user-remove icon " @click="removeUser(user,index)"></i>
        <div class="user-avatar">
          <img  v-lazy="user.avatar" />
        </div>
        <div class="user-name">{{user.name}}</div>
      </li>
      <li class="user" >
        <div class="user-avatar" @click="addUser()"><span class="add-icon">+</span></div>
      </li>

    </ul>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    name: 'xnApprovalSubmit',
    data() {
      return {
      };
    },
    methods: {
      addUser:function () {
        var _this=this;
        var vm = {tenantId:'512824102474878976',
          tenantName:'犀牛网络'};

        function callback(data){
          var item= JSON.parse(data);
          var isHave=false;
          for(var i=0;i<_this.userResult.length;i++){
            if(item.id=_this.userResult[i].id){
              isHave=true;
              break;
            }
          }
          if(!isHave){
            _this.userResult.push(item);
            _this.$emit('add',item)
          }else {
            Toast({
              message: '该用户已添加',
              position: 'middle',
              duration: 3000
            });
          }

        };
        _this.xnNative.tenant(vm,callback);
      },
      removeUser:function (item,index) {
        this.userResult.splice(index,1);
        /*移除*/
        this.$emit('remove',item)
      }
    },
    props:{
      title: {
        type: String,
        default:"审批人"
      }                      ,
      userList: {
        type: Array,
        default:[]
      }
    },
    computed: {
      userResult: function () {
        return this.userList
      }
    }
  };
</script>

<style  scoped>
  .xn-approval-submit{
    width: 100%;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
  }
  .xn-approval-submit .approval-title{
    padding: 0.2rem 0.4rem;
    height: 1.2rem;
    line-height: 0.8rem;
    font-size: 16px;
  }
  .xn-approval-submit .approval-users{
    margin:0 0.25rem 0.625rem;
  }
  .xn-approval-submit .approval-users .user{
    float: left;
    width: 1.5625rem;
    height: 2.5625rem;
    overflow: hidden;
    margin:0 0.25rem 0.4rem;
    position: relative;
  }
  .xn-approval-submit .approval-users .user-remove{
    position: absolute;
    right: 0;
    top:0;
    z-index: 2;
    width: 0.5rem;
    height:0.5rem;
    color: #fff;
    background: rgba(0,0,0,.5);
  }
  .xn-approval-submit .approval-users .user-avatar{
    width: 1.5625rem;
    height: 1.5625rem;
    overflow: hidden;
    border-radius: 4px;
  }
  .xn-approval-submit .approval-users .user-avatar img{
    float: left;
    width: 1.5625rem;
    height: 1.5625rem;
    overflow: hidden;
    border-radius: 4px;
  }
  .xn-approval-submit .approval-users .user-name{
    padding: 0.2rem 0;
    line-height: 0.6rem;
    height: 1rem;
    font-size:14px;
    overflow: hidden;
    text-align:center;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .xn-approval-submit .approval-users .add-icon{
    width: 1.5625rem;
    height: 1.5625rem;
    overflow: hidden;
    display:block;
    font-size: 1rem;
    line-height: 1.4rem;
    text-align: center;
    color: #999;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

</style>
