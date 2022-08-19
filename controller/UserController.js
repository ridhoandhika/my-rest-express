const UserModel = require('../models').User
const { validationResult } = require('express-validator');



const getAllUser = async (req, res) => {

    const page = req.query.page
    const pageSize = req.query.pageSize
    const name = req.query.name

    const user = await UserModel.findAll({
        where: {
            name: name
        },
        attributes: ['name', 'email'],
        limit: pageSize,
        offset: page,
        order: [['name', 'ASC']]
    });
    if (user.length === 0) return res.status(404).json({
        status: 'false',
        message: 'Data is not found!'
    })

    return res.status(200).json({
        status: 'success',
        message: 'Registrasi succesfuly!!',
        data: user
    })
}

const getUserByPk = async (req, res) => {

    let id = req.params.id
    
    
    const user = await UserModel.findByPk(id)
    if (!user) return res.status(404).json({
        status: 'false',
        message: 'Data is not found!'
    })

    return res.status(200).json({
        status: 'success',
        message: 'Registrasi succesfuly!!',
        data: user
    })
}

const getUserByEmail = async (req, res) => {

    let email = req.params.email

    const user = await UserModel.findOne({
        attributes: ['name', 'email','status'],
        where: {
            email: email
        }
    })
    if (!user) return res.status(404).json({
        status: 'false',
        message: 'Data is not found!'
    })

    return res.status(200).json({
        status: 'success',
        message: 'Registrasi succesfuly!!',
        data: user
    })
}
const updateUser = async (req, res) => {
    const payload = req.body
    const {id} = req.params
    let {name, email, status} = req.body

    const updateUser = await UserModel.update(payload, {
        where: {
            id: id
        }
    })

    if (updateUser[0] === 0) return res.status(404).json({
        status: 'false',
        message: `Data isn't found!`
    })

    return res.status(201).json({
        status: 'success',
        message: 'data has been updated!!'
    })
}

const deleteUser = async (req, res) => {
    // const payload = req.body
    const {id} = req.params
    // let {name, email, status} = req.body

    const deleteUser = await UserModel.destroy({
        where: {
            id: id
        }
    })
    // console.log(deleteUser)
    if (!deleteUser) return res.status(404).json({
        status: 'false',
        message: `Data is not found!`
    })

    return res.status(201).json({
        status: 'success',
        message: 'data has been deleted!!'
    })
}
const multiDeleteUser = async (req, res) => {
    let { id } = req.body;
    
  
    const deleteUser = await UserModel.destroy({
        where: {
            id: id
        }
    })
    if (!deleteUser) return res.status(404).json({
        status: 'false',
        message: `Data is not found!`
    })

    return res.status(201).json({
        status: 'success',
        message: 'data has been deleted!!'
    })
}

module.exports = { getAllUser,  getUserByPk, getUserByEmail, updateUser, deleteUser, multiDeleteUser }