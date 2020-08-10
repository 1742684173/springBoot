var voice_path=""; //录音地址
var acallid=""; //呼叫id
var status=0; //座席状态 0签出 1签入 2通话 3保持 4话后处理 5外呼中

//获取呼叫id
function getAcallId(){
	return acallid;
}
//获取录音地址
function getVoicePath(){
	return voice_path;
}
//获取座席状态
function getStatus(){
	return status;
}
/*******************************软电话方法*****************************/
//签入
function login(){
	var agentId = document.getElementById('agtId').innerHTML;
	var tel = document.getElementById('PhoneNumber').value;
	if(agentId==""){
		alert("请先点击注册");
	}else{
		if(tel.length!=4){
			alert("请输入4位话机号！");
		}else{
			regist();
			$caf.phone.open();
			$caf.phone.ready();
		}
		//else if(agentId != tel ){
			//alert("输入的分机号码有误！");
		//}
	}
}
//签出
function logout(){
	$caf.phone.loginout();
}
//呼叫
function dail(){
	var called = document.getElementById("PhoneNumber").value;
	//签入和事后处理可以外呼
	if(status==1||status==4){
		if(called==""||called==null){
			alert("请输入被叫号码");
		}else{
			status=5;//外呼中记录状态
            $caf.phone.callout(paramObj.before+called); //拨打
		}
	}else{
		alert("当前状态不能外呼");
	}
} 
//添加号码后呼叫
function addAndDail(called){
	//签入和事后处理可以外呼
	if(status==1||status==4){
		status=5; //外呼中记录状态
		document.getElementById("PhoneNumber").value=called;
		if(called==""||called==null){
			alert("请输入被叫号码");
		}else{
			$caf.phone.callout(paramObj.before+called); //拨打
		}
	}else{
		alert("当前状态不能外呼");
	}
	
} 

//挂机
function callend(){
	$caf.phone.callend();
	$caf.phone.cancelwork();
}

//保持
function hold(){
	$caf.phone.hold(acallid);
}
//接回
function holdback(){
	$caf.phone.qxhold();
}

function getCallId(){
	return acallid;
}

/*****************************响应时间处理****************************************/


function divstyle(type){
	if(type=="readySuccess"){
		$('#logindiv').css('display','none');
		$('#logoutdiv').css('display','inline');
		$('#daildiv').css('display','inline');
		showStatus("工作");
	}else if(type=="loginoutSuccess"){
		$('#logindiv').css('display','inline');
		$('#logoutdiv').css('display','none');
		$('#daildiv').css('display','none');
		$('#hangupdiv').css('display','none');
		showStatus("签出");
	}else if(type=="callouting"){
		$('#logoutdiv').css('display','none');
		$('#daildiv').css('display','none');
		$('#hangupdiv').css('display','inline');
		showStatus("呼出");
	}else if(type=="AgentEvent_Talking"){
		$('#holddiv').css('display','inline');
		$('#hangupdiv').css('display','inline');
		$('#holdbackdiv').css('display','none');
		showStatus("通话中");
	}else if(type=="AgentEvent_Call_Out_Fail"){
		$('#logindiv').css('display','none');
		$('#logoutdiv').css('display','inline');
		$('#daildiv').css('display','inline');
		$('#hangupdiv').css('display','none');
		$('#holdbackdiv').css('display','none');
		showStatus("呼叫失败");
	}else if(type=="holdSuccess"){
		$('#holddiv').css('display','none');
		$('#holdbackdiv').css('display','inline');
		showStatus("保持");
	}else if(type=="unholdSuccess"){
		$('#holdbackdiv').css('display','none');
		$('#holddiv').css('display','inline');
		showStatus("通话中");
	}else if(type=="AgentOther_PhoneRelease"){
		$('#logindiv').css('display','none');
		$('#logoutdiv').css('display','inline');
		$('#daildiv').css('display','inline');
		$('#hangupdiv').css('display','none');
		$('#holdbackdiv').css('display','none');
		$('#holddiv').css('display','none');
		showStatus("话后处理");
	}
}
//显示状态
function showStatus(stat){
	$('#status').text(stat);
}
var AgentEvent_Hold_Type='';
function init(host,port,agentId,ccser,ccport){
   $caf.phone.config({
	  host:host,      //华为cti平台地址
	  port:port,			  //端口
	  agentNo:agentId,		  //登录坐席号（华为授权）
	  agentPwd:"",    // 登录密码
	  phoneNumber:agentId,     //分机号，与该台电脑IP绑定的分机号一致
	  ccLogServer: ccser,            //呼叫中心流水服务器
	  ccLogServerPort:ccport
	});
    $('#agtId').text(agentId);//显示agentid
    
  }
var paramObj={};

function init1(host,port,agentId,ccser,ccport,before){
	paramObj={
			  host:host,      //华为cti平台地址
			  port:port,			  //端口
			  agentNo:agentId,		  //登录坐席号（华为授权）
			  agentPwd:"",    // 登录密码
			  ccLogServer: ccser,            //呼叫中心流水服务器
			  ccLogServerPort:ccport,
			  before: before // 呼叫号码前缀
			}
	   $caf.phone.config(paramObj);
	   $('#agtId').text(agentId);//显示agentid
}

//注册话机号
function regist(){
   $caf.phone.config({
	  host:paramObj.host,      //华为cti平台地址
	  port:paramObj.port,			  //端口
	  agentNo:paramObj.agentNo,		  //登录坐席号（华为授权）
	  agentPwd:paramObj.agentPwd,    // 登录密码
	  phoneNumber:document.getElementById('PhoneNumber').value,     //分机号，与该台电脑IP绑定的分机号一致
	  ccLogServer: paramObj.ccLogServer,            //呼叫中心流水服务器
	  ccLogServerPort:paramObj.ccLogServerPort
	});
/*****************************监听平台响应时间*********************************/    
    $caf.phone.listen(function(type,id,message){
    	if(type == "readySuccess"){  //签入   
    		status = 1;
    		document.getElementById('PhoneNumber').value="";//号码栏置为空
    		divstyle("readySuccess");
    	}else if(type == "callouting"){//外呼
    		divstyle('callouting');
    	}else if(type == "AgentEvent_Call_Out_Fail"){//呼叫失败
    		alert("呼叫失败！")
    		status = 4;
    		divstyle('AgentEvent_Call_Out_Fail');
    	}else if(type == "AgentEvent_Talking"){
    		acallid = message;
    		status = 2;//通话
    		divstyle('AgentEvent_Talking');
    	}else if(type == "loginoutSuccess"){
    		status = 0;//签出
    		divstyle('loginoutSuccess');
    	}else if(type == "AgentOther_PhoneRelease"){
    		status = 4;//话后处理
    		divstyle('AgentOther_PhoneRelease');
    	}else if(type == 'holdSuccess'){
    		status = 3; //保持
    		divstyle('holdSuccess');
    	}else if(type == 'lincenseIsFull'){
    		alert("登陆人员超过限制，请联系系统管理员！");
    	}else if(type=='AgentMediaEvent_Record'){      //获取录音文件
	        voice_path=message; //录音文件名
    	}else if(type == 'callendSuccess'){//挂机事件
    		status = 4;//话后处理
    	    divstyle('AgentOther_PhoneRelease');
    	}
    });  
  }
  
