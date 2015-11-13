'use strict'
angular.module('app')
	.controller('eventCtrl', function($scope,$http){
		var refresh=function(){
			$http.get('/apiEvents').success(function(response){
				$scope.events=response;
			});
		};
		refresh();
		$scope.eliminarEvento=function(id){
			console.log(id);
			$http.delete('/apiEvents/'+id).success(function(response){
				refresh();
			});
		};
		
		$scope.lblTitle="EVENTOS";	

	})
	.controller('createEventCtrl', function($scope,$http,$location,$timeout){
		$scope.lblTitle="NUEVO EVENTO";
		$scope.btnGuardar="Guardar";
		$scope.texto = 'este es el  el contenido';	
		$scope.Evento={};
		$scope.saveEvent=function(){
			
			$http.post('/apiEvents',$scope.Evento).success(function(response){
				console.log(response);
				$timeout(function(){
					$location.path('/events');
				},1000)
			});
		};
	})
	.controller('updateEventCtrl', function($scope,$http,$stateParams,$location,$timeout){
		var id=$stateParams.id;
		$scope.lblTitle="ACTUALIZAR EVENTO";
		$scope.btnGuardar="actualizar";

		$http.get('/apiEvents/'+id).success(function(response){
			console.log(response);
			$scope.Evento=response;
		});
		$scope.updateEvent=function(){
			$http.put('/apiEvents/'+ $scope.Evento._id,$scope.Evento).success(function(response){
				$timeout(function(){
					$location.path('/events');
				},1000)
			})

		}
		
		
	});

