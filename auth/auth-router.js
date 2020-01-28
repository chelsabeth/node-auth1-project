const router = require("express").Router();

const Users = require("../users/user-model.js");

const bc = require("bcryptjs");

router.post("/register", (req, res) => {
  let user = req.body;

  let hash = bc.hashSync(req.body.password, 8);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/users", (req, res) => {

  Users.find()
    .then(user => {
      if () {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    });
});

module.exports = router;
