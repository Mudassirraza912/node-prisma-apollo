const { prisma } = require("../database.js");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createError = require('http-errors');
const AuthServices = require("../services/authServices.js");

const Mutation = {
    addUser: async (args, req) => { 
      const response = await AuthServices.createUser(req)     
      return response 
    }
  };

  module.exports = {
    Mutation,
  }

