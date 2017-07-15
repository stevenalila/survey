app.controller('RegisterController', RegisterController);

function RegisterController (AuthService, $state) {
  this.$onInit = () => {
    this.errors = [];
    this.inputs = {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      password_confirm: '',
      birthday: '',
    };
  };

  this.submit = () => {
    AuthService.register(this.inputs)
      .then(() => {
        console.log('Successful registration!');
        $state.go('login');
      })
      .catch((err) => {
        this.errors = err.data.errors;
      });
  };
}
