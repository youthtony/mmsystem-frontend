// src/router/router-config.js

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home-View.vue'
import LoginAndRegisterView from "../components/LoginAndRegister-Component.vue";
import SensorView from "../views/Sensor-View.vue";
import CoalMineView from "../views/CoalMine-View.vue";

Vue.use(VueRouter)

const routes = [
    { path: '/', component: HomeView },
    { path: '/home', component: LoginAndRegisterView },
    { path:'/sensor',component: SensorView},
    { path:'/coalMine',component: CoalMineView}
    // 更多路由配置
]

const router = new VueRouter({
    routes,
})

export default router
