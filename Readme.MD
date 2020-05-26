## -、为什么要使用SpringBoot
1.配置简单；

2.引用第三方方便

3.不用打war包，直接生jar包


## 二、常见配置
改端口
``
server.port = 8080

``

## 三、自定义配置
为什么改随机端口
``
server.port = ${random.int(8081,9012)}

``

1、如果在一台服务器上，多个服务会造成端口冲突。

2、在现实的开发中，开发人员不用记住端口，在真实的开发设置随机端口
就不用支去管理端口，也不怕端口冲突。


## 四、自定义配置