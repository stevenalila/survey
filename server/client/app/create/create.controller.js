app.controller('CreateController', CreateController);

function CreateController (AuthService, DataService, $state) {
  this.$onInit = () => {
    this.errors = [];
    this.inputs = {
      email: AuthService.email,
      fullname: AuthService.fullname,
      question: '',
      date: null,
      options: {
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: ''
      }
    };
  };

  this.submit = () => {
    this.inputs.date = new Date().toISOString();

    DataService.POST('/polls/create', this.inputs)
      .then(() => {
        $state.go('polls');
      })
      .catch((err) => {
        this.errors = err.data.errors;
      });
  };
}
