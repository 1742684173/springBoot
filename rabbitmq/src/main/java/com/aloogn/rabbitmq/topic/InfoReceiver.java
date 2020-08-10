package com.aloogn.rabbitmq.topic;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.*;
import org.springframework.stereotype.Component;

//@Component
@Slf4j
//@RabbitListener(bindings = @QueueBinding(
//        value = @Queue(value = "${mq.config.queue.logs}",autoDelete = "true"),
//        exchange = @Exchange(value = "${mq.config.exchange}",type = ExchangeTypes.TOPIC),
//        key = "*.log.*"
//))
public class InfoReceiver {

    @RabbitHandler
    public void process(String msg){
        log.debug("接收到的日志消息是：{}",msg);
    }
}
