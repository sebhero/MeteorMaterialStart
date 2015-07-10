/**
 * Created by sebadmin on 2015-07-10.
 */

/// <reference path="../../typings/tsd.d.ts" />
var app = angular.module('staterApp', ['angular-meteor', 'ngMaterial', 'ngMdIcons', 'ngAnimate','users']);

app.config(function($mdThemingProvider,$mdIconProvider){
    $mdIconProvider
        .defaultIconSet("./svg/avatars.svg",128)
        .icon("menu", "./svg/menu.svg", 24)
        .icon("share", "./svg/share.svg", 24)
        .icon("google_plus", "./svg/google_plus.svg" , 512)
        .icon("hangouts"   , "./svg/hangouts.svg"    , 512)
        .icon("twitter"    , "./svg/twitter.svg"     , 512)
        .icon("phone"      , "./svg/phone.svg"       , 512);

    $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('red');

});

function onReady() {
    angular.bootstrap(document, ['staterApp']);
}