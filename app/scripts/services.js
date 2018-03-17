'use strict';

angular.module('dm-app')
    //.constant("baseURL","https://matchaware-rest.herokuapp.com/")
    .constant("baseURL","http://localhost:3000/")

    .service('userService', ['$http', '$rootScope', '$state', 'baseURL', 'ngDialog', function($http, $rootScope, $state, baseURL, ngDialog) {
       
        var currentUser = {};
        var currentUserStale;
            
        var fullname = '';
        
        this.getUserFullname = function() {
            return fullname;
        };
        
        this.getCurrentUserId = function() {
            return currentUser._id;
        };
        
        this.getCurrentUser = function(promise) {
            var response = null;
            console.log("Attempting to get current user...currentUserStale: " + currentUserStale);
            console.log("Current user is: ");
            console.log(currentUser);
            if(currentUserStale) {
                currentUserStale = false;
                return $http({
                   url: baseURL + 'users/'+ currentUser._id,
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json' 
                    }
                });
                
            } else {
                if(promise) {
                    response = $q.when(currentUser);
                } else {
                    response = currentUser;
                }
                return response;
            }            
        };
        
               
        this.setCurrentUser = function(user) {
            currentUser = user;
            console.log("Added new current user:");
            console.log(user);
            currentUserStale = false;
            fullname = user.first_name + " " + user.last_name;
        };
        
        this.setCurrentUserStale = function() {
            console.log("Setting current user stale");
            currentUserStale = true;
            console.log("currentUserStale: " + currentUserStale);
        };        
        
        this.cleanupLoggedOutUser = function() {
            currentUser = {};
            
        };
        
        this.getUserSpells = function(charclass, level) {
            console.log('Using string= ' + baseURL + 'spells?character_class=' + charclass + '&level=' + level);
            return $http({
                url: baseURL + 'spells?character_class=' + charclass + '&level=' + level,
                method: 'GET',
                headers: {
                    'content-type': 'application/json' 
                }
            });
        };
        
        this.getUserCantrips = function(charclass) {
            console.log('Using string= ' + baseURL + 'spells?character_class=' + charclass + '&level=0');
            return $http({
                url: baseURL + 'spells?character_class=' + charclass + '&level=0',
                method: 'GET',
                headers: {
                    'content-type': 'application/json' 
                }
            });
        };
        
      }])
                             
    .service('authService', ['$http', 'baseURL', 'ngDialog', '$state', 'userService', 'coreDataService', function($http, baseURL, ngDialog, $state, userService, coreDataService) {
        var authToken = undefined;
        var isAuthenticated = false;  
        var isAdmin = false;
        
        this.isUserAuthenticated = function() {
            return isAuthenticated;
        };
        
        this.isAdmin = function() {
            return isAdmin;
        };
        
        this.loginOnly = function (loginData) {
            //make http request and return promise:
            return $http({
                url: baseURL + 'users/login',
                method: 'POST',
                headers: {
                    'content-type': 'application/json' 
                },
                data: loginData
            });  
        };
        
        this.login = function(loginData) {
            //make http request:
            $http({
                url: baseURL + 'users/login',
                method: 'POST',
                headers: {
                    'content-type': 'application/json' 
                },
                data: loginData
            }).then(function(response) {
                console.log(response);
                internalSetUserCredentials({username:loginData.username, token: response.data.token, fullname: response.data.fullname, userId: response.data.userId, admin: response.data.admin});                 
                console.log("User " + response.data.fullname + " has been authenticated successfully.");
                
                //retrieve user and store in scope:
                $http({
                    url: baseURL + 'users/' + response.data.userId,
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json' 
                    }
                }).then(function(response) {
                    console.log("Retrieved the user from the API with value: ");
                    console.log(response);
                    console.log("\n\nSETTING CURRENT USER TO: " );
                    console.log(response.data);
                    userService.setCurrentUser(response.data);   
                    coreDataService.populateCoreData();
                });   
                
                $state.go("app.home");
                ngDialog.close();
            }, function(errResponse) {
                isAuthenticated = false;            
                var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  errResponse + '</p><p>' +
                    errResponse + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'

                ngDialog.openConfirm({ template: message, plain: 'true'});
            });
        };        
        
        var internalLogin = this.login;
        
        this.logout = function() {
            //make http request:
            $http({
                url: baseURL + 'users/logout',
                method: 'POST',
                headers: {
                    'content-type': 'application/json' 
                }               
            }).then(function(response) {
                console.log(response);                 
                isAuthenticated = false;
                destroyUserCredentials();
                $state.go("app");
            }, function(errResponse) {           
                var message = '\
                <div class="ngdialog-message">\
                <div><h3>Logout Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'

                ngDialog.openConfirm({ template: message, plain: 'true'});
            });
            
        };
        
        this.registerOnly = function(registerData) {
            //make http request and return promise:
            console.log("Attempting to register user with data:");
            console.log(registerData);
            
            return $http({
                url: baseURL + 'users/register',
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                data: registerData
            });
        };
        
        this.register = function(registerData) {
            //make http request
            console.log(registerData);
            $http({
                url: baseURL + 'users/register',
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                data: registerData
            }).then(function(response) {
                console.log("successfully registered a user.");
                ngDialog.close();
                
                console.log("will attempt to log user in with username: " + registerData.username + " and password: " + registerData.password);
                internalLogin({username:registerData.username, password:registerData.password});
                var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Successful</h3></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm(1)>OK</button>\
                </div>'
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
                
            }, function(response) {
                console.log("failed to registered a user.");
                $scope.showRegLoader = true;
                var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm(1)>OK</button>\
                </div>'
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
            });
        };
        
        this.setUserCredentials = function(credentials) {
            isAuthenticated = true;
            authToken = credentials.token;
            isAdmin = credentials.admin;

            // Set the token as header for your requests!
            $http.defaults.headers.common['x-access-token'] = authToken;
            console.log("user credentials have been set \nisAuthenticated: " + 
                        isAuthenticated + "\nisAdmin: " + isAdmin + "\nusername: " + credentials.username + "\nauthToken: " + 
                        authToken + "\nfullname: " + credentials.fullname + "\nuserId: " + credentials.userId);
        };
        
        var internalSetUserCredentials = this.setUserCredentials;
        
        function destroyUserCredentials() {
            isAuthenticated = false;
            authToken = '';
                        
            userService.cleanupLoggedOutUser();

            // Set the token as header for your requests!
            $http.defaults.headers.common['x-access-token'] = authToken;
            console.log("user credentials have been destroyed.");
        }; 
        
        this.isLoggedIn = function() {
            return isAuthenticated;
        };
    }])

    .service('coreDataService', ['$http', 'baseURL', 'ngDialog', '$state', 'userService', function($http, baseURL, ngDialog, $state, userService) {
        var abilityModifiers = [];
        var proficiencyBonuses = [];
        var skillLookup = [];
        
        this.getAbilityModifiers = function() {
            return abilityModifiers;  
        };
        
        this.getProficiencyBonuses = function() {
            return proficiencyBonuses;
        };
        
        this.getSkillLookup = function() {
            return skillLookup;
        };
        
        this.populateCoreData = function() {
            //retrieve ability modifiers:
            $http({
                url: baseURL + 'ability_score_modifiers/',
                method: 'GET',
                headers: {
                    'content-type': 'application/json' 
                }
            }).then(function(response) {
                console.log("Retrieved the ability score modifiers from the API: ");
                console.log(response.data);
                abilityModifiers = response.data;
            });
            
            //retrieve proficiency bonuses:
            $http({
                url: baseURL + 'proficiency_bonuses/', 
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function(response) {                
                console.log("Retrieved the proficiency bonuses from the API: ");
                console.log(response.data);
                proficiencyBonuses = response.data;
            });
            
            //retrieve skill lookups:
            $http({
                url: baseURL + 'skill_lookups/', 
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function(response) {                
                console.log("Retrieved the proficiency bonuses from the API: ");
                console.log(response.data);
                skillLookup = response.data;
            });
        }
        
    }])                    

    .service('classService', ['$http', '$rootScope', '$state', '$q', 'baseURL', 'ngDialog', function($http, $rootScope, $state, $q, baseURL, ngDialog) {
        
        var currentClass;
        
        this.getCurrentClass = function() {
            return currentClass;
        };
        
        this.setCurrentClass = function(myClass) {
            currentClass = myClass;
        };
        
        this.getCharClassByName = function(name) {
            console.log('Using string= ' + baseURL + 'character_classes?name=' + name);
            return $http({
                url: baseURL + 'character_classes?name=' + name,
                method: 'GET',
                headers: {
                    'content-type': 'application/json' 
                }
            });
        };
    
    }])

    .service('raceService', ['$http', '$rootScope', '$state', '$q', 'baseURL', 'ngDialog', function($http, $rootScope, $state, $q, baseURL, ngDialog) {
        
        var currentRace;
        
        this.getCurrentRace = function() {
            return currentRace;
        };
        
        this.setCurrentRace = function(myRace) {
            currentRace = myRace;
        };
        
        this.getRaceByName = function(name) {
            console.log('Using string= ' + baseURL + 'races?name=' + name);
            return $http({
                url: baseURL + 'races?name=' + name,
                method: 'GET',
                headers: {
                    'content-type': 'application/json' 
                }
            });
        };
    
    }])

    .service('characterService', ['$http', '$rootScope', '$state', '$q', 'baseURL', 'ngDialog', 'raceService', 'classService', 'coreDataService', function($http, $rootScope, $state, $q, baseURL, ngDialog, raceService, classService, coreDataService) {
        
        var currentCharacter;
        
        this.getCurrentChar = function() {
            return currentCharacter;
        };
        
        this.setCurrentChar = function(myChar) {
            currentCharacter = myChar;
        };
        
        this.generateCharacter = function(characterForm) {
            console.log("Building character from form ");
            console.log(characterForm);
            
            var curClass = classService.getCurrentClass();
            var curRace = raceService.getCurrentRace();
            
            //first calculate racial ability bonuses:
            var race = raceService.getCurrentRace();
            characterForm.str += getRacialBonus("STRENGTH", race);
            characterForm.dex += getRacialBonus("DEXTERITY", race);
            characterForm.con += getRacialBonus("CONSTITUTION", race);
            characterForm.wis += getRacialBonus("WISDOM", race);
            characterForm.int += getRacialBonus("INTELLIGENCE", race);
            characterForm.cha += getRacialBonus("CHARISMA", race);
            
            //now determine ability modifiers:
            characterForm.strmod = getModifier(characterForm.str);
            characterForm.dexmod = getModifier(characterForm.dex);
            characterForm.conmod = getModifier(characterForm.con);
            characterForm.wismod = getModifier(characterForm.wis);
            characterForm.intmod = getModifier(characterForm.int);
            characterForm.chamod = getModifier(characterForm.cha);
            
            
            //set proficiency bonus:
            characterForm.probonus = getProfBonus(curClass, 1);
            
            var classSvBonuses = curClass.saving_throw_proficiency;
            
            //set saving throw proficiency and modifiers:
            if(classSvBonuses.includes("Strength")) {
                characterForm.strsvmod = characterForm.strmod + characterForm.probonus;
                characterForm.strsvpro = true;
            } else {
                characterForm.strsvmod = characterForm.strmod;
                characterForm.strsvpro = false;
            }
            
            if(classSvBonuses.includes("Dexterity")) {
                characterForm.dexsvmod = characterForm.dexmod + characterForm.probonus;
                characterForm.dexsvpro = true;
            } else {
                characterForm.dexsvmod = characterForm.dexmod;
                characterForm.dexsvpro = false;
            }
            
            if(classSvBonuses.includes("Constitution")) {
                characterForm.consvmod = characterForm.conmod + characterForm.probonus;
                characterForm.consvpro = true;
            } else {
                characterForm.consvmod = characterForm.conmod;
                characterForm.consvpro = false;
            }
            
            if(classSvBonuses.includes("Wisdom")) {
                characterForm.wissvmod = characterForm.wismod + characterForm.probonus;
                characterForm.wissvpro = true;
            } else {
                characterForm.wissvmod = characterForm.wismod;
                characterForm.wissvpro = false;
            }
            
            if(classSvBonuses.includes("Intelligence")) {
                characterForm.intsvmod = characterForm.intmod + characterForm.probonus;
                characterForm.intsvpro = true;
            } else {
                characterForm.intsvmod = characterForm.intmod;
                characterForm.intsvpro = false;
            }
            
            if(classSvBonuses.includes("Charisma")) {
                characterForm.chasvmod = characterForm.chamod + characterForm.probonus;
                characterForm.chasvpro = true;
            } else {
                characterForm.chasvmod = characterForm.chamod;
                characterForm.chasvpro = false;
            }
                        
            //set hit dice, hit points and max hit points:
            characterForm.hitdietotal = 1;
            characterForm.hitdie = 'd' + curClass.hit_die;
            characterForm.hptemp = 0;
            characterForm.hpcurr = parseInt(curClass.hit_die) + characterForm.conmod;
            characterForm.hpmax = characterForm.hpcurr;
            
            //create inventory:
            characterForm.skillString = generateSkillsString(characterForm);
            
            //create spellbook:
            characterForm.spellbookString = generateSpellbook(characterForm);
            
            console.log("FINISHED");
            console.log(characterForm);           
        };
        
        function generateSkillsString(form) {
            var lookup = coreDataService.getSkillLookup();
            var skillString = '{ "skills": [';   
            
            lookup.forEach(function(skill) {
                var isProficient = hasProficiency(skill.name, form);
                skillString += '{ "name": "' + skill.name + '", "constrolling_ability": "' + 
                    skill.controlling_ability + '", "proficiency":' + isProficient + 
                    ', "bonus": ' + getBonus(skill.controlling_ability, isProficient, form) + '}';
            });
            skillString += ']}';
            return skillString;
        };
        
        function hasProficiency(ability, form) {
            var abilities = form.skills;
            var proficient = false;
            
            for(var i = 0; i < abilities.length; i++) {
                if(abilities[i] === ability) {
                    proficient = true;
                    break;
                }
            }            
            return proficient;
        };
        
        function getBonus(ability, proficient, form) {
            var bonus = 0;
            
            switch(ability) {
                case 'STRENGTH':
                    bonus += form.strmod;
                    if(proficient) bonus += form.probonus;
                    break;
                    
                case 'DEXTERITY':
                    bonus += form.dexmod;
                    if(proficient) bonus += form.probonus;
                    break;
                    
                case 'CONSTITUTION':
                    bonus += form.conmod;
                    if(proficient) bonus += form.probonus;
                    break;
                    
                case 'WISDOM':
                    bonus += form.wismod;
                    if(proficient) bonus += form.probonus;
                    break;
                    
                case 'INTELLIGENCE':
                    bonus += form.intmod;
                    if(proficient) bonus += form.probonus;
                    break;
                    
                case 'CHARISMA':
                    bonus += form.chamod;
                    if(proficient) bonus += form.probonus;
                    break;                    
            }            
            
            return bonus;
        };
            
        function getRacialBonus(ability, race) {
            var bonus = 0;
            var scores = race.ability_score_increase;
            
            for(var i = 0; i < scores.length; i++) {
                if(scores[i].ability == ability) {
                    bonus = scores[i].increase;
                }
            }
            return bonus;
        };
        
        function getModifier(score) {
            var mod = 0;
            var modifiers = coreDataService.getAbilityModifiers();
            
            for(var i = 0; i < modifiers.length; i++) {
                if(modifiers[i].score == score) {
                    mod = modifiers[i].increase;
                    break;
                }
            }
            
            return mod;
        };
        
        function getProfBonus(cls, lvl) {
            var bonuses = coreDataService.getProficiencyBonuses();
            var curClass = classService.getCurrentClass();
            var bonus = 0;
            
            for(var i = 0; i < bonuses.length; i++) {
                if(bonuses[i].char_class == curClass._id && bonuses[i].level == lvl) {
                    bonus = bonuses[i].bonus;
                    break;
                }
            }
            
            return bonus;
        }
        
    
    }])



;
