<template>
  <el-row  class="pc-topnav">
    <!-- logo部分 -->
    <el-col :span="4" >
      <h1 class="logo">网易云音乐</h1>
    </el-col>
    <!-- 搜索部分 -->
    <el-col :span="7" >
      <div class="center">
        <!-- 前进后退 -->
        <div class="btn fl">
          <i @click="$router.go(-1)" class="iconfont icon-houtui1"></i>
          <i @click="$router.go(1)" class="iconfont icon-qianjin1"></i>
        </div>
        <!-- 搜索框 -->
        <div class="search fl">
          <el-input placeholder="请输入内容" >
              <template #prefix>
                <i class="iconfont icon-sousuo"></i>
              </template>
          </el-input>
        </div>
        <i class=" fl iconfont icon-maikefeng"></i>
      </div>
    </el-col>
    <!-- 用户和设置区域 -->
    <el-col :span="7" :offset="6" >
     <div class="user">
       <template  v-if="profile.userId">
         <RouterLink  :to="`/member/${profile.userId}`" >
          <img class="avatar fl" :src="profile.avatarUrl" alt="">
         </RouterLink>
          <div class="userName">{{profile.nickname}}</div>
       </template>
       <template v-else>
        <img  @click="loginOpen"  class="avatar fl" src="@/assets/images/defaulTavatar.jpg" alt="">
        <div class="userName">网易云音乐</div>
       </template>
      <i class="iconfont icon-pifu"></i>
      <i class="iconfont icon-shezhi"></i>
      <i class="iconfont icon-youjian_o"></i>
      <i class="iconfont icon-zuixiaohua"></i>
      <i class="iconfont icon-24gl-minimize2"></i>
      <i class="iconfont icon-guanbi"></i>
     </div>
    </el-col>
  </el-row>
<Login v-model="visible"/>

</template>

<script>
import Login from '@/views/login/login.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'TopNav',
  components: {
    Login
  },
  setup () {
    const visible = ref(false)
    // 打开登录框
    const loginOpen = () => {
      visible.value = !visible.value
    }
    // 获取存储的用户信息
    const store = useStore()
    // 使用vuex的state需要设计计算属性
    const profile = computed(() => {
      return store.state.user.profile
    })
    return {
      visible,
      loginOpen,
      profile
    }
  }
}
</script>

<style scoped lang="less">
  .pc-topnav{
    height: 60px;
    align-items:center;
    background-color: #EC4141;
    .logo{
      margin-left: 20px;
      height: 60px;
      width: 180px;
      font-size: 0;
      background: url(../assets/images/logo.png) no-repeat 0 / contain;
    }
    .center{
        .icon-houtui1,
        .icon-qianjin1,
        .icon-maikefeng{
          margin: 0 7px;
          padding-left: 7px;
          display:inline-block;
          height: 30px;
          width: 30px;
          font-size: 15px;
          line-height: 30px;
          border-radius: 15px;
          color: #ddd;
          background-color:rgba(122, 122, 122,.1) ;
          &:hover{
            background-color:rgba(0, 0, 0, 0.1) ;
            box-shadow: 0 0 10 2px #fff inset;
            cursor: pointer;
          }
       }

      .search{
        line-height: 30px;
        width: 200px;
        :deep(.icon-sousuo) {
          line-height: 30px;
          color: #fff;
        }
        :deep(.el-input__inner){
          background-color:#e13e3e;
          border-radius: 20px;
          height: 30px;
          padding-left: 40px;
        }
      }

    }
    .user{
      float:right;
      display: flex;
      align-items:center;
      flex: 2;
      .avatar{
        width: 50px;
        border-radius: 50%;
        cursor: pointer;
      }
      .userName{
        color: #fff;
        padding:0 10px;
        width: 150px;
      }
      >i{
        color: #fff;
        padding: 0 15px;
        font-size: 20px;
      }
    }
  }
</style>
