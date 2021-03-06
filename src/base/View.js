import $ from 'jquery'
import EventBus from './EventBus'

class View extends EventBus{
  constructor(options) {
    super() // super 是柔和EventBus的constructor
    // constructor 是给本身添加属性或者方法, 也就是初始化属性与方法
    Object.assign(this, options)
    this.el = $(this.el)
    this.render(this.data)
    this.autoBindEvents()
    this.on('m:updated', () => {
      this.render(this.data)
    })
  }
  
  // 这里的是给原型添加
  autoBindEvents() {
    for (let key in this.events) {
      const value = this.events[key]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      this.el.on(part1, part2, this[value])
    }
  }
}
export default View