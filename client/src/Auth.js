import axios from 'axios';

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(data) {
    return axios
      .post('/user/login', data)
      .then(res => {
        localStorage.setItem('TimeDetoxToken', res.data.token);

        this.authenticated = true;
        return localStorage.getItem('TimeDetoxToken');
      })
      .catch(err => console.log(err));
  }

  signup(data) {
    return axios
      .post('/user/signup', data)
      .then(res => {
        localStorage.setItem('TimeDetoxToken', res.data.token);
        this.authenticated = true;
        return localStorage.getItem('TimeDetoxToken');
      })
      .catch(err => console.log(err));
  }

  getJWT() {
    if (this.authenticated) {
      return localStorage.getItem('TimeDetoxToken');
    }
    console.log('getJWT() failed');
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
