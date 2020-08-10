package com.aloogn.test;

import com.aloogn.rabbitmq.dirct.Sender;
import lombok.extern.slf4j.Slf4j;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestRabbitOne2One.class)
@ContextConfiguration(classes = {
        Sender.class,
})
@Slf4j
public class TestRabbitOne2One {
//    @Autowired
//    private AmqpTemplate amqpTemplate;
//
//    @Test
//    public void send(){
//        System.out.println("------------start-----------");
//        String msg = "hello" + new Date();
//        this.amqpTemplate.convertAndSend("hello-agan-queue",msg);
//        System.out.println("------------end-----------");
//    }
}
