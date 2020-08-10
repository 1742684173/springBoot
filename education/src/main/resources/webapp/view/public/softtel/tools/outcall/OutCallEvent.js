/**
*定义socket连接参数
*
var host = "10.181.68.180";
var port = 8181;*/
/**
 *页面提示
 */
 var con = 0;
 var host,port;
function statErr(){
	alert("不是签入状态，不能进行外呼！");
}
function statErr1(){
	alert("通话状态不能进行外呼！");
}
function morePer(){
alert("签入人数超过上限！");
}
function nullPhone(){
alert("请输入电话号码！");
}

/**
 *注册分机到AACC平台
 */
 function regist(agentid,phoneid,channelid,phonepwd,softTelHost,softTelPort){
	 host = softTelHost;
	 port = softTelPort;
	 setTimeout("registCTI('"+agentid+"','"+channelid+"')",5000);//等待swf加载完成，延迟2s连接
 }
 function registCTI(agentid,channelid){
// 	var host = socketObj.host;
//	var port = socketObj.port;
 	document.getElementById("OutCall").Flex_SocketConn(host,port);//连接呼叫流水服务器
	setTimeout("document.getElementById('OutCall').Flex_getChannelId('"+channelid+"','"+agentid+"')",1500);//判断签入人数，延迟
																									   //1.5秒等待swf连接
																									   //流水服务器
 }
 function returnControl(agentid){
	if(con==0){
	connect(agentid,'Aa123456');
	}
	con++;
}
/**
 *退出系统时软电话未签出提示
 */
function getStatus(){
	var status=document.getElementById("OutCall").Flex_getStat();
	return status;
}
/**
 *自动填充电话号码
 */

function addPhoneNum(num){
	document.getElementById("OutCall").Flex_addPhoneNum(num);
}
function addAndDail(num){
	document.getElementById("OutCall").Flex_addAndDail(num);
}
/**
 * 坐席端连接到AACC
 */
function Event_OnConnected(){
	document.getElementById("OutCall").Flex_Connected();
}

/**
 * 坐席端断开AACC连接
 */
function Event_OnDisconnected(){
document.getElementById("OutCall").Flex_OnDisconnected();
}

/**
 * 坐席登录
 */
function Event_OnLoggedIn(){
	document.getElementById("OutCall").Flex_OnLoggedIn();
	
}
function Event_Destory(){
	
document.getElementById("OutCall").Flex_Destory();
con=0;
}

/**
 * 坐席登出
 */
function Event_OnLoggedOut(){
document.getElementById("OutCall").Flex_OnLoggedOut();
}

/**
 * 外呼事件
 */
function Event_OnDialing(msg){
document.getElementById("OutCall").Flex_OnDialing();
}

/**
 * 应答成功事件，包括客户进线应答、外呼应答、其他坐席会议或咨询应答
 */
function Event_OnEstablished(msg){
	document.getElementById("OutCall").Flex_OnEstablished();
}

/**
 * 挂机事件，包含客户进线挂机、咨询/会议主叫方取消(主、被叫均会收到该事件，目前该事件无法区分主被叫)、外呼挂机
 */
function Event_OnReleased(msg){
document.getElementById("OutCall").Flex_OnReleased();
}

/**
 * 通话中保持
 */
function Event_OnHold(){
document.getElementById("OutCall").Flex_OnHold();

}

/**
 * 解除保持
 */
function Event_OnUnHold(){
document.getElementById("OutCall").Flex_OnUnHold();
}

function Event_OnError(msg){
alert("Avaya SoftPhone ERROR:\n"+msg);
}



