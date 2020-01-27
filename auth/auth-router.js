const router = require("express").Router();

const Users = require("../users/user-model.js");

const bc = require("bcryptjs");

router.post("/register", (req, res) => {
    let user = req.body;

    let hash = bc.hashSync(req.body.password, 8);

    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved)
    }) 
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;

