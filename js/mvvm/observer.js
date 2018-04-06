function Observer (data) {
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  walk (data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  },
  defineReactive (data, key, val) {
    var dep = new Dep()
    observe(val)
    Object.defineProperty(data, key, {
      enumerable: true,
      // configurable: false,//是否可以被删除 或者改变是否删除属性
      get () {
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.depend()
        return val
      },
      set (newVal) {
        if (val === newVal) {
          return
        }
        console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal)
        val = newVal
        dep.notify()
      }
    })
  }
}

function observe (data) {
  if (!data || typeof data !== 'object') {
    return
  }
  return new Observer(data)
}
var uid = 0
function Dep () {
  this.id = uid++
  this.subs = []
}

Dep.prototype = {
  addSub (sub) {
    this.subs.push(sub)
  },
  depend: function () {
    Dep.target.addDep(this)
  },
  notify () {
    this.subs.forEach(item => {
      item.update()
    })
  }
}
Dep.target = null
