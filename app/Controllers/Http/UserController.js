'use strict'

const User = require("./../../Models/User");

class UserController {
  async signup({ request }) {
    const data = request.only(['name', 'email', 'password'])

    try {
      const user = await User.create(data);
      return user;
    } catch(error) {
      return error;
    }
  
  }

  async login({ request, auth }) {
    const { email, password } = request.all();
    const user = await auth.attempt(email, password)
    console.log(user)
    return user;
  }
}

module.exports = UserController
