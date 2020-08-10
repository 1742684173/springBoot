package com.aloogn.rabbitmq.topic;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Sender {
//
//    @Autowired
//    private AmqpTemplate amqpTemplate;
//
//    @Value("${mq.config.exchange}")
//    private String exchange;
//
//    public void send(){
//        this.amqpTemplate.convertAndSend(this.exchange,"user.log.debug","user.log.debug....");
//        this.amqpTemplate.convertAndSend(this.exchange,"user.log.info","user.log.info....");
//        this.amqpTemplate.convertAndSend(this.exchange,"user.log.warn","user.log.warn....");
//        this.amqpTemplate.convertAndSend(this.exchange,"user.log.error","user.log.error....");
//    }
}
