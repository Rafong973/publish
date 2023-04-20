const node_ssh = require('node-ssh')
const fs = require('fs')
const { readServerConfig } = require('./file')
const path = require('path')
const print = require('./print')

const defaultIgnore = ['node_modules', '.DS_Store']

module.exports = function (loginInfo, local, remote, env) {
  return new Promise((resolve) => {
    const { host, username, password } = loginInfo
    const ssh = new node_ssh()
    // print.sever.connect()
    ssh
      .connect({
        host,
        username,
        password,
        port: 22
      })
      .then(
        async () => {
          print.sever.success(env)
          // 检查并创建远程服务器文件夹
          await checkRemoteDir.call(ssh, remote)
          // 过滤要上传的文件/夹
          const pendingList = await checkLocalDir(local)
          for (let pendingItem of pendingList) {
            const remoteName = path.join(remote, pendingItem.name)
            // 上传文件
            if (pendingItem.type === 'file') {
              await ssh.putFile(pendingItem.path, remoteName)
            } else {
              // 上传文件夹
              await ssh.putDirectory(pendingItem.path, remoteName, {
                concurrency: 10
              })
            }
          }
          resolve(ssh)
        },
        (remoteError) => {
          remoteError && remoteError.toString().includes('Timed out') ? print.sever.timeout() : print.sever.fail()
        }
      )
  })
}

// 检查远程服务器是否有对应文件夹，如无就创建
async function checkRemoteDir(remoteDir) {
  const exec = this.exec
  return new Promise(async (resolve) => {
    const remoteDirArray = remoteDir.split('/').filter((item) => item)
    for (let i = 0; i < remoteDirArray.length; i++) {
      const temoDir = remoteDirArray.slice(0, i).join('/')
      if (temoDir) {
        await exec(`cd /${temoDir}`).catch(async (error) => {
          if (error && error.toString().includes('No such file or directory')) {
            await exec(`mkdir /${temoDir}`).catch(() => {
              print.sever.createFail()
            })
          }
        })
      }
    }
    resolve()
  })
}

async function checkLocalDir(localDir) {
  let dirList = fs.readdirSync(localDir)
  const serverConfig = await readServerConfig()
  const customIgnore = serverConfig.ignore || []
  const list = []
  for (let i = 0; i < dirList.length; i++) {
    let name = dirList[i]
    if (defaultIgnore.indexOf(name) > -1 || customIgnore.indexOf(name) > -1) continue
    let completePath = path.join(localDir, name)
    list.push({
      type: fs.lstatSync(completePath).isDirectory() ? 'dir' : 'file',
      path: completePath,
      name
    })
  }
  return list
}
