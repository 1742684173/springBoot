package com.aloogn.education.doservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AsyncService {

    @Async
    public void signUp(){
        try{
            Thread.sleep(5000);
            createScore();
        }catch (Exception e){

        }

    }

    public void createScore(){
        log.info("---------createScore-----------");
    }
}
