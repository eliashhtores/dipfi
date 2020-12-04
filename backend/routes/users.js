const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
})

// Get one user
router.get('/:id', getUser, (req, res) => {
    res.send(res.user)
})

// Check if user is valid
router.post('/checkUser', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        }).exec()
        if (!user) {
            return res.status(400).json(({
                message: "The username does not exist"
            }))
        }
        if (!user.comparePassword(req.body.password)) {
            return res.status(400).json(({
                message: "The password is invalid"
            }))
        }
        res.send({
            message: "The username and password combination is correct!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

// Create user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})

// Update user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser.email)
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})

// Delete user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.status(200).json({
            message: "Deleted user"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

    res.user = user
    next()
}

module.exports = router