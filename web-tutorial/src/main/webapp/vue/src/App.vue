<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return { };
    }
  };
</script>

<style scoped>
  .ul{
    padding: 10px;
    background: #fff;
  }
  li{
    float: left;
    padding: 10px;
    background: #fff;
  }
</style>
