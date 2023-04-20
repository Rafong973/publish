## web 自动发布工具

### 安装

推荐采用全局安装的方式

```
npm install @rafong/publish -g
```

### 使用

本工具支持两种发布模式

- 手动发布
- 自动发布

##### 手动发布

在终端执行命令，根据提示输入对应的参数即可

```bash
publish
```

##### 自动发布

需要先在项目根目录下创建配置文件，
本工具自带创建配置功能，执行以下命令

```bash
publish init
```

工具会在项目根目录创建<b>server.config.json</b>

<b>注意：配置文件每个字段都不可为空，不填写需要删除</b>
<b>注意：工具默认忽略 node_modules 文件夹</b>

```javascript
{
  "ignore": ["node_modules", ".git"], // 忽略上传的文件/夹
  "dev": {      // 环境名称
    "switch": true    // 开关
    "branch": ["dev"], // 分支管理，限定在指定分支进行发布
    // 环境配置 [必填]
    "host": "192.xxx.xxx.xxx",
    "username": "root",
    "password": "password",
    // 本地打包地址[选填]，默认dist
    "local": "/dist",
    // 远程打包地址[选填]，如不填写，默认为：/app_server/nginx/html/xxxx
    "remote": "/app_server/nginx/html/xxxx",
    // 发布成功后，在服务器执行对应的命令
    "exec": ["npm run build"]// 执行的命令
  },
  // 支持多个环境同时上传
  "test" : {
    "switch": false
    ....
  }
}
```

在配置文件中填写对应的字段，执行命令进行发布。

```bash
publish
```

本工具会检查远程服务器是否有对应的目录，如果没有会自动创建。

### 开发

#### 安装

```
npm install
```

#### 作业

安装后运行以下命令进行开发，在<b>src</b>目录下进行开发工作

```
npm run dev
```

请不要在<b>master</b>分支进行开发

#### 发布

开发完成后，请提交到开发分支，联系管理员进行 review 和发布
