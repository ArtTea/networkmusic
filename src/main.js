import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import UI from '@/components/library/index.js'
// 1.重置样式库
import 'normalize.css'

// 2.自己项目的重置样和公共样式表
import '@/assets/style/common.less'
// 2.自己项目的全局样式表
import '@/assets/style/global.less'
createApp(App).use(store).use(ElementPlus).use(router).use(UI).mount('#app')
