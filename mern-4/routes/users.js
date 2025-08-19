const express = require("express")
const router = express.Router()

const authenticateMiddleware =require("../middleware/authMiddleware")

const { 
        addUserHandler,
        getUsersHandler,
        getUserByIdHandler,
        deleteUsersHandler } = require("../controllers/usersController")

//post-route for add user
router.post('/add-user', authenticateMiddleware, addUserHandler)

//get-route for all users
router.get('/users',authenticateMiddleware, getUsersHandler)

//get-route for particular user
router.get('/users/:_id',authenticateMiddleware, getUserByIdHandler)

//delete-route for particular user
router.delete('',authenticateMiddleware, deleteUsersHandler)

module.exports = router 