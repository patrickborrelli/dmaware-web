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
        
        $scope.playDice = function() {
            var audio = new Audio('audio/dice.mp3');
            audio.play();
        }
        
        
        
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
        
        $scope.saveCurrentRace = function() {
            if($scope.showingHuman) {
                $scope.characterForm.race = 'HUMAN';
            } else if($scope.showingDwarf) {
                $scope.characterForm.race = 'DWARF';
            } else if($scope.showingHillDwarf) {
                $scope.characterForm.race = 'HILL DWARF';
            } else if($scope.showingElf) {
                $scope.characterForm.race = 'ELF';
            } else if($scope.showingHighElf) {
                $scope.characterForm.race = 'HIGH ELF';
            } else if($scope.showingHalfling) {
                $scope.characterForm.race = 'HALFLING';
            } else if($scope.showingLightfoot) {
                $scope.characterForm.race = 'LIGHTFOOT';
            } else if($scope.showingGnome) {
                $scope.characterForm.race = 'GNOME';
            } else if($scope.showingRockGnome) {
                $scope.characterForm.race = 'ROCK GNOME';
            } else if($scope.showingHalfElf) {
                $scope.characterForm.race = 'HALF ELF';
            } else if($scope.showingHalfOrc) {
                $scope.characterForm.race = 'HALF ORC';
            }
            
            console.log("current character form contains:");
            console.log($scope.characterForm);
            $scope.classDisabled = false; 
            $scope.switchTab(2);
        };       
        
        ////////////////////////////////////////////
        
        
        //Class ///////////////////////////////////
        $scope.showingBarbarian = true;
        $scope.showingBard = false;
        $scope.showingCleric = false;
        $scope.showingDruid = false;
        $scope.showingFighter = false;
        $scope.showingMonk = false;
        $scope.showingPaladin = false;
        $scope.showingRanger = false;
        $scope.showingRogue = false;
        $scope.showingSorcerer = false;
        $scope.showingWarlock = false;
        $scope.showingWizard = false;
        
        $scope.isShowingBarbarian = function() {
            return $scope.showingBarbarian;
        };
        
        $scope.setShowingBarbarian = function() {
            $scope.showingBarbarian = true;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingBard = function() {
            return $scope.showingBard;
        };
        
        $scope.setShowingBard = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = true;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingCleric = function() {
            return $scope.showingCleric;
        };
        
        $scope.setShowingCleric = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = true;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingDruid = function() {
            return $scope.showingDruid;
        };
        
        $scope.setShowingDruid = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = true;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingFighter = function() {
            return $scope.showingFighter;
        };
        
        $scope.setShowingFighter = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = true;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingMonk = function() {
            return $scope.showingMonk;
        };
        
        $scope.setShowingMonk = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = true;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingPaladin = function() {
            return $scope.showingPaladin;
        };
        
        $scope.setShowingPaladin = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = true;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingRanger = function() {
            return $scope.showingRanger;
        };
        
        $scope.setShowingRanger = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = true;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingRogue = function() {
            return $scope.showingRogue;
        };
        
        $scope.setShowingRogue = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = true;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingSorcerer = function() {
            return $scope.showingSorcerer;
        };
        
        $scope.setShowingSorcerer = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = true;
            $scope.showingWarlock = false;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingWarlock = function() {
            return $scope.showingWarlock;
        };
        
        $scope.setShowingWarlock = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = true;
            $scope.showingWizard = false;
        };
        
        $scope.isShowingWizard = function() {
            return $scope.showingWizard;
        };
        
        $scope.setShowingWizard = function() {
            $scope.showingBarbarian = false;
            $scope.showingBard = false;
            $scope.showingCleric = false;
            $scope.showingDruid = false;
            $scope.showingFighter = false;
            $scope.showingMonk = false;
            $scope.showingPaladin = false;
            $scope.showingRanger = false;
            $scope.showingRogue = false;
            $scope.showingSorcerer = false;
            $scope.showingWarlock = false;
            $scope.showingWizard = true;
        };
        
        $scope.saveCurrentClass = function() {
            if($scope.showingBarbarian) {
                $scope.characterForm.class = 'BARBARIAN';
            } else if($scope.showingBard) {
                $scope.characterForm.class = 'BARD';
            } else if($scope.showingCleric) {
                $scope.characterForm.class = 'CLERIC';
            } else if($scope.showingDruid) {
                $scope.characterForm.class = 'DRUID';
            } else if($scope.showingFighter) {
                $scope.characterForm.class = 'FIGHTER';
            } else if($scope.showingMonk) {
                $scope.characterForm.class = 'MONK';
            } else if($scope.showingPaladin) {
                $scope.characterForm.class = 'PALADIN';
            } else if($scope.showingRanger) {
                $scope.characterForm.class = 'RANGER';
            } else if($scope.showingRogue) {
                $scope.characterForm.class = 'ROGUE';
            } else if($scope.showingSorcerer) {
                $scope.characterForm.class = 'SORCERER';
            } else if($scope.showingWarlock) {
                $scope.characterForm.class = 'WARLOCK';
            } else if($scope.showingWizard) {
                $scope.characterForm.class = 'WIZARD';
            }
            
            console.log("current character form contains:");
            console.log($scope.characterForm);
            $scope.alignDisabled = false; 
            $scope.switchTab(3);
        };  
        
        ////////////////////////////////////////////   
        
        //Alignment ///////////////////////////////////
        $scope.selectedLG = false;
        $scope.selectedNG = false;
        $scope.selectedCG = false;
        $scope.selectedLN = false;
        $scope.selectedTN = true;
        $scope.selectedCN = false;
        $scope.selectedLE = false;
        $scope.selectedNE = false;
        $scope.selectedCE = false;
        
        $scope.setSelectedLG = function() {
            $scope.selectedLG = true;
            $scope.selectedNG = false;
            $scope.selectedCG = false;
            $scope.selectedLN = false;
            $scope.selectedTN = false;
            $scope.selectedCN = false;
            $scope.selectedLE = false;
            $scope.selectedNE = false;
            $scope.selectedCE = false;
        };
        
        $scope.setSelectedNG = function() {
            $scope.selectedLG = false;
            $scope.selectedNG = true;
            $scope.selectedCG = false;
            $scope.selectedLN = false;
            $scope.selectedTN = false;
            $scope.selectedCN = false;
            $scope.selectedLE = false;
            $scope.selectedNE = false;
            $scope.selectedCE = false;
        };
        
        $scope.setSelectedCG = function() {
            $scope.selectedLG = false;
            $scope.selectedNG = false;
            $scope.selectedCG = true;
            $scope.selectedLN = false;
            $scope.selectedTN = false;
            $scope.selectedCN = false;
            $scope.selectedLE = false;
            $scope.selectedNE = false;
            $scope.selectedCE = false;
        };
        
        $scope.setSelectedLN = function() {
            $scope.selectedLG = false;
            $scope.selectedNG = false;
            $scope.selectedCG = false;
            $scope.selectedLN = true;
            $scope.selectedTN = false;
            $scope.selectedCN = false;
            $scope.selectedLE = false;
            $scope.selectedNE = false;
            $scope.selectedCE = false;
        };
        
        $scope.setSelectedTN = function() {
            $scope.selectedLG = false;
            $scope.selectedNG = false;
            $scope.selectedCG = false;
            $scope.selectedLN = false;
            $scope.selectedTN = true;
            $scope.selectedCN = false;
            $scope.selectedLE = false;
            $scope.selectedNE = false;
            $scope.selectedCE = false;
        };
        
        $scope.setSelectedCN = function() {
            $scope.selectedLG = false;
            $scope.selectedNG = false;
            $scope.selectedCG = false;
            $scope.selectedLN = false;
            $scope.selectedTN = false;
            $scope.selectedCN = true;
            $scope.selectedLE = false;
            $scope.selectedNE = false;
            $scope.selectedCE = false;
        };
        
        $scope.setSelectedLE = function() {
            $scope.selectedLG = false;
            $scope.selectedNG = false;
            $scope.selectedCG = false;
            $scope.selectedLN = false;
            $scope.selectedTN = false;
            $scope.selectedCN = false;
            $scope.selectedLE = true;
            $scope.selectedNE = false;
            $scope.selectedCE = false;
        };
        
        $scope.setSelectedNE = function() {
            $scope.selectedLG = false;
            $scope.selectedNG = false;
            $scope.selectedCG = false;
            $scope.selectedLN = false;
            $scope.selectedTN = false;
            $scope.selectedCN = false;
            $scope.selectedLE = false;
            $scope.selectedNE = true;
            $scope.selectedCE = false;
        };
        
        $scope.setSelectedCE = function() {
            $scope.selectedLG = false;
            $scope.selectedNG = false;
            $scope.selectedCG = false;
            $scope.selectedLN = false;
            $scope.selectedTN = false;
            $scope.selectedCN = false;
            $scope.selectedLE = false;
            $scope.selectedNE = false;
            $scope.selectedCE = true;
        };
        
         $scope.saveCurrentAlignment = function() {
            if($scope.selectedLG) {
                $scope.characterForm.alignment = 'LAWFUL GOOD';
            } else if($scope.selectedNG) {
                $scope.characterForm.alignment = 'NEUTRAL GOOD';
            } else if($scope.selectedCG) {
                $scope.characterForm.alignment = 'CHAOTIC GOOD';
            } else if($scope.selectedLN) {
                $scope.characterForm.alignment = 'LAWFUL NEUTRAL';
            } else if($scope.selectedTN) {
                $scope.characterForm.alignment = 'TRUE NEUTRAL';
            } else if($scope.selectedCN) {
                $scope.characterForm.alignment = 'CHAOTIC NEUTRAL';
            } else if($scope.selectedLE) {
                $scope.characterForm.alignment = 'LAWFUL EVIL';
            } else if($scope.selectedNE) {
                $scope.characterForm.alignment = 'NEUTRAL EVIL';
            } else if($scope.selectedCE) {
                $scope.characterForm.alignment = 'CHAOTIC EVIL';
            } 
            
            console.log("current character form contains:");
            console.log($scope.characterForm);
            $scope.openAbilities();
        };  
                
        ////////////////////////////////////////////   
        
        //Abilities ///////////////////////////////////
        
        $scope.strDisabled = false;
        $scope.dexDisabled = false;
        $scope.conDisabled = false;
        $scope.wisDisabled = false;
        $scope.intDisabled = false;
        $scope.chaDisabled = false;
        
        $scope.openAbilities = function() {
            $scope.abilityDisabled = false; 
            $scope.switchTab(4);
            if($scope.strDisabled) {
                //leave this form
            } else {
                $scope.abilityForm = {
                    strRoll1: 0,
                    strRoll2: 0,
                    strRoll3: 0,
                    strRoll4: 0,
                    strTotal: 0,
                    dexRoll1: 0,
                    dexRoll2: 0,
                    dexRoll3: 0,
                    dexRoll4: 0,
                    dexTotal: 0,
                    conRoll1: 0,
                    conRoll2: 0,
                    conRoll3: 0,
                    conRoll4: 0,
                    conTotal: 0,
                    wisRoll1: 0,
                    wisRoll2: 0,
                    wisRoll3: 0,
                    wisRoll4: 0,
                    wisTotal: 0,
                    intRoll1: 0,
                    intRoll2: 0,
                    intRoll3: 0,
                    intRoll4: 0,
                    intTotal: 0,
                    chaRoll1: 0,
                    chaRoll2: 0,
                    chaRoll3: 0,
                    chaRoll4: 0,
                    chaTotal: 0
                };
            }
            
        }
        
        $scope.rollStr = function() {
            $scope.playDice();
            var str1 = $scope.abilityForm.strRoll1 = Math.floor((Math.random() * 6) + 1);
            var str2 = $scope.abilityForm.strRoll2 = Math.floor((Math.random() * 6) + 1);
            var str3 = $scope.abilityForm.strRoll3 = Math.floor((Math.random() * 6) + 1);
            var str4 = $scope.abilityForm.strRoll4 = Math.floor((Math.random() * 6) + 1);
            var total = str1 + str2 + str3 + str4;
            $scope.abilityForm.strTotal = total - $scope.findLowest([str1, str2, str3, str4]); 
            $scope.strDisabled = true;
        };
        
        $scope.rollDex = function() {
            $scope.playDice();
            var dex1 = $scope.abilityForm.dexRoll1 = Math.floor((Math.random() * 6) + 1);
            var dex2 = $scope.abilityForm.dexRoll2 = Math.floor((Math.random() * 6) + 1);
            var dex3 = $scope.abilityForm.dexRoll3 = Math.floor((Math.random() * 6) + 1);
            var dex4 = $scope.abilityForm.dexRoll4 = Math.floor((Math.random() * 6) + 1);
            var total = dex1 + dex2 + dex3 + dex4;
            $scope.abilityForm.dexTotal = total - $scope.findLowest([dex1, dex2, dex3, dex4]);
            $scope.dexDisabled = true;
        };
        
        $scope.rollCon = function() {
            $scope.playDice();
            var con1 = $scope.abilityForm.conRoll1 = Math.floor((Math.random() * 6) + 1);
            var con2 = $scope.abilityForm.conRoll2 = Math.floor((Math.random() * 6) + 1);
            var con3 = $scope.abilityForm.conRoll3 = Math.floor((Math.random() * 6) + 1);
            var con4 = $scope.abilityForm.conRoll4 = Math.floor((Math.random() * 6) + 1);
            var total = con1 + con2 + con3 + con4;
            $scope.abilityForm.conTotal = total - $scope.findLowest([con1, con2, con3, con4]);  
            $scope.conDisabled = true;
        };
        
        $scope.rollWis = function() {
            $scope.playDice();
            var wis1 = $scope.abilityForm.wisRoll1 = Math.floor((Math.random() * 6) + 1);
            var wis2 = $scope.abilityForm.wisRoll2 = Math.floor((Math.random() * 6) + 1);
            var wis3 = $scope.abilityForm.wisRoll3 = Math.floor((Math.random() * 6) + 1);
            var wis4 = $scope.abilityForm.wisRoll4 = Math.floor((Math.random() * 6) + 1);
            var total = wis1 + wis2 + wis3 + wis4;
            $scope.abilityForm.wisTotal = total - $scope.findLowest([wis1, wis2, wis3, wis4]); 
            $scope.wisDisabled = true;
        };
        
        $scope.rollInt = function() {
            $scope.playDice();
            var int1 = $scope.abilityForm.intRoll1 = Math.floor((Math.random() * 6) + 1);
            var int2 = $scope.abilityForm.intRoll2 = Math.floor((Math.random() * 6) + 1);
            var int3 = $scope.abilityForm.intRoll3 = Math.floor((Math.random() * 6) + 1);
            var int4 = $scope.abilityForm.intRoll4 = Math.floor((Math.random() * 6) + 1);
            var total = int1 + int2 + int3 + int4;
            $scope.abilityForm.intTotal = total - $scope.findLowest([int1, int2, int3, int4]); 
            $scope.intDisabled = true;
        };
        
        $scope.rollCha = function() {
            $scope.playDice();
            var cha1 = $scope.abilityForm.chaRoll1 = Math.floor((Math.random() * 6) + 1);
            var cha2 = $scope.abilityForm.chaRoll2 = Math.floor((Math.random() * 6) + 1);
            var cha3 = $scope.abilityForm.chaRoll3 = Math.floor((Math.random() * 6) + 1);
            var cha4 = $scope.abilityForm.chaRoll4 = Math.floor((Math.random() * 6) + 1);
            var total = cha1 + cha2 + cha3 + cha4;
            $scope.abilityForm.chaTotal = total - $scope.findLowest([cha1, cha2, cha3, cha4]);  
            $scope.chaDisabled = true;
        };
        
        $scope.findLowest = function(values) {
            var lowest = 7;
            for(var i = 0; i < values.length; i++) {
                if(values[i] < lowest) lowest = values[i];
            }
            return lowest;
        };                
        
        $scope.saveCurrentAbilities = function() {
            $scope.characterForm.str = $scope.abilityForm.strTotal;
            $scope.characterForm.dex = $scope.abilityForm.dexTotal;
            $scope.characterForm.con = $scope.abilityForm.conTotal;
            $scope.characterForm.wis = $scope.abilityForm.wisTotal;
            $scope.characterForm.int = $scope.abilityForm.intTotal;
            $scope.characterForm.cha = $scope.abilityForm.chaTotal;            

            console.log("current character form contains:");
            console.log($scope.characterForm);
            $scope.openSkills();
        };  
        
        ////////////////////////////////////////////   
        
        //Skills ///////////////////////////////////
        $scope.acroDisabled = false;
        $scope.animDisabled = false;
        $scope.arcaDisabled = false;
        $scope.athlDisabled = false;
        $scope.deceDisabled = false;
        $scope.histDisabled = false;
        $scope.insiDisabled = false;
        $scope.intiDisabled = false;
        $scope.inveDisabled = false;
        $scope.mediDisabled = false;
        $scope.natuDisabled = false;
        $scope.percDisabled = false;
        $scope.perfDisabled = false;
        $scope.persDisabled = false;
        $scope.reliDisabled = false;
        $scope.sleiDisabled = false;
        $scope.steaDisabled = false;
        $scope.survDisabled = false;
        
        $scope.commonSelected = false;
        $scope.dwarvishSelected = false;
        $scope.elvishSelected = false; 
        $scope.giantSelected = false;
        $scope.gnomishSelected = false;
        $scope.goblinSelected = false;
        $scope.halflingSelected = false;
        $scope.orcishSelected = false;       
        
        $scope.commonDisabled = false;        
        $scope.dwarvishDisabled = false;
        $scope.elvishDisabled = false;
        $scope.giantDisabled = false;
        $scope.gnomishDisabled = false;
        $scope.goblinDisabled = false;
        $scope.halflingDisabled = false;
        $scope.orcishDisabled = false; 
        
        $scope.languageCount = 0;
                
        $scope.setLangDisabled = function() {
            $scope.commonDisabled = true;        
            $scope.dwarvishDisabled = true;
            $scope.elvishDisabled = true;
            $scope.giantDisabled = true;
            $scope.gnomishDisabled = true;
            $scope.goblinDisabled = true;
            $scope.halflingDisabled = true;
            $scope.orcishDisabled = true; 
        };
        
        $scope.setLangEnabled = function() {
            $scope.commonDisabled = false;        
            $scope.dwarvishDisabled = false;
            $scope.elvishDisabled = false;
            $scope.giantDisabled = false;
            $scope.gnomishDisabled = false;
            $scope.goblinDisabled = false;
            $scope.halflingDisabled = false;
            $scope.orcishDisabled = false; 
        };
        
        $scope.raceString = '';
        $scope.classString = '';
        
        $scope.setAllEnabled = function() {
            $scope.acroDisabled = false;
            $scope.animDisabled = false;
            $scope.arcaDisabled = false;
            $scope.athlDisabled = false;
            $scope.deceDisabled = false;
            $scope.histDisabled = false;
            $scope.insiDisabled = false;
            $scope.intiDisabled = false;
            $scope.inveDisabled = false;
            $scope.mediDisabled = false;
            $scope.natuDisabled = false;
            $scope.percDisabled = false;
            $scope.perfDisabled = false;
            $scope.persDisabled = false;
            $scope.reliDisabled = false;
            $scope.sleiDisabled = false;
            $scope.steaDisabled = false;
            $scope.survDisabled = false;
        };
        
        $scope.setAllDisabled = function() {
            $scope.acroDisabled = true;
            $scope.animDisabled = true;
            $scope.arcaDisabled = true;
            $scope.athlDisabled = true;
            $scope.deceDisabled = true;
            $scope.histDisabled = true;
            $scope.insiDisabled = true;
            $scope.intiDisabled = true;
            $scope.inveDisabled = true;
            $scope.mediDisabled = true;
            $scope.natuDisabled = true;
            $scope.percDisabled = true;
            $scope.perfDisabled = true;
            $scope.persDisabled = true;
            $scope.reliDisabled = true;
            $scope.sleiDisabled = true;
            $scope.steaDisabled = true;
            $scope.survDisabled = true;
        };
        
        
        $scope.skillForm = { 
            acrobatics: false, 
            animal_handling: false, 
            arcana: false, 
            athletics: false, 
            deception: false, 
            history: false, 
            insight: false, 
            intimidation: false, 
            investigation: false, 
            medicine: false, 
            nature: false, 
            perception: false, 
            persuasion: false, 
            religion: false, 
            sleight_of_hand: false, 
            stealth: false, 
            survival: false, 
            common: false,
            dwarvish: false,
            elvish: false,
            giant: false,
            gnomish: false,
            goblin: false,
            halfling: false,
            orcish: false                 
        }; 
        
        $scope.openSkills = function() {            
            $scope.determineSkillState($scope.characterForm.race, $scope.characterForm.class);
            $scope.skillsDisabled = false; 
            $scope.switchTab(5); 
        };
        
        $scope.determineSkillState = function(race, charClass) {
            //first set all the available skills based on class:
            switch(charClass) {
                case 'BARBARIAN':
                    $scope.classString = "Barbarians choose two skills from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival.";
                    $scope.setAllDisabled();
                    $scope.animDisabled = false;
                    $scope.athlDisabled = false;
                    $scope.intiDisabled = false;
                    $scope.natuDisabled = false;
                    $scope.percDisabled = false;
                    $scope.survDisabled = false;
                    break;
                case 'BARD': 
                    $scope.classString = "Bards choose any three skills";
                    $scope.setAllEnabled();
                    break;
                case 'CLERIC':
                    $scope.classString = "Clerics choose two skills from History, Insight, Medicine, Persuasion, and Religion.";
                    $scope.setAllDisabled();
                    $scope.histDisabled = false;
                    $scope.insiDisabled = false;
                    $scope.mediDisabled = false;
                    $scope.persDisabled = false;
                    $scope.reliDisabled = false;
                    break;
                case 'DRUID':
                    $scope.classString = "Druids choose two skills from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival.";
                    $scope.setAllDisabled();
                    $scope.arcaDisabled = false;
                    $scope.animDisabled = false;
                    $scope.insiDisabled = false;
                    $scope.mediDisabled = false;
                    $scope.natuDisabled = false;
                    $scope.percDisabled = false;
                    $scope.reliDisabled = false;
                    $scope.survDisabled = false;
                    break;
                case 'FIGHTER':
                    $scope.classString = "Fighters choose two skills from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival.";
                    $scope.setAllDisabled();
                    $scope.acroDisabled = false;
                    $scope.animDisabled = false;
                    $scope.athlDisabled = false;
                    $scope.histDisabled = false;
                    $scope.insiDisabled = false;
                    $scope.intiDisabled = false;
                    $scope.percDisabled = false;
                    $scope.survDisabled = false;
                    break;
                case 'MONK':
                    $scope.classString = "Monks choose two skills from Acrobatics, Athletics, History, Insight, Religion, and Stealth.";
                    $scope.setAllDisabled();
                    $scope.acroDisabled = false;
                    $scope.athlDisabled = false;
                    $scope.histDisabled = false;
                    $scope.insiDisabled = false;
                    $scope.reliDisabled = false;
                    $scope.steaDisabled = false;
                    break;
                case 'PALADIN':
                    $scope.classString = "Paladins choose two skills from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion.";
                    $scope.setAllDisabled();
                    $scope.athlDisabled = false;
                    $scope.insiDisabled = false;
                    $scope.intiDisabled = false;
                    $scope.mediDisabled = false;
                    $scope.persDisabled = false;
                    $scope.reliDisabled = false;
                    break;
                case 'RANGER':
                    $scope.classString = "Rangers choose three skills from Animal Handling, Athletics, Insight, Investigation, Nature, Preception, and Stealth.";
                    $scope.setAllDisabled();
                    $scope.animDisabled = false;
                    $scope.athlDisabled = false;
                    $scope.insiDisabled = false;
                    $scope.inveDisabled = false;
                    $scope.natuDisabled = false;
                    $scope.percDisabled = false;
                    $scope.steaDisabled = false;
                    break;
                case 'ROGUE':
                    $scope.classString = "Rogues choose four skills from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth.";
                    $scope.setAllDisabled();
                    $scope.acroDisabled = false;
                    $scope.athlDisabled = false; 
                    $scope.deceDisabled = false; 
                    $scope.insiDisabled = false;
                    $scope.intiDisabled = false;
                    $scope.inveDisabled = false;
                    $scope.percDisabled = false; 
                    $scope.perfDisabled = false;
                    $scope.persDisabled = false;
                    $scope.sleiDisabled = false;
                    $scope.steaDisabled = false;
                    break;
                case 'SORCERER':
                    $scope.classString = "Sorcerers choose two skills from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion.";
                    $scope.setAllDisabled();
                    $scope.arcaDisabled = false;
                    $scope.deceDisabled = false;
                    $scope.insiDisabled = false;
                    $scope.intiDisabled = false;
                    $scope.persDisabled = false;
                    $scope.reliDisabled - false;
                    break;                
                case 'WARLOCK':
                    $scope.classString = "Warlocks choose two skills from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion.";
                    $scope.setAllDisabled();
                    $scope.arcaDisabled = false;
                    $scope.deceDisabled = false;
                    $scope.histDisabled = false;
                    $scope.intiDisabled = false;
                    $scope.inveDisabled = false;
                    $scope.natuDisabled = false;
                    $scope.reliDisabled - false;
                    break;                
                case 'WIZARD':
                    $scope.classString = "Wizards choose two skills from Arcana, History, Insight, Investigation, Medicine, and Religion.";
                    $scope.setAllDisabled();
                    $scope.arcaDisabled = false;
                    $scope.histDisabled = false;
                    $scope.insiDisabled = false;
                    $scope.inveDisabled = false; 
                    $scope.mediDisabled = false;
                    $scope.reliDisabled = false;
                    break;
            }
            
            //next set all the available languages based on race:
            switch(race) {
                case 'DWARF':
                case 'HILL DWARF':
                    $scope.raceString = "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.";
                    $scope.setLangDisabled();
                    $scope.skillForm.common = true;
                    $scope.skillForm.dwarvish = true;
                    $scope.languageCount = 2;
                    break;
                case 'ELF': 
                    $scope.raceString = "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.";
                    $scope.setLangDisabled();
                    $scope.skillForm.common = true;
                    $scope.skillForm.elvish = true;
                    $scope.languageCount = 2;
                    break;
                case 'HIGH ELF':
                    $scope.raceString = "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires. As a High Elf, you can speak one extra language of your choice."; 
                    $scope.setLangEnabled();
                    $scope.skillForm.common = true;
                    $scope.skillForm.elvish = true;
                    $scope.commonDisabled = true;
                    $scope.elvishDisabled = true;
                    $scope.languageCount = 3;
                    break;
                case 'HALFLING':
                case 'LIGHTFOOT':
                    $scope.raceString = "You can speak, read, and write Common and Halfling. The Halfling language isn’t secret, but halflings are loath to share it with others. They write very little, so they don’t have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling.";
                    $scope.setLangDisabled();
                    $scope.skillForm.common = true;
                    $scope.skillForm.halfling = true;
                    $scope.languageCount = 2;
                    break;
                case 'HUMAN':
                    $scope.raceString = "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.";
                    $scope.setLangEnabled();
                    $scope.skillForm.common = true;
                    $scope.commonDisabled = true;
                    $scope.languageCount = 2;
                    break;
                case 'GNOME':
                case 'ROCK GNOME':
                    $scope.raceString = "You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.";
                    $scope.setLangDisabled();
                    $scope.commonSelected = true;
                    $scope.gnomishSelected = true;
                    $scope.languageCount = 2;
                    break;
                case 'HALF ELF':
                    $scope.raceString = "You can speak, read, and write Common, Elvish, and one extra language of your choice.";
                    $scope.setLangEnabled();
                    $scope.skillForm.common = true;
                    $scope.skillForm.elvish = true;
                    $scope.commonDisabled = true;
                    $scope.elvishDisabled = true;
                    $scope.languageCount = 3;
                    break;
                case 'HALF ORC':
                    $scope.classString = "You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.";
                    $scope.setLangDisabled();
                    $scope.skillForm.common = true;
                    $scope.skillForm.orcish = true;
                    $scope.languageCount = 2;
                    break;
            }
        };
        
        $scope.getSkillCount = function() {
            var count = 0;
            if($scope.skillForm.acrobatics == true) count++;
            if($scope.skillForm.animal_handling == true) count++;
            if($scope.skillForm.arcana == true) count++;
            if($scope.skillForm.athletics == true) count++;
            if($scope.skillForm.deception == true) count++;
            if($scope.skillForm.history == true) count++;
            if($scope.skillForm.insight == true) count++;
            if($scope.skillForm.intimidation == true) count++;
            if($scope.skillForm.investigation== true) count++;
            if($scope.skillForm.medicine == true) count++;
            if($scope.skillForm.nature == true) count++;
            if($scope.skillForm.perception == true) count++;
            if($scope.skillForm.persuasion == true) count++;
            if($scope.skillForm.religion == true) count++;
            if($scope.skillForm.sleight_of_hand == true) count++;
            if($scope.skillForm.stealth == true) count++;
            if($scope.skillForm.survival == true) count++;
            return count;
        };
        
        $scope.openInfo = function(skill) {
            console.log('Attempting to open dialog for ' + skill);
            if(skill == 'ACRO') 
                ngDialog.open({ template: 'views/templates/acrobatics.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'ANIM')
                ngDialog.open({ template: 'views/templates/animalhandling.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'ARCA')
                ngDialog.open({ template: 'views/templates/arcana.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'ATHL')
                ngDialog.open({ template: 'views/templates/athletics.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'DECE')
                ngDialog.open({ template: 'views/templates/deception.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'HIST')
                ngDialog.open({ template: 'views/templates/history.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'INSI')
                ngDialog.open({ template: 'views/templates/insight.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'INTI')
                ngDialog.open({ template: 'views/templates/intimidation.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'INVE')
                ngDialog.open({ template: 'views/templates/investigation.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'MEDI')
                ngDialog.open({ template: 'views/templates/medicine.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'NATU')
                ngDialog.open({ template: 'views/templates/nature.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'PERC')
                ngDialog.open({ template: 'views/templates/perception.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'PERF')
                ngDialog.open({ template: 'views/templates/performance.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'PERS')
                ngDialog.open({ template: 'views/templates/persuasion.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'RELI')
                ngDialog.open({ template: 'views/templates/religion.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'SLEI')
                ngDialog.open({ template: 'views/templates/sleightofhand.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'STEA')
                ngDialog.open({ template: 'views/templates/stealth.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
            else if(skill == 'SURV')
                ngDialog.open({ template: 'views/templates/survival.html', scope: $scope, className: 'ngdialog-theme-default custom-width-600', controller:"HomeController" }); 
        };
        
        $scope.saveCurrentSkills = function() {
            $scope.characterForm.acrobatics = $scope.skillForm.acrobatics; 
            $scope.characterForm.animal_handling = $scope.skillForm.animal_handling; 
            $scope.characterForm.arcana = $scope.skillForm.arcana; 
            $scope.characterForm.athletics = $scope.skillForm.athletics; 
            $scope.characterForm.deception = $scope.skillForm.deception;
            $scope.characterForm.history = $scope.skillForm.history;
            $scope.characterForm.insight = $scope.skillForm.insight;
            $scope.characterForm.intimidation = $scope.skillForm.intimidation;
            $scope.characterForm.investigation = $scope.skillForm.investigation; 
            $scope.characterForm.medicine = $scope.skillForm.medicine;
            $scope.characterForm.nature = $scope.skillForm.nature; 
            $scope.characterForm.perception = $scope.skillForm.perception;
            $scope.characterForm.persuasion = $scope.skillForm.persuasion;
            $scope.characterForm.religion = $scope.skillForm.religion;
            $scope.characterForm.sleight_of_hand = $scope.skillForm.sleight_of_hand;
            $scope.characterForm.stealth = $scope.skillForm.stealth; 
            $scope.characterForm.survival = $scope.skillForm.survival;
            $scope.characterForm.common = $scope.skillForm.common;
            $scope.characterForm.dwarvish = $scope.skillForm.dwarvish;
            $scope.characterForm.elvish = $scope.skillForm.elvish;
            $scope.characterForm.giant = $scope.skillForm.giant;
            $scope.characterForm.gnomish = $scope.skillForm.gnomish;
            $scope.characterForm.goblin = $scope.skillForm.goblin;
            $scope.characterForm.halfling = $scope.skillForm.halfling;
            $scope.characterForm.orcish = $scope.skillForm.orcish;
            console.log("current character form contains:");
            console.log($scope.characterForm);
            $scope.openEquipment();
        };
        
        ////////////////////////////////////////////   
        
        //Equipment/////////////////////////////////
        
        
        $scope.openEquipment = function() {            
            $scope.equipDisabled = false; 
            $scope.switchTab(6); 
        };
        
       
     }])
;

