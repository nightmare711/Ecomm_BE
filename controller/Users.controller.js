const User = require('../model/Users')
const Summary = require('../model/Summary')

exports.getUsers = (req,res,next) => {
    return User.find().then(result => res.status(200).json({
        message: 'successful',
        status: 1,
        result: result
    })).catch(err => res.status(500).json({
        message: err.message,
        status:0
    }))
}

exports.getUserById = (req,res,next) => {
    const _id = req.params.id
    return User.findById(_id).then(result => res.status(200).json({
        message: 'successful',
        status:1,
        result: result
    })).catch(err => res.status(500).json({
        message: err.message,
        status:0
    }))
}

exports.login = (req,res,next) => {
    const { username, password } = req.body
    return User.findOne({username, password}).then(result => {
        if(result) {
            return res.status(200).json({
                message: 'login successful',
                status:1,
                result: result
            })
        }
        return res.status(404).json({
            status:0,
            message: 'Invalid email or password'
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status:0
    }))
}

exports.validate = (req,res,next) => {
    const {username} = req.body
    return User.findOne({username}).then((user) => {
        if(!user) {
            return res.status(200).json({
                message: 'success',
                status: 1
            })
        }
        return res.status(500).json({
            message: 'Duplicated username',
            status:0
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status:0
    }))
}

exports.postUser = (req,res,next) => {
    const {first_name, last_name, username, email, password, phone_number, dateOfBirth, address_metamask, bio, facebook, instagram} = req.body
    const user = new User({first_name, last_name, username, email, password, phone_number, dateOfBirth, address_metamask, bio, facebook, instagram})
    return User.findOne({username}).then(result => {
        if(!result) {
            return user.save().then((user) => {
                const d = new Date();
                let month = d.getMonth();
                const summary = new Summary({id: user._id, summary: [{
                    month_current: month - 2,
                    totalProduct: 0,
                }, {
                    month_current: month -1,
                    totalProduct: 0,
                    totalPrice: 0
                }, {
                    month_current: month,
                    totalProduct: 0,
                    totalPrice: 0
                }, {
                    month_current: month + 1,
                    totalProduct: 0, 
                    totalPrice: 0
                }]}) 
                return summary.save().then(resu => res.status(201).json({
                    message:'successful',
                    status:1
                }))
            }).catch(err => res.status(500).json({message: err.message, status:0}))
        } else {
            return res.status(500).json({
                message: 'Duplicated data',
                status:0
            })
        }
    }).catch(err => res.status(500).json({message: err.message, status: 0}))
}

exports.updateUser = (req,res,next) => {
    const _id = req.params.id
    const {first_name, last_name, username, email, password, phone_number, dateOfBirth, address_metamask, bio, facebook, instagram} = req.body
    return User.findById(_id).then(user => {
        if(user) {
            user.first_name = first_name || user.first_name
            user.last_name = last_name || user.last_name
            user.username = username || user.username
            user.email = email || user.email
            user.password = password || user.password
            user.phone_number = phone_number || user.phone_number
            user.dateOfBirth = dateOfBirth || user.dateOfBirth
            user.address_metamask = address_metamask || user.address_metamask
            user.bio = bio || user.bio
            user.facebook = facebook || user.facebook
            user.instagram = instagram || user.instagram
            return user.save().then(() => res.status(201).json({
                message: 'update successful',
                status: 1
            })).catch(err => res.status(500).json({message: err.message, status:0}))
        } else {
            return res.status(500).json({message: 'Not found user', status:0})
        }
    }).catch(err => res.status(500).json({message: err.message, status:0}))
}

