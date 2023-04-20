#!/usr/bin/env node

const argv = process.argv
const print = require('./print')
const inquirer = require('./inquir')

const { upload } = require('./upload')
const { createJSON } = require('./create')
const { readServerConfig } = require('./file')

async function start() {
  // 创建配置文件
  await createConfigFile()

  const serverConfig = await readServerConfig()
  if (serverConfig) {
    // 自动发布
    await autoPublish(serverConfig)
  } else {
    // 手动发布
    await manualPublish()
  }
  process.exit()
}

async function createConfigFile() {
  const isInit = argv && argv.some((item) => item === 'init')
  if (isInit) {
    print.config.create()
    await createJSON()
    process.exit()
  }
}

async function manualPublish() {
  const serverInfo = await inquirer.server()
  serverInfo.switch = true
  await upload(serverInfo)
}

async function autoPublish(serverConfig) {
  const nameReg = new RegExp(/(.+?)?name=(.+?)?/)
  const nameIndex = argv && argv.findIndex((item) => nameReg.test(item))
  // 具名发布
  if (nameIndex > -1) {
    const nameEnv = argv[nameIndex]
    const name = nameEnv.replace(nameReg, '$2')
    if (name) {
      const config = serverConfig[name]
      await upload(config, name)
    }
  } else {
    // 批量发布
    let keys = Object.keys(serverConfig)
    for (let i = 0; i < keys.length; i++) {
      const config = serverConfig[keys[i]]
      await upload(config, keys[i])
    }
  }
}

start()
