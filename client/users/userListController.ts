/**
 * Created by sebadmin on 2015-07-10.
 */
/// <reference path="../../typings/tsd.d.ts" />


angular
    .module('users')
    .controller('UserController', [
        'userService', '$mdSidenav', '$mdBottomSheet', '$log',
        UserController
    ]);

/**
 * Main Controller for the Angular Material Starter App
 * @param $scope
 * @param $mdSidenav
 * @param avatarsService
 * @constructor
 */
function UserController( userService, $mdSidenav, $mdBottomSheet, $log, $scope ) {
    var self = this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.share        = share;

    // Load all registered users

    userService
        .loadAllUsers()
        .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
        });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
        $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
        self.selected = angular.isNumber(user) ? $scope.users[user] : user;
        self.toggleList();
    };



    /**
     * Show the bottom sheet
     */
    function share($event) {
        var user = self.selected;

        $mdBottomSheet.show({
            parent: angular.element(document.getElementById('content')),
            templateUrl: 'client/users/view/contactSheet.ng.html',
            controller: [ '$mdBottomSheet', UserSheetController],
            controllerAs: "vm",
            bindToController : true,
            targetEvent: $event
        }).then(function(clickedItem) {
            $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function UserSheetController( $mdBottomSheet ) {
            this.user = user;
            this.items = [
                { name: 'Phone'       , icon: 'phone'       , icon_url: './svg/phone.svg'},
                { name: 'Twitter'     , icon: 'twitter'     , icon_url: './svg/twitter.svg'},
                { name: 'Google+'     , icon: 'google_plus' , icon_url: './svg/google_plus.svg'},
                { name: 'Hangout'     , icon: 'hangouts'    , icon_url: './svg/hangouts.svg'}
            ];
            this.performAction = function(action) {
                $mdBottomSheet.hide(action);
            };
        }
    }

}