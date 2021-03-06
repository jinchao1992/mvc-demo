import $ from 'jquery'

class EventBus {
  constructor() {
    this._eventBus = $(window)
  }

  on(eventName, fn) {
    return this._eventBus.on(eventName, fn)
  }

  trigger(eventName, data = null) {
    return this._eventBus.trigger(eventName, data)
  }

  off(eventName, fn) {
    return this._eventBus.on(eventName, fn)
  }
}
export default EventBus