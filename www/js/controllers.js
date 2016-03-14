angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout ,$http ,$ionicPopup ,Scopes) {
   Scopes.store('ingresoController', $scope);
    $scope.loginData = {};
    $scope.loginData.motrarAmbiente = false;
    $scope.loginData.ambiente = "";
    $scope.loginData.bodega ="";

 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Login',
     template: 'Ya se encuentra logueado como '+window.localStorage.getItem('usuario')+' ¿ desea cerrar sesion ?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('Cierra sesion');
       window.localStorage.setItem('usuario','');
       window.localStorage.setItem('clave','');
       $scope.loginData.usuario = window.localStorage.getItem("usuario");
       $scope.loginData.clave = window.localStorage.getItem("clave");
       $scope.loginData.login ="no";
       $scope.login();
     } else {
        console.log('No cierra sesion');
        $scope.loginData.usuario = window.localStorage.getItem("usuario");
        $scope.loginData.clave = window.localStorage.getItem("clave");
        $scope.loginData.ambiente = window.localStorage.getItem("ambiente");
        $scope.loginData.bodega = window.localStorage.getItem("bodega");
        $scope.loginData.ip = window.localStorage.getItem("ip");
        $scope.loginData.puerto = window.localStorage.getItem("puerto");
        $scope.loginData.login ="ok";     
        $scope.cargarBodegas();  
     }
   });
 };

  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Atención',
     template: 'No ha iniciado sesion presione ok para continuar'
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
     $scope.modal.show(); 
   });
 };

 $scope.mensajeDatosIncorrectos = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Atención',
     template: 'Los datos son incorrectos'
   });
   alertPopup.then(function(res) {
     console.log('datos incorrectos');
     
   });
 };

 if(window.localStorage.getItem("usuario") === undefined || window.localStorage.getItem("clave") === undefined  || window.localStorage.getItem("usuario") === "" || window.localStorage.getItem("clave") === ""  ){
          //$scope.modal.show();
          $scope.showAlert();    

      }else{
        $scope.showConfirm();
         $scope.loginData.usuario = window.localStorage.getItem("usuario");
         $scope.loginData.clave = window.localStorage.getItem("clave");
          $scope.loginData.login ="ok";
         console.log("logueado como = " +  $scope.loginData.usuario );
        // alert("logueado como  " +   $scope.loginData.usuario );
      }      


  $scope.jsonIngreso = {};
  $scope.loginData.login ="no";
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
      if(window.localStorage.getItem("usuario") === undefined || window.localStorage.getItem("clave") === undefined  || window.localStorage.getItem("usuario") === "" || window.localStorage.getItem("clave") === ""  ){
          $scope.modal.show();    
      }else{
        $scope.showConfirm();
         $scope.loginData.usuario = window.localStorage.getItem("usuario");
         $scope.loginData.clave = window.localStorage.getItem("clave");
         $scope.loginData.ambiente = window.localStorage.getItem("ambiente");
         $scope.loginData.bodega = window.localStorage.getItem("bodega");

          $scope.loginData.login ="ok";
         console.log("logueado como = " +  $scope.loginData.usuario );
        // alert("logueado como  " +   $scope.loginData.usuario );
      }      
  };

      $ionicModal.fromTemplateUrl('templates/MiCuenta.html', {
       scope: $scope
      }).then(function(modalCuenta) {
        $scope.modalCuenta = modalCuenta;
      });
     

 
      $scope.abrirMiCuenta = function() {
        $scope.cargarBodegas();
          console.log(window.localStorage.getItem("usuario"));
          $scope.loginData.usuario = window.localStorage.getItem("usuario");
          $scope.loginData.clave = window.localStorage.getItem("clave");
          $scope.loginData.login ="ok";
          $scope.modalCuenta.show();
      };

      
      $scope.cerrarMiCuenta = function() {
         
            $scope.modalCuenta.hide();
      };



  $scope.cerrarSesion = function()
  {

        window.localStorage.setItem('usuario','');
        window.localStorage.setItem('clave','');
      /*  window.localStorage.setItem('ambiente','');
        window.localStorage.setItem('bodega','');
        window.localStorage.setItem('ip','');
        window.localStorage.setItem('puerto','');*/

        $scope.loginData.usuario = window.localStorage.getItem("usuario");
        $scope.loginData.clave = window.localStorage.getItem("clave");
        $scope.loginData.ambiente = window.localStorage.getItem("ambiente");
        $scope.loginData.bodega = window.localStorage.getItem("bodega");
        $scope.loginData.ip = window.localStorage.getItem("ip");
        $scope.loginData.puerto = window.localStorage.getItem("puerto");
        $scope.loginData.login ="no";

        $scope.jsonIngreso.usuario = "";
        $scope.jsonIngreso.clave ="";


  }
    $scope.ambiente  = [ 
                            {"id":"0" , "ip" : "192.168.10.15" ,"puerto":"8090" , "nombre":"Inglaterra"} , 
                            {"id":"0" , "ip" : "192.168.100.52" ,"puerto":"8090" , "nombre":"Turquia"} ,
                             {"id":"0" , "ip" : "http://satelite.tacticlogistics.com" ,"puerto":"8080" , "nombre":"Publico"} ];
 
   $scope.asignarAmbiente = function (id){
              
              if($scope.jsonIngreso.ambiente === "Inglaterra"){
                   $scope.jsonIngreso.ip ="192.168.10.15";
                   $scope.jsonIngreso.puerto ="8090";                 
              }
               if($scope.jsonIngreso.ambiente === "Albam"){
                   $scope.jsonIngreso.ip ="192.170.112.207";
                   $scope.jsonIngreso.puerto ="8080";
              }
               if($scope.jsonIngreso.ambiente === "Turquia"){
                   $scope.jsonIngreso.ip ="192.168.100.52";
                   $scope.jsonIngreso.puerto ="8090";
              }
               if($scope.jsonIngreso.ambiente === "Publico"){        
                   $scope.jsonIngreso.ip ="satelite.tacticlogistics.com";
                   $scope.jsonIngreso.puerto ="8090";
              }
              window.localStorage.setItem("ip" ,   $scope.jsonIngreso.ip );
              window.localStorage.setItem("puerto" ,   $scope.jsonIngreso.puerto );
              console.log("ip = " +   $scope.jsonIngreso.ip);
              console.log("puerto = " +   $scope.jsonIngreso.puerto);
   }
    $scope.asignarNuevo = function (){
              
              if($scope.jsonAmbiente.ambiente === "Inglaterra"){
                   $scope.jsonIngreso.ip ="192.168.10.15";
                   $scope.jsonIngreso.puerto ="8090";                 
              }
               if($scope.jsonAmbiente.ambiente === "Albam"){
                   $scope.jsonIngreso.ip ="192.170.112.207";
                   $scope.jsonIngreso.puerto ="8080";
              }
               if($scope.jsonAmbiente.ambiente === "Turquia"){
                   $scope.jsonIngreso.ip ="192.168.100.52";
                   $scope.jsonIngreso.puerto ="8090";
              }
               if($scope.jsonAmbiente.ambiente === "Publico"){        
                   $scope.jsonIngreso.ip ="satelite.tacticlogistics.com";
                   $scope.jsonIngreso.puerto ="8090";
              }
              window.localStorage.setItem("ip" ,   $scope.jsonIngreso.ip );
              window.localStorage.setItem("puerto" ,   $scope.jsonIngreso.puerto );
              console.log("ip = " +   $scope.jsonIngreso.ip);
              console.log("puerto = " +   $scope.jsonIngreso.puerto);
   }

     $scope.cargarBodegas = function(){
              $http.defaults.useXDomain = true;
              $scope.jsonIngreso.ip =  window.localStorage.getItem("ip");
              $scope.jsonIngreso.puerto =  window.localStorage.getItem("puerto");
              $scope.jsonIngreso.usuario =  window.localStorage.getItem("usuario");
              $scope.jsonIngreso.clave =  window.localStorage.getItem("clave");

              $http.get('http://'+$scope.jsonIngreso.ip+':'+$scope.jsonIngreso.puerto+'/login?usuario='+$scope.jsonIngreso.usuario+'&pwd='+$scope.jsonIngreso.clave)
              .success(function(data, status, headers, config){           
              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               $scope.jsonRespuesta = response.data;
               $scope.bodegas  =   $scope.jsonRespuesta.bodegas;      
         });

     }
     $scope.jsonAmbiente = {};
     $scope.guardarNuevoAmbiente = function(){

         window.localStorage.setItem('ambiente', $scope.jsonAmbiente.ambiente);
         window.localStorage.setItem('bodega', $scope.jsonAmbiente.bodega);

         $scope.loginData.ambiente = window.localStorage.getItem('ambiente');
         $scope.loginData.bodega = window.localStorage.getItem('bodega');

         console.log("nuevo ambiente   =" + window.localStorage.getItem('ambiente'));
         console.log("nuevo bodega   =" + window.localStorage.getItem('bodega'));
         $scope.cerrarMiCuenta();
         $scope.loginData.motrarAmbiente = false;


     }

   $scope.doLogin = function() {   
      $http.defaults.useXDomain = true;
      $http.get('http://'+$scope.jsonIngreso.ip+':'+$scope.jsonIngreso.puerto+'/login?usuario='+$scope.jsonIngreso.usuario+'&pwd='+$scope.jsonIngreso.clave)
            .success(function(data, status, headers, config){    
            })
            .error(function(data, status, headers, config){
              alert("**** Verificar conexion a internet ****");            
            })
            .then(function(response){
             $scope.jsonRespuesta = response.data;
             $scope.bodegas  =   $scope.jsonRespuesta.bodegas;
             if($scope.jsonRespuesta.ok){
                console.log($scope.jsonRespuesta);
                $scope.jsonIngreso.verUsuario  = true ; 
                $scope.jsonIngreso.nuevaEntrada = false ; 
                $scope.jsonIngreso.login = true ; 
                $scope.jsonIngreso.cerrarSesion = false ; 
                $scope.jsonIngreso.nombres = $scope.jsonRespuesta.usuario.nombres;
                $scope.jsonIngreso.apellidos = $scope.jsonRespuesta.usuario.apellidos;
                $scope.closeLogin();
                
                window.localStorage.setItem("usuario", $scope.jsonIngreso.usuario);
                window.localStorage.setItem("clave", $scope.jsonIngreso.clave);
                window.localStorage.setItem("ambiente", $scope.jsonIngreso.ambiente);
                window.localStorage.setItem("ip", $scope.jsonIngreso.ip);
                window.localStorage.setItem("puerto", $scope.jsonIngreso.puerto);
            
                 $scope.loginData.usuario = window.localStorage.getItem("usuario");
                 $scope.loginData.clave = window.localStorage.getItem("clave");
                 $scope.loginData.ambiente = window.localStorage.getItem("ambiente");
                 $scope.loginData.ip = window.localStorage.getItem("ip");
                 $scope.loginData.puerto = window.localStorage.getItem("puerto");              
                 $scope.loginData.login ="ok"; 
             } else{
              $scope.mensajeDatosIncorrectos();
               //alert("Usuario  o clave  incorrecto");

            }    
        });                              
   }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
