package com.aloogn.rabbitmq.dirct;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class Receiver {

    @RabbitListener(queues = "hello-agan-queue")
    public void process(String msg){
        System.out.println("receiver:"+msg);
    }
}
