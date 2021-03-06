import EventBus from "./EventBus"

class Model extends EventBus{
  constructor(options) {
    super() // EventBus 的 constructor
    const keys = ['data', 'create', 'delete', 'update', 'get']
    keys.forEach(key => {
      if (key in options) {
        this[key] = options[key]
      }
    })
  }
  create() {
    console && console.log && console.error('你还没有创建create')
  }
  update() {
    console && console.log && console.error('你还没有创建update')
  }
  delete() {
    console && console.log && console.error('你还没有创建delete')
  }
  get() {
    console && console.log && console.error('你还没有创建get')
  }
}

export default Model