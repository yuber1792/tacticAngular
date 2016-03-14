angular.module('tactic.recepcionController', [])


.controller('recepcionController', function($scope ,$ionicModal,$location,$http,$ionicPopup,Scopes) {
 	 Scopes.store('recepcionController', $scope);
 	 $scope.loginData =   Scopes.get('ingresoController').loginData;

	 $scope.valor =true;

	$scope.ordenes = [
						{"id":"2","placa":"dgt673","estado":"1","estadoTexto" :"En curso"  ,"token" : "1932134931"},
						{"id":"2","placa":"dgt567","estado":"0","estadoTexto" :"En espera" ,"token" : "1932134931"},
						{"id":"2","placa":"uvx123","estado":"1","estadoTexto" :"En curso"  ,"token" : "1932134931"},
						{"id":"2","placa":"jsi765","estado":"3","estadoTexto" :"Finalizado","token" : "1932134931"}
					];
 
 	 $ionicModal.fromTemplateUrl('templates/reporte.html', {
       scope: $scope
      }).then(function(modalReporte) {
        $scope.modalReporte = modalReporte;
      });
     
     
      $scope.abrirReporte = function() {         
            $scope.modalReporte.show();
      };

      
      $scope.cerrarReporte = function() {         
            $scope.modalReporte.hide();
      };

    $scope.jsonReporte=[];
    $scope.data = [];
   	$scope.info  =  $location.search();
 
  	 $scope.noParametros = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'Informacion',
           template: 'No se puede cargar el reporte, parametros recibidos  son incorrectos!!!'
         });

         alertPopup.then(function(res) {
          //
           console.log('Alerta confirmacion');
         });
      };

    $scope.cargaReporte = function(id ,token)
    {
	     console.log('http://satelite.tacticlogistics.com:8090/ordenes-ingreso?id='+id+'&token='+token);

	     $http.get('http://satelite.tacticlogistics.com:8090/ordenes-ingreso?id='+id+'&token='+token)
	          .success(function(data, status, headers, config){
	            //alert("**** SUCCESS ****");
	           // alert(status);

	          })
	          .error(function(data, status, headers, config){
	             $scope.noParametros();
	          })
	          .then(function(response){
	           
	           $scope.jsonReporte = response.data;
	          console.log("json reporte " + $scope.jsonReporte);
	          $scope.abrirReporte();

	     }); 


    }

  
})

