'use strict'

const User = require("./../../Models/User");

class UserController {
  async signup({ request }) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data);
    return user;
    
  
  }

  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password)
    const user = await User.query().where('email', email).fetch()
    return user;
  }
}

module.exports = UserController
