const { prisma } = require("../database.js");


const Mutation = {
    // signUp: async (args, req) => {
    //     try {
    //       isEmail = validator.isEmail(req.email);
    //       if (!isEmail) {
    //         return {
    //           success: false,
    //           error_message: "Email is not valid.",
    //         };
    //       }
    //       const existingUser = await User.findOne({ email: req.email });
    //       if (existingUser) {
    //         return {
    //           success: false,
    //           error_message: "Email already exists, Try another one.",
    //         };
    //       }
    //       const hashPass = await bcrypt.hash(req.password, 10);
    //       const role = ["USER"];
    //       const user = new User({
    //         _id: new mongoose.Types.ObjectId(),
    //         email: req.email,
    //         password: hashPass,
    //         role,
    //         firstName: req.firstName,
    //         lastName: req.lastName,
    //         phone: req.phone,
    //       });
    //       await user.save();
    //       const token = jwt.sign(
    //         { userId: user.id, email: user.email },
    //         process.env.SECRET_KEY,
    //         {
    //           expiresIn: "365d",
    //         }
    //       );
  
    //       return {
    //         success: true,
    //         userId: user._id,
    //         token,
    //       };
    //     } catch (error) {
    //       throw error;
    //     }
    //   },


    
  };

  module.exports = {
    Mutation,
  }

