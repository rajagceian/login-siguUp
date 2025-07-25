const mongoose = require('mongoose');
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name:{
        type:String,
        required: [true, 'user name is required'],
        minLength: [5, 'Name must be at least 5 char'],
        maxLength: [30,'Name must be less than 30 char'],
        trim: true
    },
    email:{
        type:String,
        required: [true,'user email is required'],
        unique: [true,'Already registered'],
        lowercase: true,
    },
    password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Prevents password from being returned in queries by default
    },
    forgetPasswordToken:{
        type: String,
    },
    forPasswordExpiryDate:{
        type: Date,
    }
}, {
    timestamps: true
});

// store password in hash value
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password , 10);  // 10 is Salt Rounds
    return next();
});


//method to generate JWT token
userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id:this._id, email: this.email},
            process.env.SECRET,
            { expiresIn: '24h'}
        )
    }
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;