import './../css/app1.css'
// 引入JQuery
import $ from 'jquery'
import Model from '../base/Model.js'
import View from '../base/View.js'

/**
 * eventBus 
 * on 方法定义事件
 * trigger 触发事件
 */
const eventBus = $(window)

/**
 *  new Model 是方便把所有公共的属性放入到原先当中，因为 app1 中使用 app2 中也使用
 */
// 数据相关的放到 M
const m = new Model({
  data: {
    n: parseFloat(localStorage.getItem('n'))
  },
  update: function(data) {
    Object.assign(m.data, data)
    // 更新data里的数据
    eventBus.trigger('m:updated')
    localStorage.setItem('n', m.data.n)
  }
})

const init = (el) => {
  const view = new View({
    data: m.data,
    eventBus,
    el,
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
    render({
      n
    }) {
      if (this.el.children.length !== 0) {
        this.el.empty()
      }
      $(this.html.replace('{{n}}', n)).appendTo(this.el)
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
    }
  })
  console.dir(view)
}
// 初始化调用
export default init

