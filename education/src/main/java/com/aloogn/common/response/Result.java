package com.aloogn.common.response;

public class Result<T> {
    /**
     * status状态值，代表本次请求response的状态结果
     */
    private Integer status;

    /**
     * desc描述
     */
    private String desc;

    /**
     * 返回的数据
     */
    private T data;

    public static Result fail(ResultCode resultCode){
        Result result = new Result();
        result.setResultCode(resultCode);
        return result;
    }

    private void setResultCode(ResultCode resultCode) {
        this.status = resultCode.code();
        this.desc = resultCode.message();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
