app.service('AuthService', AuthService);

function AuthService (DataService) {
  this.email = null;
  this.fullname = null;

  this.login = (email, password) => {
    return DataService.POST('/users/login', {
      email: email,
      password: password
    }).then((res) => {
      // That's how we set the logged in user
      this.email = res.data.email;
      this.fullname = res.data.fullname;
    });
  };

  this.register = (userData) => {
    return DataService.POST('/users/register', userData);
  };
}
