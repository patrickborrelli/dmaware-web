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
        $scope.characterForm = {
            player: '',
            character: ''
        };
        
        $scope.raceDisabled = true;
        $scope.classDisabled = true;
        $scope.alignDisabled = true;
        $scope.abilityDisabled = true;
        $scope.skillsDisabled = true;
        $scope.equipDisabled = true;
        $scope.spellsDisabled = true;
        $scope.activeIndex = 0;
        
        //Race ///////////////////////////////////
        $scope.showingHuman = true;
        $scope.showingDwarf = false;
        $scope.showingHillDwarf = false;
        $scope.showingElf = false;
        $scope.showingHighElf = false;
        $scope.showingHalfling = false;
        $scope.showingLightfoot = false;
        $scope.showingGnome = false;
        $scope.showingRockGnome = false;
        $scope.showingHalfElf = false;
        $scope.showingHalfOrc = false;
        
        $scope.isShowingHuman = function() {
            return $scope.showingHuman;
        };
        
        $scope.setShowingHuman = function() {
            $scope.showingHuman = true;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = false;
            $scope.showingElf = false;
            $scope.showingHighElf = false;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = false;
            $scope.showingGnome = false;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingDwarf = function() {
            return $scope.showingDwarf;
        };
        
        $scope.setShowingDwarf = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = true;
            $scope.showingHillDwarf = false;
            $scope.showingElf = false;
            $scope.showingHighElf = false;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = false;
            $scope.showingGnome = false;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingHillDwarf = function() {
            return $scope.showingHillDwarf;
        };
        
        $scope.setShowingHillDwarf = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = true;
            $scope.showingElf = false;
            $scope.showingHighElf = false;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = false;
            $scope.showingGnome = false;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingElf = function() {
            return $scope.showingElf;
        };
        
        $scope.setShowingElf = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = false;
            $scope.showingElf = true;
            $scope.showingHighElf = false;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = false;
            $scope.showingGnome = false;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingHighElf = function() {
            return $scope.showingHighElf;
        };
        
        $scope.setShowingHighElf = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = false;
            $scope.showingElf = false;
            $scope.showingHighElf = true;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = false;
            $scope.showingGnome = false;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingHalfling = function() {
            return $scope.showingHalfling;
        };
        
        $scope.setShowingHalfling = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = false;
            $scope.showingElf = false;
            $scope.showingHighElf = false;
            $scope.showingHalfling = true;
            $scope.showingLightfoot = false;
            $scope.showingGnome = false;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingLightfoot = function() {
            return $scope.showingLightfoot;
        };
        
        $scope.setShowingLightfoot = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = false;
            $scope.showingElf = false;
            $scope.showingHighElf = false;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = true;
            $scope.showingGnome = false;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingGnome = function() {
            return $scope.showingGnome;
        };
        
        $scope.setShowingGnome = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = false;
            $scope.showingElf = false;
            $scope.showingHighElf = false;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = false;
            $scope.showingGnome = true;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingRockGnome = function() {
            return $scope.showingRockGnome;
        };
        
        $scope.setShowingRockGnome = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = false;
            $scope.showingElf = false;
            $scope.showingHighElf = false;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = false;
            $scope.showingGnome = false;
            $scope.showingRockGnome = true;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingHalfElf = function() {
            return $scope.showingHalfElf;
        };
        
        $scope.setShowingHalfElf = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = false;
            $scope.showingElf = false;
            $scope.showingHighElf = false;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = false;
            $scope.showingGnome = false;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = true;
            $scope.showingHalfOrc = false;
        };
        
        $scope.isShowingHalfOrc = function() {
            return $scope.showingHalfOrc;
        };
        
        $scope.setShowingHalfOrc = function() {
            $scope.showingHuman = false;
            $scope.showingDwarf = false;
            $scope.showingHillDwarf = false;
            $scope.showingElf = false;
            $scope.showingHighElf = false;
            $scope.showingHalfling = false;
            $scope.showingLightfoot = false;
            $scope.showingGnome = false;
            $scope.showingRockGnome = false;
            $scope.showingHalfElf = false;
            $scope.showingHalfOrc = true;
        };
        
        
        
        ////////////////////////////////////////////
        
        
        
        
        
        //init form:
        $scope.loadIntroForm = function() {
            var user = userService.getUserFullname();
            console.log('loading user with full name ' + user);
            $scope.introForm = {
                playername: user,
                charactername: ''
            };
            $scope.introFormLoaded = true;
            return true;
        };
        
        
        
        //navigation        
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
        
        $scope.isAuthenticated = function() {
            return authService.isUserAuthenticated();
        };
        
        $scope.isAdmin = function() {
            return authService.isAdmin();
        };
     }])
;

