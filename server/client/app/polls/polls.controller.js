app.controller('PollsController', PollsController);

function PollsController(DataService, AuthService, $state) {
  this.polls = [];
  this.email = AuthService.email;
  this.search = '';

  this.$onInit = () => {
    // Load polls from databse
    DataService.GET('/polls/all')
      .then((res) => {
        this.polls = res.data.results;
      });
  };

  this.goToPoll = (id) => {
    $state.go('poll', { id: id });
  };

  this.removePoll = (id, pollIndex) => {
    DataService.POST('/polls/remove', {
      id: id
    }).then(() => {
      this.polls.splice(pollIndex, 1);
    });
  };

  this.searchFilter = (question) => {
    return question.toLowerCase().includes(this.search);
  };
}
