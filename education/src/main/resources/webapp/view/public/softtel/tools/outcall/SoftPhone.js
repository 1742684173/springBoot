/***********************************start*******************************************/
//全局变量
var aacc ;
try{
	aacc =softphone;
} catch(e){
	aacc =softphone;
}

function connect(userName,password) {
	aacc.Connect(userName,password);
}

function LoginAfterConnected() {
	aacc.LoginAfterConnected();
}

function Login(userName,password) {
	aacc.Login(userName,password);
}

function Logout() {
	aacc.Logout();
}
function destroy() {
Event_Destory();
	aacc.Destroy();
}

function Dail(destination) {
	if(destination.length != 4){
		destination = "9"+destination;
	}
	aacc.Dial(destination);
}


function Hold() {
	aacc.Hold();
}

function UnHold() {
	aacc.UnHold();
}

function HangUp() {
		aacc.Hangup();
}

