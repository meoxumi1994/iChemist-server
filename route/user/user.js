const express = require('express');
const router = express.Router();
const jwt_express = require('express-jwt');

const User = require('../../model/User')

router.use(
  jwt_express({
    secret: process.env.USER_SECRET_KEY,
    getToken: req => {
      return req.headers["x-findyday-token"];
    }
  })
);

router.get('/', (req, res) => {
  User
    .findById(req.user._id)
    .then(user => {
      if(!user) throw "can't find user"
      res.status(200)
         .json({ status: 'success', data: user })
    })
    .catch(err => {
      res.status(201)
        .json({ err: err })
    })
})

router.put('/', (req, res) => {
    User
        .findById(req.user._id)
        .then(user => {
            if(!user) throw "can't find user"
            const { trace } = req.body
            if(!user.trace) user.trace = {}
            user.trace = {
                ...user.trace,
                ...trace,
            }
            return user.save()
        })
        .then(() => {
            res.status(200)
                .json({ status: 'success' })
        })
        .catch(err => {
          res.status(201)
            .json({ err: err })
        })
})

module.exports = router
