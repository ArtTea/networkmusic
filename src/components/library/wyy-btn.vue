// <template>
//   <div class="btn-container"  v-for="item in list" :key="item.id">
//       <span @click="changeName(item.name)" class="btn" :class="{active:item.name===activeName}">{{item.name}}</span>
//   </div>
// </template>

<script>
// import { ref } from 'vue'
// export default {
//   name: 'WyyBtn',
//   props: {
//     list: {
//       type: Object,
//       default: () => ({})
//     },
//     modelValue: {
//       type: String,
//       default: ''
//     }
//   },
//   setup () {
//     const activeName = ref('')
//     const changeName = (name) => {
//       activeName.value = name
//     }
//     return {
//       changeName
//     }
//   }

// }
// </script>

// <style lang="less" scoped>
// .btn-container{
//   display: inline-block;
// .btn{
//     margin-left: 5px;
//     height: 30px;
//     line-height: 30px;
//     text-align: center;
//     padding: 6px 12px;
//   }
//   .active{
//     color: #ec4747;
//     background-color: #fdf5f5;
//     border-radius: 20px;
//     }
// }
// </style>
