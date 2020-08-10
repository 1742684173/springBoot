package com.aloogn.education.contoller;

import com.aloogn.education.doservice.AsyncService;
import com.aloogn.education.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@Api("测试类")
@RestController
@RequestMapping(value = "/")
@Slf4j
public class HelloWorld {


    @ApiParam("日志结果")
    private String result;

    @ApiOperation("日志")
    @RequestMapping(value="/logs",method = RequestMethod.POST)
    public String logs(){
        log.debug("--------------------debug-----------------");
        log.trace("--------------------trace-----------------");
        log.info("--------------------info-----------------");
        log.warn("--------------------warn-----------------");
        log.error("--------------------error-----------------");
        return result;
    }

    @ApiOperation("创建用户")
    @RequestMapping(value="/createUser",method = RequestMethod.POST)
    public User createUser(User user){
        return user;
    }

    @Autowired
    AsyncService asyncService;

    @ApiOperation("异步测试")
    @RequestMapping(value="/asyncTest",method = RequestMethod.POST)
    public String asyncTest(){
        log.info("test");
        asyncService.signUp();
        return "test";
    }

//    @Autowired
//    private Sender sender;
//
//    @ApiOperation("RabbitMQ测试")
//    @RequestMapping(value="/rabbitMqTest",method = RequestMethod.POST)
//    public String rabbitMqTest(){
//        log.info("rabbitMqTest start");
//        sender.send();
//        log.info("rabbitMqTest end");
//        return "test";
//    }
}
