if(window.jQuery)
  jQuery($caf__initial);
else if(window.attachEvent)
  window.attachEvent("onload",$caf__initial);
else
  window.addEventListener("load",$caf__initial);
function $caf__initial(){
  var vtop=top;
  while(!vtop.$caf&&vtop.opener&&!vtop.opener.closed&&vtop.opener.top.$caf)
    vtop=vtop.opener.top;
  if(vtop.$caf){
    vtop.$caf.initialMe(function(caf){
      if(!window.$caf){
        window.$caf=caf;
      }
      if(window.cafReady){
        cafReady();
      }
    });
  }else{
    if(arguments.callee.retry){
      arguments.callee.retry--;
    }
    else{
      arguments.callee.retry=5;
    }
    if(arguments.callee.retry<0){
      return;
    }
    setTimeout(arguments.callee,500);
  }
}
