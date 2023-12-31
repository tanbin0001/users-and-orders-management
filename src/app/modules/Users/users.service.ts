import { User } from '../users.model'
import { TProduct, TUser } from './users.interface'

const createUserInDb = async (userData: TUser) => {
  const user = new User(userData)
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists')
  }
  const result = await user.save()
  return result
}

const getAllUsersFromDB = async () => {
  const result = await User.find().select({ username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 });

  console.log(result);
  return result
}
const getSingleUserFromDB = async (id: number) => {
  try {
    const result = await User.findOne({ userId: id })
    if (!result) {
      throw new Error('User not found in the database')
    }

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

const updateUserDataInDB = async (userId: number, updatedUserData: TUser) => {
  try {
    const result = await User.findOneAndUpdate(
      { userId },
      { $set: updatedUserData },
      { new: true, projection: { password: 0 } },
    )

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getUserOrdersFromDb = async (userId: number) => {
  const result = await User.findOne({ userId: userId })
  if (!result) {
    throw new Error('User not found in the database')
  }

  const orders = result?.orders
  return orders
}

const updateUserOrdersOnDB = async (
  userId: number,
  updateOrderData: TProduct,
) => {
  const user = new User(updateOrderData)
  if (!user.isUserExists(userId)) {
    throw new Error('User not  exists')
  }

  const result = await User.updateOne(
    { userId },
    { $push: { orders: updateOrderData } },
    { new: true, projection: { password: 0 } },
  )

  return result
}

const calculateTotalPriceForAUserFromDB = async (userId: number) => {
  try {
    const result = await User.aggregate([
      { $match: { userId } },
      {
        $project: {
          totalPrice: {
            $round: [{ $sum: '$orders.price' }, 2],
          },
        },
      },
    ])

    if (!result || result.length === 0) {
      throw new Error('User not found')
    }

    console.log(result, 'from cal service')

    return result[0].totalPrice
  } catch (error) {
    console.log(error)
  }
}

const deleteAUserFromDb = async (id: number) => {
  try {
    const result = await User.deleteOne({ userId: id })
    if (!result) {
      throw new Error('User not found in the database')
    }

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const UserServices = {
  createUserInDb,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserDataInDB,
  getUserOrdersFromDb,
  updateUserOrdersOnDB,
  calculateTotalPriceForAUserFromDB,
  deleteAUserFromDb,
}
