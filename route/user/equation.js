const express = require('express');
const router = express.Router();
const jwt_express = require('express-jwt');

const Equation = require('../../model/Equation')

router.use(
  jwt_express({
    secret: process.env.USER_SECRET_KEY,
    getToken: req => {
        console.log("req", req.headers["x-findyday-token"])
      return req.headers["x-findyday-token"];
    }
  })
);

router.post('/800_200', (req, res) => {
    return Promise.resolve()
        .then(() => {
            const { img } = req.body
            console.log(req.user)
            if(!img)
                throw "missing array img"
            return Equation.create({
                img_800_200_grey: img,
                create_id: req.user._id
            });
        })
        .then(() => {
            res.status(200).json({ status: "success" });
        })
        .catch(err => {
            console.error(err);
            res.status(201).json({ err: err });
        });

})

module.exports = router
