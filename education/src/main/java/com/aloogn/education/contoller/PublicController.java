package com.aloogn.education.contoller;

import com.alibaba.fastjson.JSONObject;
import com.aloogn.education.doservice.AsyncService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping(value = "/")
@Slf4j
public class PublicController {
    private static final String Web_bean_package = "webbean";
    private static final String HEAD_TX_BEAN_NAME = "Transmit_HttpService";
    private static final String HEAD_RX_BEAN_NAME = "Receive_HttpService";
    private static final String BODY_TX_PREFIX = "T_";
    private static final String BODY_RX_PREFIX = "R_";
    private static final String RETURN_CODE = "returnCode";
    private static final String RETURN_MSG = "returnMsg";
    private static final String AUTH_CODE = "authCode";
    private static final String AUTH_MSG="authMsg";
    private static final String DOWNLOAD_SERVICE_NAME="downloadFileService";

    @ApiOperation("公共controller")
    @CrossOrigin
    @RequestMapping(value = "/signIn", method = RequestMethod.POST, consumes = "application/json")
    public Map<String, Object> signIn(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) {



        return null;
    }

    @ApiOperation("公共controller")
    @CrossOrigin
    @RequestMapping(value = "/jsonRequest", method = RequestMethod.POST, consumes = "application/json")
    public Map<String, Object> service(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) {
        return null;
    }

    public Class<?> getClassByName(String className) throws ClassNotFoundException {
        return Class.forName(className);
    }
}
