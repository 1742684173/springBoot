package com.aloogn.deno.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld {

    @GetMapping("/helloWolrd")
    public String HelloWolrd(){
        return "aloogn";
    }
}
