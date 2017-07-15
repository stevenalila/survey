app.controller('LoginController', LoginController);

function LoginController (AuthService, $state) {
  this.$onInit = () => {
    AuthService.email = null;
    this.email = '';
    this.password = '';
    this.errors = [];
  };

  this.submit = () => {
    AuthService.login(this.email, this.password)
      .then(() => {
        console.log('Login successful');
        $state.go('polls');
      }).catch((err) => {
      console.log('Login failed');
      this.errors = err.data.errors;
      // TODO: display errors
    });
  };

  this.goToRegister = () => {
    $state.go('register');
  };
}
