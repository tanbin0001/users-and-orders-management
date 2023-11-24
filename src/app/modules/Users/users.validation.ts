import { z } from 'zod';

// Define Zod schema for fullName
const fullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

// Define Zod schema for address
const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const productValidationSchema =  z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});


// Define Zod schema for user
export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).default([]),
  address: addressValidationSchema,
  orders: z.array(productValidationSchema).default([]),
});

export default userValidationSchema;
