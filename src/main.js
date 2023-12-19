import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import ElementUI from  'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './js-components/axios'
import router from './router/router-config' // 导入路由文件
import VueCookies from 'vue-cookies';
import VueI18n from 'vue-i18n';


Vue.use(VueCookies);
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.config.productionTip = false
// 将axios挂载到Vue的原型链上，这样在组件中就可以通过this.$axios使用
Vue.prototype.$axios = axios;

const messages = {
  en: {
    phoneId:'phoneId',
    userName: 'userName',
    password:'password',
    sensorName:'sensorName',
    sensorType:'sensorType',
    sensorManufacturer:'sensorManufacturer',
    sensorDate:'sensorDate',
    sensorLife:'sensorLife',
    coalMineName:'coalMineName',
    coalMineUnit:'coalMineUnit',
    coalMineLife:'coalMineLife',
    coalMineSupervisionUnit:'cMSuperVisionUnit',
    coalMineAddress:'coalMineAddress'
    // Add other English translations here
  },
  zh: {
    phoneId:'手机号',
    userName: '用户名',
    password:'密码',
    // 传感器
    sensorName:'名称',
    sensorType:'型号',
    sensorManufacturer:'生产厂家',
    sensorDate:'出厂日期',
    sensorLife:'使用年限',
    // 煤矿
    coalMineName:'名称',
    coalMineUnit:'所属单位',
    coalMineLife:'使用年限',
    coalMineSupervisionUnit:'监管单位',
    coalMineAddress:'地址'
  }
};

const i18n = new VueI18n({
  locale: 'zh', // 默认语言
  messages
});

new Vue({
  router,
  render: h => h(App),
  i18n
}).$mount('#app')
