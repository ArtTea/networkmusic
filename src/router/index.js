import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/layout.vue')
const Discover = () => import('@/views/discover/discover.vue')
const Recommend = () => import('@/views/discover/components/recommend.vue')
const SongList = () => import('@/views/discover/components/songList.vue')
const RanKing = () => import('@/views/discover/components/ranking.vue')
const Singer = () => import('@/views/discover/components/singer')
const Login = () => import('@/views/login/login.vue')
const Member = () => import('@/views/member/member.vue')
const Video = () => import('@/views/video/video.vue')
const VideoList = () => import('@/views/video/components/videolist.vue')
const Mv = () => import('@/views/video/components/mv.vue')
const MvList = () => import('@/views/video/mvlist.vue')
const MusicListDetail = () => import('@/views/musiclistdetail/musiclistdetail.vue')
const SingerListDetail = () => import('@/views/singerlistdetail/singerlistdetail.vue')
const routes = [
  {
    path: '/',
    component: Layout,
    // 发现音乐
    redirect: '/discover',
    children: [
      {
        path: '/discover',
        component: Discover,
        redirect: '/discover/recommend',
        children: [
          { path: '/discover/recommend', component: Recommend },
          { path: '/discover/songlist', component: SongList },
          { path: '/discover/ranking', component: RanKing },
          { path: '/discover/singer', component: Singer }
        ]
      },
      // 视频
      {
        path: '/video/',
        component: Video,
        redirect: '/video/videolist',
        children: [
          { path: '/video/videolist', component: VideoList },
          { path: '/video/mv', component: Mv }
        ]
      },
      // 所有MV列表
      { path: '/video/mv/mvlist', component: MvList },
      // 歌单详情
      { path: '/musiclistdetail/:id', component: MusicListDetail },
      // 歌手详情
      { path: '/singerdetail/:id', component: SingerListDetail },
      // 用户详情
      { path: '/member/:id', component: Member }

    ]
  },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
