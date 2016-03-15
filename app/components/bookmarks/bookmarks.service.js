angular.module('bookmarks-module')
    .service('bookmarksService', function () {
        this.bookmarks = [{
            url: 'http://test.pl',
            title: 'Test bookmark',
            tags: ['abc', 'other', 'tag']
        }, {
            url: 'http://wp.pl',
            title: 'Book Mark',
            tags: ['other', 'tag', 'what']
        }];

        this.get = function (id) {
            return this.bookmarks[id];
        };

        this.add = function (bookmark) {
            this.bookmarks.push(bookmark);
            this.refreshTags();
        };

        this.update = function (id, bookmark) {
            this.bookmarks[id] = bookmark;
            this.refreshTags();
        };

        this.delete = function (bookmark) {
            this.bookmarks.splice(
                this.bookmarks.indexOf(bookmark), 1
            );
            this.refreshTags();
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
    })
