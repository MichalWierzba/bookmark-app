/**
 * LocalStorage wrapper that json/de-json stored values;
 * TODO wrap other methods if needed
 */
angular.module('bookmarks-module')
    .service('localStorageService', function ($window) {
        this._storage = $window.localStorage;

        this.setItem = function (key, value) {
            this._storage.setItem(key, angular.toJson(value));
        };

        this.getItem = function (key) {
            return angular.fromJson(this._storage.getItem(key));
        };
    })
