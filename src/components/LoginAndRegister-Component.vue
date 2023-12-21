<template>
  <div class="container">
    <div class="center-container">
      <div class="component">
        <h2 class="text-center">{{ checkIsRegister ? '注册' : '登录' }}</h2>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="phoneId" prop="phoneId">
            <el-input type="text" v-model="ruleForm.phoneId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="checkIsRegister" label="用户名" prop="userName">
            <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item v-if="checkIsRegister" label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!checkIsRegister" type="primary" @click="submitForm('ruleForm')">登录
            </el-button>
            <el-button type="primary" @click="registerForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button v-if="checkIsRegister" @click="reBack('ruleForm')">返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    // 验证手机号
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确'));
      } else {
        callback();
      }
    };
    // 验证用户名
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    //  验证密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    // 再次验证密码
    var validatePassAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      url: "src/assets/login.png",
      checkIsRegister: false,
      userData: {
        phoneId: '',
        userName: '',
        password: '',
      },
      ruleForm: {
        phoneId: '',
        userName: '',
        password: '',
        checkPass: ''
      },
      rules: {
        phoneId: [
          {validator: validatePhone, trigger: 'blur'},
          {min: 11, max: 11, message: '长度为 11 位数字', trigger: 'blur'}
        ],
        userName: [
          {validator: validateUserName, trigger: 'blur'},
          {min: 2, max: 16, message: '长度为 2 到 16 位字符', trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'},
          {min: 8, max: 16, message: '长度应为 8 到 16 位字符', trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePassAgain, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    // 登录事件
    submitForm() {
      // 使用this.$axios发起GET请求
      this.$axios.post('/user/login',{phoneId:this.ruleForm.phoneId,password:this.ruleForm.password})
          .then(res => {
            if (res.data.code==0){
              // 请求成功，处理返回的数据
              this.data = res.data.data;
              this.$message.success("登录成功");
            //   将数据传递给父组件
              console.log('现在的登录用户：',res.data.data);
              this.$emit('userData',res.data.data);
            //   放入cookie
              this.$cookies.set('userData', res.data.data);
            }else {
              this.$message.error(res.data.message);
            }
          })
          .catch(error => {
            // 请求失败，处理错误
            console.error('Error fetching data:', error);
          });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 注册事件
    registerForm() {
      if (this.$data.checkIsRegister) {
        //使用this.$axios发起GET请求
        // 要发送的对象
        const dataToSend = {
          phoneId: this.ruleForm.phoneId,
          userName: this.ruleForm.userName,
          password: this.ruleForm.password,
        };
        this.$axios.post('/user/register', dataToSend).then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            // 请求成功，处理返回的数据
            this.userData = res.data.data;
            this.$message.success("注册成功");
            this.reBack();
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(error => {
              // 请求失败，处理错误
              console.error('Error fetching data:', error);
            });
      } else {
        this.$data.checkIsRegister = true;
      }
    },
    // 返回按钮事件
    reBack() {
      if (this.$data.checkIsRegister) {
        this.$data.checkIsRegister = false;
      } else {
        this.$data.checkIsRegister = true;
      }
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 让容器占据整个视窗高度，以确保垂直居中 */
}

.center-container {
  display: flex;
  border: 3px solid #409EFF; /* 边框样式，根据需要调整颜色和宽度 */
  padding: 10px; /* 可以根据需要调整内边距 */
}

.component {
  margin: 0 10px; /* 可以根据需要调整组件之间的间距 */
}
</style>