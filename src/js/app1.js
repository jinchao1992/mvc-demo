import './../css/app1.css'
// 引入JQuery
import $ from 'jquery'

const eventBus = $(window)

/**
 * eventBus 
 * on 方法定义事件
 * trigger 触发事件
 */

// 数据相关的放到 M
const m = {
  data: {
    n: parseInt(localStorage.getItem('n'))
  },
  create() {},
  update(data) {
    Object.assign(m.data, data)
    // 更新data里的数据
    eventBus.trigger('m:updated')
    localStorage.setItem('n', m.data.n)
  },
  delete() {},
  get() {}
}

// 视图相关的放到 V
const v = {
  el: null,
  html: `
    <div>
      <div class="output">
        <span id="number">{{n}}</span>
      </div>
      <div class="actives">
        <button id="add">+1</button>
        <button id="subtract">-1</button>
        <button id="multiply">*2</button>
        <button id="divide">÷2</button>
      </div>
    </div>
  `,
  init(container) {
    v.el = $(container)
  },
  render(n) {
    if (v.el.children.length !== 0) {
      v.el.empty()
    }
    $(v.html.replace('{{n}}', n)).appendTo(v.el)
  }
}

// 其他放到 C
const c = {
  init(container) {
    // el 的作用是用户需要传入的容器
    v.init(container)
    v.render(m.data.n)
    c.autoBindEvents()
    eventBus.on('m:updated', () => {
      v.render(m.data.n)
    })
  },
  events: {
    'click #add': 'add',
    'click #subtract': 'subtract',
    'click #multiply': 'multiply',
    'click #divide': 'divide'
  },
  add() {
    m.update({
      n: m.data.n + 1
    })
  },
  subtract() {
    m.update({
      n: m.data.n - 1
    })
  },
  multiply() {
    m.update({
      n: m.data.n * 2
    })
  },
  divide() {
    m.update({
      n: m.data.n / 2
    })
  },
  autoBindEvents() {
    for (let key in c.events) {
      const value = c.events[key]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      v.el.on(part1, part2, c[value])
    }
  }
}
// 初始化调用
export default c

