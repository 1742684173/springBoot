$caf.regPlugin({
  name:"phone",
  init:function(){
    var logger=$caf.newLogger(" @ Plugin:"+this.name,"style='color:gray;'");
    var loadPath = "";
    var productUrl = window.location.protocol + "//" + window.location.host;
    if(productUrl.indexOf("eaasmanu.cqrcb.com") != -1){
    	loadPath = productUrl+"/HWDemo/";
    }
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/cxf-2.6.2.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/MsgOutCall.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/huawei.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/httpclient-4.2.6.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/httpcore-4.2.5.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/jackson-core-asl-1.9.12.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/jackson-jaxrs-1.9.12.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/jackson-mapper-asl-1.9.12.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/jackson-xc-1.9.12.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/log4j-1.2.12.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/commons-httpclient-3.0.1.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/commons-io-2.1.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/commons-lang.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/commons-logging-1.2.jar"));
    logger.print("Load lib:",$caf.loadLib(loadPath+"huawei/jar/commons-logging-api-1.1.jar"));
    logger.close();
    $caf["phone"]={
      imp:$caf.javaCreate("com.pactera.caf.huawei.Phone",function(id,message){
    	  var args=["phone"];
          for(var i=0;i<arguments.length;i++){
            args[args.length]=arguments[i];
          }
          $caf.fireEvent.apply($caf,args);
      }),
      listen:function(callback){
          $caf.listen("phone",callback);
      },
      config:function(msConfig){
         var config=$caf.javaCreate("com.pactera.caf.huawei.Config");
         if(msConfig.host)config.setHost(msConfig.host);
         if(msConfig.port>0)config.setPort(msConfig.port);
         if(msConfig.agentPwd)config.setAgentPwd(msConfig.agentPwd);
         if(msConfig.agentNo)config.setAgentNo(msConfig.agentNo);
         if(msConfig.phoneNumber)config.setPhoneNumber(msConfig.phoneNumber);
         if(msConfig.ccLogServer)config.setCcLogServer(msConfig.ccLogServer);
         if(msConfig.ccLogServerPort)config.setCcLogServerPort(msConfig.ccLogServerPort);
         this.imp.setConfig(config);
      },
      open:function(){
          this.imp.open();
      },
      ready:function(){
          this.imp.ready();
      },
      loginout:function(){
          this.imp.loginout();
      },
      callout:function(called){
    	  this.imp.callout(called);
      },
      callend:function(){
    	  this.imp.callend();
      },
      hold:function(){
    	  this.imp.hold();
      },
      qxhold:function(callid){
    	  this.imp.qxhold(callid);
      },
      setCallData:function(callData){
    	  this.imp.setCallData(callData);
      },
      getCallData:function(){
    	  this.imp.getCallData();
      },
      cancelwork:function(){
    	  this.imp.cancelwork();
      }
    }
  },
  destroy:function(){
	 if($caf.rtms){
		$caf.rtms.stop();
	 }
  }
});
