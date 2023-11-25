import { Request, Response } from 'express'
import { UserServices } from './users.service'
import userValidationSchema from './users.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    // data validation using zod
    const zodParsedData = userValidationSchema.parse(user)
    const result = await UserServices.createUserInDb(zodParsedData)

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userIdInt = parseInt(userId)
    const result = await UserServices.getSingleUserFromDB(userIdInt)
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: "User Not Found"
      }
    })
  }
}

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userIdInt = parseInt(userId)
    const result = await UserServices.getUserOrdersFromDb(userIdInt)
    console.log(result, 'from controler')
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: "User Not Found"
      }
    })
  }
}

const updateUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userIdInt = parseInt(userId)
    const updatedUserData = req.body
    const result = await UserServices.updateUserDataInDB(
      userIdInt,
      updatedUserData,
    )
    console.log(result)
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }   catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: "User Not Found"
      }
    })
  }
}

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userIdInt = parseInt(userId)
    const totalPrice = await UserServices.calculateTotalPriceForAUserFromDB(userIdInt)
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {totalPrice},
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: "User not found!"
    }
    })
  }
}

const updateUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userIdInt = parseInt(userId)
    const updatedOrdersData = req.body
    const result = await UserServices.updateUserOrdersOnDB(
      userIdInt,
      updatedOrdersData,
    )
    console.log(result, ' updated user data ')
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedOrdersData,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: {
        code: 404,
        description: "User not found!"
    }
      
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userIdInt = parseInt(userId)
    const result = await UserServices.deleteAUserFromDb(userIdInt)
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUserData,
  getUserOrders,
  updateUserOrders,
  calculateTotalPrice,
  deleteUser,
}
