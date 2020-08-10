package com.aloogn.education.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("用户")
@Data
public class User {

    @ApiModelProperty("姓名")
    private String name;
}
