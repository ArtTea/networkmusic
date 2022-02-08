import defaultImg from '@/assets/images/imgLoading.png'
const importFn = require.context('./', false, /\.vue$/)
export default {
  install (app) {
    importFn.keys().forEach(path => {
      const component = importFn(path).default
      app.component(component.name, component)
    })
    // 定义自定义指令
    defineDirective(app)
  }
}
// 定义指令
const defineDirective = (app) => {
  app.directive('lazy', {
    mounted (el, binding) {
      // 创建一个观察对象,来观察当前元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 当图片加载失败
          el.onerror = () => {
            el.src = defaultImg
          }
          // 把src路径赋值给图片的src属性
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
