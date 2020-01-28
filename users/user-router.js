const router = require('express').Router();

const Users = require('./user-model.js');

// for endpoints beginning with /api/users
router.get("/", (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;