## 项目文件说明

本项目是一个使用 Koa 框架构建的 Node.js 应用，包含以下主要文件：

- `app.js`: 项目入口，设置 Koa 应用，注册中间件和路由。
- `core/init.js`: 初始化管理器，负责动态加载和注册路由。
- `middleware/exception.js`: 错误处理中间件，统一捕获和处理错误。
- `app/api/v1/book.js`: 书籍相关的路由模块，包含多个 API 端点。
- `core/http-exception.js`: 自定义的异常类，用于处理和抛出特定类型的错误。

## 贡献

欢迎提交 issues 和 pull requests 来改进这个项目！

## 许可证

此项目采用 [MIT 许可证](LICENSE)。
