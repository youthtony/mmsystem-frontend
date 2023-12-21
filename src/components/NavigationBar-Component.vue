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
          <el-menu-item>
            <el-button type="text" @click="dialog = true">欢迎你! {{ LoginIngUserForm.userName }}</el-button>
          </el-menu-item>
        </el-menu>

      </div>
    </header>
    <!--抽屉-->
    <div>
      <el-drawer
          :title="loginUser.userName"
          :before-close="handleClose"
          :visible.sync="dialog"
          direction="rtl"
          custom-class="demo-drawer"
          ref="drawer"
      >
        <div class="drawer__content">
          <el-form :model="LoginIngUserForm">
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="LoginIngUserForm.phoneId" :value="loginUser.phoneId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="LoginIngUserForm.userName" :value="loginUser.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input type="password" v-model="LoginIngUserForm.password" :value="loginUser.password" autocomplete="off" show-password></el-input>
            </el-form-item>
          </el-form>
          <div class="drawer__footer">
            <el-button class="w-auto" @click="cancelForm">取 消</el-button>
            <el-button class="w-auto" @click="resetForm">清 空</el-button>
            <el-button class="w-auto" type="primary" @click="submitForm" :loading="loading">
              {{ loading ? '提交中 ...' : '修改 数据' }}
            </el-button>
          </div>
        </div>
      </el-drawer>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>

export default {
  props: ['loginUser'],
  created() {
    this.activeIndex='/sensor';
  },
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      LoginIngUserForm: {...this.loginUser},
      formLabelWidth: '80px',
      timer: null,
      activeIndex: '/sensor'
    };
  },
  watch: {
    //   立即对dialogFormVisible进行赋值
    IsDialogShow: {
      immediate: true,
      handler() {
        this.LoginIngUserForm = { ...this.loginUser };
      }
    }
  },
  components: {},
  methods: {
    // 点关闭
    handleClose(done) {
        this.LoginIngUserForm = { ...this.loginUser };
        done();
    },
    // 点取消
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      this.LoginIngUserForm = { ...this.loginUser };
      clearTimeout(this.timer);
    },
    // 重置
    resetForm() {
      this.LoginIngUserForm = {};
    },
    handleSelect(key, keyPath) {
      this.$router.push({path: keyPath[0]});
    },
    submitForm() {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(res => {
            console.log(res);
            this.loading = true;
            this.timer = setTimeout(() => {
              // 提交到数据库
              this.$axios.post('/user/update',this.LoginIngUserForm)
                  .then(res => {
                    if (res.data.code==0){
                      // 请求成功，处理返回的数据
                      //   放入cookie
                      this.$cookies.set('userData', res.data.data);
                      //   将数据传递给父组件
                      console.log('修改后的登录用户：',res.data.data);
                      this.$emit('userData',res.data.data);
                      this.LoginIngUserForm=res.data.data;
                      this.dialog = false;
                      this.$message.success("修改成功");
                    }else {
                      this.$message.error(res.data.message);
                    }
                  })
                  .catch(error => {
                    // 请求失败，处理错误
                    console.error('Error fetching data:', error);
                  });
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch();
    }
  }
}
</script>
<style>
.header .container {
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(220, 223, 230);
}

.drawer__footer {
  display: flex;
  justify-content: space-evenly;
}

.drawer__content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>