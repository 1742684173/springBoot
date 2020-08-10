/**
 * name: public.pagination Version: 1.0.0 beta
 */
angular
		.module('public.pagination', [])
		.directive(
				'publicPagination',
				[ function() {
					return {
						restrict : 'EA',
						template : '<div class="page-list">'
								+ '<ul class="pagination" ng-show="conf.totalItems > 0">'
								+ '<li ng-class="{disabled: conf.currentPage == 1}" class="prevPage" ng-click="prevPage()"><span>&lt;</span></li>'
								+ '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" '
								+ 'ng-click="changeCurrentPage(item)">'
								+ '<span>{{item}}</span>'
								+ '</li>'
								+ '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}"class="nextPage" ng-click="nextPage()"><span>&gt;</span></li>'
								+ '</ul>'
								+ '<div class="page-total" ng-show="conf.totalItems > 0">'
								+ '每页&ensp;<select ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()"></select>'
								+ '&ensp;/共<strong>{{ conf.totalItems }}</strong>条&ensp;'
								+ '跳转至&ensp;<input type="text" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)"/>&ensp;页'
								+ '</div>'
								+ '<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>'
								+ '</div>',
						replace : true,
						scope : {
							conf : '='
						},
						link : function(scope, element, attrs) {
							var conf = scope.conf;
							var defaultPagesLength = 9;
							var defaultPerPageOptions = [ 10, 15, 20, 30, 50 ];
							var defaultPerPage = 15;
							if (conf.pagesLength) {
								conf.pagesLength = parseInt(conf.pagesLength,
										10);
								if (!conf.pagesLength) {
									conf.pagesLength = defaultPagesLength;
								}
								if (conf.pagesLength % 2 === 0) {
									conf.pagesLength += 1;
								}
							} else {
								conf.pagesLength = defaultPagesLength
							}
							if (!conf.perPageOptions) {
								conf.perPageOptions = defaultPagesLength;
							}
							function getPagination(newValue, oldValue) {
								if (conf.currentPage) {
									conf.currentPage = parseInt(
											scope.conf.currentPage, 10);
								}
								if (!conf.currentPage) {
									conf.currentPage = 1;
								}
								if (conf.totalItems) {
									conf.totalItems = parseInt(conf.totalItems,
											10);
								}
								if (!conf.totalItems) {
									conf.totalItems = 0;
									return;
								}
								if (conf.itemsPerPage) {
									conf.itemsPerPage = parseInt(
											conf.itemsPerPage, 10);
								}
								if (!conf.itemsPerPage) {
									conf.itemsPerPage = defaultPerPage;
								}
								conf.numberOfPages = Math.ceil(conf.totalItems
										/ conf.itemsPerPage);
								if (scope.conf.numberOfPages > 0
										&& scope.conf.currentPage > scope.conf.numberOfPages) {
									scope.conf.currentPage = scope.conf.numberOfPages;
								}
								var perPageOptionsLength = scope.conf.perPageOptions.length;
								var perPageOptionsStatus;
								for (var i = 0; i < perPageOptionsLength; i++) {
									if (conf.perPageOptions[i] == conf.itemsPerPage) {
										perPageOptionsStatus = true;
									}
								}
								if (!perPageOptionsStatus) {
									conf.perPageOptions.push(conf.itemsPerPage);
								}
								conf.perPageOptions.sort(function(a, b) {
									return a - b
								});
								scope.pageList = [];
								if (conf.numberOfPages <= conf.pagesLength) {
									for (i = 1; i <= conf.numberOfPages; i++) {
										scope.pageList.push(i);
									}
								} else {
									var offset = (conf.pagesLength - 1) / 2;
									if (conf.currentPage <= offset) {
										for (i = 1; i <= offset + 1; i++) {
											scope.pageList.push(i);
										}
										scope.pageList.push('...');
										scope.pageList.push(conf.numberOfPages);
									} else if (conf.currentPage > conf.numberOfPages
											- offset) {
										scope.pageList.push(1);
										scope.pageList.push('...');
										for (i = offset + 1; i >= 1; i--) {
											scope.pageList
													.push(conf.numberOfPages
															- i);
										}
										scope.pageList.push(conf.numberOfPages);
									} else {
										scope.pageList.push(1);
										scope.pageList.push('...');
										for (i = Math.ceil(offset / 2); i >= 1; i--) {
											scope.pageList
													.push(conf.currentPage - i);
										}
										scope.pageList.push(conf.currentPage);
										for (i = 1; i <= offset / 2; i++) {
											scope.pageList
													.push(conf.currentPage + i);
										}
										scope.pageList.push('...');
										scope.pageList.push(conf.numberOfPages);
									}
								}
								scope.$parent.conf = conf;
							}
							scope.prevPage = function() {
								if (conf.currentPage > 1) {
									conf.currentPage -= 1;
								}
								getPagination();
								if (conf.onChange) {
									conf.onChange();
								}
							};
							scope.nextPage = function() {
								if (conf.currentPage < conf.numberOfPages) {
									conf.currentPage += 1;
								}
								getPagination();
								if (conf.onChange) {
									conf.onChange();
								}
							};
							scope.changeCurrentPage = function(item) {
								if (item == '...') {
									return;
								} else {
									conf.currentPage = item;
									getPagination();
									if (conf.onChange) {
										conf.onChange();
									}
								}
							};
							scope.changeItemsPerPage = function() {
								conf.currentPage = 1;
								getPagination();
								if (conf.onChange) {
									conf.onChange();
								}
							};
							scope.jumpToPage = function() {
								num = scope.jumpPageNum;
								if (num.match(/\d+/)) {
									num = parseInt(num, 10);
									if (num && num != conf.currentPage) {
										if (num > conf.numberOfPages) {
											num = conf.numberOfPages;
										}
										conf.currentPage = num;
										getPagination();
										if (conf.onChange) {
											conf.onChange();
										}
										scope.jumpPageNum = '';
									}
								}
							};
							scope.jumpPageKeyUp = function(e) {
								var keycode = window.event ? e.keyCode
										: e.which;
								if (keycode == 13) {
									scope.jumpToPage();
								}
							}
							scope.$watch('conf.totalItems', function(value,
									oldValue) {
								if (!value || value == oldValue) {
									if (conf.onChange) {
										conf.onChange();
										return;
									}
								}
								getPagination();
							})
						}
					};
				} ]);