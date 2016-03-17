angular.module('gdansk-training', [
    'ngRoute',
    'ngStorage',
    'gt.components.hello-world',
    'bookmarks-module',
    'gdanskTraining.templates',
    'gdanskTraining-constant',
    'package-version'
]).run(function ($log, gdanskTrainingVersion) {
    if (!gdanskTrainingVersion) {
        return;
    }
    $log.info('app version: ' + gdanskTrainingVersion);
}).directive('gdanskTraining', function () {
    return {templateUrl: 'app/app.module.html'};
}).config(function ($routeProvider) {
    $routeProvider.when('/list/:tag?', {
        template: '<bookmarks-list></bookmarks-list>'
    }).when('/edit/:id?', {
        template: '<bookmark-form></bookmark-form>'
    }).otherwise({
        redirectTo: '/list'
    })
    ;
});

angular.module('gdanskTraining.templates', []);

try {
    angular.module('gdanskTraining-constant');
} catch (error) {
    angular.module('gdanskTraining-constant', []).constant('gdanskTrainingVersion', null);
}
