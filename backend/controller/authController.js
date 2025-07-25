const userModel = require("../model/userSchema");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const signup = async (req,res)=>{
    const {name , email , password, confirmPassword} = req.body; // from frontend
    console.log(name , email , password, confirmPassword);

    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: 'Every field is required'
        });
    }
    // email validation
    const validEmail = emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email id!!'
        });
    }

    // check for password == confirmPassword
    if(password != confirmPassword){
        return res.status(400).json({
            success: false,
            message: 'Password do not match!!'
        });       
    }
    try{
        const userInfo = userModel(req.body);
        const result = await userInfo.save();
    
        return res.status(200).json({
            success: true,
            data:result
        })
    } catch(e){
        if(e.code === 11000){ // 11000 indicates reuse of registered data
            return res.status(400).json({ 
                success: false,
                message: 'Account already exists with provided'
            });
        }
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }

}

//************************** Sign In****************************/

const signin = async (req,res) =>{
    const { email , password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Every is mandatory'
        });
    }
    // find user in DB
    const user = await userModel
        .findOne({
            email
        })
        .select('+password'); // ➕ Means "please include this hidden field"

    if(!user || ! await bcrypt.compare(password, user.password)){ // password => from input and user.password => database
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials!!'
        });
    }

    try{
        const token = user.jwtToken();
        user.password = undefined; // hide for security purpose

        const cookieOption = {
            maxAge: 24*60*60*1000, // milliSecond
            httpOnly: true   // do not access from JS side
        };

        res.cookie('token',token,cookieOption);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch(err){
        res.status(400).json({
            success: false,
            data: err.message
        })       
    }

}

const getUser = async (req,res) =>{
    const userId = req.user.id;

    try{
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

const logout = (req,res) =>{
    try{
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        };
        res.cookie('token',null,cookieOption);
        res.status(200).json({
            success: true,
            message: 'Logged Out!!'
        });
    } catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    logout,
    getUser,
    signup,
    signin
}