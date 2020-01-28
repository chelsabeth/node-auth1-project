const router = require("express").Router();

const Users = require("../users/user-model.js");

const bc = require("bcryptjs");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  let user = req.body;
  let hash = bc.hashSync(user.password, 10);
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
    // .first()
    .then(user => {
      console.log(user)
      if (user && bc.compareSync(password, user.password)) {
        req.session.loggedIn = true; // used in restricted middleware
        req.session.userId = user.id; // in case we need the user id later

        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// router.get("/users", (req, res) => {
//   const username = req.headers.username // headers is similar to local storage
//   // If front end set it to not look for username in the header, this would not work
//   console.log(username);

//   Users.find()
//     .then(user => {
//       if (username) {
//         res.status(200).json(user);
//       } else {
//         res.status(401).json({ message: "You shall not pass!" });
//       }
//     });
// });

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({
          sorry: "can't log you out!"
        });
      } else {
        res.status(200).json({ bye: "have a nice day!" });
      }
    });
  } else {
    res.status(204);
  }
});

module.exports = router;
