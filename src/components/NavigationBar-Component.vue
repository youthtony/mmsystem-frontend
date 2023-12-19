<template>
  <div>
    <header class="header">
      <div class="container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item>
            <i class="el-icon-menu"></i>
          </el-menu-item>
          <el-menu-item index="/sensor">传感器管理</el-menu-item>
          <el-menu-item index="/coalMine">煤矿管理</el-menu-item>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </div>
    </header>
    <div class="line"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeIndex: '/sensor'
    };
  },
  components:{
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({path: keyPath[0]});
    }
  }
}
</script>
<style>
.header .container{
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(220, 223, 230);
}
</style>