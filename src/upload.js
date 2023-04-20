const path = require('path')
const cwd = process.cwd()
const print = require('./print')
const git = require('./git')

const ssh = require('./ssh')
const { checkDir } = require('./file')

async function upload(serverInfo, env) {
  try {
    return await new Promise(async (resolve) => {
      if (serverInfo.switch !== true) {
        return resolve()
      }
      let local = path.join(cwd, serverInfo.local || '/dist')
      const { remote, exec, branch } = serverInfo

      // 判断是否限定分支
      if (branch && Array.isArray(branch) && branch.length) {
        const currentName = await git.getBranch()
        if (branch.indexOf(currentName) === -1) {
          print.git.currentError(env)
          return resolve()
        }
      }

      try {
        // 检查打包文件夹
        await checkDistDir(local)
        // 检查服务器配置
        checkLoginConfig(serverInfo)
      } catch (error) {
        return resolve(error)
      }
      // 执行上传
      const sshExample = await ssh(serverInfo, local, remote, env).catch(() => {
        print.publish.fail(env)
      })

      print.publish.success(env)

      // 执行上传后命令
      if (exec && exec.length) {
        for (let item of exec) {
          if (!typeof item === 'string') continue
          await sshExample.execCommand(item, { cwd: remote }).catch((e) => {
            console.log(e)
          })
        }
        print.bash.success()
      }
      resolve()
    })
  } catch (e_1) {
    console.log(e_1)
  }
}
// 检查打包文件夹方法
async function checkDistDir(dir) {
  checkDir(dir).then(
    () => Promise.resolve(),
    () => {
      print.upload.check()
      process.exit()
    }
  )
}

// 检查配置文件完整方法
function checkLoginConfig(serverInfo) {
  if (!serverInfo || typeof serverInfo !== 'object') throw print.config.checkFile()
  for (let item in serverInfo) {
    if (serverInfo[item] === null || serverInfo[item] === '' || serverInfo[item] === undefined) {
      throw print.config.check()
    }
  }
}

module.exports = {
  upload
}
