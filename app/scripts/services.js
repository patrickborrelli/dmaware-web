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
                             
    .service('authService', ['$http', 'baseURL', 'ngDialog', '$state', 'userService', function($http, baseURL, ngDialog, $state, userService) {
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

    .service('classService', ['$http', '$rootScope', '$state', '$q', 'baseURL', 'ngDialog', function($http, $rootScope, $state, $q, baseURL, ngDialog) {
        
        var currentClass;
        
        this.getCurrentClass = function() {
            return currentClass;
        };
        
        var setCurrentClass = function(myClass) {
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

;
