angular.module('bookmarks-module')
    .directive('bookmarksTags', function (bookmarksService, pubsubService) {
        return {
            templateUrl: 'app/components/bookmarks/tags/bookmarks-tags.html',
            link: function ($scope) {
                $scope.tags = bookmarksService.tags;
                pubsubService.subscribe('updated', function () {
                    $scope.tags = bookmarksService.tags;
                });
            }
        }
    })
