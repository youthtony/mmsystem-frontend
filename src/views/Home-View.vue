<template>
  <div id="Home-View">
    <NavigationBarComponent v-if="isLogin==true" :loginUser="user" @userData="updateUserData"/>
    <LoginAndRegisterComponents v-if="isLogin==false" @userData="updateUserData"></LoginAndRegisterComponents>
    <router-view v-if="isLogin==true"></router-view>
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
    document.title = '煤矿监测系统';
    if (userData) {
      this.isLogin = true;
      //todo 进行一次数据更新，以防cookie过期
      this.user = userData;
      this.$router.push('/sensor');
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
      // 从cookie获取数据
      if (userData!=null){
        console.log("正常登录：",userData);
        this.user=userData;
        this.isLogin=true;
        console.log("this.$route.path:",this.$route.path);
        // 跳转到/sensor
        this.$router.push('/sensor');
      }else{
        console.log("已无数据，重新登录");
        this.isLogin=false;
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