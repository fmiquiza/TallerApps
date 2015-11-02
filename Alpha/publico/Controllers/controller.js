angular.module("Principal",[])
.controller("Control", function($scope,$http){
console.log("Hola a mi controlador")

var actualizar= function(){
$http.get('/contactlist').success(function(response){
    console.log("El dato 2 tiene respuesta")
    $scope.ListCont = response;
    $scope.contacto="";
});
};

actualizar();
$scope.AddContacto=function(){
console.log($scope.contacto);
    $http.post('/contactlist', $scope.contacto).success(function(response){
    console.log(response);
    actualizar();
    });
};
    
$scope.Eliminar= function(id){
console.log(id);
    $http.delete('/contactlist/'+id).success(function(response){
        actualizar();
});  
};

$scope.editar = function(id){
    console.log(id);
    $http.get('/contactlist/'+id).success(function(response){
$scope.contacto= response;    
});
};
    
$scope.Actualizar= function(){
console.log($scope.contacto._id);
    $http.put('/contactlist/'+$scope.contacto._id,$scope.contacto).success(function(response){
    actualizar();
    })

};

})