const { prisma } = require("../database.js");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

const AuthServices = {
    async createUser (data) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
          })
          if(user) return createError(401, 'Email Already exist')
          data.password = bcrypt.hashSync(data.password, 8)
          try {
            const responseData =  await prisma.user.create({
              data: data
            })
            return responseData
          } catch (error) {
            return createError(401, error)
          }
    },

    async loginUser (data) {
        const userExist = await prisma.user.findUnique({
            where: {email: data.email}
        })
        if (!userExist) return createError('404', 'User Not Found!')
        
        const checkPassword = bcrypt.compareSync(data.password, userExist.password)
        if (!checkPassword) return createError('401', 'Email/Password incorrect')
        delete userExist.password
        return {...userExist, status: true, message: 'Signin Successful'}
    }
}

module.exports = AuthServices