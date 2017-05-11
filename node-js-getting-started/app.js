var overwatchApp = angular.module('overwatchApp',['ngRoute']);

overwatchApp.service('playerService',function(){
    
    this.player = {};
    
    this.player.name = "Carbo";
    this.player.bTag = "#2931";
    
})

//CONTROLLERS
overwatchApp.controller('homeController',['$scope','playerService', function($scope,playerService){
   
    $scope.player = playerService.player.name + playerService.player.bTag ;
    $scope.player.name = playerService.player.name;
    $scope.player.bTag = playerService.player.bTag;
    
    $scope.$watch('player',function(){
        var playerSplit = $scope.player.split("#");
        playerService.player.name = playerSplit[0];
        playerService.player.bTag = playerSplit[1];
    });
    
}]);

overwatchApp.controller('playerController',['$scope','$http','playerService',function($scope,$http,playerService){
    
    
    $http.get('https://owapi.net/api/v3/u/'+ playerService.player.name +'-'+ playerService.player.bTag +'/blob').then(function succesCallback(response){
        
        console.log("Got it ! : " + response.data.eu);
        
        if(response.data.eu != null){
            $scope.regionMessage = "Vous etes sur EU";
        }
        
    },function errorCallback(response){
        
    });
    
    
}]);

// ROUTES
overwatchApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'views/home.htm',
        controller: 'homeController'
    })
    
    .when('/player', {
        templateUrl: 'views/player.htm',
        controller: 'playerController'
    })
    
    
});
