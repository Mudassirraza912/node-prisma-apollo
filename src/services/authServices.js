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
    },
  
  async changePassword (data) {
      const userExist = await prisma.user.findUnique({
          where: {id: data.id}
      })
      console.log("data", data)

      if (!userExist) return createError('404', 'User Not Found!')
      
      const checkPassword = bcrypt.compareSync(data.currentPassword, userExist.password)
      if (!checkPassword) return createError('401', 'Current Password is incorrect')
      const newPassword = bcrypt.hashSync(data.newPassword, 8)
      
      try {
        const responseData = await prisma.user.update({
          where: {
            id: data.id
          },
          data: {
            password: newPassword
          }
        })
        return responseData
      } catch (error) {
        return createError(401, error)
      }
  },

  async deleteUser (data) {
    const userExist = await prisma.user.findUnique({
        where: {id: data.id}
    })

    if (!userExist) return createError('404', 'User Not Found!')
    
    try {
      const responseData = await prisma.user.delete({
        where: {
          id: data.id
        },
      })

      const users = await prisma.user.findMany()
      return users
    } catch (error) {
      return createError(401, error)
    }
}
}

module.exports = AuthServices