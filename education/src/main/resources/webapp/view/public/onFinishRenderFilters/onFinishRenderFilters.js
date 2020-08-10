/**
 * name: public.pagination Version: 1.0.0 beta
 */
angular
		.module('onFinishRenderFilters', [])
		.directive(
				'onFinishRenderFilters',['$timeout', function ($timeout) {
				return {
					restrict: 'A',
					link: function(scope,element,attr) {
						if (scope.$last === true) {
							var finishFunc=scope.$parent[attr.onFinishRenderFilters];
							if(finishFunc)
							{
								finishFunc();
							}
						}
					}
				};
			}])