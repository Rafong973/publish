#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
const print = require('./print')

const fileTemplate = JSON.stringify({
  test: {
    switch: false,
    host: '',
    username: '',
    password: '',
    local: '/dist',
    remote: '',
    ignore: [],
    exec: []
  }
})

module.exports = {
  createJSON() {
    return new Promise((resolve) => {
      const file = path.join(cwd, 'server.config.json')
      try {
        fs.readFileSync(file, 'utf-8')
        print.config.existing()
        resolve()
      } catch (error) {
        fs.writeFile(file, `${fileTemplate}`, { flag: 'a+' }, function (err) {
          if (err) {
            print.config.fail()
          } else {
            print.config.success()
          }
          resolve()
        })
      }
    })
  }
}
