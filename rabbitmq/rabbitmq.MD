# MQ
##1.什么是MQ
```
MQ(message queue),消息队列，FIFO,用于不同进程/线程之间的通信

RabbitMQ中，信息流从你的应用程序出发，来到RabbitMQ的队列，所有信息可以只存储在一个队列中，队列可以存储很多
消息，它基本上是一个无限制的缓冲区，前提是你的机器有足够的存储空间

优点：
1.异步
2.解耦
3.流量削锋

--------------------------------------------------------------------------------------
            |                               |                                   |
pubblisher--|  exchange---binding---queue   |--connection(channel1,channel2...) |consumer
            |                               |                                   |    
--------------------------------------------------------------------------------------
名词：
1.message: 消息，由消息头和消息体组成，消息体是不透明的，而消息头则由一系列可选的属性组成，这些
  属性包括routing-key(路由健),priority(相对其它消息的优先权)，delivery-mode(指出该消息可
  能需要持久性存储)
2.pubblisher：消息的生产者，也是一个向交换器发布消息的客户端应用程序;
3.consumer：消息的消费者，从消息队列中取出消息的客户端程序
4.exchange：交换器，用来接收生产者发送的消息并将这些消息路由交给服务器中的队列
  种类：dirct：直接的 fanout输出，散开 topic话题 标题
    1.dirct(发布与订阅，完全匹配)
    2.fanout(广播)
    3.topic(主题，规则匹配)
5.Binding：绑定，用于消息队列和交换器之间的关联，一个绑定就是基于路由器将交换器和消息队列连接起
  来的路由规则，所以可以将交换器理解成一个由绑定构成的路由表
6.routing key：路由健，rabbitMQ决定消息该投入到哪个队列的规则，队列通过路由健绑定到交换器，
  消息发送到MQ服务器时，消息将拥有一个路由健，即使是空的，RabbitMQ也会将其和绑定使用的路由健
  进行匹配，如果匹配，消息则投入到该队列，不匹配，则进入黑洞
7.channel：信道，是tcp里面的虚拟连接，例如：电缆相当于tcp,信道相当于独立光纤维，一条tcp连接
  上创建多少条信道是没有限制的；tcp一旦打开，就会创建AMQP信道；无论是发布消息、接受消息、订阅
  队列都是通过信道完成的
8.virtual host：虚拟主机，表示一批交换器、消息队列、和相关对象，虚拟主机是共享相同的身份认证和
  加密环境的独立服务器域。每个vhost本质上就是一个mini版的rabbitMQ服务器，拥有自己的队列、交换
  器绑定和权限机制，vhost是AMQP概念的基础，必须在连接时指定
9.broker：表示消息队列服务器实体
  
```

##2.产生消息队列的原因？
```
不同进程之间传递消息时，两个进程之间耦合程度过高，改进一个进程，另一个进程也要修改，
，在两进程之抽离出一层，都通过这层来进行消息传递
```

                                                
## 3.rabbit
```
abbitmq-plugins enable rabbitmq_management
停止：net stop RabbitMQ
启动：net start RabbitMQ
创建用户：rabbitmqctl add_user admin(用户名) admin(密码)
设置用户角色：rabbitmqctl set_user_tags admin administrator
设置用户权限：rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
查看当前用户和角色：rabbitmqctl list_users
```

访问地址：http://127.0.0.1:15672/

默认帐号密码：guest/guest


## 4.项目配置：
###1.导入依赖
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```
###2.application.properties连接配置
```
spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=admin  
spring.rabbitmq.password=admin
```

###3.MQ入门例子

####场景1：发布订阅
```
provider --- 队列 ------ consumer

生产者：
@Component
public class Sender {

    @Autowired
    private AmqpTemplate amqpTemplate;

    public void send(){
        String msg = "hello" + new Date();
        this.amqpTemplate.convertAndSend("hello-agan-queue",msg);
    }
}
```
消费者：
```
@Component
public class Receiver {

    @RabbitListener(queues = "hello-agan-queue")
    public void process(String msg){
        System.out.println("receiver:"+msg);
    }
}
```
中转站-队列：
```
@Configuration
public class SenderConfig {

    @Bean
    public Queue myQueue(){
        return new Queue("hello-agan-queue");
    }
}
```

####场景2：系统日志处理场景(匹配模式)
需求：
```
1.微服务产生的日志、交给日志服务器处理
2.日志处理服务器有四个服务，分别为DEBUG、INFO、WARN、ERROR等
3.服务直接的通信采用dirct(发布订阅)


---------------------------------------------------------------
服务--》交换器(匹配模式 dirct)----routing,key-->log.info(处理)---msg-->info日志处理服务
                            |
                            |----routing,key-->log.error(处理)---msg-->error日志处理服务
---------------------------------------------------------------


```