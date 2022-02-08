<template>
  <div class="xtx-infinite-loading" ref="target" >
    <div class="loading" v-if="loading" >
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished" >
      <span class="text">抱歉，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'WyyInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const target = ref(null)
    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 进行无限加载的条件：loading和finished其中之一为true
          if (!props.loading && !props.finished) {
            emit('infinte')
          }
        }
      }, { threshold: 1 })

    return {
      target
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
