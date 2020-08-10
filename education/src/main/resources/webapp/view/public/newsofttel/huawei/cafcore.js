var $caf=top.$caf={
  // 定义与Applet相呼应的javascript对象，占用$caf名称空间,同时它也会占用top.$caf
  // 大部分情况下，该脚本为软电话模块服务，但你也能够从中获得额外的好处：
  //
  // 1 更新通知:多个账户信息查询界面和多个账户信息修改页面,假设为queryAccount.jsp
  // 和editAccount.jsp，业务上要求每当完成了账户信息的修改时，浏览器内所有与账户
  // 信息显示有关的页面都自动刷新。
  // 那么我们需要为所有的queryAccount.jsp和editAccount.jsp引入caf.js代理脚本
  // 所有的queryAccount.jsp定义:
  // function cafReady(){
  // $caf.listen("AccountUpdate",function(eventName,account){
  // //TODO:此处书写当账户信息变化时如何更新界面
  // });
  // }
  // 所有的editAccount.jsp在确认成功修改了账户信息后调用如下方法：
  // $caf.fireEvent("AccountUpdate","Success","账户ID或其他关键字");
  // 此时,所有已经打开的queryAccount.jsp将自动执行更新动作，某些特殊情况下，您还
  // 可以主动地在此时打开queryAccount.jsp,更多用途请自行探索.
  //
  // 2 java支持:某些情况下,你不需要编写和编译java代码,就能够获得java强大的功能支持,通过
  // var map=$caf.javaCreate("java.util.HashMap",10000,0.75);
  // 之后，您便可以像在java中那样调用map的各项功能，比如map.put("ID","123");
  // 插件登记表
  $plugins:[],
  // 延迟初始化函数队列,若业务界面期望使用软电话,而此时软电话尚未完成加载,则代理脚本caf.js
  // 会将页面的初始化动作添加到该队列,待软电话Applet加载完成之后依次调用,以通知每个页面.
  $delayInitials:[],
  // 事件注册表
  $listeners:[],
  // 提供代理脚本caf.js调用,若当前Applet加载已完成,则直接调用给定的初始化方法,否则将其存
  // 入延迟初始化队列中,待Applet完成加载后依次调用.
  initialMe:function(actionFunction){
    if(!actionFunction)
      return;
    if(this.$cafReady)
      actionFunction(this);
    else
      this.$delayInitials[this.$delayInitials.length]=actionFunction;
  },
  // 事件注册,eventType为事件类型字符串(软电话占用了"phone"类型),callback事件处理函数
  listen:function(eventType,callback){
    if(!eventType)
      return;
    if(!callback)
      return;
    this.$listeners[this.$listeners.length]={
      eventType:eventType,
      callback:callback,
      fs:""+callback
    }
  },
  // 注册插件
  regPlugin:function(plugin){
    this.$plugins[this.$plugins.length]=plugin;
  },
  // 触发事件,除了eventType事件类型,eventName事件名称以外,调用该函数时还可以提供任意个数
  // 以及类型的参数,除了eventType外,所有参数都会被事件处理函数获取.这也意味着不能为两个类型
  // 的事件注册同一个事件处理函数,因为它无法区分事件类型.
  fireEvent:function(eventType,eventName,data){
    var args=[];
    for( var i=1;i<arguments.length;i++){
      args[args.length]=arguments[i];
    }
    for( var i in this.$listeners){
      var listen=this.$listeners[i];
      try{
        if(eventType==listen.eventType)try{
          listen.callback.apply(undefined,args);
        }catch(e){
          if(e.number==-2146823274)
            listen.callback(eventName,data);
          else throw e;
        }
      }catch(e){
        delete this.$listeners[i];
        if(e.number!=-2146823277){
          var logger=this.$applet.newLogger(" Javascript event handle error["+e.number+"]: "+e.message,"style='color:red;'");
          logger.print(listen.fs);
          logger.close();
        }
      }
    }
  },
  // 书写一个条目日志
  log:function(title,style){
    if(style)
      this.$applet.log(title,style);
    else
      this.$applet.log(title);
  },
  newLogger:function(title,style){
    if(style)
      return this.$applet.newLogger(title,style);
    else
      return this.$applet.newLogger(title);
  },
  loadLib:function(surl){
    return this.$applet.loadLib(surl);
  },
  forName:function(className){
    return this.$applet.forName(className);
  },
  javaCreate:function(className,params){
    if(this.getJavaVersion()<="1.6.0_20"){
      if(typeof (params)=="function"&&arguments.length==2){
        return this.$applet.javaCreateWithCallback(className,params);
      }
    }
    var args=params;
    if(typeof (className)=="object"){
      args=className.params;
      methodName=className.methodName;
      className=className.className;
    }else if(params&&!(typeof (params)=="object"&&params.length)){
      args=[];
      for( var index=1;index<arguments.length;index++){
        var value=arguments[index];
        args[args.length]=value;
      }
    }
    return this.$applet.javaCreate(className,this.toArray(args));
  },
  javaField:function(className,fieldName){
    if(typeof (className)=="object"){
      fieldName=className.fieldName;
      className=className.className;
    }
    return this.$applet.javaField(className,fieldName);
  },
  javaInvoke:function(className,methodName,params){
    var args=params;
    if(typeof (className)=="object"){
      args=className.params;
      methodName=className.methodName;
      className=className.className;
    }else if(params&&!(typeof (params)=="object"&&params.length)){
      args=[];
      for( var index=2;index<arguments.length;index++){
        var value=arguments[index];
        args[args.length]=value;
      }
    }
    return this.$applet.javaInvoke(className,methodName,this.toArray(args));
  },
  showMessage:function(type,message){
	 alert(type+"|"+message);
  },
  toArray:function(jsArray){
    if(jsArray){
      if(typeof (jsArray)=="object"){
        var array=this.$applet.newArrays(jsArray.length);
        for( var index in jsArray){
          array[index]=jsArray[index];
        }
        return array;
      }else{
        var array=this.$applet.newArrays(arguments.length);
        for( var index=0;index<arguments.length;index++){
          array[i]=aguments[index];
        }
        return array;
      }
    }else
      return this.$applet.newArrays(0);
  },
  getClassVersion:function(){
    return this.$applet.getClassVersion();
  },
  getJavaVersion:function(){
    return this.$applet.getJavaVersion();
  },
  allow:function(){
    this.$applet.allow();
  },
  setNonProxy:function(){
    this.$applet.setNonProxy();
  },
  timeString:function(format){
    return this.$applet.timeString(format);
  },
  sysPref:function(path){
    if(path)return this.$applet.sysPref(path);
    else return this.$applet.sysPref();
  },
  userPref:function(path){
    if(path)return this.$applet.userPref(path);
    else return this.$applet.userPref();
  },
  js2s:function(js){
    var first=true;
    var result='{';
    for( var k in js){
      if(first)
        first=false;
      else
        result+=',';
      var v=js[k];
      k=k.replace('"','\\"');
      result+='"'+k+'":';
      if(!v){
        result+='null';
      }else if(typeof (v)=='object'){
        result+=arguments.callee(v);
      }else{
        v=new String(v);
        v=v.replace(/([\\"])/g,'\\$1');
        result+='"'+v+'"';
      }
    }
    result+='}';
    return result;
  },
  js2map:function(jsObject){
    if(!jsObject)
      return null;
    var map=$caf.javaCreate("java.util.HashMap");
    for( var key in jsObject){
      var value=jsObject[key];
      map.put(key,JSON.stringify(value));
    }
    return map;
  },
  map2js:function(map){
    if(!map)
      return null;
    var jsObject={};
    var it=map.entrySet().iterator();
    while(it.hasNext()){
      var entry=it.next();
      var key=entry.getKey();
      var value=entry.getValue();
      jsObject[key]=JSON.parse(value);
    }
    return jsObject;
  },
  js2set:function(jsObject){
    if(!jsObject)
      return null;
    var set=$caf.javaCreate("java.util.HashSet");
    for( var key in jsObject){
      var value=jsObject[key];
      set.add(value);
    }
    return set;
  },
  set2js:function(map){
    if(!map)
      return null;
    var jsObject=[];
    var it=map.iterator();
    while(it.hasNext()){
      var value=it.next();
      jsObject[jsObject.length]=value;
    }
    return jsObject;
  },
  // Applet完成加载后调用该方法
  $appletInit:function(applet){
    this.$applet=applet;
    applet.setNonProxy();
    for( var i in this.$plugins){
      var plugin=this.$plugins[i];
      try{
        plugin.init(this);
      }catch(e){
        applet.log(" Plugin["+plugin.name+"] load error!"+e.message,"style='color:red;'");
        alert("Plugin["+plugin.name+"] load error:\r\n"+e.message);
      }
    }
    try{
      if(window.initCAF)
        initCAF();
    }catch(e){
      applet.log(" CAF init error!"+e.message,"style='color:red;'");
      alert("CAF init error:\r\n"+e.message);
    }
    this.$cafReady=true;
    for( var i in this.$delayInitials){
      var actionFunction=this.$delayInitials[i];
      try{
        actionFunction(this);
      }catch(e){
        applet.log(" Page initial error!"+e.message,"style='color:red;'");
        alert("Page initial error:\r\n"+e.message);
      }
    }
  },
  // Applet销毁时调用该方法
  $appletDestroy:function(applet){
    for( var i in this.$plugins){
      var plugin=this.$plugins[i];
      try{
        plugin.destroy(this);
      }catch(e){
      }
    }
  },
  // 生命周期函数,由Applet调用,暂不处理
  $appletStart:function(applet){
    for( var i in this.$plugins){
      var plugin=this.$plugins[i];
      if(plugin.start)
        try{
          plugin.start(this);
        }catch(e){
        }
    }
  },
  // 生命周期函数,由Applet调用,暂不处理
  $appletStop:function(applet){
    for( var i in this.$plugins){
      var plugin=this.$plugins[i];
      if(plugin.stop)
        try{
          plugin.stop(this);
        }catch(e){
        }
    }
  }
};
