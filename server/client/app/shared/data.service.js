app.service('DataService', DataService);

function DataService ($http) {
  const host = 'http://localhost:3000';
  this.POST = (endpoint, params) => {
    return $http({
      method: 'POST',
      url: `${host}${endpoint}`,
      data: params,
    });
  };

  this.GET = (endpoint, params) => {
    return $http({
      method: 'GET',
      url: `${host}${endpoint}`,
      data: params,
    });
  };
}
