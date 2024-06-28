const Models = require("../models/index.js");

class AdminSeeders {
  static async createAdmin(req, res) {
    try {
      await Models.User.create({
        username: "Admin",
        password: "Admin1234!",
        role: "admin",
        fullname: "admin",
        phone: "085123456789",
        email: "admin@gmail.com"
      }).then((data) => {
        console.log(`Succsess Insert Data Admin! username : ${data.username}`);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AdminSeeders;
