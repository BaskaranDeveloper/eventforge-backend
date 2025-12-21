import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { use } from 'react';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

/*HASH PASSWORD BEFORE SAVE*/
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    const saltRound = 10;
    this.password = await bcrypt.hash(this.password, saltRound);

    next();
});


/*  COMPARE PASSWORD (LOGIN) */
userSchema.method.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);

};


/*  EXPORT USER MODEL */

const User = mongoose.model("User", userSchema);

export default User;
