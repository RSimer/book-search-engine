const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers ={
    Query: {
        me: async (parent, args, context) =>{
            if(context.User){
                const userData = await User.findOne({
                    _id: context.user._id
                }).select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('notLoggedIn');
        }
    },
    Mutation:{
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },


        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No profile with this email found!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, user };
          },

         saveBook: async(parent, bookData, context) =>{
             if(context.user){
                 const updatedUser = await User.findOneAndUpdate(
                     {
                         _id: context.user._id
                     },
                     {$push: {savedBooks: bookData}},
                     {new: true}
                 )
                 console.log(updatedUser);
                 return updatedUser;
             }
             throw new AuthenticationError('notLoggedIn');
         },
         
         RemoveBook: async(parent, {bookId}, context) =>{
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {
                        _id: context.user._id
                    },
                    {$pull: {savedBooks: {bookId}}},
                    {new: true}
                )
                console.log(updatedUser);
                return updatedUser;
            }
            throw new AuthenticationError('notLoggedIn');
        } 


    }

}
module.exports = resolvers;