/*
 * 屏蔽特殊字符
 */
function filterStr(str) {
	var pattern = new RegExp("[`~!#$^*()=|{}':;'\\[\\]<>/?~！#￥……*（）——|{}【】‘；：”“'。？%+]");
	var specialStr = "";
	for(var i = 0; i < str.length; i++) {
		specialStr += str.substr(i, 1).replace(pattern, '');
	}
	return specialStr;
}

/*
 * 屏蔽指定特殊字符
 */
function filterToStr(str) {
    var pattern = new RegExp("[`~^''\\[\\]<>~！￥……（）——【】‘；：”“'。？]");
    var specialStr = "";
    for(var i = 0; i < str.length; i++) {
        specialStr += str.substr(i, 1).replace(pattern, '');
    }
    return specialStr;
}

function checkUsername()
{
	//正则表达式
 var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");
	//获取输入框中的值
	var username = document.getElementById("appiMcEmployerDept_load").value.trim();
$('.alert_error').hide();
	//判断输入框中有内容
	if(!reg.test(username))
	{
 $('.alert_error').text('请输入中文、数字和英文！');
 $('.alert_error').show();
	//输入非法字符，清空输入框
	$("#appiMcEmployerDept_load").val("");
	}
}
/**
 * 手机号码校验
 *  <input class="" onblur="mobileCheck(this.value)"> //页面中引入input标签 添加失去焦点事件onblur='方法名(this.value)'
 *  <div class="red" id="mobileError"></div>//提示信息 放置在需要显示的位置 ID与方法中显示错误提示的ID一致即可
 * @param str
 */
mobileCheck = function (str) { 
   var  mobile = str;
   var phoneTest = /^1[34578]\d{9}$/;
   if(!(phoneTest.test(mobile))){ 
	  $("#mobileError").show();
   }else{
	  $("#mobileError").hide();
   }    
}
//座机
CheckHomePhone = function (str) { 
   var homePhone = str;
   var homePhoneTest = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
   if(!(homePhoneTest.test(homePhone))){ 
	  $("#homePhoneError").show();
	  $("#homePhoneError").html("座机号码有误，请重新填写！");
   }else{
	  $("#homePhoneError").hide();
   }    
}

/**
 * 银行卡号校验
 * Description: 银行卡号Luhm校验
 * Luhm校验规则：16位银行卡号（19位通用）:
 * 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
 * 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
 * 3.将加法和加上校验位能被 10 整除。
 * 
 *  <input class="" onblur="luhmCheck(this.value)"> //页面中引入input标签 添加失去焦点事件onblur='方法名(this.value)'
 *  <div class="red" id="banknoError"></div>//提示信息 放置在需要显示的位置 ID与方法中显示错误提示的ID一致即可
 * @param str
 */
var ngValidIdCardCheck = false;
luhmCheck = function (str) {
    var  bankno = str;
    if(bankno){
        //判断卡号是否为九台农商、农信卡号
        var luhmCardCheck = bankno.slice(0,6);
        if((luhmCardCheck!="622935")&&(luhmCardCheck!="623181")&&(luhmCardCheck!="621531")){
        	$("#banknoError").show();
            $("#banknoError").html("银行卡号开头6位不符合规范");
            ngValidIdCardCheck = true;
            return false;
        }
        //判断长度
        if (bankno.length < 16 || bankno.length > 19) {
        	$("#banknoError").show();
            $("#banknoError").html("银行卡号长度必须在16到19之间");
            ngValidIdCardCheck = true;
            return false;
        }
        var num = /^\d*$/; //全数字
        if (!num.exec(bankno)) {
        	$("#banknoError").show();
            $("#banknoError").html("银行卡号必须全为数字");
            ngValidIdCardCheck = true;
            return false;
        }
        //开头6位
        var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
        	$("#banknoError").show();
            $("#banknoError").html("银行卡号开头6位不符合规范");
            ngValidIdCardCheck = true;
            return false;
        }
        var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）
        var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array(); //奇数位*2的积 <9
        var arrJiShu2 = new Array(); //奇数位*2的积 >9
        var arrOuShu = new Array(); //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) { //奇数位
                if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
                else arrJiShu2.push(parseInt(newArr[j]) * 2);
            } else //偶数位
            arrOuShu.push(newArr[j]);
        }
        var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }
        var sumJiShu = 0; //奇数位*2 < 9 的数组之和
        var sumOuShu = 0; //偶数位数组之和
        var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }
        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }
        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
        //计算Luhm值
        var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        var luhm = 10 - k;
        if (lastNum == luhm) {
        	$("#banknoError").hide();
        	ngValidIdCardCheck = false;
            return true;
        } else {
        	$("#banknoError").show();
            $("#banknoError").html("银行卡号必须符合Luhm校验");
            ngValidIdCardCheck = true;
            return false;
        }
    }else{
    	$("#banknoError").hide();
    	ngValidIdCardCheck = false;
        return true;
    }

}

