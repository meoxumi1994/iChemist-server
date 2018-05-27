const express = require('express');
const router = express.Router();
const jwt_express = require('express-jwt');

const Equation = require('../../model/Equation')

router.get('/', (req, res) => {
    console.log("get success")
    res.status(200).json({ status: "success" });
})

router.post('/400_100', (req, res) => {
    return Promise.resolve()
        .then(() => {
            const { img } = req.body
            if(!img || img.length != 40000)
                throw "missing array img or number of element in array not equal 40000"
            return Equation.create({
                img_400_100_grey: img
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
