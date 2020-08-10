package com.aloogn.common.utils;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {
    /**
     * 对象转json
     * @param object
     * @return
     */
    public static JSON object2Json(Object object){
//        return JSON.toJSON(object);
        ObjectMapper mapper = new ObjectMapper();
        String objectJson = "";
        if(object instanceof String){

            try {
                objectJson = mapper.writeValueAsString(object);
            }catch (Exception e){

            }
        }


        return null;
    }

    /**
     * json转对象
     * @param json
     * @return
     */
    public static Object json2Object(String json){
        ObjectMapper mapper = new ObjectMapper();
        Object object = null;
        try {
            object = mapper.readValue(json,Object.class);
        }catch (Exception e){
            e.printStackTrace();
        }
        return object;
    }
}
