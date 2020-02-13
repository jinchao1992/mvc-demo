import './../css/app2.css'

import $ from 'jquery'

const eventBus = $(window)

const localKey = 'app2.index'

// 数据层m
const m = {
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  create() {},
  update(data) {
    Object.assign(m.data, data)
    // 更新data里的数据
    eventBus.trigger('m:updated')
    localStorage.setItem(localKey, m.data.index)
  },
  delete() {},
  get() {}
}

// 视图相关的放到 V
const v = {
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
  init(container) {
    v.el = $(container)
  },
  render(index) {
    if (v.el.children.length !== 0) {
      v.el.empty()
    }
    $(v.html(index)).appendTo(v.el)
  }
}

// 其他放到 C
const c = {
  init(container) {
    // el 的作用是用户需要传入的容器
    v.init(container)
    v.render(m.data.index)
    c.autoBindEvents()
    eventBus.on('m:updated', () => {
      v.render(m.data.index)
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
    for (let key in c.events) {
      const value = c.events[key]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      v.el.on(part1, part2, c[value])
    }
  }
}

export default c