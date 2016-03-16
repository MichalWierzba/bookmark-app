angular.module('bookmarks-module')
    .service('bookmarksService', function ($window) {
        var that = this;

        this._storage = $window.localStorage;

        this.bookmarks = angular.fromJson(this._storage.getItem('bookmarks')) || [{
                url: 'http://test.pl',
                title: 'Test bookmark',
                tags: ['abc', 'other', 'tag']
            }, {
                url: 'http://wp.pl',
                title: 'Book Mark',
                tags: ['other', 'tag', 'what']
            }];

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

        this.get = function (id) {
            return this.bookmarks[id];
        };

        this.add = function (bookmark) {
            this.bookmarks.push(bookmark);
            this.refreshTags();
            this.publish('updated');
        };

        this.update = function (id, bookmark) {
            this.bookmarks[id] = bookmark;
            this.refreshTags();
            this.publish('updated');
        };

        this.delete = function (bookmark) {
            this.bookmarks.splice(
                this.bookmarks.indexOf(bookmark), 1
            );
            this.refreshTags();
            this.publish('updated');
        };

        this.retrieveTagsFromBookmarks = function () {
            return this.bookmarks.reduce(function (bookmark1, bookmark2) {
                return bookmark1.concat(bookmark2.tags);
            }, []).reduce(function (countMap, word) {
                countMap[word] = ++countMap[word] || 1;
                return countMap
            }, {});
        };

        this.refreshTags = function () {
            this.tags = this.retrieveTagsFromBookmarks();
        };

        this.tags = this.retrieveTagsFromBookmarks();

        this.subscribe('updated', function () {
            // store bookmarks in localStorage
            that._storage.setItem('bookmarks', angular.toJson(that.bookmarks));
        });
    })
