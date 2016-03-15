angular.module('bookmarks-module')
    .directive('bookmarksList', function (bookmarksService, $routeParams) {
        return {
            templateUrl: 'app/components/bookmarks/list/bookmarks-list.html',
            link: function ($scope) {
                $scope.activeFilter = $routeParams.tag || '';
                $scope.tags = bookmarksService.tags;
                $scope.bookmarks = bookmarksService.bookmarks;

                $scope.deleteBookmark = function (bookmark) {
                    bookmarksService.delete(bookmark);
                    $scope.tags = bookmarksService.retrieveTagsFromBookmarks();
                };
            }
        }
    })
