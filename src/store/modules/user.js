// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        // 用户id
        userId: '',
        // 用户头像
        avatarUrl: '',
        // 用户昵称
        nickname: '',
        // 个性签名
        signature: '',
        // 创建账户时间
        createTime: '',
        // 背景图片
        backgroundUrl: '',
        // 所在成市
        city: '',
        // 所在省份
        province: '',
        // 用户喜欢的音乐歌单id
        likeSonglistID: '',
        // 用户创建的音乐歌单id
        createSonglistID: [],
        // 用户收藏的音乐id
        userCollectsonglistID: [],
        // 用户现在正在听的音乐歌单，方便后期拿数据
        userCurrsongList: [],
        // 用户现在正在听的音乐歌单，方便后期拿数据时进行对比
        userCurrsongListId: '',
        // 用户现在正在听的音乐id
        userCurrMusicId: '',
        // 用户上一个听的音乐id
        userPreMusicId: '',
        // 当前音乐的播放状态
        isPlay: '',
        // token
        token: '',
        // cookie
        cookie: ''
      }
    }
  },
  mutations: {

    // 修改用户信息，payload就是用户信息对象
    setUser (state, data) {
      // state.profile = data.profile
      for (const key in state.profile) {
        state.profile[key] = data.profile[key]
      }
      state.profile.token = data.token
      state.profile.cookie = data.cookie
    },
    setMusicId (state, id) {
      // 把当前正在听的音乐id赋值个上一首的变量
      state.profile.userPreMusicId = state.userCurrMusicId
      // 把id赋值个当前正在听的音乐id
      state.profile.userCurrMusicId = id
    },
    setUserCurrSongList (state, list) {
      state.profile.userCurrsongList = list
    },
    setUserCurrSongListId (state, id) {
      state.profile.userCurrsongListId = id
    },
    // 获取当前播放音乐的状态
    setPalyStatus (state, status) {
      state.profile.isPlay = status
    }
  }
}
