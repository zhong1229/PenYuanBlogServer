# 鹏渊墨客 服务端介绍

这个博客服务端基于 Nest 框架，使用 Prisma 作为 ORM（对象关系映射工具），MySQL 作为数据库存储引擎，并结合了 bcryptjs、class-validator 和七牛云 CDN 存储来实现一系列功能。

## 技术栈概述
- **Nest.js**：Nest 是一个基于 TypeScript 的渐进式 Node.js 框架，提供了支持现代工程实践的强大特性和抽象。
- **Prisma**：Prisma 是现代的 ORM 工具，简化了对数据库的访问和操作。
- **MySQL**：MySQL 是一种流行的关系型数据库管理系统，用于数据的存储和检索。
- **bcryptjs**：bcryptjs 是一个用于密码加密和验证的库，可以安全地存储用户密码。
- **class-validator**：class-validator 是一个用于在 TypeScript 和 JavaScript 类中执行验证的库，有助于验证输入数据的有效性。
- **七牛云 CDN 存储**：七牛云是一家提供云存储、内容分发等服务的云计算公司，用于存储博客的静态资源。

## 功能实现
1. **文章管理**：实现文章的增删改查功能，包括创建新文章、编辑现有文章、删除文章等。
2. **分类管理**：支持对文章进行分类，实现分类的增删改查功能，方便对文章进行分类展示。
3. **评论系统**：允许用户对文章进行评论，实现评论的增删改查功能，提高互动性。
4. **登录验证**：利用 bcryptjs 对用户密码进行加密存储，实现用户登录时的密码验证，保障用户信息安全。
5. **图片存储**：通过七牛云 CDN 存储，将博客中的图片等静态资源存储在云端，加快加载速度并节约本地存储空间。

这样的博客服务端结合了 Nest 框架的优势、Prisma 的便利性以及其他技术的特点，实现了基本的博客功能并保障了安全性和效率。如果你需要更详细的信息或有其他问题，欢迎继续提问！