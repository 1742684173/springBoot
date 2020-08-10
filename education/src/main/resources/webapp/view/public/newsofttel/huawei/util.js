/*
	 * 鼠标按下时切换图标
	 */
	function mouseDownEvent(imgObj) {
	  var url = imgObj.className;
	  imgObj.className = url + 1;
	}
	
	/*
	 * 鼠标移出时切换图标
	 */
	function mouseOutEvent(imgObj) {
	    var url = imgObj.className;
	  	if(url.indexOf('1') < 0){
	    	imgObj.className = url;
	    }
	    else{
	  		imgObj.className = url.substring(0,url.length-1);
	  	}
	}