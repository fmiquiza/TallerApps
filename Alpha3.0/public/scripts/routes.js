'use strict'
angular.module('app', ['ngResource','ui.router','ngSanitize'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
                //abstract: true,
            	url: '/home',
            	//templateUrl: 'views/home/partial-home.html',
                //controller:'homeCtrl',
                views: {
                    'header' : { templateUrl: 'views/home/headerHome.html' },
                    'content': { 
                        templateUrl: 'views/home/partial-home.html',
                        controller:'homeCtrl' 
                    },
                    'footer' : { templateUrl: 'views/home/footerHome.html' }
                }
                
        	})
        	.state('admin.events',{
        		url:'/events',
        		templateUrl:'views/events/index.html',
        		controller: 'eventCtrl',
            	caseInsensitiveMatch:true,
            	//authenticate: true
        	})
        	.state('events/create',{
        		url:'/events/create',
        		templateUrl:'views/events/create.html',
				controller:'createEventCtrl'
        	})
        	.state('events/update',{
        		url:'/events/update/:id',
        		templateUrl:'views/events/edit.html',
				controller:'updateEventCtrl'
        	})
            .state('admin',{
                url:'/admin',
                //templateUrl:'admin/index.html'
                views: {
                    'header' : {  },
                    'content': { 
                        templateUrl: 'admin/index.html',
                        controller:'adminCtrl' 
                    },
                    //'footer' : { templateUrl: 'views/home/footerHome.html' }
                }
            });
	});

angular.module('app').directive('ckEditor', [function () {

        return {
            require: '?ngModel',
            restrict: 'C',
            link: function (scope, elm, attr, model) {
                var isReady = false;
                var data = [];
                var ck = CKEDITOR.replace(elm[0]);
                
                function setData() {
                    if (!data.length) { return; }

                    var d = data.splice(0, 1);
                    ck.setData(d[0] || '<span></span>', function () {
                        setData();
                        isReady = true;
                    });
                }

                ck.on('instanceReady', function (e) {
                    if (model) { setData(); }
                });

                elm.bind('$destroy', function () {
                    ck.destroy(false);
                });

                if (model) {
                    ck.on('change', function () {
                        scope.$apply(function () {
                            var data = ck.getData();
                            if (data == '<span></span>') {
                                data = null;
                            }
                            model.$setViewValue(data);
                        });
                    });

                    model.$render = function (value) {
                        if (model.$viewValue === undefined) {
                            model.$setViewValue(null);
                            model.$viewValue = null;
                        }

                        data.push(model.$viewValue);

                        if (isReady) {
                            isReady = false;
                            setData();
                        }
                    };
                }

            }
        };
    
    }]);
