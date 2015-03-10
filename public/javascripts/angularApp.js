var app = angular.module('flapperNews', ['ui.router']);

app.controller('MainCtrl', ['$scope', 'posts', function ($scope, posts){
	$scope.test = 'Hello World!';
	$scope.posts = posts.posts;

	$scope.addPost = function(){
		if(!$scope.title || $scope.title === '') { return; }
		posts.create({
			title: $scope.title, 
			link: $scope.link,
		});
		$scope.title = '';
		$scope.link = '';
	};

	$scope.incrementUpvotes = function(post){
		post.upvotes++;
	};
}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function ($scope, $stateParams, posts){
	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function(){
		if ($scope.body === '') { return; }
		$scope.post.comments.push({
			author: 'user',
			body: $scope.body,
			upvotes: 0
		});
		$scope.body = '';
	}
}]);

app.factory('posts', ['$http', function($http){
	var o = {
		posts: []
	};

	o.getAll = function() {
		return $http.get('/posts').success(function(data){
			angular.copy(data, o.posts);
		});
	};

	o.create = function(newPost) {
		return $http.post('/posts', newPost).success(function(data){
			o.posts.push(data);
		});
	};

	return o;
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    })
    .state('secret', {
      url: '/secret',
      templateUrl: '/secret.html'
    })
}]);