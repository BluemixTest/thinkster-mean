var app = angular.module('flapperNews', ['ui.router']);

app.controller('MainCtrl', ['$scope', 'posts', function ($scope, posts){
	$scope.test = 'Hello World!';
	$scope.posts = posts.posts;

	$scope.addPost = function(){
		if(!$scope.title || $scope.title === '') { return; }
		$scope.posts.push({
			title: $scope.title, 
			link: $scope.link,
			upvotes: 0,
			comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 0},
				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
			]
		});
		$scope.title = '';
		$scope.link = '';
	};

	$scope.incrementUpvotes = function(post){
		post.upvotes++;
	};
}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function ($scope, $stateParams, posts){
	
}]);

app.factory('posts', function(){
	var o = {
		posts: []
	};
	return o;
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: './posts.html',
      controller: 'PostsCtrl'
    })
    .state('secret', {
      url: '/secret',
      templateUrl: './secret.html'
    })
}]);