const bcrypt = require('bcrypt');
const UserModel = require('../models').User
const { validationResult } = require('express-validator');


const register = async (req, res) =>{

   
    const payload = req.body

    try {
        payload.password = await bcrypt.hashSync(payload.password, 10)

        const user = await UserModel.create(payload)
        return res.status(201).json({
                status: 'success',
                message: 'Registrasi succesfuly!!',
                data: payload
            })
        // console.log(user)
        // if(!user) return res.json({
        //     message: user
        // })

        
    } catch (error) {
        console.log(error)
    }
    
    // res.send(payload.password)
    // res.send('oke');
    res.sendStatus(422)
}

module.exports = { register };