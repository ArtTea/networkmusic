<template>
  <div class="nav">
    <div class="fl title">
      <slot/>
    </div>
    <div class="fr stor">
      <div class="btn-box"
      v-for="item in sortlist"
      :key="item.name">
        <span
        @click="changeArea(item.name)"
        :class="{active:activeName===item.name}"
        class="btn"
       >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'WyyMvSort',
  props: {
    sortlist: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const activeName = ref(props.name)
    const changeArea = (name) => {
      activeName.value = name
      emit('changeSort', activeName.value)
    }
    return {
      activeName,
      changeArea
    }
  }
}
</script>

<style lang="less" scoped>
.nav{
  overflow: hidden;
  margin-bottom: 6px;
  // 左侧按钮
  .title{
    font-weight: 600;
    font-size: 14px;
    i{
      font-size: 14px;
    }
  }
  // 右侧按钮
  .btn-box{
    display: inline-block;
    width: 90px;
    text-align: center;
    border-right:1px solid #eee ;
    &:last-child{
      border: none;
    }
    .btn{
      display: inline-block;
      margin-left: 5px;
      text-align: center;
      padding: 3px 12px;
    }
  }

  .active{
    color: #ec4747;
    background-color: #fdf5f5;
    border-radius: 20px;
  }
}

</style>
