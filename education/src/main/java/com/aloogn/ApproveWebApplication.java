package com.aloogn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class},
        scanBasePackages={"com.aloogn"})
public class ApproveWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApproveWebApplication.class, args);
    }
}
