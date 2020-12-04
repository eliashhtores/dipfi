const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10

const userDetailSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    street_num: {
        type: String,
        required: true
    },
    apartment_num: {
        type: String
    },
    zipCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    cellphone: {
        type: String
    },
    scholarshipHolder: {
        type: String,
        required: true
    },
    workplace: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    detail: [userDetailSchema]
})

userSchema.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)