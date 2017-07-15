app.controller('PollController', PollController);

function PollController (DataService, AuthService, $state) {
  this.poll = {};

  this.$onInit = () => {
    DataService.GET(`/polls/get?id=${$state.params.id}`).then((res) => {
        this.poll = res.data.poll;
      });
  };

  this.vote = (option) => {
    if(this.poll.email === AuthService.email) {
      // We do not allow a user to vote for his own poll
      alert('You are not allowed to vote for your own poll!');
      return;
    }

    DataService.POST('/polls/vote', {
      id: this.poll.id,
      option: option
    })
      .then((res) => {
        this.poll.options['option_' + option].votes = res.data.voteCount;
      });
  };
}
