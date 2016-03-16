angular.module('bookmarks-module')
    .service('pubsubService', function () {
        this._subscribers = {};

        this.subscribe = function (topic, callback) {
            if (angular.isUndefined(this._subscribers[topic])) {
                this._subscribers[topic] = [];
            }
            this._subscribers[topic].push(callback);
        };

        this.publish = function (topic) {
            if (angular.isDefined(this._subscribers[topic])) {
                this._subscribers[topic].forEach(function (callback) {
                    callback();
                });
            }
        };
    })
