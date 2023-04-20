const path = require('path')
const cwd = process.cwd()
const fs = require('fs')

module.exports = {
  async readServerConfig() {
    const serverConfigJSON = path.join(cwd, 'server.config.json')
    return getFile(serverConfigJSON)
  },
  async readProjectConfig() {
    const projectConfigJSON = path.join(cwd, 'package.json')
    return getFile(projectConfigJSON)
  },
  async checkDir(dir) {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, function (err) {
        if (err) {
          reject()
        } else {
          resolve()
        }
      })
    })
  },

  readJSON
}

async function getFile(file) {
  let value = null
  try {
    value = await readJSON(file)
  } catch (error) {
    console.log(chalk.red(error))
  }
  return value
}

function readJSON(dir) {
  return new Promise((resolve) => {
    try {
      fs.readFile(dir, 'utf-8', (error, value) => {
        if (!error) {
          let result = JSON.parse(`${value}`)
          resolve(result)
        } else {
          resolve(null)
        }
      })
    } catch (error) {
      resolve(null)
    }
  })
}
