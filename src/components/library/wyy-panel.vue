<template>
  <div class="panel-contaner">
    <div class="panelheader">
      <!-- 头部标签插槽 -->
      <slot name="panelheader"/>
    </div>
    <div class="panelbody">
      <!-- 内容主体插槽 -->
      <slot name="panelbody"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WyyPanel'
}
</script>

<style lang="less" scoped>
.panelheader{
  height: 60px;
  line-height: 60px;
  font-weight: 600;
}
</style>
