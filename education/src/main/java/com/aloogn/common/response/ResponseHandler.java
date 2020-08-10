package com.aloogn.common.response;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/**
 * ResponseBodyAdvice拦截Controller方法的返回值，统一处理返回值响应体
 * 1.对Controller全局数据统一数据处理
 * 2.对Controller全局异常统一数据处理
 *
 * basePackages：不加的话会对整个系统的Controller做了扩展功能，它会对某些功能产生冲突，如：不加的话swapper会空白
 */
@ControllerAdvice(basePackages = "com.aloogn.education")
public class ResponseHandler implements ResponseBodyAdvice<Object> {

    /**
     * 是否支持advise功能 true支持 false不支持 默认false
     * @param methodParameter
     * @param aClass
     * @return
     */
    @Override
    public boolean supports(MethodParameter methodParameter, Class<? extends HttpMessageConverter<?>> aClass) {
        return true;
    }

    /**
     * 处理response的具体业务方法
     * @param o
     * @param methodParameter
     * @param mediaType
     * @param aClass
     * @param serverHttpRequest
     * @param serverHttpResponse
     * @return
     */
    @Override
    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class<? extends HttpMessageConverter<?>> aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        if(o instanceof ErrorResult){

        }else if(o instanceof String){
            return "";
        }
//        return Result.suc(o);
        return null;
    }
}
