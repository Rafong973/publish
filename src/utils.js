module.exports = {
  // 获取类型
  getType(val) {
    var s = Object.prototype.toString.call(val)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
  }
}
