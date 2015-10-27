var app = angular.module('flapperNews', ['ui.router'])

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                template: '/home.html',
                controller: 'MainCtrl'
            })

            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            })

        $urlRouterProvider.otherwise('home');
    }
]);

app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts){
        $scope.test = 'Hello World!';

        $scope.posts = posts.posts;

        $scope.addPost = function(){
            if(!$scope.title || $scope.title === '') return;
            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [
                    {author: 'Joe', body: 'duh', upvotes: 0},
                    {author: 'Mary Jane', body: 'dayum', upvotes: 0}
                ]
            });
            $scope.title = '';
            $scope.link  = '';
        };

        $scope.incrementUpvotes = function(post){
            post.upvotes += 1;
        };
    }
]);

app.factory('posts', [function(){
    var o = {
        posts: []
    };

    return o;
}]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function(){
            if(!$scope.body === '') return;
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            $scope.body = '';
        };
    }
]);