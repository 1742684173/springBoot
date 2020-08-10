/**
 * name: public.ztree
 * Version: 1.0.0 beta
 */
define(['publicZtree'], function () {
	angular.module('public.ztree', []).directive('tree',[function(){
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function ($scope, element, attrs, ngModel) {
				var setting = {
					data: {
						key: {
							title: "branchName"
						},
						simpleData: {
							enable: true,
						}
					},
					callback: {
						onClick: function (event, treeId, treeNode, clickFlag) {
							switch(treeId){
								case 'menu_add_ztree':
								case 'menu_edit_ztree':
								case 'can_operation_ztree':
								case 'can_operation_ztree_edit':
									$scope.operationZtree(treeNode,treeId);
									break;

							}
							BRANCHID = treeNode.branchId;
							BranchID = treeNode.branchId;
							$scope.$apply(function () {
								ngModel.$setViewValue(treeNode);
							});
						}
					}
				};
				//向控制器发送消息，进行菜单数据的获取
				$scope.$emit("treeCtrl",attrs["1"]);
				//监听或接收数据。。用于接收event与data,domId 不传默认id= tree，setting1不传默认setting配置
				$scope.$on("menuData",function(event,data,domId,setting1,openTreeId){
					setting1==undefined?'':$.extend( true, setting, setting1 );
					domId=domId==undefined?'tree':domId;
					$.fn.zTree.init($("#"+domId),setting,data);//进行初始化树形菜单
					//$.fn.zTree.init(element, setting, data);//进行初始化树形菜单 element
					var zTree = $.fn.zTree.getZTreeObj(domId);//zTree 的 DOM 容器的 id
						var open_node = zTree.getNodeByParam("branchId",openTreeId );
						zTree.selectNode(open_node,true);//指定选中ID的节点
						zTree.expandNode(open_node, true, false);//指定选中ID节点展开
					var selectName = $("#selectName").val();
					if(typeof selectName == "undefined" || selectName == ""){
						zTree.selectNode(zTree.getNodeByParam(domId,"1"));//默认第一个选中
						$("#selectName").val(zTree.getSelectedNodes()[0]);//赋值
					}else{
						for(var i =0; i<data.length;i++){
							if(data[i]["branchId"] == selectName ){
								zTree.selectNode(zTree.getNodeByParam("branchId", data[i]["branchId"]));
							}
						}
					}
				});
				$scope.$on("menuData1",function(event,data){ //监听或接收数据。。用于接收event与data
					$.fn.zTree.init($("#tree1"), setting, data);//进行初始化树形菜单
					//$.fn.zTree.init(element, setting, data);//进行初始化树形菜单 element
					var zTree = $.fn.zTree.getZTreeObj("tree");//zTree 的 DOM 容器的 id
					var selectName = $("#selectName").val();
					if(typeof selectName == "undefined" || selectName == ""){
						//zTree.selectNode(zTree.getNodeByParam("tree","1"));//默认第一个选中
						//$("#selectName").val(zTree.getSelectedNodes()[0]);//赋值    //因为修改时selectNode是空的 赋值失败报错，所以注释
					}else{
						for(var i =0; i<data.length;i++){
							if(data[i]["branchId"] == selectName ){
								zTree.selectNode(zTree.getNodeByParam("branchId", data[i]["branchId"]));
							}
						}
					}
				});
			}
		};
	}]);
});