import './../css/app2.css'

import $ from 'jquery'
import Model from '../base/Model'

const eventBus = $(window)

const localKey = 'app2.index'

// 数据层m
const m = new Model({
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  update(data) {
    Object.assign(m.data, data)
    // 更新data里的数据
    eventBus.trigger('m:updated')
    localStorage.setItem(localKey, m.data.index)
  }
})

// 其他放到 C
const view = {
  el: null,
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
  render(index) {
    if (view.el.children.length !== 0) {
      view.el.empty()
    }
    $(view.html(index)).appendTo(view.el)
  },
  init(container) {
    view.el = $(container)
    view.render(m.data.index)
    view.autoBindEvents()
    eventBus.on('m:updated', () => {
      view.render(m.data.index)
    })
  },
  events: {
    'click .tab-bar li': 'handleTab'
  },
  handleTab(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    m.update({
      index
    })
  },
  autoBindEvents() {
    for (let key in view.events) {
      const value = view.events[key]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      view.el.on(part1, part2, view[value])
    }
  }
}

export default view