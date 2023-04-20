const inquirer = require('inquirer')
const fs = require('fs')
const file = require('./file')

module.exports = {
  choice() {
    const serverList = file.readServerConfig()
    return new Promise(async (resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'checkbox',
            name: 'environment',
            message: '请选择发布环境',
            choices: ['dev', 'test'],
            default: ['dev']
          }
        ])
        .then((answers) => {
          const { environment } = answers
          resolve(environment || [])
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  server() {
    return new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'host',
            message: '请输入服务器地址'
          },
          {
            type: 'input',
            name: 'username',
            message: '请输入服务器用户名',
            default: 'root'
          },
          {
            type: 'password',
            name: 'password',
            message: '请输入服务器密码'
          },
          {
            type: 'checkbox',
            name: 'local',
            message: '请选择打包文件夹',
            choices: readdirSync(),
            default: [readdirSync()[0]]
          },
          {
            type: 'input',
            name: 'remote',
            message: '请输入上传远程服务器目录'
          }
        ])
        .then((answers) => {
          resolve(answers)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}
// 读取当前目录
function readdirSync() {
  const cwd = process.cwd()
  let value = []
  let list = fs.readdirSync(cwd)
  list.forEach((item) => {
    let stat = fs.lstatSync(`${cwd}/${item}`)
    if (stat.isDirectory() === true && !/(^|\/)\.[^\/\.]/g.test(item) && !item.includes('node_modules')) {
      value.push(item)
    }
  })
  return value
}
