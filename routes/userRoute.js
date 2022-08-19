const express = require('express')
const userRouter = express.Router()
const UserController = require('../controller/UserController')
const { check } = require('express-validator');
const UserModel = require('../models').User
const validationMiddleware = require('../middleware/ValidationMiddleware')




userRouter.get('/', UserController.getAllUser )
userRouter.get('/:id', UserController.getUserByPk )
userRouter.get('/email/:email', UserController.getUserByEmail )
userRouter.put(
    '/:id/update',
    check('name')
    .isLength({ min: 3 })
    .withMessage('the name must be at least 3 chars long'),
    check('email').isEmail().withMessage('please fill your email').custom((value, {req})=> {
        return UserModel.findOne({ where: { email: value } }).then(user => {
            if (user) {
                if (req.params.id != user.id){
                    return Promise.reject('E-mail already in use');
                }
            }
        });
    }),
    check('status').isIn(['active', 'inactive']).withMessage('status must be active or inactive'),

    validationMiddleware,    
    UserController.updateUser 
)
userRouter.delete('/:id/delete', UserController.deleteUser )
userRouter.delete('/delete', UserController.multiDeleteUser )

module.exports = userRouter