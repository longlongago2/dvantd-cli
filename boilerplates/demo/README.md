# App Demo
## Explanation（说明）

**构建**

`1.安装整个项目`

`2.在项目根目录下使用命令 npm install`

`3.npm命令`
`npm run start（启动代理并调试）`
`npm run build（打包并压缩代码为生产版本到项目根目录下dist）`
`npm run lint（代码检测并自动修正）`
`npm run test（启动mocha测试框架）`


## Directory（主要目录结构）
```
├── /dist/            # 编译后的生产版本
├── /mock/            # 使用代理模拟数据
├── /node_modules/    # library root
├── /src/             # 源代码
│    ├── /components/   # 公共组件（抽象库，适应多次使用）
│    ├── /models/       # 数据模型
│    ├── /routes/       # 路由组件（页面维度）
│    ├── /services/     # 数据接口
│    ├── /static/       # 静态资源（存放图片资料等）
│    └── /utils/        # 工具函数
│    ├── index.js       # 入口文件
│    ├── router.js      # 路由配置
├── .eslintrc
├── .editorconfig
├── package.json
├── proxy.config.js       # 数据mock配置
├── README.md
└── webpack.config.js
```
