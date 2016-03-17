angular.module('bookmarks-module').directive('bookmarksTags', function (bookmarksService) {
    return {
        templateUrl: 'app/components/bookmarks/tags/bookmarks-tags.html',
        link: function ($scope) {
            $scope.tags = bookmarksService.tags;
        }
    }
})
