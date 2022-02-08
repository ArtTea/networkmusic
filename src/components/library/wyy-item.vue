<template>
<ul class="item-container" v-if="List">
  <li @click="clickWyyItem(item.id)" class=" fl listItem" v-for="item in List" :key="item.id">
    <!-- <RouterLink :to="`/musiclistdetail/${item.id}`"> -->
      <div class="images" >
        <div class="title">
          <i></i>
          <span></span>
        </div>
        <img v-lazy="(item.picUrl||item.coverImgUrl)+'?param=400y400'" alt="item.copywriter">
      </div>
      <div class="name">
        <div>{{item.name}}</div>
      </div>
    <!-- </RouterLink> -->
  </li>
</ul>
</template>

<script>
export default {
  name: 'WyyItem',
  props: {
    List: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, { emit }) {
    console.log(props.List)
    const clickWyyItem = (id) => {
      emit('clickWyyItem', id)
    }
    return {
      clickWyyItem
    }
  }
}
</script>

<style lang="less" scoped>
.item-container{
  display: flex;
  flex-wrap:wrap;
  &:nth-child(5n) {
    margin-right: 0;
  }
  .listItem{
    width: 19%;
    overflow: hidden;
    cursor: pointer;
    margin: 0 1% 20px 0;
    .images{
      width: 100%;
      padding-bottom: 100%;
      height: 0;
      position: relative;
      &:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url("~@/assets/images/imgLoading.png") no-repeat center;
        background-size: contain;
        border-radius: 10px;
        z-index: -1;
      }
      img{
        width:100%;
        border-radius: 10px;
      }
      .title{
        position: absolute;
        right: 0px;
      }

    }
    .name{
      margin: 8px 0;
      padding: 0 2px;
      font-size: 14px;
      line-height: 20px;
      /* 两行溢出 */
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      >div{
        width: 100%;
        // height:40px;
        overflow:hidden;

      }
    }
  }
}
</style>
