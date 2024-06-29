// src/router/router-config.js

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home-View.vue'
import SensorView from "../views/Sensor-View.vue";
import CoalMineView from "../views/CoalMine-View.vue";
import SocketView from "@/views/Socket-View.vue";

Vue.use(VueRouter)

const routes = [
    { path: '/', component: HomeView },
    { path:'/sensor',component: SensorView},
    { path:'/coalMine',component: CoalMineView},
    {path:'/socket',component: SocketView},
    // 更多路由配置
]

const router = new VueRouter({
    routes,
})

export default router
