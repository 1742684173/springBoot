package com.aloogn.common.utils;

import java.util.UUID;

/**
 * Uuid生成工具类
 * @author Yifei Liu
 *
 */
public class UuidUtil {
  
  /**
   * 生成唯一编号
   * @return
   */
  public static String generatesUuid(){
    UUID uuid = UUID.randomUUID();
    String uuidStr = uuid.toString();
    uuidStr = uuidStr.substring(0,8)+uuidStr.substring(9,13)+uuidStr.substring(14,18)+uuidStr.substring(19,23)+uuidStr.substring(24);
    return uuidStr;
  }
  
  /**
   * 生成32位UUID 唯一编号
   * @return
   */
  public static String getUuid(){
    UUID uuid = UUID.randomUUID();
    return uuid.toString().replaceAll("-", "");
  }
}

