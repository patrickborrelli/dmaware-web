'use strict';

angular.module('dm-app')
    .filter('trustUrl', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    })

    .controller('HeaderController', ['$scope', '$rootScope', 'ngDialog', 'userService', 'authService', function($scope, $rootScope, ngDialog, userService, authService) {
        $scope.openRegister = function () {
            ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default  custom-width-600', controller:"RegisterController" });
        };    
        
        $scope.openLogin = function () {
            ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
        };
        
        $scope.openLogout = function() {
            ngDialog.open({ template: 'views/logout.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
        }; 
        
        $scope.isAuthenticated = function() {
            return authService.isUserAuthenticated();
        };
        
        $scope.getUserFullname = function() {
            return userService.getUserFullname();
        };
    }])

    .controller('RegisterController', ['$scope', 'userService', 'ngDialog', '$state', 'authService', function($scope, userService, ngDialog, $state, authService) {
        $scope.showLoader = false;
        $scope.showRegLoader = false;
        
        $scope.showLoading = function() {
            $scope.showLoader = true;
        };
        
        $scope.showRegLoading = function() {
            $scope.showRegLoader = true;
        };
        
        $scope.registerUser = function() {
            console.log('Doing registration', $scope.registration); 
            authService.register($scope.registration);
        };
        
        $scope.processLogin = function() {
            console.log('Doing login', $scope.loginData);
            authService.login($scope.loginData);            
        };
        
        $scope.processLogout = function() {
            console.log('Logging out user ' + userService.getUserFullname());
            authService.logout();
            ngDialog.close();
        };       
    }])

    .controller('HomeController', ['$scope', '$timeout', 'ngDialog', 'authService', 'userService', function($scope, $timeout, ngDialog, authService, userService) {
        $scope.tab = 1;
        $scope.subTab = 1;
        
        $scope.raceDisabled = true;
        $scope.classDisabled = true;
        $scope.alignDisabled = true;
        $scope.abilityDisabled = true;
        $scope.skillsDisabled = true;
        $scope.equipDisabled = true;
        $scope.spellsDisabled = true;
        $scope.activeIndex = 0;
        $scope.introForm = {
            playername: '',
            charactername: ''
        };
        
        $scope.characterForm = {
            player: '',
            character: ''
        };
        
        $scope.switchToRace = function(player, char) {
            console.log('Received player:' + player + ' and char:' +char);
            $scope.characterForm.player = player;
            $scope.characterForm.character = char;
            console.log($scope.characterForm);
            $scope.raceDisabled = false; 
            $scope.switchTab(1);
        }
        
        $scope.getUserName = function() {
            return userService.getUserFullname().toUpperCase();
        };

        $scope.switchTab = function(tabIndex){ 
            $timeout(function(){
                $scope.activeIndex = tabIndex;
            });
        };
        
        $scope.select = function (setTab) {
            $scope.tab = setTab;
        };
        
        $scope.subSelect = function (setTab) {
            $scope.subTab = setTab;
        };    

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
        
        $scope.subIsSelected = function (checkTab) {
            return ($scope.subTab === checkTab);
        };
        
        $scope.isAuthenticated = function() {
            return authService.isUserAuthenticated();
        };
        
        $scope.isAdmin = function() {
            return authService.isAdmin();
        };
     }])
;

