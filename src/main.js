import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'

import axios from './axios'
import {globalMethods} from "@/globalFun";
// require("./mock.js")
// Vue.prototype.$axios = axios
const app = createApp(App);

app.mixin(globalMethods)
app.config.globalProperties.$axios = axios;
app.use(store).use(router).use(ElementPlus).mount('#app')
