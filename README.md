Koa服务端编程、异步编程、面向对象编程。

- Koa 与 Koa 二次开发API
- 多 koa-router 拆分路由
- require-directory 自动路由加载
- nodemon修改文件自动重启
- 异步编程，async/await
- 异步异常链与全局异常处理
- Sequelize ORM 管理 MySQL
- JWT 权限控制中间件
- Validator 与 LinValidator 验证器


## 参数校验方式

validator

## 异常处理

1、没有发生异常  正确返回结果

2、无异常  执行，不需要返回结果 undefined

3、发生了异常

## 参数获取的方式

 const path = *ctx*.params

 const query = *ctx*.request.query

 const headers = *ctx*.request.header

 const body = *ctx*.request.body


 response.status=
通过数字代码设置响应状态：

100 "continue"
101 "switching protocols"
102 "processing"
200 "ok"
201 "created"
202 "accepted"
203 "non-authoritative information"
204 "no content"
205 "reset content"
206 "partial content"
207 "multi-status"
208 "already reported"
226 "im used"
300 "multiple choices"
301 "moved permanently"
302 "found"
303 "see other"
304 "not modified"
305 "use proxy"
307 "temporary redirect"
308 "permanent redirect"
400 "bad request"
401 "unauthorized"
402 "payment required"
403 "forbidden"
404 "not found"
405 "method not allowed"
406 "not acceptable"
407 "proxy authentication required"
408 "request timeout"
409 "conflict"
410 "gone"
411 "length required"
412 "precondition failed"
413 "payload too large"
414 "uri too long"
415 "unsupported media type"
416 "range not satisfiable"
417 "expectation failed"
418 "I'm a teapot"
422 "unprocessable entity"
423 "locked"
424 "failed dependency"
426 "upgrade required"
428 "precondition required"
429 "too many requests"
431 "request header fields too large"
500 "internal server error"
501 "not implemented"
502 "bad gateway"
503 "service unavailable"
504 "gateway timeout"
505 "http version not supported"
506 "variant also negotiates"
507 "insufficient storage"
508 "loop detected"
510 "not extended"
511 "network authentication required"