/**
 * 对电子邮件的验证
 *  <input class="" onblur="EmailCheck(this.value)"> //页面中引入input标签 添加失去焦点事件onblur='方法名(this.value)'
 *  <div class="red" id="EmailCheckError"></div>//提示信息 放置在需要显示的位置 ID与方法中显示错误提示的ID一致即可
 * @param str
 */

//EmailCheck = function(str) { 
//	if(str.length==0){
//		$("#EmailCheckError").hide();
//		  return false; 
//	}else{
//		  var temp = str;
//		  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]+$/;
//		  if (!myreg.test(temp)) {
//			  $("#EmailCheckError").show();
//			  $("#EmailCheckError").html("请输入有效的E_mail！");
//		      return false;
//		  }else{$("#EmailCheckError").hide();}
//	}
////  alert(str);
// 
//}

EmailCheck = function(emailStr) {
	if (emailStr.length == 0) {
		$("#EmailCheckError").hide();
		return true;
	}
	var emailPat = /^(.+)@(.+)$/;
	var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
	var validChars = "[^\\s" + specialChars + "]";
	var quotedUser = "(\"[^\"]*\")";
	var ipDomainPat = /^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
	var atom = validChars + "+";
	var word = "(" + atom + "|" + quotedUser + ")";
	var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
	var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");
	var matchArray = emailStr.match(emailPat);
	if (matchArray == null) {
		$("#EmailCheckError").show();
		  $("#EmailCheckError").html("请输入有效的E_mail！");
		return false;
	}
	var user = matchArray[1];
	var domain = matchArray[2];
	if (user.match(userPat) == null) {
		$("#EmailCheckError").show();
		  $("#EmailCheckError").html("请输入有效的E_mail！");
		return false;
	}
	var IPArray = domain.match(ipDomainPat);
	if (IPArray != null) {
		for (var i = 1; i <= 4; i++) {
			if (IPArray[i] > 255) {
				$("#EmailCheckError").show();
				  $("#EmailCheckError").html("请输入有效的E_mail！");
				return false;
			}
		}
		$("#EmailCheckError").hide();
		return true;
	}
	var domainArray = domain.match(domainPat);
	if (domainArray == null) {
		$("#EmailCheckError").show();
		  $("#EmailCheckError").html("请输入有效的E_mail！");
		return false;
	}
	var atomPat = new RegExp(atom, "g");
	var domArr = domain.match(atomPat);
	var len = domArr.length;
	if ((domArr[domArr.length - 1].length < 2) || (domArr[domArr.length - 1].length > 3)) {
		$("#EmailCheckError").show();
		  $("#EmailCheckError").html("请输入有效的E_mail！");
		return false;
	}
	if (len < 2) {
		$("#EmailCheckError").show();
		  $("#EmailCheckError").html("请输入有效的E_mail！");
		return false;
	}
	$("#EmailCheckError").hide();
	return true;
}

/**
 * 姓名校验
 *  <input class="" onblur="NameCheck(this.value)"> //页面中引入input标签 添加失去焦点事件onblur='方法名(this.value)'
 *  <div class="red" id="NameValueError"></div>//提示信息 放置在需要显示的位置 ID与方法中显示错误提示的ID一致即可
 * @param str
 */
var nameCheck;
NameCheck = function(str) {
    var nameValue = str;
    var pattern = /^[\u4E00-\u9FA5]{1,}(?:·[\u4E00-\u9FA5]{1,})*$/i; 
    if (nameValue.length===0) {
    	$("#NameValueError").show();
        $("#NameValueError").html("姓名不为空");
        
        nameCheck = false;
        return false;
    }else if (!pattern.test(nameValue)) {
    	$("#NameValueError").show();
        $("#NameValueError").html("请输入真实姓名");
        nameCheck = false;
        return false;
    }else{
	  $("#NameValueError").hide();
	  nameCheck = true;
	  return false;
    }
    
}
var nameChecka;
NameChecka = function(stra) {
    var nameValuea = stra;
    var pattern = /^[\u4E00-\u9FA5]{1,}(?:·[\u4E00-\u9FA5]{1,})*$/i; 
    if (nameValuea.length===0) {
    	$("#NameValueErrora").show();
        $("#NameValueErrora").html("姓名不为空");
        
        nameCheck = false;
        return false;
    }else if (!pattern.test(nameValuea)) {
    	$("#NameValueErrora").show();
        $("#NameValueErrora").html("请输入真实姓名！");
        nameCheck = false;
        return false;
    }else{
	  $("#NameValueErrora").hide();
	  nameChecka = true;
	  return false;
    }
    
}
