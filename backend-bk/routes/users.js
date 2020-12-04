const express = require('express')
const User = require('../models/user')
const router = express.Router()

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
})

// Get one user
router.get('/:id', (req, res) => {
    res.send(req.params.id)
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
router.patch('/:id', (req, res) => {})

// Delete user
router.delete('/:id', (req, res) => {})

module.exports = router
