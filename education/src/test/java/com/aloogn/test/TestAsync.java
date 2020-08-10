package com.aloogn.test;

import com.aloogn.education.doservice.AsyncService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestAsync.class)
@ContextConfiguration(classes = {
        AsyncService.class,
})
@Slf4j
public class TestAsync {
    @Autowired
    private AsyncService asyncService;

    @Test
    public void testAsync(){
        asyncService.signUp();
    }
}
