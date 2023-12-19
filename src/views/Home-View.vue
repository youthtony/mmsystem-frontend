<template>
  <div id="Home-View">
    <NavigationBarComponent v-if="isLogin"> </NavigationBarComponent>
    <LoginAndRegisterComponents v-if="!isLogin" @userData="updateUserData"></LoginAndRegisterComponents>
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
      user:{
        phoneId:'',
        userName:'',
        password:'',
      }
    }
  },
  components: {
    LoginAndRegisterComponents,
    NavigationBarComponent
  },
  methods: {
    updateUserData(userData){
      this.user=userData;
      console.log(this.user);
      this.isLogin=true;
    }
  }
}
</script>

<style scoped>
#Home-View {
}
</style>