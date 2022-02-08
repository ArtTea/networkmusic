<template>
   <div class="sort-container" v-if="hotSort">
      <div class="left-contianer">
        <div class=" fl sortBtn" @click="clickBtn">
          {{activeName}}
          <i class="iconfont icon-xiangyoujiantou"></i>
        </div>
        <div class="panel" v-if="visible">
          <el-scrollbar>
            <ul class=" btn-body" v-if="allcategories || allSort">
              <li style="border-bottom:1px solid #ccc"><a href="javascript:;">全部</a></li>
              <li class="sort-class" v-for="(item,i) in allcategories" :key="item" >
                <div class="title">{{item}}</div>
                <div class="sort">
                  <div class="left-contianer" v-for="sort in allSort[i]" :key="sort.id">
                    <span @click="changeName(sort.name)" class="btn" :class="{active:sort.name===activeName}">{{sort.name}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </el-scrollbar >
        </div>
      </div>
    <div class=" fr right-contianer" v-if="hotSort">
      <span @click="changeName(item.name)" class="btn" :class="{active:item.name===activeName}"  v-for="item in hotSort" :key="item.id">{{item.name}}</span>
    </div>
   </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'WyySortBtn',
  props: {
    hotSort: {
      type: Object,
      default: () => ({})
    },
    allcategories: {
      type: Array,
      default: () => ['']
    },
    allSort: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const activeName = ref(props.name)
    const visibles = ref(null)
    const clickBtn = () => {
      visibles.value = props.visible
      console.log(visibles.value)
      emit('clickBtn', visibles.value)
    }
    const changeName = (name) => {
      activeName.value = name
    }
    watch(activeName, (newval) => {
      emit('change-sort', newval)
    }, { immediate: true })
    return {
      changeName,
      activeName,
      clickBtn,
      visibles
    }
  }
}
</script>

<style lang="less" scoped>
  // 左侧按钮的样式
  .left-contianer{
    position: relative;
    .sortBtn{
      outline: none;
      width: 70px;
      height: 30px;
      padding-left: 15px;
      line-height: 30px;
      border-radius:20px ;
      background-color: #fff;
      border: 1px solid #e9e9e9;
      &:hover{
        background-color:#f2f2f2
      }
      .icon-xiangyoujiantou{
        font-size: 12px;
      }
    }
     // 左侧按钮
  .panel{
    position: absolute;
    top: 36px;
    left: -20px;
    background-color: #fff;
    box-shadow:  0 0 10px #ccc;
    &::before{
      position: absolute;
      transform: rotate(45deg);
      background-color: rgb(255, 255, 255);
      top: -6px;
      left: 40px;
      content: '';
      width: 15px;
      height: 15px;
    }
    .btn-body{
      display: flex;
      flex-direction: column;
      width: 600px;
      height: 400px;
    >li{
    padding:20px 20px  0 ;
      min-height: 60px;
    }
    .sort-class{
      margin-top: 20px;
      display: flex;
      .title{
        flex: 1;
        padding-top: 5px;
        color: #ccc;
      }
    .sort{
        flex: 4;
        width: 100%;
        justify-content: space-between;

      .left-contianer{
          display: inline-block;
          width: 20%;
          height: 35px;
          span:hover{
            color: #ec4747;
          }
        }
      }
    }
  }
  }

  }

.sort-container{
  height: 60px;
}
// 右侧按钮
  .btn{
      display: inline-block;
      margin-left: 5px;
      height: 30px;
      text-align: center;
      padding: 6px 12px;
    }
    .active{
      color: #ec4747;
      background-color: #fdf5f5;
      border-radius: 20px;
    }
  </style>
