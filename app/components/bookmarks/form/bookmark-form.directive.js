angular.module('bookmarks-module')
    .directive('bookmarkForm', function (bookmarksService, $routeParams, $location) {
        return {
            templateUrl: 'app/components/bookmarks/form/bookmark-form.html',
            link: function ($scope) {
                $scope.bookmarkId = $routeParams.id;
                $scope.bookmark = bookmarksService.get($scope.bookmarkId);

                $scope.saveBookmark = function () {
                    if (angular.isString($scope.bookmark.tags)) {
                        $scope.bookmark.tags = $scope.bookmark.tags.split(',');
                    }

                    if ($scope.bookmarkId) {
                        bookmarksService.update($scope.bookmarkId, $scope.bookmark);
                    } else {
                        bookmarksService.add($scope.bookmark);
                    }

                    $scope.clearForm();
                    $location.path('/');
                };

                $scope.clearForm = function () {
                    $scope.bookmarkId = null;
                    $scope.bookmark = {};
                };
            }
        }
    })
