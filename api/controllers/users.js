const mongoose = require('mongoose');

const User = require('./../models/user');
const { hashPassword, comparePassword, jwtUser } = require('./../utils/auth');

// create a new user
exports.createUser = async (req, res, next) => {
    try {
        let hashedPassword = await hashPassword(req.body.password);

        const user = new User ({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hashedPassword
        });

        let createdUser = await user.save();

        res.status(201).send({
            status: "success",
            createdUser: {
                _id: createdUser._id,
                email: createdUser.email,
                password: createdUser.password,
                request: {
                    type: "GET",
                    url: `http://localhost:${process.env.PORT}/users/${createdUser._id}`
                }
            }
        });

    } catch (err) {
        res.status(400).send({
            status: "error",
            err: err.message,
        });
    }
}

// authenticate/log user in
exports.loginUser = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    try {
        let user = await User.find({email,});
        let userPassword = await comparePassword(password, user[0].password);
        let token = jwtUser(user[0].email, user[0].password);

        if (!user || user.length < 1 || !userPassword) {
            return res.status(401).json({
                status: "error",
                message: "Authentication Failed."
            });
        }

        res.status(200).json({
            status: "success",
            message: "Authentication Successful.",
            token,
        });

    } catch (err) {
        res.status(400).send({
            status: "error",
            err: err.message,
        });
    }
}

// get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        let users = await User.find().select('_id email password');

        if (!users || users.length < 1) {
        return res.status(404).json({
                status: "error",
                message: "No User Found"
            });
        }

        res.status(200).json({
            status: 'success',
            users: users.map((user) => {
                return {
                    _id: user._id,
                    email: user.email,
                    password: user.password,
                    request: {
                        type: 'GET',
                        url: `http://localhost:${process.env.PORT}/users/${user._id}`
                    }
                }
            })
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            err: err.message,
        });
    }
}

// get a single user
exports.getUser = async (req, res, next) => {
    let userId = req.params.userId;

    try {
        let user = await User.findById(userId).select('_id email');

        res.status(200).json({
            _id: user.id,
            email: user.email
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            err: err.message,
        });
    }
}

// delete a user
exports.deleteUser = async (req, res, next) => {
    let userId = req.params.userId;

    try {
        let deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            res.status(404).json({
                status: "error",
                message: "No valid order found for provided ID",
            });
        }

        res.status(200).json({
            status: 'success',
            message: "User Deleted Successfully",
            deletedUser: {
                _id: deletedUser._id,
                product: deletedUser.email,
            },
            request: {
                type: 'POST',
                url: `http://localhost:${process.env.PORT}/users/signup`,
                body: {
                    _id: 'ID',
                    email: 'String',
                    password: 'String',
                }
            }
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "error",
            err
        });
    }
}
