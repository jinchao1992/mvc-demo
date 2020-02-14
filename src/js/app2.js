import './../css/app2.css'

import $ from 'jquery'
import Model from '../base/Model'
import View from '../base/View'

const localKey = 'app2.index'

// 数据层m
const m = new Model({
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  update(data) {
    Object.assign(m.data, data)
    // 更新data里的数据
    m.trigger('m:updated')
    localStorage.setItem(localKey, m.data.index)
  }
})

const init = (el) => {
  new View({
    el,
    data: m.data,
    html: (index) => { 
      return `
        <div>
          <ol class="tab-bar">
            <li class="${index === 0 ? 'selected' : ''}" data-index="0">tab1</li>
            <li class="${index === 1 ? 'selected' : ''}" data-index="1">tab2</li>
          </ol>
          <ol class="tab-content">
            <li class="${index === 0 ? 'active' : ''}">内容1</li>
            <li class="${index === 1 ? 'active' : ''}">内容2</li>
          </ol>
        </div>
      `
    },
    render({
      index
    }) {
      if (this.el.children.length !== 0) {
        this.el.empty()
      }
      $(this.html(index)).appendTo(this.el)
    },
    events: {
      'click .tab-bar li': 'handleTab'
    },
    handleTab(e) {
      const index = parseInt(e.currentTarget.dataset.index)
      m.update({
        index
      })
    }
  })
}

export default init