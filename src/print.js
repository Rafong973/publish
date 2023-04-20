const chalk = require('chalk')
const logs = console.log

const success = (text) => logs(chalk.green(text))
const warn = (text) => logs(chalk.yellow(text))
const info = (text) => logs(chalk.white(text))
const danger = (text) => logs(chalk.red(text))

const please = '请'
const config = '配置'
const file = '文件'
const check = '检查'
const publish = '发布'
const sText = '成功'
const failText = '失败'
const env = '环境'
const bash = '命令'
const run = '执行'
const ing = '正在'
const connect = '连接'
const start = '开始'
const work = '作业'
const or = '或'
const retry = '重试'
const timeout = '超时'
const create = '创建'
const dir = '文件夹'
const exist = '已存在'
const current = '当前'
const branch = '分支'

module.exports = {
  config: {
    checkFile: () => danger(`${please}${check}${config}${file}`),
    check: () => danger(`${please}${check}${config}`),
    create: () => info(`${create}${config}${file}`),
    existing: () => danger(`${config}${file}${exist}`),
    fail: () => danger(`${create}${failText}`),
    success: () => success(`${create}${sText}`)
  },
  publish: {
    fail: (text) => danger(`${text ? text : ''} ${publish}${failText}`),
    success: (text) => success(`${text ? text : ''} ${publish}${sText}`)
  },
  bash: {
    fail: () => danger(`${bash}${run}${failText}`),
    success: () => success(`${bash}${run}${sText}`)
  },
  upload: {
    check: () => danger(`${please}${check}${file}`)
  },
  sever: {
    work: () => info(`${start}${work}`),
    connect: (text) => warn(`${ing}${connect}${text ? text : ''}...`),
    success: (connectEnv) => success(`${connectEnv} ${connect}${sText}, ${start}${work}`),
    timeout: () => danger(`${connect}${timeout}, ${please}${check}${config}${or}${retry}`),
    fail: () => danger(`${connect}${failText}, ${please}${check}${config}${or}${retry}`),
    createFail: () => danger(`${create}${dir}${failText}`)
  },
  git: {
    currentError: (connectEnv) => danger(`${connectEnv} ${work}${failText}，${please}${check}${current}${branch}`)
  }
}
