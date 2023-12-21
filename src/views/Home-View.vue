<template>
  <div id="Home-View">
    <div  v-show="isLogin">
      <NavigationBarComponent :loginUser="user"/>
    </div>
    <div v-if="isLogin===false">
      <LoginAndRegisterComponents @userData="updateUserData"></LoginAndRegisterComponents>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import LoginAndRegisterComponents from "@/components/LoginAndRegister-Component.vue";
import NavigationBarComponent from "@/components/NavigationBar-Component.vue";

export default {
  created() {
    // 检查cookie中是否有用户数据
    const userData = this.$cookies.get('userData');
    // 在组件创建时修改页面标题
    document.title = '煤矿管理系统';
    if (userData) {
      this.isLogin = true;
      //todo 进行一次数据更新，以防cookie过期
      this.user = userData;
    } else {
     this.isLogin=false;
    }
  },
  name: "Home-View",

  data() {
    return {
      isLogin:false,
      user:{}
    }
  },
  components: {
    LoginAndRegisterComponents,
    NavigationBarComponent
  },
  methods: {
    updateUserData(userData){
      console.log("更新登录用户数据：",userData);
      this.user=userData;
      this.isLogin=true;
      // 添加条件，只在登录成功时跳转路由
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
      console.log("现在的登录状态isLogin：",this.isLogin);
    }
  }
}
</script>

<style scoped>
#Home-View {
}
</style>