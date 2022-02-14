<template>
<transition name="el-fade-in-linear">
<div class="login" v-if="visible" ref="target">
<!-- Form -->
  <el-form>
    <el-form-item label="手机号码："  label-width="100px" >
      <input type="text" v-model="from.phone" class="loginInput" />
    </el-form-item>
    <el-form-item label="密码："  label-width="100px" >
      <input type="password" v-model="from.password"  class="loginInput" />
    </el-form-item>
    <div class="btns">
      <el-button type="danger" @click="login">登录</el-button>
      <el-button  >注册</el-button>
    </div>
  </el-form>
</div>
 </transition>
</template>
<script>
import { useStore } from 'vuex'
import { getLogin } from '@/api/user.js'
import { reactive, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { ElMessage } from 'element-plus'
export default {
  name: 'App',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 判断登录面板显示隐藏
    const visible = ref(false)
    watch(() => props.modelValue, (newval) => {
      visible.value = newval
      console.log(props.modelValue)
    })
    const target = ref(null)
    onClickOutside(target, () => {
      visible.value = false
      emit('update:modelValue', visible.value)
    })
    // 登录区域
    const store = useStore()
    const from = reactive({
      phone: '',
      password: ''
    })
    const login = () => {
      // 验证手机号码格式是否正确
      if (!from.phone) {
        return ElMessage.error({ message: '手机号码不能为空' })
      } else if (!/^1[3-9]\d{9}$/.test(from.phone)) {
        return ElMessage.error({ message: '手机号格式不正确' })
      }
      // 验证密码格式是否正确
      if (!from.password) {
        return ElMessage.error({ message: '密码不能为空' })
      } else if (!/\S{6,24}/.test(from.password)) {
        return ElMessage.error({ message: '密码必须在6-24之间' })
      }
      getLogin(from).then(data => {
        console.log(data)
        store.commit('user/setUser', data)
      })
    }

    return {
      target,
      visible,
      from,
      login
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  transition: all .4s .2s;
  position: relative;
  z-index: 9;
  top: 5px;
  right: 216px;
  float: right;
  padding: 20px;
  width: 400px;
  height: 250px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;
    &::before{
      content: '';
      position: absolute;
      top: -7px;
      left: 175px;
      display: inline-block;
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
      background-color: #fff;
    }
  :deep(.el-form-item__content){
    display: flex;
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 10px;
    width: 100%;
    .loginInput{
      width: 90%;
      height: 80%;
    }
  }
  .btns{
    display: flex;
    flex-direction:column;
    justify-content: center;
    padding:0 30px;
    .el-button{
      margin-left: 0;
      margin-bottom:15px ;
      height: 35px;
    }
  }
}

</style>
