const app = angular.module('app', [
  'ui.router'
]);

app.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'LoginController as login',
      templateUrl: 'app/login/login.html'
    })
    .state('register', {
      url: '/register',
      controller: 'RegisterController as register',
      templateUrl: 'app/register/register.html'
    })
    .state('polls', {
      url: '/polls',
      controller: 'PollsController as polls',
      templateUrl: 'app/polls/polls.html'
    })
    .state('poll', {
      url: '/poll/:id',
      controller: 'PollController as poll',
      templateUrl: '/app/poll/poll.html'
    })
    .state('create', {
      url: '/create',
      controller: 'CreateController as create',
      templateUrl: '/app/create/create.html'
    });

  $urlRouterProvider.otherwise('/login');
});
