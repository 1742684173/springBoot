/**
 * name: public.pagination Version: 1.0.0 beta
 */
angular
		.module('public.imageshow', ['ngResource'])
		.directive(
				'publicImageshow',
				['$http', function($http) {
					return {
						restrict : 'EA',
						template:'<div><div class="modal fade" id="image" tabindex="-1" role="dialog" aria-hidden="true"  data-backdrop="static">'
									+'<div class="modal-dialog" style="width: 800px;">'
									+'<div class="modal-content">'
									+'<div class="modal-header">'
									+'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
									+'<h4 class="modal-title">影像资料</h4>'
									+'</div>'
									+'<div class="modal-body">'
									+'<div class="panel col-xs-12" >'
									+'<div class="panel group_panel" style="width:30%;height:300px;border:1px #000000 solid;float:left;overflow: auto;">'
									+'<div>'
									+'<div ng-repeat="fileRow in filetypelist">'
									+'<a class="btn btn-info add " ng-click="imageBoxClick(fileRow)" style="width: 100%;">{{fileRow.filetypename}}({{fileRow.filetype_no}})</a>'
									+'</div>'
									+'</div>'
									+'</div>'
									+'<div class="panel group_panel" style="width:70%;height:300px;border:1px #000000 solid;overflow: auto;">'
									+'<ul ng-repeat="batchRow in batchReturn">'
									+'<li class="li-box-f w25"  ng-repeat="fileRow in batchRow.files">'
									+'<div class="img-box minh120">'
									+'<img class="img100" title ="第{{$index+1}} 张：{{fileRow.filename}}" src="{{fileRow.cmurl+scale}}"  ng-click="originalImage(fileRow,$index)" data-toggle="modal" data-target="#originalImageModal" />'
									+'</div>'
									+'<div class="img-filename-box">'
									+'<span>第{{$index+1}} 张：{{fileRow.filename}}</span>'
									+'</div>'
									+'</li>'
									+'</ul>'
									+'</div>'
									+'</div>'
									+'</div>'
									+'<div class="modal-footer">'
									+'<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'
									+'</div>'
									+'</div>'
									+'</div>'
									+'</div>'
									+'<div class="modal fade" id="originalImageModal" tabindex="-1" role="dialog" aria-hidden="true">'
									+'<a href="javascript:;" ng-click="prevImg()" class="prevImgBtn imgToggleBtn">上一张</a>'
									+'<div class="modal-content" style="width: 800px; overflow: auto; margin:15px auto; text-align:center;">'
									+'<img src="{{originalImageURL}}"/>'
									+'</div>'
									+'<a href="javascript:;" ng-click="nextImg()" class="nextImgBtn imgToggleBtn">下一张</a>'
									+'</div></div>',
						replace : true,
						scope : {
							filetypelist : '=',
							imageurllist: '=',
						},
						link : function(scope, element, attrs) {
							// 查看原图
							scope.originalImage=function(e,index){
								//获取已存在大图
								scope.allBigImg = [];
								$(scope.batchReturn).each(function(index,item){
									$(item.files).each(function(index,item2){
										scope.allBigImg.push(item2.cmurl)
									})
								})
//								console.log(scope.allBigImg,'----scope.allBigImg');
								//获取当前大图索引index
								console.log('index',index);
								scope.originalImageURL = scope.allBigImg[index];
								scope.prevImg= function(){
									index--;
									if(index<0){
										scope.originalImageURL = scope.allBigImg[0];
										index=0;
									}else{
										scope.originalImageURL = scope.allBigImg[index];
									}	
								}
								var len =scope.allBigImg.length;
								scope.nextImg= function(){
									index++;
									if(index> len -1){
										scope.originalImageURL = scope.allBigImg[len -1];
										index = len -1;
									}else{
										scope.originalImageURL = scope.allBigImg[index];
									}	
								}
								
							};
							scope.imageBoxClick=function(e){
								scope.fileTypeidAll = []; // 传入的列表
								scope.fileTypeidAll.push(e.filetype_no);
								var menuMsgDataImageInfo = {
								 		"channelNo":"1",
								 		"transCode":"CIASCLIENTQUERY300",
					    				"appId":scope.imageurllist[0],
					    				"barcode":scope.imageurllist[1],
					    				"occurDate":scope.imageurllist[2],
					    				"orgId":scope.imageurllist[3],
					    				"doctypeId":scope.imageurllist[4],
					    				"fileTypeids":scope.fileTypeidAll
									};
								scope.batchReturn = null;
								$http.post(NewCoreUrl,menuMsgDataImageInfo).success(function(objc){
									scope.fgdfg = objc;
									if(scope.fgdfg.returnMsg=="OK"){
										scope.batchReturn = objc.batchReturn;
										scope.scale = "&scale="+objc.scale; // 缩略图比例
									}else{
						        		setTimeout(function(){$(".BeAlert_overlay,.BeAlert_box").remove();},1300);
							            alert("查询影像文档类型失败!", scope.fgdfg.returnMsg, function () {
							            }, {type: 'error',showConfirmButton:true});
						        	}
						   	 	});
							};
							
						}
					};
				} ]);