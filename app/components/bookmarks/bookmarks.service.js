angular.module('bookmarks-module').service('bookmarksService', function ($localStorage) {
    var that = this;

    this.$storage = $localStorage;

    if (!this.$storage.bookmarks) {
        this.$storage.bookmarks = [{
            url: 'http://test.pl',
            title: 'Test bookmark',
            tags: ['abc', 'other', 'tag']
        }, {
            url: 'http://wp.pl',
            title: 'Book Mark',
            tags: ['other', 'tag', 'what']
        }];
    }

    this.bookmarks = this.$storage.bookmarks;

    this.get = function (id) {
        return this.bookmarks[id];
    };

    this.add = function (bookmark) {
        this.bookmarks.push(bookmark);
        this.onUpdate();
    };

    this.update = function (id, bookmark) {
        this.bookmarks[id] = bookmark;
        this.onUpdate();
    };

    this.delete = function (bookmark) {
        this.bookmarks.splice(
            this.bookmarks.indexOf(bookmark), 1
        );
        this.onUpdate();
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
        var that = this;
        // remove object properties to keep object's reference
        Object.keys(this.tags).forEach(function (key) {
            delete that.tags[key];
        });
        angular.extend(this.tags, this.retrieveTagsFromBookmarks());
    };

    this.tags = this.retrieveTagsFromBookmarks();

    this.onUpdate = function () {
        that.refreshTags();
    }
})
