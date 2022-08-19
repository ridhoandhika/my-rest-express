const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')
const { check, validationResult } = require('express-validator');
const UserModel = require('../models').User
const validationMiddleware = require('../middleware/ValidationMiddleware')
const paginationMiddleware = require('../middleware/PaginationMiddleware')
const userRouter = require('./userRoute')

router.get('/', (req, res) => {
    res.send('oke')
})

router.post(
    '/register',
    check('name')
        .isLength({ min: 3 })
        .withMessage('the name must be at least 5 chars long'),
    check('email').custom(value => {
        return UserModel.findOne({ where: { email: value } }).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('password')
        .isLength({ min: 8 })
        .withMessage('must be at least 5 chars long'),
    check('passwordConfimation').custom((value, { req }) => {
        if (value !== req.body.password) return Promise.reject('Please check the password confirmation');
        return true
    }),
    validationMiddleware,
    AuthController.register)

router.post('/login', (req, res) => {
    res.send('oke')
})
router.use(paginationMiddleware);
router.use('/user',userRouter)

module.exports = router