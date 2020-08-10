/**
 * name: public.Echart
 * date: 2017-5-24
 */
function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}
define(['publicMax'], function () {
	angular.module('public.Max', []).directive('ngMax', function() {
		return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function (scope, elem, attr, ctrl) {
	            scope.$watch(attr.ngMax, function () {
	                ctrl.$setViewValue(ctrl.$viewValue);
	            });
	            var maxValidator = function (value) {
	                var max = scope.$eval(attr.ngMax) || Infinity;
	                if (!isEmpty(value) && value > max) {
	                    ctrl.$setValidity('ngMax', false);
	                    return undefined;
	                } else {
	                    ctrl.$setValidity('ngMax', true);
	                    return value;
	                }
	            };
	            ctrl.$parsers.push(maxValidator);
	            ctrl.$formatters.push(maxValidator);
	        }
	    };
	})
});