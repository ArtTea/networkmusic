import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import user from './modules/user'
// 创建vuex仓库并导出
export default createStore({
  modules: {
    user
  },
  plugins: [
    createPersistedstate({
      key: 'net-work-music',
      paths: ['user']
    })
  ]
})
