const { exec } = require('child_process')

module.exports = {
  getBranch() {
    return new Promise((resolve, reject) => {
      exec('git symbolic-ref --short HEAD', (error, stdout) => {
        if (error) {
          return reject(error)
        }
        resolve(stdout ? stdout.trim() : '')
      })
    })
  }
}
