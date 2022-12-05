var UsersModel = require("../models/users");

/**
 * usersController.js
 *
 * @description :: Server-side logic for managing userss.
 */
module.exports = {
  /**
   * usersController.list()
   */
  list: function (req, res) {
    UsersModel.find(function (err, userss) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting users.",
          error: err,
        });
      }

      return res.json(userss);
    });
  },

  /**
   * usersController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    UsersModel.findOne({ _id: id }, function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting users.",
          error: err,
        });
      }

      if (!users) {
        return res.status(404).json({
          message: "No such users",
        });
      }

      return res.json(users);
    });
  },

  /**
   * usersController.create()
   */
  create: function (req, res) {
    var users = new UsersModel({
      name: req.body.name,
      dob: req.body.dob,
      birthcountry: req.body.birthcountry,
      language: req.body.language,
      phone: req.body.phone,
    });

    users.save(function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating users",
          error: err,
        });
      }

      return res.status(201).json(users);
    });
  },

  /**
   * usersController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    UsersModel.findOne({ _id: id }, function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting users",
          error: err,
        });
      }

      if (!users) {
        return res.status(404).json({
          message: "No such users",
        });
      }

      users.name = req.body.name ? req.body.name : users.name;
      users.dob = req.body.dob ? req.body.dob : users.dob;
      users.birthcountry = req.body.birthcountry
        ? req.body.birthcountry
        : users.birthcountry;
      users.language = req.body.language ? req.body.language : users.language;
      users.phone = req.body.phone ? req.body.phone : users.phone;

      users.save(function (err, users) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating users.",
            error: err,
          });
        }

        return res.json(users);
      });
    });
  },

  /**
   * usersController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    UsersModel.findByIdAndRemove(id, function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the users.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
