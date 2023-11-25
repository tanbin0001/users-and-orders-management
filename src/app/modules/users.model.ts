import {
  TAddress,
  TFullName,
  TProduct,
  TUser,
  UserMethod,
  UserModel,
} from './Users/users.interface'
import { Schema, model } from 'mongoose'

import bcrypt from 'bcrypt'
import config from '../config'

// Define Mongoose schema for fullName
const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
}, { _id: false })

// Define Mongoose schema for address
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
}, { _id: false })

const productSchema = new Schema<TProduct>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, { _id: false });

// Define Mongoose schema for user

const userSchema = new Schema<TUser, UserModel, UserMethod>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: { type: String, required: [true, 'Username is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: fullNameSchema,
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: { type: [String], default: [] },
  address: addressSchema,
  orders: {
    type: [productSchema], 
    default: [],
  },
})

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  // hashing pass and saving in db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  user.orders = Array.isArray(user.orders) ? user.orders : [];

  next()
});

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

// Query middleware


userSchema.post('find', function (docs, next) {
  docs.forEach((doc: { password: string })  => {
     doc.password = '';
  });
  next();
});

userSchema.post('findOne', function (doc, next) {
  if (doc) {
    doc.password = '';
  }
  next();
});



// userSchema.pre('updateOne', function (next) {
//   console.log(this);
//    next();
// });

userSchema.pre('updateOne', async function (next) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const update : any = this.getUpdate();
    // Check if password is being updated
    if (update.$set.password) {
      // Hash the updated password
      update.$set.password = await bcrypt.hash(
        update.$set.password,
        Number(config.bcrypt_salt_rounds),
      );
    }

    next();
  } catch (error) {
   console.log(error);
  }
});

 
 


 

userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema)
